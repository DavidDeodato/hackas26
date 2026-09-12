import test from 'node:test';
import assert from 'node:assert/strict';
// @ts-expect-error The same vendored Three module is used by the application.
import * as T from '../src/vendor/three/three.module.min.js';
import {createAvatar,disposeAvatar} from '../src/components/avatar/avatar-builder';
import {defaultAvatar} from '../shared/auth';

test('all avatar templates and hairstyles create finite sculpted geometry with grounded feet',()=>{
 for(const template of ['masculine','feminine'] as const)for(const hairStyle of ['short','long','curly','bald'] as const){
  const model=createAvatar(T,{...defaultAvatar,template,hairStyle});
  const box=new T.Box3().setFromObject(model),size=box.getSize(new T.Vector3());
  assert.ok(Math.abs(box.min.y)<.005);assert.ok(size.y>2.1&&size.y<2.65);
  assert.equal(model.userData.forward,'+Z');assert.equal(model.userData.version,'sculpted-v2');
  assert.ok(model.getObjectByName('avatar.iris'));assert.ok(model.getObjectByName('left.trouser-leg'));
  model.traverse((node:any)=>{if(node.geometry){assert.notEqual(node.geometry.type,'BoxGeometry');const positions=node.geometry.attributes.position.array;for(const value of positions)assert.ok(Number.isFinite(value));}});
  disposeAvatar(model);
 }
});

test('shared avatar resources dispose exactly once and detach from the parent',()=>{
 const parent=new T.Group(),model=createAvatar(T,defaultAvatar);parent.add(model);
 const geometries=new Set<any>(),materials=new Set<any>();
 model.traverse((node:any)=>{if(node.geometry)geometries.add(node.geometry);if(node.material)materials.add(node.material);});
 const counts=new Map<any,number>();for(const value of [...geometries,...materials]){counts.set(value,0);value.addEventListener('dispose',()=>counts.set(value,counts.get(value)!+1));}
 disposeAvatar(model);assert.equal(parent.children.length,0);assert.equal(model.children.length,0);
 for(const count of counts.values())assert.equal(count,1);
});

test('optional seated pose stays grounded and preserves profile colors',()=>{
 const model=createAvatar(T,{...defaultAvatar,topColor:'#b66d4d'},{pose:'seated'});
 const box=new T.Box3().setFromObject(model);assert.ok(Math.abs(box.min.y)<.005);assert.ok(box.max.y<2.2);
 assert.equal(model.getObjectByName('avatar.top').material.color.getHexString(),'b66d4d');disposeAvatar(model);
});
