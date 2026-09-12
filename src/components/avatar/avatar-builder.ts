import {defaultAvatar,type AvatarConfig} from '../../../shared/auth';

const validColor=(value:string|undefined,fallback:string)=>/^#[\da-f]{6}$/i.test(value??'')?value!:fallback;
export interface AvatarPoseOptions {pose?:'standing'|'seated'}

/** Sculpted local avatar. Feet at y=0, front +Z, standing height about 2.45 units. */
export function createAvatar(T:any,avatar:AvatarConfig=defaultAvatar,options:AvatarPoseOptions={}):any {
 const config={...defaultAvatar,...avatar},feminine=config.template==='feminine',seated=options.pose==='seated';
 const root=new T.Group();root.name='avatar';root.userData={height:seated?2.13:2.45,forward:'+Z',version:'sculpted-v2',pose:seated?'seated':'standing'};
 const mat=(color:string,roughness=.72)=>new T.MeshStandardMaterial({color,roughness,metalness:.015});
 const skin=mat(validColor(config.skinColor,defaultAvatar.skinColor),.66),hair=mat(validColor(config.hairColor,defaultAvatar.hairColor),.64),top=mat(validColor(config.topColor,defaultAvatar.topColor)),pants=mat(validColor(config.pantsColor,defaultAvatar.pantsColor)),shoes=mat(validColor(config.shoesColor,defaultAvatar.shoesColor),.58);
 const tint=(material:any,factor:number)=>{const copy=material.clone();copy.color.multiplyScalar(factor);return copy;};
 const seam=tint(top,.78),hairLight=tint(hair,1.14),skinShade=tint(skin,.87),sole=mat('#e8dfd1',.82),eyeWhite=mat('#fff8ec',.36),iris=mat('#574438',.3),pupil=mat('#171c1d',.21),glint=mat('#ffffff',.12),mouth=mat('#654236',.72);
 const unitSphere=new T.SphereGeometry(1,28,20);
 const mesh=(name:string,geometry:any,material:any,x=0,y=0,z=0,parent=root)=>{const value=new T.Mesh(geometry,material);value.name=name;value.position.set(x,y,z);value.castShadow=true;value.receiveShadow=true;parent.add(value);return value;};
 const oval=(name:string,rx:number,ry:number,rz:number,material:any,x=0,y=0,z=0,parent=root)=>{const value=mesh(name,unitSphere,material,x,y,z,parent);value.scale.set(rx,ry,rz);return value;};
 const limb=(name:string,start:number[],end:number[],radius:number,material:any,parent=root)=>{
  const a=new T.Vector3(...start),b=new T.Vector3(...end),direction=b.clone().sub(a),length=direction.length();
  const value=mesh(name,new T.CapsuleGeometry(radius,Math.max(.001,length-2*radius),6,20),material,0,0,0,parent);value.position.copy(a.add(b).multiplyScalar(.5));value.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),direction.normalize());return value;
 };
 const curve=(name:string,points:number[][],radius:number,material:any,parent=root)=>mesh(name,new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),18,radius,7,false),material,0,0,0,parent);
 const body=new T.Group();body.name='avatar.body';body.position.y=seated?-.32:0;root.add(body);
 // Continuous elliptical silhouette: rounded hem, waist, chest and sloping shoulders.
 const width=feminine?.94:1;
 const profile=[[0,.925],[.205,.925],[.247,.948],[.255,1.01],[.246,1.105],[.27,1.24],[.305,1.385],[.302,1.425],[.277,1.48],[.225,1.525],[.13,1.555],[0,1.555]];
 const spline=new T.CatmullRomCurve3(profile.map(([r,y])=>new T.Vector3(r*width,y,0)));
 const outline=spline.getPoints(55).map((point:any)=>new T.Vector2(Math.max(0,point.x),point.y));
 const torso=mesh('avatar.top',new T.LatheGeometry(outline,40),top,0,0,0,body);torso.scale.z=.73;
 const hem=mesh('avatar.hem',new T.TorusGeometry(.243*width,.014,8,40),seam,0,.972,0,body);hem.rotation.x=Math.PI/2;hem.scale.y=.73;
 oval('avatar.hips',.239,.095,.166,pants,0,.92,0,body);
 limb('avatar.neck',[0,1.49,0],[0,1.78,0],.105,skin,body);
 const collar=mesh('avatar.collar',new T.TorusGeometry(.119,.026,10,36),seam,0,1.555,0,body);collar.rotation.x=Math.PI/2;collar.scale.y=.83;
 const collarInner=mesh('avatar.collar-trim',new T.TorusGeometry(.105,.01,7,32),top,0,1.573,0,body);collarInner.rotation.x=Math.PI/2;
 curve('avatar.chest-stitch',[[.103,1.315,.188],[.121,1.299,.196],[.143,1.315,.184]],.006,seam,body);
 for(const side of [-1,1]){
  const name=side<0?'left':'right',hip=side*.145;
  if(seated){
   limb(name+'.thigh',[hip,.622,0],[hip,.595,.40],.119,pants);
   limb(name+'.calf',[hip,.60,.405],[hip,.165,.47],.095,pants);
  }else{
   const legProfile=[[0,.145],[.074,.145],[.092,.177],[.098,.28],[.105,.47],[.112,.60],[.119,.79],[.111,.946],[0,.946]];
   const legSpline=new T.CatmullRomCurve3(legProfile.map(([r,y])=>new T.Vector3(r,y,0)));
   const leg=mesh(name+'.trouser-leg',new T.LatheGeometry(legSpline.getPoints(32).map((p:any)=>new T.Vector2(Math.max(0,p.x),p.y)),28),pants,hip,0,.014);leg.scale.z=.92;
  }
  const footX=hip+side*.012,footZ=seated?.53:.082;
  oval(name+'.sole',.14,.046,.224,sole,footX,.046,footZ);
  oval(name+'.shoe',.134,.104,.206,shoes,footX,.119,footZ);
  oval(name+'.toe',.123,.052,.11,shoes,footX,.117,footZ+.10);
  oval(name+'.tongue',.071,.037,.09,shoes,footX,.20,footZ-.025);
  for(let row=0;row<3;row++)curve(name+'.lace'+row,[[footX-.06,.198-row*.007,footZ+.055-row*.047],[footX,.216-row*.007,footZ+.055-row*.047],[footX+.06,.198-row*.007,footZ+.055-row*.047]],.008,sole);
  curve(name+'.sole-line',[[footX-.12,.074,footZ+.02],[footX-.08,.07,footZ+.17],[footX,.068,footZ+.204],[footX+.08,.07,footZ+.17],[footX+.12,.074,footZ+.02]],.005,shoes);
  const arm=new T.Group();arm.name='avatar.'+name+'Arm';arm.position.set(side*.283*width,1.424,0);arm.rotation.z=side*.15;arm.rotation.x=side<0?.045:-.09;body.add(arm);
  oval(name+'.sleeve',.122,.182,.113,top,side*.026,-.103,.003,arm);
  const cuff=mesh(name+'.cuff',new T.TorusGeometry(.101,.011,8,24),seam,side*.044,-.216,.01,arm);cuff.rotation.x=Math.PI/2;
  limb(name+'.forearm',[side*.047,-.237,.011],[side*.081,-.444,.052],.071,skin,arm);
  const hand=oval(name+'.hand',.072,.105,.055,skin,side*.085,-.482,.055,arm);hand.rotation.z=side*-.07;
  oval(name+'.thumb',.034,.054,.035,skin,side*.035,-.469,.083,arm).rotation.z=side*-.4;
 }
 // Soft cheek/jaw silhouette and readable, expressive eyes.
 const head=new T.Group();head.name='avatar.head';head.position.set(0,1.935,.008);head.rotation.z=-.026;body.add(head);
 oval('avatar.face',.34,.363,.308,skin,0,0,0,head);
 oval('avatar.jaw',.263,.219,.249,skin,0,-.126,.033,head);
 for(const side of [-1,1]){
  oval('avatar.ear',.060,.090,.048,skin,side*.327,-.032,-.005,head);
  oval('avatar.inner-ear',.025,.044,.018,skinShade,side*.364,-.034,.025,head);
  const eye=oval('avatar.eye-white',.058,.069,.019,eyeWhite,side*.115,.033,.287,head);eye.rotation.y=side*.17;
  oval('avatar.iris',.033,.047,.012,iris,side*.109,.031,.307,head);
  oval('avatar.pupil',.022,.032,.008,pupil,side*.107,.034,.319,head);
  oval('avatar.eye-light',.008,.011,.004,glint,side*.107-.010,.050,.327,head);
  oval('avatar.eye-light-small',.003,.004,.002,glint,side*.107+.010,.017,.328,head);
  curve('avatar.upper-eyelid',[[side*.063,.083,.300],[side*.115,.107,.295],[side*.170,.071,.280]],.008,skinShade,head);
  curve('avatar.brow',[[side*.058,.156,.276],[side*.116,.171,.277],[side*.179,.146,.252]],.015,hair,head);
 }
 oval('avatar.nose-bridge',.034,.060,.035,skin,0,-.018,.299,head);
 oval('avatar.nose',.049,.039,.047,skin,0,-.063,.323,head);
 curve('avatar.smile',[[-.064,-.159,.267],[-.032,-.177,.276],[.025,-.18,.278],[.066,-.157,.264]],.008,mouth,head);
 oval('avatar.lower-lip',.042,.010,.006,skinShade,0,-.192,.268,head);
 const hairGroup=new T.Group();hairGroup.name='avatar.hair';head.add(hairGroup);
 const style=['short','long','curly','bald'].includes(config.hairStyle)?config.hairStyle:'short';
 if(style!=='bald'){
  const cap=mesh('hair.cap',new T.SphereGeometry(.36,36,22,0,Math.PI*2,0,1.13),hair,0,.035,-.02,hairGroup);cap.scale.set(1,1.04,.94);
  if(style==='long'){
   oval('hair.back',.338,.397,.177,hair,0,-.046,-.185,hairGroup);
   for(const side of [-1,1]){
    const lock=oval('hair.side-lock',.086,.313,.11,hair,side*.302,-.09,-.006,hairGroup);lock.rotation.z=side*-.13;
    oval('hair.side-tip',.076,.15,.09,hair,side*.327,-.335,.028,hairGroup).rotation.z=side*.12;
    curve('hair.strand',[[side*.27,.187,-.053],[side*.334,.04,.062],[side*.318,-.16,.087],[side*.349,-.35,.033]],.010,hairLight,hairGroup);
   }
   oval('hair.fringe',.215,.071,.13,hair,-.097,.274,.192,hairGroup).rotation.z=-.27;
   oval('hair.part',.149,.077,.117,hair,.175,.267,.152,hairGroup).rotation.z=.24;
  }else if(style==='curly'){
   for(let row=0;row<2;row++)for(let i=0;i<9;i++){
    const angle=i/9*Math.PI*2+row*.22,radius=row===0?.267:.155;
    const curl=oval('hair.curl',.096+row*.014,.10,.093,hair,Math.cos(angle)*radius,.235+row*.098+Math.sin(i*2.1)*.014,Math.sin(angle)*radius*.83-.012,hairGroup);
    curl.rotation.set(i*.17,i*.35,i*.1);
   }
   oval('hair.crown',.15,.087,.14,hair,0,.392,-.025,hairGroup);
   for(const side of [-1,1])oval('hair.temple-curl',.073,.085,.076,hair,side*.292,.14,.027,hairGroup);
  }else{
   oval('hair.back-shape',.316,.167,.22,hair,0,.184,-.095,hairGroup);
   for(let i=0;i<4;i++){
    const tuft=oval('hair.sweep',.153-i*.012,.086,.164,hair,-.19+i*.114,.276+i*.016,.117-i*.025,hairGroup);tuft.rotation.z=-.31;
   }
   curve('hair.swept-strand',[[-.233,.297,.187],[-.12,.339,.221],[.016,.352,.194],[.14,.345,.13]],.009,hairLight,hairGroup);
   for(const side of [-1,1])oval('hair.sideburn',.04,.10,.048,hair,side*.313,.113,-.038,hairGroup);
  }
 }
 const used=new Set<any>();root.traverse((item:any)=>{if(item.material)used.add(item.material);});
 for(const material of [skin,hair,top,pants,shoes,seam,hairLight,skinShade,sole,eyeWhite,iris,pupil,glint,mouth])if(!used.has(material))material.dispose();
 return root;
}

export function disposeAvatar(avatar:any):void {
 const geometries=new Set<any>(),materials=new Set<any>(),textures=new Set<any>();
 avatar.traverse((item:any)=>{if(item.geometry)geometries.add(item.geometry);if(item.material)for(const value of Array.isArray(item.material)?item.material:[item.material])materials.add(value);});
 geometries.forEach(value=>value.dispose());materials.forEach(value=>{for(const resource of Object.values(value))if((resource as any)?.isTexture)textures.add(resource);value.dispose();});textures.forEach(value=>{value.dispose();value.source?.data?.close?.();});avatar.removeFromParent();avatar.clear();
}
