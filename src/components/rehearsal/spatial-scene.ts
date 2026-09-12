import type {StagePerson} from './SpatialStage';

export interface StageController {focus:(id?:string)=>void;setView:(mode:'overview'|'focus')=>void;dispose:()=>void;avatarSource?:string;avatarFallback?:boolean}
export type PresenterFactory=(three:any)=>any;

function disposeObjectResources(root:any){
  const geometries=new Set<any>(),materials=new Set<any>(),textures=new Set<any>();
  root?.traverse((object:any)=>{
    if(object.geometry)geometries.add(object.geometry);
    for(const material of object.material?(Array.isArray(object.material)?object.material:[object.material]):[]){
      materials.add(material);
      for(const value of Object.values(material))if(value&&typeof value==='object'&&(value as {isTexture?:boolean}).isTexture)textures.add(value);
    }
  });
  textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());
}

/** Three r180 is vendored with its MIT license; no remote network dependency. */
export async function createSpatialScene(host:HTMLElement,people:StagePerson[],onFailure:()=>void,presenterFactory?:PresenterFactory,signal?:AbortSignal):Promise<StageController>{
  // @ts-expect-error Vendored upstream JavaScript deliberately has no generated declarations.
  const T=await import('../../vendor/three/three.module.min.js');
  if(signal?.aborted)throw new DOMException('Scene cancelled','AbortError');
  // Resolve assets before allocating a renderer; failed/late loads cannot leave a canvas behind.
  const presenterModel=presenterFactory?await presenterFactory(T):undefined;
  if(signal?.aborted){disposeObjectResources(presenterModel);throw new DOMException('Scene cancelled','AbortError');}
  // Dynamic, isolated renderer keeps the rest of the application independent of WebGL.
  let renderer:any;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}
  catch(error){disposeObjectResources(presenterModel);throw error;}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;
  renderer.shadowMap.needsUpdate=true;
  host.appendChild(renderer.domElement);
  const scene=new T.Scene();
  const camera=new T.OrthographicCamera(-7,7,6,-6,.1,70);
  const target=new T.Vector3(0,.9,0);
  const desiredTarget=target.clone();
  const cameraPos=new T.Vector3(5.4,6.1,11.8);
  const desiredCamera=cameraPos.clone();
  const graph=new T.Group();
  scene.add(graph);
  scene.add(new T.HemisphereLight(0xf3e6d3,0x292727,2.3));
  const key=new T.DirectionalLight(0xffddb3,3.2);
  key.position.set(-5,9,4);key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.5,far:30});
  key.shadow.normalBias=.035;key.shadow.bias=-.00015;
  key.shadow.radius=4;
  scene.add(key);
  const rim=new T.DirectionalLight(0xf1c49e,2.2);rim.position.set(3,5,-5);scene.add(rim);
  const fill=new T.DirectionalLight(0xbabfc7,1.4);fill.position.set(7,3,6);scene.add(fill);
  const mats={
    body:new T.MeshStandardMaterial({color:0x393735,roughness:.6,metalness:.25}),
    stone:new T.MeshStandardMaterial({color:0x6e665c,roughness:.74,metalness:.08}),
    floor:new T.MeshStandardMaterial({color:0x494440,roughness:.48,metalness:.22}),
    edge:new T.MeshStandardMaterial({color:0x191b1d,roughness:.44,metalness:.45}),
    warm:new T.MeshStandardMaterial({color:0xb08358,roughness:.56,metalness:.25}),
    metal:new T.MeshStandardMaterial({color:0xa29582,roughness:.38,metalness:.6}),
    cloth:new T.MeshStandardMaterial({color:0x927565,roughness:.96}),
    light:new T.MeshBasicMaterial({color:0xe7b38b}),
    warmLight:new T.MeshBasicMaterial({color:0xf1c99d}),
    leaves:new T.MeshStandardMaterial({color:0x536247,roughness:.7}),
  };
  // Subtle deterministic grain gives materials scale without downloading texture packs.
  const grainCanvas=document.createElement('canvas');grainCanvas.width=grainCanvas.height=128;
  const grainContext=grainCanvas.getContext('2d')!;const grainPixels=grainContext.createImageData(128,128);
  let grainSeed=4173;
  for(let p=0;p<grainPixels.data.length;p+=4){grainSeed=(grainSeed*1664525+1013904223)>>>0;const value=218+(grainSeed%30);grainPixels.data[p]=grainPixels.data[p+1]=grainPixels.data[p+2]=value;grainPixels.data[p+3]=255;}
  grainContext.putImageData(grainPixels,0,0);
  const grain=new T.CanvasTexture(grainCanvas);grain.wrapS=grain.wrapT=T.RepeatWrapping;grain.repeat.set(7,7);grain.colorSpace=T.SRGBColorSpace;
  mats.floor.map=grain;mats.stone.map=grain;mats.cloth.map=grain;
  function mesh(geometry:any,material:any,x=0,y=0,z=0,parent:any=graph){
    const object=new T.Mesh(geometry,material);object.position.set(x,y,z);object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;
  }
  function box(w:number,h:number,d:number,material:any,x:number,y:number,z:number,parent:any=graph){return mesh(new T.BoxGeometry(w,h,d),material,x,y,z,parent);}
  function roundBox(w:number,h:number,d:number,r:number,material:any,x:number,y:number,z:number,parent:any=graph){
    const shape=new T.Shape();const l=-w/2,b=-h/2;
    shape.moveTo(l+r,b);shape.lineTo(l+w-r,b);shape.quadraticCurveTo(l+w,b,l+w,b+r);
    shape.lineTo(l+w,b+h-r);shape.quadraticCurveTo(l+w,b+h,l+w-r,b+h);
    shape.lineTo(l+r,b+h);shape.quadraticCurveTo(l,b+h,l,b+h-r);shape.lineTo(l,b+r);shape.quadraticCurveTo(l,b,l+r,b);
    const geo=new T.ExtrudeGeometry(shape,{depth:Math.max(.02,d-2*r),bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:r*.55,bevelThickness:r,curveSegments:6});
    geo.center();return mesh(geo,material,x,y,z,parent);
  }
  function ring(radius:number,tube:number,material:any,y:number,parent:any=graph){const m=mesh(new T.TorusGeometry(radius,tube,8,100),material,0,y,0,parent);m.rotation.x=Math.PI/2;return m;}
  function shadow(x:number,z:number,sx:number,sz:number,parent:any=graph){
    const canvas=document.createElement('canvas');canvas.width=canvas.height=64;
    const c=canvas.getContext('2d')!;const gradient=c.createRadialGradient(32,32,0,32,32,32);gradient.addColorStop(0,'rgba(0,0,0,.65)');gradient.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gradient;c.fillRect(0,0,64,64);
    const mat=new T.MeshBasicMaterial({map:new T.CanvasTexture(canvas),transparent:true,depthWrite:false});
    const obj=mesh(new T.PlaneGeometry(sx,sz),mat,x,.314,z,parent);obj.rotation.x=-Math.PI/2;obj.castShadow=false;obj.renderOrder=1;
  }
  // Suspended architectural island: three distinct bevels, embedded lighting, inset stage.
  mesh(new T.CylinderGeometry(4.85,4.7,.2,96),mats.edge,0,-.13,0);
  mesh(new T.CylinderGeometry(4.72,4.83,.13,96),mats.metal,0,.015,0);
  mesh(new T.CylinderGeometry(4.72,4.72,.23,96),mats.body,0,.17,0);
  mesh(new T.CylinderGeometry(4.55,4.55,.035,96),mats.floor,0,.302,0);
  ring(4.69,.018,mats.light,.245);
  ring(4.35,.015,mats.warm,.326);
  // Floor inlays use real geometry, not a screen-space grid.
  for(let i=0;i<7;i++){const angle=i*Math.PI/3.5;const line=box(.018,.007,1.1,mats.metal,Math.sin(angle)*3.7,.33,Math.cos(angle)*3.7);line.rotation.y=angle;}
  const stage=new T.Group();stage.position.set(0,.33,-1.15);graph.add(stage);
  const podium=mesh(new T.CylinderGeometry(1.95,2.05,.2,80),mats.edge,0,.04,0,stage);podium.scale.z=.77;
  const top=mesh(new T.CylinderGeometry(1.96,1.96,.06,80),mats.stone,0,.17,0,stage);top.scale.z=.77;
  const stageRing=ring(1.99,.018,mats.warmLight,.125,stage);stageRing.scale.y=.77;
  // Curved acoustic shell: warm solid material rather than a neon wireframe.
  const wallMat=new T.MeshStandardMaterial({color:0x403b36,roughness:.82,metalness:.12,side:T.DoubleSide});
  mesh(new T.CylinderGeometry(4.15,4.15,3.4,80,1,true,Math.PI*.58,Math.PI*.84),wallMat,0,2.03,0);
  // Architectural shell is open towards the camera; acoustic fins create a silhouette.
  for(let i=0;i<25;i++){
    const angle=Math.PI*.62+i*Math.PI*.76/24;
    const x=Math.sin(angle)*4.03,z=Math.cos(angle)*4.03;
    const height=2.5+.65*Math.sin(i*Math.PI/24);
    const fin=roundBox(.125,height,.22,.04,i%4===0?mats.warm:mats.body,x,height/2+.32,z);fin.rotation.y=angle;
  }
  // Two slim side pylons with luminous interior faces.
  [-1,1].forEach(side=>{
    roundBox(.3,3.6,.4,.07,mats.edge,side*3.2,2.1,-1.95);
    box(.055,2.9,.05,mats.light,side*3.2,2.13,-1.7);
    roundBox(.55,.13,.7,.07,mats.metal,side*3.2,.39,-1.95);
  });
  // Wide illuminated backdrop. Canvas texture is deterministic and contains no user secrets.
  roundBox(4.55,2.22,.2,.12,mats.edge,0,2.82,-3.05);
  roundBox(4.34,2.02,.06,.09,mats.metal,0,2.82,-2.92);
  const screenCanvas=document.createElement('canvas');screenCanvas.width=1024;screenCanvas.height=512;
  const ctx=screenCanvas.getContext('2d')!;
  const grad=ctx.createLinearGradient(0,0,1024,512);grad.addColorStop(0,'#dfd3be');grad.addColorStop(.6,'#c9bda7');grad.addColorStop(1,'#ac9b85');ctx.fillStyle=grad;ctx.fillRect(0,0,1024,512);
  ctx.strokeStyle='rgba(96,77,60,.10)';ctx.lineWidth=2;
  for(let i=0;i<6;i++){ctx.beginPath();ctx.arc(780,255,80+i*35,-Math.PI*.85,Math.PI*.85);ctx.stroke();}
  ctx.fillStyle='#3e3832';ctx.font='500 118px sans-serif';ctx.fillText('Seu ensaio.',70,285);
  const screenTex=new T.CanvasTexture(screenCanvas);screenTex.colorSpace=T.SRGBColorSpace;
  const screen=mesh(new T.PlaneGeometry(4.1,1.82),new T.MeshBasicMaterial({map:screenTex}),0,2.82,-2.80);screen.castShadow=false;
  // A track of warm architectural pendants, above the presentation area.
  [-1.5,0,1.5].forEach(x=>{
    box(.018,.95,.018,mats.metal,x,4.35,-1.7);
    const shade=mesh(new T.CylinderGeometry(.25,.34,.13,32),mats.edge,x,3.84,-1.7);
    mesh(new T.CylinderGeometry(.27,.27,.025,32),mats.warmLight,x,3.76,-1.7);
    shade.castShadow=false;
  });
  function avatar(parent:any,coat:number,skin:number,seated:boolean,variant:number){
    const jacket=new T.MeshStandardMaterial({color:coat,roughness:.85});
    const skinMat=new T.MeshStandardMaterial({color:skin,roughness:.85});
    const hair=new T.MeshStandardMaterial({color:variant===2?0xb5a99c:variant===1?0x372422:0x18272b,roughness:.95});
    const torsoY=seated?.93:1.08,headY=seated?1.53:1.8;
    roundBox(.56,.65,.32,.11,jacket,0,torsoY,0,parent);
    mesh(new T.CylinderGeometry(.105,.115,.14,12),skinMat,0,headY-.28,0,parent);
    const head=mesh(new T.SphereGeometry(.235,24,20),skinMat,0,headY,.015,parent);head.scale.set(.88,1.08,.94);
    const cap=mesh(new T.SphereGeometry(.238,24,12,0,Math.PI*2,0,Math.PI*.48),hair,0,headY+.06,0,parent);cap.scale.set(.91,1,.96);
    mesh(new T.SphereGeometry(.045,10,10),skinMat,0,headY-.015,.21,parent);
    if(variant===1){const bun=mesh(new T.SphereGeometry(.13,16,12),hair,0,headY+.13,-.2,parent);bun.scale.y=1.15;}
    if(variant===2){[-.09,.09].forEach(x=>{const glass=mesh(new T.TorusGeometry(.065,.012,6,18),mats.metal,x,headY+.04,.214,parent);glass.scale.y=.8;});}
    const legMat=new T.MeshStandardMaterial({color:0x142329,roughness:.86});
    const gesture=new T.Group();parent.add(gesture);
    [-1,1].forEach(side=>{
      const leg=roundBox(.18,seated?.45:.62,.2,.065,legMat,side*.15,seated?.45:.43,seated?.18:0,parent);
      if(seated)leg.rotation.x=-.25;
      roundBox(.23,.12,.37,.06,mats.edge,side*.15,.1,seated?.34:.09,parent);
      const limbParent=side===1?gesture:parent;
      const arm=mesh(new T.CapsuleGeometry(.09,.43,4,10),jacket,side*.34,torsoY+.015,.015,limbParent);arm.rotation.z=side*.17;
      mesh(new T.SphereGeometry(.09,12,10),skinMat,side*.385,torsoY-.28,.04,limbParent);
    });
    if(!seated){box(.15,.24,.025,mats.warmLight,.03,1.14,.195,parent);}
    return gesture;
  }
  // Presenter and lectern, human-scale props instead of generic floating nodes.
  const presenter=new T.Group();presenter.position.set(-.5,.52,-.95);presenter.rotation.y=.15;graph.add(presenter);
  let presenterGesture:any;
  if(presenterFactory){
    // Normalize the profile avatar to the same stage scale, with its feet on the podium.
    const model=presenterModel;
    // Fit a wrapper so transforms/orientation applied by the GLB loader stay intact.
    const fitted=new T.Group();fitted.add(model);
    const bounds=new T.Box3().setFromObject(fitted);
    const size=bounds.getSize(new T.Vector3());
    const center=bounds.getCenter(new T.Vector3());
    const scale=2.08/Math.max(.01,size.y);
    fitted.scale.setScalar(scale);
    fitted.position.set(-center.x*scale,-bounds.min.y*scale,-center.z*scale);
    presenterGesture=new T.Group();presenterGesture.add(fitted);presenter.add(presenterGesture);
  }else{
    presenterGesture=avatar(presenter,0xd1bca1,0xba8263,false,0);
  }
  const lectern=new T.Group();lectern.position.set(.75,.52,-.78);graph.add(lectern);
  roundBox(.15,1.05,.17,.04,mats.metal,0,.53,0,lectern);
  roundBox(.7,.07,.47,.06,mats.body,0,1.08,0,lectern).rotation.x=.12;
  roundBox(.52,.05,.32,.02,mats.edge,0,1.15,0,lectern);
  const laptop=box(.5,.3,.025,mats.edge,0,1.31,-.1,lectern);laptop.rotation.x=-.2;
  mesh(new T.PlaneGeometry(.43,.24),new T.MeshBasicMaterial({color:0x7ca599}),0,1.32,-.077,lectern).rotation.x=-.2;
  const positions=[[-2.1,1.55],[0,2.55],[2.1,1.55]];
  const audienceObjects:{id:string;group:any;halo:any;light:any;position:any}[]=[];
  positions.forEach(([x,z],index)=>{
    const group=new T.Group();group.position.set(x,.33,z);group.rotation.y=Math.PI+(index-1)*.43;graph.add(group);
    shadow(x,z,1.65,1.4);
    roundBox(.85,.28,.84,.13,mats.cloth,0,.61,0,group);
    roundBox(.85,.9,.24,.14,mats.cloth,0,1.02,-.35,group);
    [-1,1].forEach(side=>{roundBox(.17,.46,.78,.08,mats.body,side*.48,.83,-.015,group);box(.055,.45,.055,mats.metal,side*.35,.26,.28,group);box(.055,.45,.055,mats.metal,side*.35,.26,-.28,group);});
    const haloMat=new T.MeshBasicMaterial({color:0xe8ad89,transparent:true,opacity:.10});
    const halo=ring(.72,.014,haloMat,.345);halo.position.x=x;halo.position.z=z;
    if(people[index]){
      avatar(group,[0x718880,0xa07765,0x657f99][index],[0xbb866c,0x835643,0xd9b497][index],true,index);
      const point=new T.PointLight(0xeec6a4,0,2.5);point.position.set(x,1.1,z+.5);scene.add(point);
      audienceObjects.push({id:people[index].id,group,halo,light:point,position:new T.Vector3(x,.9,z)});
    }
  });
  // Sculptural planting softens the space without making it a generic office.
  [-1,1].forEach(side=>{
    const x=side*3.6,z=-.6;
    mesh(new T.CylinderGeometry(.34,.24,.6,32),mats.stone,x,.61,z);
    for(let i=0;i<7;i++){
      const angle=i*2.4,leaf=mesh(new T.SphereGeometry(.12,12,10),mats.leaves,x+Math.sin(angle)*.22,1.1+i*.085,z+Math.cos(angle)*.16);
      leaf.scale.set(.65,3.4,1.5);leaf.rotation.z=Math.sin(angle)*.52;leaf.rotation.x=Math.cos(angle)*.4;
      const stem=mesh(new T.CylinderGeometry(.015,.018,.65,6),mats.leaves,x,.95,z);stem.rotation.z=Math.sin(angle)*.3;
    }
  });
  shadow(0,0,12,12);
  let disposed=false,frame=0,visible=true,lastTime=0,mode:'overview'|'focus'='overview';
  let focusId:string|undefined;
  function frameCamera(){
    const aspect=Math.max(.2,host.clientWidth/Math.max(host.clientHeight,1));
    const span=aspect<1?6.8:5.85;
    camera.left=-span*aspect;camera.right=span*aspect;camera.top=span;camera.bottom=-span;
    if(aspect<.85){camera.left=-5.6;camera.right=5.6;camera.top=5.6/aspect;camera.bottom=-5.6/aspect;}
    camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);
    renderer.render(scene,camera);
  }
  function updateCamera(){
    const selected=audienceObjects.find(p=>p.id===focusId);
    if(mode==='focus'&&selected){desiredTarget.copy(selected.position).lerp(new T.Vector3(0,1,-.7),.4);desiredCamera.set(6.1,5.8,8.8);}
    else if(mode==='focus'){desiredTarget.set(0,1.4,-.8);desiredCamera.set(6.1,5.8,8.8);}
    else{desiredTarget.set(0,.9,0);desiredCamera.set(5.4,6.1,11.8);}
    camera.zoom=mode==='focus'?1.23:1.1;camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(frameCamera);observer.observe(host);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;});intersection.observe(host);
  const loss=(e:Event)=>{e.preventDefault();onFailure();};renderer.domElement.addEventListener('webglcontextlost',loss);
  const temp=new T.Vector3();
  function render(time:number){
    if(disposed)return;
    frame=requestAnimationFrame(render);
    if(!visible||document.hidden||time-lastTime<32)return;
    lastTime=time;
    const speed=reduced.matches?1:.085;
    if(presenterFactory)presenterGesture.rotation.y=reduced.matches?0:Math.sin(time*.0011)*.025;
    else presenterGesture.rotation.x=reduced.matches?0:Math.sin(time*.0011)*.055-.08;
    cameraPos.lerp(desiredCamera,speed);target.lerp(desiredTarget,speed);
    temp.copy(cameraPos);
    if(!reduced.matches){temp.x+=Math.sin(time*.00016)*.045;temp.y+=Math.cos(time*.00019)*.025;}
    camera.position.copy(temp);camera.lookAt(target);renderer.render(scene,camera);
  }
  camera.position.copy(cameraPos);camera.lookAt(target);frameCamera();frame=requestAnimationFrame(render);
  return {
    avatarSource:presenterModel?.userData?.model??'procedural',
    avatarFallback:Boolean(presenterModel?.userData?.loadFallback),
    focus(id){focusId=id;audienceObjects.forEach(p=>{const active=p.id===id;p.halo.material.opacity=active?.95:.14;p.light.intensity=active?1.3:0;});updateCamera();},
    setView(next){mode=next;updateCamera();},
    dispose(){
      if(disposed)return;disposed=true;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();renderer.domElement.removeEventListener('webglcontextlost',loss);
      disposeObjectResources(scene);renderer.dispose();renderer.domElement.remove();
    }
  };
}
