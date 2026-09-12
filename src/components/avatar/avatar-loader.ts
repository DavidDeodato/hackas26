import {defaultAvatar,type AvatarConfig} from '../../../shared/auth';
import {createAvatar,disposeAvatar} from './avatar-builder';
const assets={'trellis-masculine':'/avatar/generated/trellis-masculine-v1.glb','trellis-feminine':'/avatar/generated/trellis-feminine-v1.glb'} as const;
const buffers=new Map<string,Promise<ArrayBuffer>>();
async function readAsset(path:string){let pending=buffers.get(path);if(!pending){pending=fetch(path,{signal:AbortSignal.timeout(12000)}).then(async response=>{if(!response.ok)throw new Error('Avatar não disponível.');const value=await response.arrayBuffer();if(value.byteLength>12_000_000)throw new Error('Arquivo de avatar acima do limite.');return value;});buffers.set(path,pending);void pending.catch(()=>buffers.delete(path));}return pending;}

/** Fixed same-origin assets only. Each parse owns independent geometry, textures and materials. */
export async function loadAvatarModel(T:any,avatar:AvatarConfig=defaultAvatar):Promise<any>{
 const requested=avatar.model||'procedural';
 if(requested==='procedural'||!(requested in assets)){const model=createAvatar(T,avatar);model.userData.model='procedural';return model;}
 let model:any;
 try{
  const path=assets[requested as keyof typeof assets];
  // @ts-expect-error Official Three r180 addon is vendored as JavaScript, matching the core renderer.
  const {GLTFLoader}=await import('../../vendor/three/GLTFLoader.js');
  const gltf=await new GLTFLoader().parseAsync((await readAsset(path)).slice(0),'');model=gltf.scene;
  model.traverse((node:any)=>{if(node.isMesh){node.castShadow=true;node.receiveShadow=true;if(node.geometry&&!node.geometry.attributes.normal)node.geometry.computeVertexNormals();for(const material of Array.isArray(node.material)?node.material:[node.material]){material.metalness=0;material.roughness=.82;material.needsUpdate=true;}}});
  const box=new T.Box3().setFromObject(model),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
  if(!Number.isFinite(size.y)||size.y<=0)throw new Error('Modelo sem dimensões válidas.');
  const scale=2.45/size.y;model.scale.multiplyScalar(scale);model.position.set(-center.x*scale,-box.min.y*scale,-center.z*scale);
  const root=new T.Group();root.name='avatar';root.add(model);root.userData={height:2.45,forward:'+Z',model:requested,source:'generated-glb',loadFallback:false};return root;
 }catch{if(model)disposeAvatar(model);const fallback=createAvatar(T,avatar);fallback.userData.model='procedural';fallback.userData.loadFallback=true;fallback.userData.requestedModel=requested;return fallback;}
}
export const createStageAvatar=loadAvatarModel;
