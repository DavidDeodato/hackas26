import assert from 'node:assert/strict';
import {initStore,getWorkspace,saveWorkspace,consumeAiBudget,storageMode,closeStore} from '../server/store';
import {prepareWork} from '../server/ai';
import {mkdir,writeFile} from 'node:fs/promises';
const checks:string[]=[];
try{
 await initStore();assert.equal(storageMode,'postgres');
 const id=crypto.randomUUID();await getWorkspace(id);
 const a=await getWorkspace(id),b=await getWorkspace(id);await saveWorkspace(id,a);await assert.rejects(()=>saveWorkspace(id,b),/outra aba/);checks.push('Stale revision rejected without overwriting newer workspace');
 process.env.AI_DAILY_SESSION_LIMIT='1';await consumeAiBudget(id);await assert.rejects(()=>consumeAiBudget(id),/Limite diário/);checks.push('Persistent session quota rejects second attempt at limit one');
 const source={id:'synthetic-rubric',title:'Rubrica fictícia para QA',content:'Este exemplo fictício exige evidências verificáveis, apresentação em cinco minutos e clareza sobre impacto e viabilidade. Não contém informações sobre funcionalidades do produto.'};
 const work=await prepareWork('Revise o pitch. O feedback sugere moderação humana, conferência automatizada e cronômetro. Não sabemos se existem. Quero um texto honesto para apresentação.',[source],'work');
 assert.ok(work.content.includes('Proposta')||work.content.includes('Pendente'));assert.ok(!work.sources.some(id=>id!==source.id));checks.push('Live work revision labels proposals/pending instead of promoting feedback to documented functionality');
 await mkdir('artifacts/qa',{recursive:true});await writeFile('artifacts/qa/root-store-grounding.json',JSON.stringify({status:'PASS',at:new Date().toISOString(),checks,work:work.content,limitations:['Literal citation validation is not semantic truth verification','One live grounding regression, not exhaustive evaluation']},null,2));
 console.log(JSON.stringify({status:'PASS',checks}));
}catch(e){console.error((e as Error).message);process.exitCode=1;}finally{await closeStore();}
