import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const root='C:/Users/lucas/Desktop/projetos/hackas26/artifacts/demo';
const dirs=fs.readdirSync(root+'/live-v6').filter(n=>/^\d\d-/.test(n)&&!['02','10','14'].includes(n.slice(0,2))&&fs.existsSync(root+'/live-v6/'+n+'/capture.json')).sort();
let entries=[];
for(const name of dirs){const m=JSON.parse(fs.readFileSync(root+'/live-v6/'+name+'/capture.json'));if(m.error)continue;for(let i=0;i<m.frames.length;i++){const f=m.frames[i];const d=i+1<m.frames.length?m.frames[i+1].timestamp-f.timestamp:0.15;entries.push({p:root+'/live-v6/'+name+'/'+f.file,d:Math.max(.02,Math.min(d,2))});}}
const raw=entries.reduce((a,e)=>a+e.d,0);const ratio=130.392/raw;
fs.writeFileSync(root+'/live-v6.ffconcat','ffconcat version 1.0\n'+entries.map(e=>`file '${e.p}'\nduration ${(e.d*ratio).toFixed(6)}`).join('\n')+`\nfile '${entries.at(-1).p}'\n`);
console.log({clips:dirs,raw,ratio});
const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-safe','0','-i',root+'/live-v6.ffconcat','-i',root+'/rebobina-pitch-v6-voz-original.mp3','-vf','scale=1600:900:force_original_aspect_ratio=decrease,pad=1600:900:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30','-c:v','libx264','-preset','ultrafast','-crf','22','-c:a','aac','-b:a','160k','-t','130.392','-movflags','+faststart',root+'/rebobina-pitch-v6-gravacao-real.mp4'],{stdio:'inherit'});process.exit(r.status??1);
