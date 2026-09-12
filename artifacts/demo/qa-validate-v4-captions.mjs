import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const read = name => readFileSync(new URL(name, import.meta.url), 'utf8');
const input = name => read(name).match(/const input = `([\s\S]*?)`;/)[1];
const paragraphs = input('generate-voice.ts').split(/\r?\n\r?\n/);
const expected = [paragraphs[0], input('generate-voice-v4-segment.ts'), ...paragraphs.slice(3)].join(' ');
const normalized = text => text.toLocaleLowerCase('pt-BR').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const seconds = text => {
  const [h,m,s,ms] = text.split(/[:,]/).map(Number);
  return h*3600 + m*60 + s + ms/1000;
};
const cues = read('rebobina-demo-3d-v4-ptbr.srt').trim().split(/\r?\n\r?\n/).map(block => {
  const [id, timing, ...lines] = block.split(/\r?\n/);
  const [start,end] = timing.split(' --> ').map(seconds);
  return {id:Number(id), start, end, lines, cps:lines.join(' ').length/(end-start)};
});
const errors = [];
if (read('rebobina-demo-3d-v4-ptbr.srt') !== read('rebobina-demo-3d-v5-ptbr.srt')) errors.push('v4 and v5 caption transcripts differ');
if (normalized(expected) !== normalized(cues.flatMap(c=>c.lines).join(' '))) errors.push('Caption text differs from complete v4 source transcript');
for (let i=0;i<cues.length;i++) {
  const c=cues[i];
  if (c.id!==i+1 || c.end<=c.start || c.start<0 || c.end>79.967) errors.push(`Invalid cue ${c.id}`);
  if (i && c.start<cues[i-1].end) errors.push(`Overlapping cue ${c.id}`);
  if (c.lines.length>2 || c.lines.some(l=>l.length>42)) errors.push(`Line wrapping cue ${c.id}`);
  if (c.cps>22) errors.push(`Reading speed cue ${c.id}: ${c.cps.toFixed(1)} CPS`);
}
const video = fileURLToPath(new URL('rebobina-demo-3d-v4-narrado.mp4', import.meta.url));
const hash = createHash('sha256').update(readFileSync(video)).digest('hex');
if (hash !== '66895b2cd1e302500791173d919805598591d33b03f0d9e2285605348817cd0c') errors.push('MP4 changed during subtitle-only correction');
console.log(JSON.stringify({ok:errors.length===0,cues:cues.length,sourceWords:expected.trim().split(/\s+/).length,maxCharsPerLine:Math.max(...cues.flatMap(c=>c.lines.map(l=>l.length))),maxCps:Math.max(...cues.map(c=>c.cps)),sha256:hash,errors},null,2));
process.exitCode = errors.length ? 1 : 0;
