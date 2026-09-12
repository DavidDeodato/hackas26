import { Pool } from 'pg';
import { config } from './config.js';
import { initialWorkspace } from '../shared/examples.js';
import type { Workspace } from '../shared/types.js';
import { mkdir,readFile,writeFile,rename } from 'node:fs/promises';
import path from 'node:path';

let pool:Pool|undefined;
// Account authentication requires durable PostgreSQL; never fall back to local files.
export function getStorePool(){return pool;}
const revisions=new WeakMap<Workspace,number>();
export async function closeStore(){await pool?.end();pool=undefined;}
export let storageMode:'postgres'|'local-file'='local-file';
export async function initStore(){
 if(config.databaseUrl){try {pool=new Pool({connectionString:config.databaseUrl,max:3,connectionTimeoutMillis:8000});await pool.query('CREATE TABLE IF NOT EXISTS rebobina_workspaces (session_id text PRIMARY KEY, payload jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())');await pool.query('ALTER TABLE rebobina_workspaces ADD COLUMN IF NOT EXISTS revision integer NOT NULL DEFAULT 0');await pool.query('CREATE TABLE IF NOT EXISTS rebobina_ai_usage (scope text NOT NULL, day date NOT NULL, used integer NOT NULL DEFAULT 0, PRIMARY KEY(scope,day))');storageMode='postgres';return;}catch {await pool?.end().catch(()=>{});pool=undefined;console.error(JSON.stringify({event:'database_unavailable',fallback:'local-file'}));}}
 if(process.env.VERCEL)throw new Error('Persistência PostgreSQL indisponível. Verifique DATABASE_URL no ambiente do deploy.');
 await mkdir(path.resolve('private/sessions'),{recursive:true});
}
export async function getWorkspace(id:string):Promise<Workspace>{
 let found:Workspace|undefined;
 if(pool){const r=await pool.query('SELECT payload,revision FROM rebobina_workspaces WHERE session_id=$1',[id]);found=r.rows[0]?.payload;if(found)revisions.set(found,r.rows[0].revision);}
 else {try {found=JSON.parse(await readFile(path.resolve('private/sessions',id+'.json'),'utf8'));}catch { /* no existing session */ }}
 if(found)return found;const w=initialWorkspace();w.activeAttemptId=w.attempts[0].id;await saveWorkspace(id,w);return w;
}
export async function saveWorkspace(id:string,w:Workspace){
 if(pool){const revision=revisions.get(w);if(revision===undefined){const r=await pool.query('INSERT INTO rebobina_workspaces(session_id,payload) VALUES($1,$2) ON CONFLICT(session_id) DO NOTHING RETURNING revision',[id,JSON.stringify(w)]);if(!r.rowCount)throw new Error('Seu espaço está sendo aberto em outra aba. Recarregue para sincronizar.');revisions.set(w,0);}else{const r=await pool.query('UPDATE rebobina_workspaces SET payload=$2,updated_at=now(),revision=revision+1 WHERE session_id=$1 AND revision=$3 RETURNING revision',[id,JSON.stringify(w),revision]);if(!r.rowCount)throw new Error('Seu espaço mudou em outra aba. Recarregue antes de repetir a ação; nenhuma versão anterior foi apagada.');revisions.set(w,r.rows[0].revision);}}
 else {const file=path.resolve('private/sessions',id+'.json');await writeFile(file+'.tmp',JSON.stringify(w),'utf8');await rename(file+'.tmp',file);}
}
const queues=new Map<string,Promise<unknown>>();
export function serialized<T>(id:string,task:()=>Promise<T>):Promise<T>{const previous=queues.get(id)||Promise.resolve();const next=previous.catch(()=>{}).then(task);queues.set(id,next);next.finally(()=>{if(queues.get(id)===next)queues.delete(id);}).catch(()=>{});return next;}

const localBudgets=new Map<string,number>();
export async function consumeAiBudget(id:string){
 const day=new Date().toISOString().slice(0,10),sessionLimit=Number(process.env.AI_DAILY_SESSION_LIMIT||30),globalLimit=Number(process.env.AI_DAILY_GLOBAL_LIMIT||150);
 if(!pool){const g=day+':global',s=day+':'+id;if((localBudgets.get(g)||0)>=globalLimit||(localBudgets.get(s)||0)>=sessionLimit)throw new Error('Limite diário de IA deste protótipo atingido. Seus materiais e ensaios salvos continuam disponíveis.');localBudgets.set(g,(localBudgets.get(g)||0)+1);localBudgets.set(s,(localBudgets.get(s)||0)+1);return;}
 const client=await pool.connect();try{await client.query('BEGIN');await client.query('INSERT INTO rebobina_ai_usage(scope,day) VALUES($1,$2) ON CONFLICT DO NOTHING',['global',day]);const global=await client.query('SELECT used FROM rebobina_ai_usage WHERE scope=$1 AND day=$2 FOR UPDATE',['global',day]);if(global.rows[0].used>=globalLimit)throw new Error('A cota diária de IA da demonstração foi atingida. Seus ensaios salvos continuam disponíveis.');await client.query('INSERT INTO rebobina_ai_usage(scope,day) VALUES($1,$2) ON CONFLICT DO NOTHING',[id,day]);const session=await client.query('SELECT used FROM rebobina_ai_usage WHERE scope=$1 AND day=$2 FOR UPDATE',[id,day]);if(session.rows[0].used>=sessionLimit)throw new Error('Limite diário de IA deste espaço atingido. Consulte ou rebobine os ensaios já salvos.');await client.query('UPDATE rebobina_ai_usage SET used=used+1 WHERE day=$1 AND scope=ANY($2::text[])',[day,['global',id]]);await client.query('COMMIT');}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
}
