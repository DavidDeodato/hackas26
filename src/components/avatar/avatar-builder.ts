import {defaultAvatar,type AvatarConfig} from '../../../shared/auth';

const validColor=(value:string|undefined,fallback:string)=>/^#[\da-f]{6}$/i.test(value??'')?value!:fallback;

/** Local modular avatar. Feet sit at y=0; front is +Z; height is approximately 2.45 units. */
export function createAvatar(T:any,avatar:AvatarConfig=defaultAvatar):any {
  const config={...defaultAvatar,...avatar};
  const feminine=config.template==='feminine';
  const root=new T.Group();root.name='avatar';
  root.userData={height:2.45,forward:'+Z'};
  const mat=(color:string,roughness=.78)=>new T.MeshStandardMaterial({color,roughness,metalness:.025});
  const skin=mat(validColor(config.skinColor,defaultAvatar.skinColor));
  const hair=mat(validColor(config.hairColor,defaultAvatar.hairColor),.88);
  const top=mat(validColor(config.topColor,defaultAvatar.topColor));
  const pants=mat(validColor(config.pantsColor,defaultAvatar.pantsColor));
  const shoes=mat(validColor(config.shoesColor,defaultAvatar.shoesColor));
  const sole=mat('#e8dfce'),face=mat('#392c29');
  const mesh=(name:string,geometry:any,material:any,x:number,y:number,z:number,parent=root)=>{
    const item=new T.Mesh(geometry,material);item.name=name;item.position.set(x,y,z);
    item.castShadow=true;item.receiveShadow=true;parent.add(item);return item;
  };
  const ball=(name:string,r:number,material:any,x:number,y:number,z:number,parent=root)=>mesh(name,new T.SphereGeometry(r,16,12),material,x,y,z,parent);
  const capsule=(name:string,r:number,length:number,material:any,x:number,y:number,z:number,parent=root)=>mesh(name,new T.CapsuleGeometry(r,length,4,12),material,x,y,z,parent);
  const roundBox=(name:string,w:number,h:number,d:number,r:number,material:any,x:number,y:number,z:number,parent=root)=>{
    const shape=new T.Shape(),l=-w/2,b=-h/2;
    shape.moveTo(l+r,b);shape.lineTo(l+w-r,b);shape.quadraticCurveTo(l+w,b,l+w,b+r);
    shape.lineTo(l+w,b+h-r);shape.quadraticCurveTo(l+w,b+h,l+w-r,b+h);
    shape.lineTo(l+r,b+h);shape.quadraticCurveTo(l,b+h,l,b+h-r);shape.lineTo(l,b+r);shape.quadraticCurveTo(l,b,l+r,b);
    const geometry=new T.ExtrudeGeometry(shape,{depth:d-r*.35,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.22,bevelThickness:r*.18,curveSegments:4});
    geometry.center();return mesh(name,geometry,material,x,y,z,parent);
  };

  // Templates vary the silhouette only; every color and hairstyle remains independently editable.
  const shoulder=feminine?.30:.34,hip=feminine?.153:.16;
  const torso=mesh('avatar.top',new T.CylinderGeometry(shoulder,feminine?.235:.29,.66,12),top,0,1.30,0);
  torso.scale.z=.68;
  const waist=mesh('avatar.waist',new T.CylinderGeometry(feminine?.245:.28,.25,.16,12),pants,0,.935,0);waist.scale.z=.7;
  mesh('avatar.neck',new T.CylinderGeometry(.105,.115,.20,12),skin,0,1.695,0);
  const collar=mesh('avatar.collar',new T.TorusGeometry(.115,.025,6,18),top,0,1.625,0);collar.rotation.x=Math.PI/2;
  for(const side of [-1,1]){
    const name=side<0?'left':'right';
    const leg=capsule(`avatar.${name}Leg`,.113,.56,pants,side*hip,.53,0);leg.scale.z=.9;
    roundBox(`avatar.${name}Sole`,.25,.05,.42,.028,sole,side*hip,.03,.08);
    roundBox(`avatar.${name}Shoe`,.245,.14,.39,.06,shoes,side*hip,.112,.084);
    for(const z of [.045,.10,.155])roundBox(`avatar.${name}Lace`,.13,.012,.013,.004,sole,side*hip,.189,z);
    const arm=new T.Group();arm.name=`avatar.${name}Arm`;arm.position.set(side*(shoulder+.048),1.46,0);arm.rotation.z=side*.095;root.add(arm);
    capsule(`${name}.sleeve`,.111,.19,top,0,-.065,0,arm);
    capsule(`${name}.forearm`,.077,.23,skin,0,-.35,.005,arm);
    const hand=ball(`${name}.hand`,.09,skin,0,-.555,.015,arm);hand.scale.set(.85,1.12,.8);
  }

  const head=new T.Group();head.name='avatar.head';head.position.set(0,2.01,0);root.add(head);
  const skull=ball('avatar.face',.30,skin,0,0,0,head);skull.scale.set(.95,1.06,.91);
  for(const side of [-1,1]){
    const ear=ball('avatar.ear',.049,skin,side*.283,-.005,0,head);ear.scale.set(.6,1,.72);
    ball('avatar.eye',.018,face,side*.091,.025,.262,head);
    const brow=roundBox('avatar.brow',.065,.014,.018,.006,hair,side*.091,.091,.257,head);brow.rotation.z=side*-.075;
  }
  const nose=ball('avatar.nose',.039,skin,0,-.038,.278,head);nose.scale.set(.7,.95,1);
  const smile=new T.QuadraticBezierCurve3(new T.Vector3(-.051,-.11,.254),new T.Vector3(0,-.134,.263),new T.Vector3(.051,-.11,.254));
  mesh('avatar.smile',new T.TubeGeometry(smile,10,.006,5,false),face,0,0,0,head);

  const hairGroup=new T.Group();hairGroup.name='avatar.hair';head.add(hairGroup);
  const style=['short','long','curly','bald'].includes(config.hairStyle)?config.hairStyle:'short';
  if(style!=='bald'){
    const cap=mesh('hair.cap',new T.SphereGeometry(.318,16,10,0,Math.PI*2,0,1.20),hair,0,.015,-.012,hairGroup);cap.scale.set(.98,1.06,.97);
    if(style==='long'){
      roundBox('hair.back',.57,.68,.235,.115,hair,0,-.15,-.172,hairGroup);
      for(const side of [-1,1]){const lock=capsule('hair.lock',.084,.36,hair,side*.263,-.096,-.015,hairGroup);lock.rotation.z=side*-.06;}
    }else if(style==='curly'){
      for(let i=0;i<9;i++){
        const angle=i/9*Math.PI*2;
        const curl=mesh('hair.curl',new T.IcosahedronGeometry(.119,1),hair,Math.cos(angle)*.225,.185+Math.sin(i*1.7)*.022,Math.sin(angle)*.207-.015,hairGroup);
        curl.rotation.set(i*.2,i*.4,i*.1);
      }
      ball('hair.crown',.15,hair,0,.292,-.018,hairGroup);
    }else{
      for(let i=0;i<3;i++){
        const tuft=ball('hair.sweep',.115,hair,-.145+i*.11,.231+i*.022,.12-i*.018,hairGroup);
        tuft.scale.set(1.1,.65,.9);tuft.rotation.z=-.25;
      }
    }
  }
  return root;
}

/** Dispose only when the owning scene no longer uses this avatar. */
export function disposeAvatar(avatar:any):void {
  const geometries=new Set<any>(),materials=new Set<any>();
  avatar.traverse((item:any)=>{
    if(item.geometry)geometries.add(item.geometry);
    if(item.material)for(const value of Array.isArray(item.material)?item.material:[item.material])materials.add(value);
  });
  geometries.forEach(value=>value.dispose());materials.forEach(value=>value.dispose());
  avatar.removeFromParent();avatar.clear();
}
