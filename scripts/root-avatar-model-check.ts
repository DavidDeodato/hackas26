import assert from 'node:assert/strict';
import {randomBytes,createHash} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';
const origin=(process.env.REBOBINA_BASE_URL||'http://localhost:4173').replace(/\/$/,'');
const checks:string[]=[];const assets:unknown[]=[];const jar=new Map<string,string>();
const password=randomBytes(24).toString('base64url');
const email=`qa-avatar-${randomBytes(7).toString('hex')}@example.invalid`;
async function request(path:string,body?:unknown,method=body===undefined?'GET':'POST'){
 const response=await fetch(origin+'/api'+path,{method,headers:{'content-type':'application/json',cookie:[...jar].map(([key,value])=>`${key}=${value}`).join('; ')},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
 for(const cookie of response.headers.getSetCookie()){const item=cookie.split(';')[0],index=item.indexOf('=');if(!item.slice(index+1))jar.delete(item.slice(0,index));else jar.set(item.slice(0,index),item.slice(index+1));}
 assert.ok(response.headers.get('content-type')?.includes('application/json'),`${path} JSON required`);
 return {status:response.status,data:await response.json()};
}
async function ok(path:string,body?:unknown,method?:string){const response=await request(path,body,method);assert.ok(response.status>=200&&response.status<300,`${path} HTTP ${response.status}`);return response.data;}
let error:string|undefined;
try{
 for(const name of ['masculine','feminine']){
  const path=`/avatar/generated/trellis-${name}-v1.glb`,response=await fetch(origin+path,{signal:AbortSignal.timeout(20000)});assert.equal(response.status,200,`${path} HTTP`);
  const bytes=Buffer.from(await response.arrayBuffer());assert.equal(bytes.subarray(0,4).toString(),'glTF');assert.equal(bytes.readUInt32LE(4),2);assert.equal(bytes.readUInt32LE(8),bytes.length);assert.equal(bytes.readUInt32LE(16),0x4e4f534a);
  const document=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)).toString('utf8').trim());assert.ok(document.meshes?.length);assert.ok(document.images?.some((image:{bufferView?:number})=>image.bufferView!==undefined));assert.equal(document.skins?.length||0,0);
  assets.push({path,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),meshes:document.meshes.length,skins:0});checks.push(`${name}: real GLB2 with embedded texture served successfully`);
 }
 await ok('/auth/register',{email,password,name:'QA modelos — pessoa fictícia'});
 for(const model of ['trellis-masculine','trellis-feminine','procedural']){
  const saved=await ok('/auth/profile',{avatar:{model}},'PATCH');assert.equal(saved.user.avatar.model,model);assert.equal((await ok('/auth/me')).user.avatar.model,model);checks.push(`${model}: selected model persisted and reloaded through account API`);
 }
 const invalid=await request('/auth/profile',{avatar:{model:'https://untrusted.example/avatar.glb'}},'PATCH');assert.equal(invalid.status,400);checks.push('Arbitrary model URL rejected');
 await ok('/auth/logout',{});await ok('/auth/login',{email,password});assert.equal((await ok('/auth/me')).user.avatar.model,'procedural');checks.push('Model choice preserved after logout and re-login');await ok('/auth/logout',{});
}catch(reason){error=reason instanceof Error?reason.message:'Avatar QA failure';process.exitCode=1;}
const report={at:new Date().toISOString(),origin,status:error?'FAIL':'PASS_CURATED_AVATAR_MODELS',checks,assets,...(error?{error}:{}),limitations:['Synthetic account; no AI calls','GLB header and persistence validation do not replace actual browser rendering QA','Generated models are monolithic and do not provide editable hair or rigged animation']};
await mkdir('artifacts/qa',{recursive:true});await writeFile(process.env.REBOBINA_BASE_URL?'artifacts/qa/root-avatar-models-public.json':'artifacts/qa/root-avatar-models-local.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
