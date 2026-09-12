import {useEffect, useRef, useState} from 'react';
import './mini-world.css';

export type MiniWorldVariant = 'audience' | 'work' | 'materials';
export interface MiniWorldProps {
  variant: MiniWorldVariant;
  count?: number;
  label?: string;
  onActivate?: () => void;
}

const descriptions: Record<MiniWorldVariant, {title:string; singular:string; plural:string; empty:string; scene:string}> = {
  audience: {title:'Uma sala, diferentes perspectivas.', singular:'perfil', plural:'perfis', empty:'Sua próxima conversa começa aqui.', scene:'Diorama de cadeiras em roda com figuras de ensaio.'},
  work: {title:'Ideias ganham forma aqui.', singular:'versão', plural:'versões', empty:'Uma mesa para preparar o que importa.', scene:'Diorama de uma mesa de madeira com computador, luminária e cadernos.'},
  materials: {title:'O que sustenta sua conversa.', singular:'material', plural:'materiais', empty:'Guarde as referências que fazem diferença.', scene:'Diorama de uma biblioteca com estante, livros e pastas.'},
};

/** Decorative, pre-modelled surroundings. Counts are real; people are not portraits. */
export default function MiniWorld({variant, count=0, label, onActivate}:MiniWorldProps) {
  const hostRef=useRef<HTMLDivElement>(null);
  const [status,setStatus]=useState<'loading'|'ready'|'fallback'>('loading');
  const safeCount=Number.isFinite(count)?Math.max(0,Math.floor(count)):0;
  const visibleCount=Math.min(6,safeCount);
  const copy=descriptions[variant];

  useEffect(()=>{
    const host=hostRef.current;
    if(!host)return;
    let cancelled=false;
    let cleanup:(()=>void)|undefined;
    setStatus('loading');
    const fail=()=>{if(!cancelled)setStatus('fallback');};
    const ready=()=>{if(!cancelled)setStatus('ready');};
    createMiniScene(host,variant,visibleCount,()=>!cancelled,ready,fail)
      .then(dispose=>{
        if(cancelled){dispose?.();return;}
        cleanup=dispose;
      })
      .catch(fail);
    return ()=>{cancelled=true;cleanup?.();};
  },[variant,visibleCount]);

  return <figure className={`mini-world mini-world--${variant}`} data-renderer={status}>
    <div className="mini-world__copy">
      <span className="mini-world__eyebrow">Seu espaço · {variant==='audience'?'audiência':variant==='work'?'criação':'referências'}</span>
      <h2>{label||copy.title}</h2>
      <p>{safeCount>0?`${safeCount} ${safeCount===1?copy.singular:copy.plural} no seu espaço`:copy.empty}</p>
      {onActivate?<button type="button" className="mini-world__action" onClick={onActivate}>Explorar este espaço <span aria-hidden="true">↗</span></button>:null}
    </div>
    <div ref={hostRef} className="mini-world__scene" aria-hidden="true" />
    {status!=='ready'?<div className="mini-world__fallback" aria-hidden="true">
      <span className="mini-world__fallback-object">{variant==='audience'?'◯':variant==='work'?'▱':'▥'}</span>
      <span>{status==='loading'?'Preparando seu espaço…':'Seu conteúdo continua disponível abaixo.'}</span>
    </div>:null}
    <figcaption className="mini-world__sr-only">{copy.scene} Cenário ilustrativo, com até seis objetos representando a quantidade informada. {status==='fallback'?'Visualização 3D indisponível; todas as ações continuam disponíveis.':''}</figcaption>
  </figure>;
}

async function createMiniScene(host:HTMLElement,variant:MiniWorldVariant,count:number,isActive:()=>boolean,onReady:()=>void,onFailure:()=>void):Promise<(()=>void)|undefined> {
  // @ts-expect-error The MIT-licensed vendored Three module intentionally has no declarations.
  const T=await import('../../vendor/three/three.module.min.js');
  if(!isActive())return;
  let renderer:any;
  const scene=new T.Scene();
  const geometries=new Set<any>();
  const materials=new Set<any>();
  let dispose=()=>{};
  try {
    renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
    renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=T.SRGBColorSpace;
    renderer.toneMapping=T.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate=false;
    renderer.shadowMap.needsUpdate=true;
    renderer.domElement.setAttribute('aria-hidden','true');
    host.appendChild(renderer.domElement);

    const camera=new T.OrthographicCamera(-5,5,4,-4,.1,40);
    camera.position.set(6.2,6.6,9);
    camera.lookAt(0,1,0);
    const world=new T.Group();
    world.rotation.y=-.15;
    scene.add(world);
    scene.add(new T.HemisphereLight(0xffead1,0x2c2725,2.8));
    const key=new T.DirectionalLight(0xffdfb7,4);
    key.position.set(-3,8,5);key.castShadow=true;
    key.shadow.mapSize.set(512,512);
    Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:25});
    key.shadow.normalBias=.025;
    key.shadow.bias=-.0001;
    scene.add(key);
    const fill=new T.DirectionalLight(0xd2d3d6,1.9);fill.position.set(5,4,-3);scene.add(fill);
    const material=(color:number,roughness=.75,metalness=.06)=>{
      const value=new T.MeshStandardMaterial({color,roughness,metalness});materials.add(value);return value;
    };
    const palette={
      charcoal:material(0x272928,.58,.18),edge:material(0x4b4239,.45,.35),floor:material(0x877665),
      wood:material(0x9f714d),woodDark:material(0x624733),peach:material(0xc28c6c),ivory:material(0xe8dcca),
      paper:material(0xf0e8d9),brass:material(0xb19a72,.38,.65),leaves:material(0x738168),
      screen:material(0x8fa5a4,.3,.15),ink:material(0x3e403d),clay:material(0xb69474),
    };
    const obj=(geometry:any,mat:any,x=0,y=0,z=0,parent:any=world)=>{
      geometries.add(geometry);const mesh=new T.Mesh(geometry,mat);mesh.position.set(x,y,z);
      mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
    };
    const box=(w:number,h:number,d:number,mat:any,x=0,y=0,z=0,parent:any=world)=>obj(new T.BoxGeometry(w,h,d),mat,x,y,z,parent);
    const cylinder=(r:number,h:number,mat:any,x=0,y=0,z=0,parent:any=world)=>obj(new T.CylinderGeometry(r,r,h,40),mat,x,y,z,parent);
    const rounded=(w:number,h:number,d:number,r:number,mat:any,x=0,y=0,z=0,parent:any=world)=>{
      const shape=new T.Shape(),left=-w/2,bottom=-h/2;
      shape.moveTo(left+r,bottom);shape.lineTo(left+w-r,bottom);shape.quadraticCurveTo(left+w,bottom,left+w,bottom+r);
      shape.lineTo(left+w,bottom+h-r);shape.quadraticCurveTo(left+w,bottom+h,left+w-r,bottom+h);
      shape.lineTo(left+r,bottom+h);shape.quadraticCurveTo(left,bottom+h,left,bottom+h-r);shape.lineTo(left,bottom+r);shape.quadraticCurveTo(left,bottom,left+r,bottom);
      const geometry=new T.ExtrudeGeometry(shape,{depth:Math.max(.02,d-r),bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.35,bevelThickness:r*.5,curveSegments:5});
      geometry.center();return obj(geometry,mat,x,y,z,parent);
    };
    const sphere=(r:number,mat:any,x:number,y:number,z:number,parent:any=world)=>obj(new T.SphereGeometry(r,16,12),mat,x,y,z,parent);
    const plant=(x:number,z:number,scale=1)=>{
      const group=new T.Group();group.position.set(x,.25,z);group.scale.setScalar(scale);world.add(group);
      obj(new T.CylinderGeometry(.27,.2,.48,20),palette.ivory,0,.24,0,group);
      cylinder(.035,1.02,palette.woodDark,0,.9,0,group);
      [-1,1].forEach((side,index)=>{
        const leaf=sphere(.25,palette.leaves,side*.21,1.07+index*.24,0,group);leaf.scale.set(.6,1.8,.85);leaf.rotation.z=-side*.4;
      });
      const leaf=sphere(.2,palette.leaves,0,1.5,0,group);leaf.scale.set(.65,1.5,.8);
    };
    const chair=(x:number,z:number,rotation:number,occupied:boolean,index=0)=>{
      const group=new T.Group();group.position.set(x,.27,z);group.rotation.y=rotation;world.add(group);
      cylinder(.43,.11,palette.charcoal,0,.08,0,group);
      cylinder(.07,.48,palette.brass,0,.3,0,group);
      rounded(.82,.2,.78,.09,palette.peach,0,.62,0,group);
      rounded(.84,.87,.15,.1,palette.peach,0,1.02,-.36,group);
      [-1,1].forEach(side=>rounded(.14,.26,.74,.06,palette.woodDark,side*.43,.82,0,group));
      if(occupied){
        const shirt=index%2===0?palette.ivory:palette.ink;
        rounded(.51,.62,.31,.08,shirt,0,1.1,0,group);
        sphere(.23,palette.clay,0,1.62,0,group);
        [-1,1].forEach(side=>{
          rounded(.13,.49,.15,.05,shirt,side*.33,1.08,.09,group);
          box(.16,.34,.19,palette.charcoal,side*.17,.49,.26,group);
          rounded(.18,.11,.31,.04,palette.charcoal,side*.17,.29,.32,group);
        });
      }
    };
    // Three layered bevels give each small set the same grounded island silhouette.
    cylinder(3.02,.16,palette.charcoal,0,.02,0);
    cylinder(2.95,.075,palette.brass,0,.13,0);
    cylinder(2.95,.16,palette.edge,0,.235,0);
    cylinder(2.83,.045,palette.floor,0,.332,0);

    if(variant==='audience'){
      const seats=Math.max(3,count);
      for(let i=0;i<seats;i++){
        const angle=-Math.PI*.83+i*(Math.PI*1.65/Math.max(1,seats-1));
        const x=Math.sin(angle)*1.88,z=Math.cos(angle)*1.88;
        chair(x,z,Math.atan2(-x,-z),i<count,i);
      }
      cylinder(.78,.1,palette.ivory,0,.95,0);
      cylinder(.14,.6,palette.woodDark,0,.63,0);
      cylinder(.42,.08,palette.woodDark,0,.38,0);
      box(.38,.035,.28,palette.peach,-.13,1.02,.07);
      cylinder(.095,.16,palette.paper,.25,1.08,-.15);
      plant(-2,-1.5,.78);
    } else if(variant==='work'){
      const desk=new T.Group();desk.rotation.y=-.18;world.add(desk);
      rounded(3.6,.19,1.65,.1,palette.wood,0,1.42,-.1,desk);
      [-1,1].forEach(side=>{
        box(.18,1.02,1.35,palette.woodDark,side*1.45,.86,-.1,desk);
        box(.28,.08,1.52,palette.brass,side*1.45,.39,-.1,desk);
      });
      rounded(1.08,.07,.72,.04,palette.charcoal,.15,1.57,-.14,desk);
      const monitor=rounded(1.04,.73,.06,.05,palette.charcoal,.15,1.91,-.48,desk);monitor.rotation.x=-.15;
      const glass=box(.91,.6,.012,palette.screen,.15,1.92,-.428,desk);glass.rotation.x=-.15;
      box(.14,.015,.12,palette.brass,.15,1.612,.05,desk);
      cylinder(.25,.07,palette.brass,-1.25,1.56,-.42,desk);
      cylinder(.035,.91,palette.brass,-1.25,2.01,-.42,desk);
      const shade=obj(new T.ConeGeometry(.29,.36,24,1,true),palette.ivory,-1.08,2.38,-.35,desk);shade.rotation.z=-.32;
      obj(new T.SphereGeometry(.085,12,8),palette.paper,-1.02,2.24,-.35,desk);
      const notebooks=Math.max(1,count);
      for(let i=0;i<notebooks;i++){
        const note=rounded(.69,.065,.54,.02,i%2===0?palette.peach:palette.ivory,1.09,1.58+i*.075,.03,desk);note.rotation.y=i*.07;
      }
      cylinder(.12,.24,palette.paper,-.7,1.7,.21,desk);
      chair(0,1.45,Math.PI,false);
      plant(2.03,-1.1,1.1);
    } else {
      const shelf=new T.Group();shelf.rotation.y=-.23;shelf.position.z=-.45;world.add(shelf);
      rounded(3.3,2.56,.16,.08,palette.woodDark,0,1.67,-.43,shelf);
      [-1,1].forEach(side=>rounded(.18,2.8,.8,.06,palette.wood,side*1.65,1.77,-.1,shelf));
      [.46,1.37,2.28,3.08].forEach(y=>rounded(3.55,.12,.84,.04,palette.wood,0,y,-.1,shelf));
      const colors=[palette.peach,palette.ivory,palette.ink,palette.leaves,palette.woodDark,palette.paper];
      for(let i=0;i<count;i++){
        const row=i<3?0:1,slot=i%3;
        const width=.28+(i%2)*.08,height=.62+(i%3)*.05;
        const x=-1.18+slot*.45,y=.52+row*.91;
        rounded(width,height,.47,.025,colors[i],x,y+height/2,-.1,shelf);
        box(width*.68,.045,.014,palette.brass,x,y+.16,.152,shelf);
      }
      // Small sculptural bookends remain when the library has no saved documents.
      sphere(.23,palette.ivory,.87,2.57,-.08,shelf);
      cylinder(.18,.14,palette.brass,.87,2.36,-.08,shelf);
      rounded(.75,.4,.51,.035,palette.charcoal,1.01,.73,-.08,shelf);
      box(.24,.08,.016,palette.brass,1.01,.75,.185,shelf);
      const bench=rounded(1.8,.16,.67,.07,palette.peach,.22,.92,1.49);bench.rotation.y=-.2;
      [-.55,.7].forEach(x=>box(.12,.45,.45,palette.woodDark,x,.61,1.49));
      plant(-2.06,.5,1.02);
    }

    // Fit the audience to its actual projected silhouette, leaving room for the small pointer tilt.
    let audienceFrame:{x:number;y:number;halfWidth:number;halfHeight:number}|undefined;
    if(variant==='audience'){
      world.updateMatrixWorld(true);camera.updateMatrixWorld(true);
      const bounds=new T.Box3(),point=new T.Vector3();
      world.traverse((mesh:any)=>{
        const positions=mesh.geometry?.attributes.position;
        if(!positions)return;
        const matrix=new T.Matrix4().multiplyMatrices(camera.matrixWorldInverse,mesh.matrixWorld);
        for(let i=0;i<positions.count;i++)bounds.expandByPoint(point.fromBufferAttribute(positions,i).applyMatrix4(matrix));
      });
      const center=bounds.getCenter(new T.Vector3()),size=bounds.getSize(new T.Vector3());
      audienceFrame={x:center.x,y:center.y,halfWidth:size.x/2,halfHeight:size.y/2};
    }

    let frame=0,visible=true,dead=false,rendered=false;
    let targetX=0,targetY=-.15;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const draw=()=>{
      frame=0;
      if(dead||!visible||document.hidden)return;
      const dx=targetX-world.rotation.x,dy=targetY-world.rotation.y;
      if(reduced.matches){world.rotation.set(0,-.15,0);}
      else{world.rotation.x+=dx*.15;world.rotation.y+=dy*.15;}
      try{renderer.render(scene,camera);}
      catch{dispose();onFailure();return;}
      if(!rendered){rendered=true;onReady();}
      if(!reduced.matches&&(Math.abs(dx)>.001||Math.abs(dy)>.001))frame=requestAnimationFrame(draw);
    };
    const schedule=()=>{if(!frame&&!dead&&visible&&!document.hidden)frame=requestAnimationFrame(draw);};
    const resize=()=>{
      const width=host.clientWidth,height=host.clientHeight;
      if(!width||!height)return;
      renderer.setSize(width,height,false);
      const aspect=width/height;
      const span=audienceFrame?Math.max(audienceFrame.halfHeight,audienceFrame.halfWidth/aspect)*1.18:aspect<1.25?4.1:3.8;
      const centerX=audienceFrame?.x??0,centerY=audienceFrame?.y??0;
      camera.left=centerX-span*aspect;camera.right=centerX+span*aspect;camera.top=centerY+span;camera.bottom=centerY-span;
      camera.updateProjectionMatrix();schedule();
    };
    const pointer=(event:PointerEvent)=>{
      if(reduced.matches||event.pointerType==='touch')return;
      const bounds=host.getBoundingClientRect();
      targetY=-.15+((event.clientX-bounds.left)/bounds.width-.5)*.3;
      targetX=((event.clientY-bounds.top)/bounds.height-.5)*.065;
      schedule();
    };
    const leave=()=>{targetX=0;targetY=-.15;schedule();};
    // A foregrounded WebGL canvas may need repainting even when its scene did not change.
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();};
    const lost=(event:Event)=>{event.preventDefault();dispose();onFailure();};
    const resized=new ResizeObserver(resize);resized.observe(host);
    const intersection=new IntersectionObserver(entries=>{
      visible=entries[0]?.isIntersecting??true;
      if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}
    },{rootMargin:'50px'});intersection.observe(host);
    host.addEventListener('pointermove',pointer,{passive:true});host.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);
    reduced.addEventListener('change',leave);
    renderer.domElement.addEventListener('webglcontextlost',lost);
    dispose=()=>{
      if(dead)return;dead=true;cancelAnimationFrame(frame);
      resized.disconnect();intersection.disconnect();
      host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',leave);
      document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',leave);
      renderer.domElement.removeEventListener('webglcontextlost',lost);
      geometries.forEach(geometry=>geometry.dispose());materials.forEach(mat=>mat.dispose());
      key.shadow.map?.dispose();renderer.renderLists.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();scene.clear();
    };
    resize();
    return dispose;
  }catch{
    dispose();
    geometries.forEach(geometry=>geometry.dispose());materials.forEach(mat=>mat.dispose());
    renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove();
    onFailure();return;
  }
}
