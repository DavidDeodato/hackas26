const {chromium}=require('C:/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises');
let browser;
(async()=>{
 const base='https://rebobina-h4h.vercel.app';
 browser=await chromium.launch({headless:true});
 const errors=[],httpFailures=[],results=[];
 for(const size of [{name:'desktop',width:1280,height:720},{name:'mobile',width:390,height:844}]){
  const context=await browser.newContext({viewport:{width:size.width,height:size.height}});
  const page=await context.newPage();page.setDefaultTimeout(30000);
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)httpFailures.push({path:new URL(r.url()).pathname,status:r.status()});});
  for(const [name,route] of [['login','/'],['sala','/'],['audiencia','/audiencia'],['mesa','/mesa'],['materiais','/materiais']]){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   if(name!=='login'&&await page.getByRole('button',{name:'Explorar demonstração',exact:true}).isVisible()) await page.getByRole('button',{name:'Explorar demonstração',exact:true}).click();
   if(name==='login') await page.getByRole('button',{name:'Entrar no meu espaço',exact:true}).waitFor();
   if(name!=='login') await page.locator('.profile-trigger').waitFor({state:'attached'});
   if(name!=='login') await page.getByText('Abrindo seu espaço...',{exact:true}).waitFor({state:'hidden'});
   await page.waitForTimeout(1500);
   const metrics=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,canvas:document.querySelectorAll('canvas').length,renderers:[...document.querySelectorAll('[data-renderer]')].map(e=>e.getAttribute('data-renderer')),scripts:[...document.scripts].map(s=>new URL(s.src||location.href).pathname),heading:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent)}));
   const file=`artifacts/qa/auth-public-${name}-${size.name}.png`;
   await page.screenshot({path:file,fullPage:true});
   results.push({name,size:size.name,status:response.status(),metrics,file});
   console.log(JSON.stringify({name,size:size.name,status:response.status(),canvas:metrics.canvas,overflow:metrics.scrollWidth>metrics.width}));
  }
  await context.close();
 }
 await fs.writeFile('artifacts/qa/auth-public-report.json',JSON.stringify({at:new Date().toISOString(),base,status:'COMPLETE',accountRegistrations:0,aiCalls:0,results,errors,httpFailures},null,2));
 await browser.close();
})().catch(async e=>{console.error(e.name,e.message);await browser?.close();process.exitCode=1;});
