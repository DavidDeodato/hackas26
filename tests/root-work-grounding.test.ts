import test from 'node:test';
import assert from 'node:assert/strict';
import {config} from '../server/config';
import {prepareWork} from '../server/ai';
const originalFetch=globalThis.fetch,originalKey=config.openaiKey;
test.afterEach(()=>{globalThis.fetch=originalFetch;config.openaiKey=originalKey;});
test('work omits unsupported documented claims and labels suggestions',async()=>{
 config.openaiKey='test-key';
 globalThis.fetch=async()=>new Response(JSON.stringify({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({title:'Revisão',sections:[{kind:'documented',text:'Tem moderação humana.',sourceId:'s1',quote:'moderação humana'},{kind:'documented',text:'A rubrica exige clareza.',sourceId:'s1',quote:'Exige clareza.'},{kind:'proposal',text:'Poderia testar um cronômetro.',sourceId:'',quote:''}]})}]}]}),{status:200});
 const r=await prepareWork('Revise',[{id:'s1',title:'Rubrica',content:'Exige clareza.'}],'work');
 assert.ok(!r.content.includes('Tem moderação humana.'));assert.match(r.content,/Pendente de comprovação/);assert.match(r.content,/Segundo Rubrica/);assert.match(r.content,/Proposta — não representa funcionalidade/);assert.deepEqual(r.sources,['s1']);
});
