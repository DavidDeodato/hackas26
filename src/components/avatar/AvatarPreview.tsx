import {useEffect,useRef,useState} from 'react';
import {defaultAvatar,type AvatarConfig} from '../../../shared/auth';
import {disposeAvatar} from './avatar-builder';
import {loadAvatarModel} from './avatar-loader';
import './avatar-preview.css';

export interface AvatarPreviewProps {avatar?:AvatarConfig;className?:string}
interface Viewer {update:(avatar:AvatarConfig)=>void;dispose:()=>void}

export default function AvatarPreview({avatar=defaultAvatar,className=''}:AvatarPreviewProps){
  const host=useRef<HTMLDivElement>(null),current=useRef(avatar),viewer=useRef<Viewer|null>(null);
  const [status,setStatus]=useState<'loading'|'ready'|'fallback'>('loading');
  const [source,setSource]=useState('procedural'),[modelFallback,setModelFallback]=useState(false);
  current.current=avatar;
  useEffect(()=>{viewer.current?.update(avatar);},[avatar]);
  useEffect(()=>{
    let cancelled=false;setStatus('loading');
    if(!host.current)return;
    createPreview(host.current,()=>current.current,()=>!cancelled,state=>{if(!cancelled)setStatus(state);},(model,fallback)=>{if(!cancelled){setSource(model);setModelFallback(fallback);}})
      .then(value=>{if(cancelled)value?.dispose();else viewer.current=value??null;})
      .catch(()=>{if(!cancelled)setStatus('fallback');});
    return()=>{cancelled=true;viewer.current?.dispose();viewer.current=null;};
  },[]);
  return <div className={`avatar-preview ${className}`} data-avatar-renderer={status} data-avatar-source={source} data-avatar-model-fallback={modelFallback?'true':'false'}>
    <div ref={host} className="avatar-preview__canvas" role="img" aria-label="Prévia 3D do seu avatar personalizado"/>
    <span className="avatar-preview__label">Seu avatar</span>
    {modelFallback&&status==='ready'?<p className="avatar-preview__model-warning" role="status">Modelo gerado indisponível. Exibindo o personalizável.</p>:null}
    {status!=='ready'?<div className="avatar-preview__fallback" role="status"><span aria-hidden="true">◌</span><p>{status==='loading'?'Preparando sua prévia…':'A prévia 3D não está disponível. Você pode continuar personalizando pelas opções.'}</p></div>:null}
  </div>;
}

async function createPreview(host:HTMLElement,getAvatar:()=>AvatarConfig,active:()=>boolean,status:(value:'loading'|'ready'|'fallback')=>void,source:(model:string,fallback:boolean)=>void):Promise<Viewer|undefined>{
  // @ts-expect-error Vendored Three is the same local MIT module used by the stage.
  const T=await import('../../vendor/three/three.module.min.js');
  if(!active())return;
  let renderer:any,person:any,dispose=()=>{};
  const scene=new T.Scene(),resources:any[]=[];
  try{
    renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
    renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
    const camera=new T.OrthographicCamera(-2,2,1.6,-1.6,.1,30);camera.position.set(2.8,2.25,7.5);camera.lookAt(0,1.19,0);
    scene.add(new T.HemisphereLight(0xffead7,0x3a3230,2.9));
    const key=new T.DirectionalLight(0xffdfb8,3.4);key.position.set(-3,6,5);key.castShadow=true;key.shadow.mapSize.set(512,512);key.shadow.normalBias=.025;
    Object.assign(key.shadow.camera,{left:-2,right:2,top:3,bottom:-2,near:.1,far:15});scene.add(key);
    const fill=new T.DirectionalLight(0xf5eee5,1.5);fill.position.set(4,3,-3);scene.add(fill);
    const stageGeometry=new T.CylinderGeometry(.64,.68,.09,48),stageMaterial=new T.MeshStandardMaterial({color:0x8c725a,roughness:.82});resources.push(stageGeometry,stageMaterial);
    const stage=new T.Mesh(stageGeometry,stageMaterial);stage.position.y=-.045;stage.receiveShadow=true;scene.add(stage);
    const pivot=new T.Group();pivot.rotation.y=-.12;scene.add(pivot);
    let frame=0,dead=false,visible=true,target=-.12,ready=false,generation=0,loadingModel=true;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const draw=()=>{
      frame=0;if(dead||loadingModel||!person||!visible||document.hidden)return;
      const delta=target-pivot.rotation.y;
      pivot.rotation.y=reduced.matches?-.12:pivot.rotation.y+delta*.16;
      try{renderer.render(scene,camera);}catch{dispose();status('fallback');return;}
      if(!ready){ready=true;status('ready');}
      if(!reduced.matches&&Math.abs(delta)>.001)frame=requestAnimationFrame(draw);
    };
    const schedule=()=>{if(!dead&&!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw);};
    const update=(avatar:AvatarConfig)=>{
      if(dead)return;const version=++generation;ready=false;loadingModel=true;status('loading');
      void loadAvatarModel(T,avatar).then(next=>{if(dead||version!==generation||!active()){disposeAvatar(next);return;}if(person)disposeAvatar(person);person=next;pivot.add(person);loadingModel=false;source(next.userData.model||'procedural',!!next.userData.loadFallback);renderer.shadowMap.needsUpdate=true;schedule();}).catch(()=>{if(!dead&&version===generation)status('fallback');});
    };
    const resize=()=>{
      const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;
      if(renderer.domElement.width!==Math.round(width*renderer.getPixelRatio())||renderer.domElement.height!==Math.round(height*renderer.getPixelRatio()))renderer.setSize(width,height,false);
      const aspect=width/height,span=Math.max(1.39,.78/aspect);
      camera.left=-span*aspect;camera.right=span*aspect;camera.top=span;camera.bottom=-span;camera.updateProjectionMatrix();schedule();
    };
    const move=(event:PointerEvent)=>{if(reduced.matches||event.pointerType==='touch')return;const rect=host.getBoundingClientRect();target=-.12+((event.clientX-rect.left)/rect.width-.5)*.7;schedule();};
    const leave=()=>{target=-.12;schedule();};
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();};
    const lost=(event:Event)=>{event.preventDefault();dispose();status('fallback');};
    const resized=new ResizeObserver(resize);resized.observe(host);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'40px'});intersection.observe(host);
    host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',leave);renderer.domElement.addEventListener('webglcontextlost',lost);
    dispose=()=>{
      if(dead)return;dead=true;cancelAnimationFrame(frame);resized.disconnect();intersection.disconnect();
      host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',leave);renderer.domElement.removeEventListener('webglcontextlost',lost);
      if(person)disposeAvatar(person);resources.forEach(resource=>resource.dispose());key.shadow.map?.dispose();renderer.renderLists.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();scene.clear();
    };
    update(getAvatar());resize();return {update,dispose};
  }catch{
    dispose();if(person?.parent)disposeAvatar(person);resources.forEach(resource=>resource.dispose());renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove();status('fallback');return;
  }
}
