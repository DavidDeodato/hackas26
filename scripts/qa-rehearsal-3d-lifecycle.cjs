const {chromium}=require('C:/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises');
(async()=>{
 const base=process.argv[2]||'http://localhost:4173';
 const scope=base.includes('localhost')?'local':'public';
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1280,height:900}});
 const page=await context.newPage();const results=[];
 await page.goto(base,{waitUntil:'networkidle'});
 await page.locator('[data-renderer="ready"]').waitFor();
 results.push({check:'default-3d',canvas:await page.locator('canvas').count()});
 await page.getByRole('button',{name:'Ver ilustração',exact:true}).click();
 results.push({check:'illustration',canvas:await page.locator('canvas').count()});
 await page.getByRole('button',{name:'Voltar ao 3D',exact:true}).click();
 await page.locator('canvas').waitFor({state:'attached'});
 await page.locator('[data-renderer="ready"]').waitFor();
 results.push({check:'return-3d',canvas:await page.locator('canvas').count()});
 for(const label of ['Minha audiência','Mesa de trabalho','Meus materiais','Sala de ensaio']){
  const old=await page.locator('canvas').elementHandle();
  await page.getByRole('link',{name:label,exact:true}).click();
  await page.locator('[data-renderer="ready"]').waitFor();
  results.push({check:'spa-navigation',label,canvas:await page.locator('canvas').count(),previousCanvasDetached:await old.evaluate(e=>!e.isConnected)});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 results.push({check:'reduced-motion',enabled:await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),canvas:await page.locator('canvas').count()});
 await page.getByRole('link',{name:'Minha audiência',exact:true}).click();
 await page.locator('[data-renderer="ready"]').waitFor();
 await page.locator('canvas').evaluate(e=>{const gl=e.getContext('webgl2')||e.getContext('webgl');gl.getExtension('WEBGL_lose_context').loseContext();});
 await page.locator('[data-renderer="fallback"]').waitFor();
 await page.getByLabel('Nome',{exact:true}).fill('QA fallback local');
 results.push({check:'context-loss-fallback',canvas:await page.locator('canvas').count(),fallback:await page.locator('.mini-world__fallback').innerText(),formEditable:await page.getByLabel('Nome',{exact:true}).inputValue()==='QA fallback local'});
 await page.screenshot({path:`artifacts/qa/3d-final-${scope}-fallback.png`,fullPage:true});
 await fs.writeFile(`artifacts/qa/3d-final-${scope}-lifecycle.json`,JSON.stringify({base,at:new Date().toISOString(),aiCalls:0,results},null,2));
 console.log(JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
