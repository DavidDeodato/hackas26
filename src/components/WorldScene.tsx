import { useId } from 'react';
import type { Character, Scenario, WorldState } from '../../shared/types';
import './world-scene.css';

type Props = { scenario: Scenario; state: WorldState; onCharacter: (id: string) => void; onStation: (station: 'work' | 'materials') => void; reducedMotion: boolean };
type Point = { x: number; y: number };
const iso = (x: number, y: number): Point => ({ x: 450 + (x - y) * 43, y: 206 + (x + y) * 22 });
const points = (items: Point[]) => items.map(p => `${p.x},${p.y}`).join(' ');
const safeColor = (value: string, fallback: string) => /^#[\da-f]{3,8}$/i.test(value) ? value : fallback;

function Box({ x, y, w = 1.5, d = 1, h = 40, top = '#f3cfa0', left = '#c18a64', right = '#dba47b' }: { x: number; y: number; w?: number; d?: number; h?: number; top?: string; left?: string; right?: string }) {
  const a = iso(x, y), b = iso(x + w, y), c = iso(x + w, y + d), e = iso(x, y + d);
  const up = (p: Point) => ({ ...p, y: p.y - h });
  return <g><polygon points={points([up(e), up(c), c, e])} fill={left} /><polygon points={points([up(b), up(c), c, b])} fill={right} /><polygon points={points([up(a), up(b), up(c), up(e)])} fill={top} /></g>;
}

function Plant({ x, y, flowers = false, small = false }: { x: number; y: number; flowers?: boolean; small?: boolean }) {
  const p = iso(x, y);
  return <g transform={`translate(${p.x} ${p.y}) scale(${small ? .65 : 1})`}>
    <ellipse cy="4" rx="24" ry="10" fill="#604e3920" />
    <path d="M-17-23 L-12 0 Q0 11 12 0 L17-23Z" fill="#cb7e58" /><ellipse cy="-23" rx="17" ry="7" fill="#efb18a" /><ellipse cy="-24" rx="12" ry="4" fill="#70543c" />
    <g className="world-leaves"><path d="M0-22 Q-7-44-2-69 M0-25 Q18-48 21-55 M0-27 Q-18-47-24-49" fill="none" stroke="#537447" strokeWidth="3" /><ellipse cx="-12" cy="-48" rx="8" ry="19" fill="#789967" transform="rotate(-40 -12 -48)" /><ellipse cx="13" cy="-44" rx="8" ry="20" fill="#567e56" transform="rotate(42 13 -44)" /><ellipse cx="-2" cy="-66" rx="8" ry="15" fill="#8da778" />{flowers && <><circle cx="-20" cy="-55" r="9" fill="#edac9e" /><circle cx="17" cy="-59" r="10" fill="#f4c674" /><circle cx="-1" cy="-76" r="8" fill="#c7a2b2" /><circle cx="17" cy="-59" r="3" fill="#b68943" /></>}</g>
  </g>;
}

function Goods({ x, y, theme, count }: { x: number; y: number; theme: Scenario['theme']; count: number }) {
  const p = iso(x, y);
  return <g transform={`translate(${p.x} ${p.y - 58})`}>{Array.from({ length: Math.min(5, Math.max(0, count)) }, (_, i) => <g key={i} transform={`translate(${i * 16 - 30} ${i * 1.5})`}>
    {theme === 'florist' ? <><path d="M0 0 3-20 7-3 13-18 11 1" stroke="#597a55" strokeWidth="3" fill="none" /><circle cx="3" cy="-21" r="6" fill={i % 2 ? '#efd18c' : '#d88f8d'} /><circle cx="13" cy="-18" r="5" fill="#c4a1bd" /><path d="M-2-5 15-5 10 10 3 9Z" fill="#f2d8b4" /></> : theme === 'cafe' ? <><path d="M-4-7H9L7 8H-2Z" fill={i % 2 ? '#f5e7d0' : '#94a593'} /><path d="M9-3Q18-3 14 3L8 4" fill="none" stroke="#eee0c9" strokeWidth="3" /><ellipse cx="2" cy="-7" rx="7" ry="3" fill="#6a463a" /></> : <><path d="M-6-12 7-15 14-10 14 6 1 10-6 6Z" fill={i % 2 ? '#a3b4a2' : '#e8be86'} /><path d="M-6-12 1-7 14-10M1-7V10" fill="none" stroke="#fff6" /></>}
  </g>)}</g>;
}

function Person({ person, index, onClick, ready }: { person: Character; index: number; onClick: () => void; ready: boolean }) {
  const positions = [[5.6, 5.5], [4.1, 2.25], [2.1, 5.4]];
  const [x, y] = positions[index % positions.length]; const p = iso(x, y);
  const clothes = safeColor(person.color, ['#b86d4b', '#6f8573', '#9a86a1'][index % 3]);
  const bubble = person.greeting.length > 37 ? person.greeting.slice(0, 35) + '…' : person.greeting;
  return <g className="world-character" role="button" tabIndex={0} aria-label={`Conversar com ${person.name}, ${person.role === 'customer' ? 'cliente' : person.role === 'colleague' ? 'colega' : 'assistente'}`} onClick={onClick} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }} transform={`translate(${p.x} ${p.y})`}>
    <ellipse className="character-focus" cy="4" rx="31" ry="14" fill="#6e523723" />
    <g className="world-person-body" style={{ animationDelay: `${index * -.7}s` }}>
      <path d="M-12-29-11-4M10-29 12-4" stroke="#454640" strokeWidth="11" strokeLinecap="round" /><path d="M-17-4-7-3M8-3 19-3" stroke="#f6e9ce" strokeWidth="8" strokeLinecap="round" />
      <path d="M-14-65Q0-72 15-64L20-31Q0-22-20-32Z" fill={clothes} /><path d="M-16-59-24-39M17-59 25-44" stroke={clothes} strokeWidth="11" strokeLinecap="round" /><circle cx="-24" cy="-36" r="5" fill="#d7a47f" /><circle cx="25" cy="-41" r="5" fill="#d7a47f" />
      {index === 1 && <path d="M-9-62H9L13-34H-13Z" fill="#ead7af" />}
      <path d="M-5-72V-64Q0-59 6-64V-74" fill="#c99470" /><ellipse cy="-84" rx="18" ry="20" fill={index === 2 ? '#aa7455' : '#dfae86'} /><path d="M-18-84Q-23-105-4-106Q21-108 19-83L12-93Q-5-87-11-97L-15-83Z" fill={index === 2 ? '#3b3832' : '#69503e'} /><circle cx="-7" cy="-83" r="1.6" fill="#403b34" /><circle cx="7" cy="-83" r="1.6" fill="#403b34" /><path d="M-4-75Q0-72 5-76" fill="none" stroke="#895d4a" strokeWidth="1.7" strokeLinecap="round" />
      {index === 2 && <><circle cx="-7" cy="-84" r="5" fill="none" stroke="#f1d8b0" strokeWidth="1.5" /><circle cx="7" cy="-84" r="5" fill="none" stroke="#f1d8b0" strokeWidth="1.5" /><path d="M-2-84H2" stroke="#f1d8b0" /></>}
    </g>
    <g className="world-speech"><rect x="-113" y="-157" width="226" height="37" rx="13" fill="#fffdf5" stroke="#eadfc9" /><path d="M-5-120 0-112 8-120" fill="#fffdf5" /><text y="-134" textAnchor="middle" fill="#584d42" fontSize="10.5" fontWeight="500">{bubble}</text></g>
    <rect x="-49" y="18" width="98" height="24" rx="12" fill="#fffdf2" stroke="#e9dbc3" /><text y="34" textAnchor="middle" fill="#675745" fontSize="11" fontWeight="600">{person.name.slice(0, 15)}</text>
    {ready && <circle cx="37" cy="19" r="5" fill="#6c9068" stroke="#fffdf2" strokeWidth="2" />}
  </g>;
}

export default function WorldScene({ scenario, state, onCharacter, onStation, reducedMotion }: Props) {
  const id = useId().replace(/:/g, '');
  const theme = scenario.theme;
  const palette = theme === 'florist' ? { wall: '#dfe5cc', wallSide: '#c9d1b5', accent: '#6e835d', floor: '#efd6b6' } : theme === 'cafe' ? { wall: '#f1d9b2', wallSide: '#e4c698', accent: '#a66d48', floor: '#ead1ae' } : { wall: '#d8e1d5', wallSide: '#bfcebe', accent: '#668175', floor: '#edd4b4' };
  const objects = scenario.objects.length ? scenario.objects : [{kind:'counter' as const,x:3,y:3},{kind:'shelf' as const,x:1,y:1},{kind:'plant' as const,x:7,y:1},{kind:'table' as const,x:1,y:6}];
  const maxCoord = Math.max(...objects.flatMap(o => [Math.abs(o.x), Math.abs(o.y)]), 1);
  const normalize = (v: number) => Math.min(6.8, Math.max(.5, maxCoord > 10 ? v / maxCoord * 6 : v));
  const arranged = objects.map((o, i) => ({ ...o, x: normalize(o.x), y: normalize(o.y), key: `${o.kind}-${i}` })).sort((a, b) => a.x + a.y - b.x - b.y);
  return <div className={`world-scene ${reducedMotion ? 'world-reduced-motion' : ''}`}>
    <div className="world-scene-caption"><span className="world-live-dot" /> AMBIENTE DE ENSAIO <span className="world-caption-divider">/</span> {theme === 'cafe' ? 'Café de bairro' : theme === 'florist' ? 'Ateliê de flores' : 'Pequeno comércio'}</div>
    <svg className="world-svg" viewBox="0 0 900 650" role="group" aria-label={`Mundo interativo de ${scenario.businessName}. Selecione um personagem para conversar ou uma estação para trabalhar.`}>
      <defs><radialGradient id={`${id}-light`}><stop stopColor="#fff8db" /><stop offset="1" stopColor="#f5ecd9" stopOpacity="0" /></radialGradient><filter id={`${id}-shadow`} x="-30%" y="-40%" width="160%" height="180%"><feGaussianBlur stdDeviation="14" /></filter><linearGradient id={`${id}-glass`} x2="1" y2="1"><stop stopColor="#fff8dc" /><stop offset="1" stopColor="#c8ddd4" /></linearGradient></defs>
      <ellipse cx="450" cy="505" rx="280" ry="76" fill="#8c735325" filter={`url(#${id}-shadow)`} />
      <ellipse cx="450" cy="300" rx="390" ry="290" fill={`url(#${id}-light)`} />
      <Box x={0} y={0} w={8} d={8} h={-18} top={palette.floor} left="#c29c75" right="#d6b38b" />
      <polygon points="106,382 450,206 450,55 106,231" fill={palette.wallSide} /><polygon points="450,55 794,231 794,382 450,206" fill={palette.wall} />
      <path d="M107 373 450 198 793 373" fill="none" stroke="#bda07b" strokeWidth="9" /><path d="M106 231 450 55 794 231" fill="none" stroke="#f8ebd5" strokeWidth="8" strokeLinejoin="round" />
      {Array.from({length:7},(_,i) => <g key={i} opacity=".25"><path d={`M${iso(i+1,0).x} ${iso(i+1,0).y}L${iso(i+1,8).x} ${iso(i+1,8).y}`} stroke="#b99570" /><path d={`M${iso(0,i+1).x} ${iso(0,i+1).y}L${iso(8,i+1).x} ${iso(8,i+1).y}`} stroke="#b99570" /></g>)}
      <g><path d="M154 224 304 147 304 252 154 329Z" fill="#ead6b3" stroke="#f8efdc" strokeWidth="9" /><path d="M163 226 295 158 295 247 163 315Z" fill={`url(#${id}-glass)`} /><path d="M228 192V281M162 270 296 201" stroke="#f8efdc" strokeWidth="7" /><path d="M172 311 270 168 297 155 197 299" fill="#fffdf8" opacity=".23" /><path d="M147 331 310 248 316 254 154 338Z" fill="#fff0d3" /></g>
      <g transform="translate(599 187)"><path d="M-95-60V-36M95 36V59" stroke="#8d795f" strokeWidth="3" /><path d="M-113-51 114 65 114 22-113-94Z" fill={palette.accent} /><text transform="matrix(.89 .456 0 1 -98 -62)" fill="#fff6e6" fontSize="18" fontWeight="650">{scenario.businessName.length > 24 ? scenario.businessName.slice(0,22)+'…' : scenario.businessName}</text></g>
      <g transform="translate(695 294)"><path d="M-20-28 20-8 20 31-20 11Z" fill="#f9efd9" /><path d="M-12-11 12 1M-12-4 9 7M-12 3 12 15" stroke="#a7a187" strokeWidth="2" /></g>
      <g opacity=".5"><polygon points="166,335 294,270 477,365 349,430" fill="#fff6d4" /></g>
      {arranged.map(o => <g key={o.key}>
        {o.kind === 'plant' ? <Plant x={o.x} y={o.y} flowers={theme === 'florist'} /> : o.kind === 'counter' ? <><Box x={o.x} y={o.y} w={2.4} d={1.05} h={57} top="#f8dfba" left={palette.accent} right="#93a087" /><Box x={o.x-.08} y={o.y-.08} w={2.56} d={1.21} h={62} top="#fff0d2" left="#ddbd93" right="#e8cba2" /><Goods x={o.x+.65} y={o.y+.5} theme={theme} count={state.remainingStock === null ? 3 : state.remainingStock} /></> : o.kind === 'shelf' ? <g role="button" tabIndex={0} className="world-station" aria-label="Abrir meus materiais" onClick={() => onStation('materials')} onKeyDown={e => { if(e.key === 'Enter' || e.key === ' ') {e.preventDefault();onStation('materials');} }}><Box x={o.x} y={o.y} w={1.75} d={.65} h={92} top="#c29b71" left="#bc9268" right="#96734f" />{[28,57,85].map((h,i) => <g key={h}><Box x={o.x-.03} y={o.y+.1} w={1.83} d={.67} h={h} top="#efd4a8" left="#dfbd8e" right="#cea579" /><g transform={`translate(0 ${58-h})`}><Goods x={o.x+.7} y={o.y+.65} theme={theme} count={i+2} /></g></g>)}</g> : o.kind === 'table' ? <g role="button" tabIndex={0} className="world-station" aria-label="Abrir mesa de trabalho" onClick={() => onStation('work')} onKeyDown={e => {if(e.key === 'Enter' || e.key === ' ') {e.preventDefault();onStation('work');}}}><Box x={o.x+.2} y={o.y+.2} w={.18} d={.18} h={40} top="#a08362" /><Box x={o.x+1.2} y={o.y+.6} w={.18} d={.18} h={40} top="#a08362" /><Box x={o.x} y={o.y} w={1.7} d={1} h={48} top="#e4bd89" left="#c19768" right="#cbab81" /><g transform={`translate(${iso(o.x+.8,o.y+.5).x} ${iso(o.x+.8,o.y+.5).y-49})`}><path d="M-15 0 7 11 27 0 5-11Z" fill="#c7cebd" /><path d="M-15 0-15-22 7-11 7 11Z" fill="#697f76" /><path d="M-11-17 3-10 3 2-11-5Z" fill="#d5e5d6" /><path d="M-30 0-17 7-5 1-18-6Z" fill="#fff5dc" /></g></g> : <><Box x={o.x} y={o.y} w={.8} d={.8} h={28} top="#e3bd89" left="#bd9165" right="#d0a574" /><path d={`M${iso(o.x+.4,o.y).x} ${iso(o.x+.4,o.y).y-28}l-34 18`} stroke="#f2d8b2" strokeWidth="5" /></>}
      </g>)}
      <Plant x={7.5} y={1.2} flowers={theme === 'florist'} /><Plant x={.65} y={7.35} small />
      {state.committed > 0 && <g transform="translate(644 453)"><path d="M-24-14 0-26 24-14 24 12 0 24-24 12Z" fill="#d7ae77" /><path d="M-24-14 0-2 24-14M0-2V24" stroke="#f4d6a9" strokeWidth="2" fill="none" /><path d="M-8-22 15-10 8-6-15-18Z" fill="#f5e9c7" /><rect x="-57" y="29" width="114" height="23" rx="11" fill="#fffaf0" /><text y="44" fontSize="10" textAnchor="middle" fill="#796044">{state.committed} comprometido{state.committed === 1 ? '' : 's'}</text></g>}
      {(scenario.characters.length ? scenario.characters.slice(0,3) : []).map((c,i) => <Person key={c.id} person={c} index={i} onClick={() => onCharacter(c.id)} ready={state.resolved} />)}
      <g transform="translate(448 586)"><rect x="-101" y="-15" width="202" height="31" rx="15.5" fill="#fffaf0" stroke="#e9dac1" /><circle cx="-78" r="3" fill={state.resolved ? '#6e926b' : '#bc9568'} /><text x="7" y="4" textAnchor="middle" fontSize="11" fill="#7b6954">{state.resolved ? 'Ensaio concluído · pode rebobinar' : 'Seu espaço para experimentar'}</text></g>
    </svg>
    <div className="world-scene-footnote"><span>Um mundo simulado. Aprendizados para a vida real.</span><span>Selecione um personagem para começar ↗</span></div>
  </div>;
}
