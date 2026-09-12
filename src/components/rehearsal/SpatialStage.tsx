import {useEffect,useRef,useState} from 'react';
import {createSpatialScene,type StageController} from './spatial-scene';
import type {AvatarConfig} from '../../../shared/auth';
import {createAvatar} from '../avatar/avatar-builder';
import {useOptionalAuth} from '../../lib/auth';
import './spatial-stage.css';

export interface StagePerson {id:string;name:string;role:string}
export interface SpatialStageProps {
  people:StagePerson[];
  activePersonId?:string;
  onSelectPerson?:(id:string)=>void;
  phaseLabel?:string;
  title?:string;
  compact?:boolean;
  presenterAvatar?:AvatarConfig;
}

/** A pre-modelled theatre. User context only changes cast, focus and labels. */
export default function SpatialStage({people,activePersonId,onSelectPerson,phaseLabel='ENSAIO EM CENA',title='O seu próximo momento começa aqui.',compact=false,presenterAvatar:providedAvatar}:SpatialStageProps){
  const auth=useOptionalAuth();
  const presenterAvatar=providedAvatar??auth?.user?.avatar;
  const host=useRef<HTMLDivElement>(null);
  const engine=useRef<StageController|null>(null);
  const latest=useRef({people,activePersonId,presenterAvatar});
  latest.current={people,activePersonId,presenterAvatar};
  const [status,setStatus]=useState<'loading'|'ready'|'fallback'>('loading');
  const [display,setDisplay]=useState<'cinematic'|'interactive'>('interactive');
  const [view,setView]=useState<'overview'|'focus'>('overview');
  const [selected,setSelected]=useState<string>();
  const shown=people.slice(0,3);
  const castKey=shown.map(p=>p.id).join('|');
  const avatarKey=JSON.stringify(presenterAvatar??null);
  useEffect(()=>{
    const element=host.current;
    if(!element||display!=='interactive')return;
    let cancelled=false;
    setStatus('loading');
    const avatar=latest.current.presenterAvatar;
    createSpatialScene(element,latest.current.people.slice(0,3),()=>{if(!cancelled)setStatus('fallback');},avatar?three=>createAvatar(three,avatar):undefined)
      .then(controller=>{
        if(cancelled){controller.dispose();return;}
        engine.current=controller;
        controller.focus(latest.current.activePersonId);
        setStatus('ready');
      }).catch(()=>{if(!cancelled)setStatus('fallback');});
    return()=>{cancelled=true;engine.current?.dispose();engine.current=null;};
  },[castKey,display,avatarKey]);
  useEffect(()=>{engine.current?.focus(activePersonId);setSelected(undefined);},[activePersonId]);
  const focused=selected||activePersonId;
  const person=shown.find(p=>p.id===focused);
  function selectPerson(id:string){setSelected(id);engine.current?.focus(id);engine.current?.setView('focus');setView('focus');onSelectPerson?.(id);}
  function toggleView(){const next=view==='overview'?'focus':'overview';setView(next);engine.current?.setView(next);}
  return <section className={`spatial-stage spatial-${display} ${compact?'spatial-compact':''}`} aria-label="Palco de ensaio 3D interativo" data-renderer={display==='cinematic'?'cinematic':status} data-presenter={presenterAvatar?'profile':'default'}>
    {(display==='cinematic'||status==='fallback')&&<img className="spatial-cinematic-art" src="/world-art/cinematic-rehearsal-stage-v2.png" alt="" aria-hidden="true"/>}
    <div className="spatial-stage-top"><span className="spatial-live"><i/>{phaseLabel}</span><span className="spatial-room-code">Seu espaço de ensaio</span></div>
    <div ref={host} className="spatial-canvas" aria-hidden="true"/>
    {display==='interactive'&&status!=='ready'&&<div className="spatial-fallback" role="status"><span>{status==='loading'?'Preparando a visualização 3D…':'3D indisponível · o ensaio continua no cenário ilustrativo'}</span></div>}
    <div className="spatial-scene-heading"><span>UM ESPAÇO PARA EXPERIMENTAR</span><h2>{title.length>95?title.slice(0,92)+'…':title}</h2></div>
    <div className="spatial-view-controls">{display==='interactive'&&status==='ready'&&<button type="button" className="spatial-camera" onClick={toggleView} aria-label={view==='overview'?'Aproximar câmera do palco':'Voltar à visão geral'}>{view==='overview'?'↗ Aproximar':'↙ Visão geral'}</button>}<button type="button" className="spatial-camera spatial-view-alternative" onClick={()=>{setDisplay(display==='cinematic'?'interactive':'cinematic');setView('overview');}}>{display==='cinematic'?'Voltar ao 3D':'Ver ilustração'}</button></div>
    {display==='cinematic'&&person&&<div className="spatial-speaker-tag"><i/><span><small>INTERLOCUTOR EM FOCO</small><strong>{person.name}</strong></span></div>}
    <div className="spatial-cast" aria-label="Pessoas da audiência">
      {shown.length?shown.map((p,i)=><button type="button" key={p.id} aria-pressed={focused===p.id} className={`spatial-person ${focused===p.id?'is-active':''}`} onClick={()=>selectPerson(p.id)}><span className="spatial-person-number">0{i+1}</span><span><strong>{p.name}</strong><small>{p.role}</small></span>{activePersonId===p.id&&<i aria-label="Pergunta atual"/>}</button>):<p className="spatial-empty-cast">Seu palco está preparado. Adicione uma audiência para começar.</p>}
    </div>
    <div className="spatial-stage-foot"><span>{display==='cinematic'?'Cenário ilustrativo · perfis definidos pelos seus materiais':'Cena 3D · elenco definido pelos seus materiais'}</span><span>Ensaio, não previsão.</span></div>
  </section>;
}
