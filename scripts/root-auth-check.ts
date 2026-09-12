import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';

const origin=(process.env.REBOBINA_BASE_URL||'http://localhost:4173').replace(/\/$/,'');
const suffix=randomBytes(6).toString('hex');
const password=randomBytes(24).toString('base64url');
const checks:string[]=[];
type Jar=Map<string,string>;
const a:Jar=new Map(),b:Jar=new Map(),guest:Jar=new Map();
async function request(jar:Jar,path:string,body?:unknown,method=body===undefined?'GET':'POST',extra:Record<string,string>={}){
 const response=await fetch(origin+'/api'+path,{method,headers:{'content-type':'application/json',cookie:[...jar].map(([k,v])=>`${k}=${v}`).join('; '),...extra},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(25000)});
 for(const value of response.headers.getSetCookie()){const first=value.split(';')[0];const index=first.indexOf('=');const name=first.slice(0,index),valueText=first.slice(index+1);if(!valueText||/max-age=0/i.test(value))jar.delete(name);else jar.set(name,valueText);}
 assert.ok(response.headers.get('content-type')?.includes('application/json'),`${path} must return JSON; HTTP ${response.status}`);
 const data=await response.json();return {status:response.status,data,headers:response.headers};
}
async function ok(jar:Jar,path:string,body?:unknown,method?:string){const result=await request(jar,path,body,method);assert.ok(result.status>=200&&result.status<300,`${path} HTTP ${result.status}`);return result;}
async function run(){
 assert.equal((await ok(guest,'/auth/me')).data.user,null);checks.push('Anonymous visitor is not authenticated');
 const credentialsA={email:`qa-a-${suffix}@example.invalid`,password,name:'Pessoa QA A'};
 const credentialsB={email:`qa-b-${suffix}@example.invalid`,password,name:'Pessoa QA B'};
 const signedA=await ok(a,'/auth/register',credentialsA);assert.ok(signedA.data.user.id);assert.equal(signedA.data.user.name,credentialsA.name);
 const signedB=await ok(b,'/auth/register',credentialsB);assert.notEqual(signedA.data.user.id,signedB.data.user.id);checks.push('Two independent real accounts registered');
 const cookies=signedA.headers.getSetCookie().join(';');assert.match(cookies,/HttpOnly/i);assert.match(cookies,/SameSite=Strict/i);if(origin.startsWith('https:'))assert.match(cookies,/Secure/i);checks.push('Authentication cookie has required protection flags');
 const source=await ok(a,'/materials',{title:'QA sintético — isolamento de conta',content:'Material sintético criado automaticamente para testar isolamento. Não representa dados pessoais reais.'});const materialId=source.data.material.id;assert.ok(materialId);
 assert.ok((await ok(a,'/state')).data.materials.some((m:{id:string})=>m.id===materialId));
 assert.ok(!(await ok(b,'/state')).data.materials.some((m:{id:string})=>m.id===materialId));
 assert.ok(!(await ok(guest,'/state')).data.materials.some((m:{id:string})=>m.id===materialId));checks.push('Saved account material isolated from second account and guest');
 const avatar={template:'feminine',hairStyle:'curly',hairColor:'#543524',skinColor:'#936144',topColor:'#c9875b',pantsColor:'#293848',shoesColor:'#eadfcf'};
 const updated=await ok(a,'/auth/profile',{name:'Pessoa QA A revisada',avatar},'PATCH');assert.deepEqual(updated.data.user.avatar,avatar);
 assert.deepEqual((await ok(a,'/auth/me')).data.user.avatar,avatar);checks.push('Profile name and all avatar customization fields persist');
 const csrf=await request(a,'/auth/profile',{name:'Should not persist'},'PATCH',{origin:'https://different-origin.invalid'});assert.equal(csrf.status,403);checks.push('Cross-origin profile write rejected');
 const invalid=await request(a,'/auth/profile',{avatar:{hairColor:'not-a-color'}},'PATCH');assert.ok(invalid.status>=400&&invalid.status<500);checks.push('Invalid avatar field rejected');
 const oldSession=new Map(a);await ok(a,'/auth/logout',{});assert.equal((await ok(a,'/auth/me')).data.user,null);assert.equal((await ok(oldSession,'/auth/me')).data.user,null);checks.push('Logout revokes old authentication session');
 assert.ok(!(await ok(a,'/state')).data.materials.some((m:{id:string})=>m.id===materialId));checks.push('Logged-out browser cannot read prior account workspace');
 const bad=await request(a,'/auth/login',{email:credentialsA.email,password:'wrong-password-for-qa'});assert.ok(bad.status===400||bad.status===401);assert.equal((await ok(a,'/auth/me')).data.user,null);checks.push('Wrong password rejected without authenticating');
 const again=await ok(a,'/auth/login',{email:credentialsA.email,password});assert.equal(again.data.user.id,signedA.data.user.id);assert.deepEqual(again.data.user.avatar,avatar);
 assert.ok((await ok(a,'/state')).data.materials.some((m:{id:string})=>m.id===materialId));checks.push('Re-login restores same account data and avatar');
 const invalidRegister=await request(guest,'/auth/register',{email:`qa-short-${suffix}@example.invalid`,password:'tiny',name:'QA'});assert.ok(invalidRegister.status>=400&&invalidRegister.status<500);checks.push('Short password rejected');
 await ok(a,'/auth/logout',{});await ok(b,'/auth/logout',{});
}
let error:string|undefined;try{await run();}catch(reason){error=reason instanceof Error?reason.message:'Unknown QA failure';process.exitCode=1;}
const report={status:error?'FAIL':'PASS_AUTH_ACCOUNT_ISOLATION',origin,at:new Date().toISOString(),checks,...(error?{error}:{}),limitations:['Synthetic test accounts only; no AI generation calls','No email verification, recovery, or production security audit claimed','Browser avatar and login visual QA are a separate gate']};
await mkdir('artifacts/qa',{recursive:true});await writeFile(process.env.REBOBINA_BASE_URL?'artifacts/qa/root-auth-public.json':'artifacts/qa/root-auth-local.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
