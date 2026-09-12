const {chromium}=require('C:/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
let ownedBrowser;

(async()=>{
 const base=process.argv[2]||'http://localhost:4173';
 const scope=base.includes('localhost')?'local':'public';
 const out=path.resolve('artifacts/qa');
 await fs.mkdir(out,{recursive:true});
 const browser=await chromium.launch({headless:true});
 ownedBrowser=browser;
 const desktopWidth=Number(process.env.QA_DESKTOP_WIDTH)||1440;
 const desktopHeight=Number(process.env.QA_DESKTOP_HEIGHT)||1000;
 const context=await browser.newContext({viewport:{width:desktopWidth,height:desktopHeight}});
 const page=await context.newPage();
 const errors=[]; const results=[];
 page.on('pageerror',e=>errors.push(String(e)));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 for(const size of [{name:'desktop',width:desktopWidth,height:desktopHeight},{name:'mobile',width:390,height:844}]){
  await page.setViewportSize(size);
  for(const [name,route] of [['primeira-visita','/'],['audiencia','/audiencia'],['mesa','/mesa'],['materiais','/materiais']].filter(([name])=>!process.argv[3]||name===process.argv[3])){
   const start=errors.length;
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   await page.waitForTimeout(1700);
   const metrics=await page.evaluate(()=>({canvas:document.querySelectorAll('canvas').length,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,renderers:[...document.querySelectorAll('[data-renderer]')].map(e=>e.getAttribute('data-renderer')),canvasGeometry:[...document.querySelectorAll('canvas')].map(e=>({width:e.width,height:e.height,rect:e.getBoundingClientRect().toJSON(),host:e.parentElement.getBoundingClientRect().toJSON(),display:getComputedStyle(e).display,visibility:getComputedStyle(e).visibility})),text:document.body.innerText.slice(0,2400)}));
   const file=process.argv[4]?`${process.argv[4]}-${name}-${size.name}.png`:`3d-final-${scope}-${name}-${size.name}.png`;
   await page.screenshot({path:path.join(out,file),fullPage:true});
   results.push({name,size:size.name,status:response.status(),file,metrics,errors:errors.slice(start)});
   console.log(JSON.stringify({name,size:size.name,canvas:metrics.canvas,status:response.status(),overflow:metrics.scrollWidth>metrics.width,file,errors:errors.slice(start)}));
  }
 }
 await fs.writeFile(path.join(out,`${process.argv[4]||'3d-final-'+scope}${process.argv[3]?'-'+process.argv[3]:''}-report.json`),JSON.stringify({base,at:new Date().toISOString(),isolatedContext:true,aiCalls:0,results},null,2));
 await browser.close();
})().catch(async e=>{console.error(e);await ownedBrowser?.close();process.exitCode=1;});
