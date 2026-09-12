import * as fs from 'node:fs/promises';
export const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
export function createRecorder(tab, cdp) {
  const root='C:/Users/lucas/Desktop/projetos/hackas26/artifacts/demo/live-v6';
  let point={x:100,y:100};
  async function move(x,y){const origin={...point};for(let i=1;i<=12;i++){await cdp.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:origin.x+(x-origin.x)*i/12,y:origin.y+(y-origin.y)*i/12});await pause(22);}point={x,y};}
  async function click(x,y){await move(x,y);await cdp.send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});await pause(60);await cdp.send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',clickCount:1});}
  async function record(name, action, tail=1500){
    const dir=root+'/'+name;await fs.mkdir(dir,{recursive:true});
    const meta={name,start:Date.now(),frames:[],error:null};
    let running=true;const base=await cdp.readEvents({methods:['Page.screencastFrame']});let sequence=base.cursor;
    await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,maxWidth:1600,maxHeight:900,everyNthFrame:1});
    const collect=(async()=>{while(running){const b=await cdp.readEvents({afterSequence:sequence,methods:['Page.screencastFrame'],limit:20,timeoutMs:80});sequence=b.cursor;if(b.truncated)throw Error('Frame queue truncated');for(const e of b.events){const p=e.params;const file=String(meta.frames.length).padStart(6,'0')+'.jpg';await fs.writeFile(dir+'/'+file,Buffer.from(p.data,'base64'));const frame={file,timestamp:p.metadata.timestamp};meta.frames.push(frame);await fs.appendFile(dir+'/frames.jsonl',JSON.stringify(frame)+'\n');await cdp.send('Page.screencastFrameAck',{sessionId:p.sessionId});}}})();
    try{await pause(500);await action();await pause(tail);}catch(error){meta.error=String(error);}finally{running=false;await collect;await cdp.send('Page.stopScreencast');meta.end=Date.now();await fs.writeFile(dir+'/capture.json',JSON.stringify(meta,null,2));}
    return {name,frames:meta.frames.length,seconds:(meta.end-meta.start)/1000,error:meta.error};
  }
  return {record,click,move};
}
