import {ArrowRight,Check,FileText,LoaderCircle,Users} from 'lucide-react';
import type {AudienceProfile} from '../../../shared/rehearsal-types';
import SpatialStage from './SpatialStage';

interface Props {
  pitch:string;
  audiences:AudienceProfile[];
  selected:string[];
  busy:boolean;
  artifactId?:string;
  onPitch:(value:string)=>void;
  onToggle:(id:string)=>void;
  onStart:()=>void;
  onAudience:()=>void;
}

export default function RehearsalSetup({pitch,audiences,selected,busy,artifactId,onPitch,onToggle,onStart,onAudience}:Props){
  const pitchReady=pitch.trim().length>=30;
  const ready=pitchReady&&selected.length>0&&!busy;
  const selectedProfiles=audiences.filter(profile=>selected.includes(profile.id));
  const hint=!pitchReady?'Conte sua ideia em pelo menos 30 caracteres.':!selected.length?'Escolha quem vai trazer um novo olhar.':selected.length+' '+(selected.length===1?'perfil escolhido.':'perfis escolhidos.')+' Sua sala está preparada.';
  return <section className="rehearsal-setup" aria-labelledby="rehearsal-setup-title">
    <div className="rehearsal-setup-world">
      <header className="rehearsal-intro">
        <span className="rehearsal-kicker">CONVERSAS QUE IMPORTAM</span>
        <h1 id="rehearsal-setup-title">Seu próximo momento<br/>começa aqui.</h1>
        <p>Experimente a apresentação. Encontre novas respostas.</p>
      </header>
      <SpatialStage compact people={selectedProfiles.map(({id,name,role})=>({id,name,role}))} phaseLabel={selected.length?selected.length+' '+(selected.length===1?'OLHAR NA SALA':'OLHARES NA SALA'):'O PALCO É SEU'} title={selected.length?'Uma conversa, novas perspectivas.':'Espaço para tentar de novo.'}/>
      <div className="rehearsal-world-caption"><RotateMark/><p>Responda. Reflita. Rebobine.<span>Um ensaio com perguntas possíveis, baseado nos seus materiais.</span></p></div>
    </div>
    <form className="rehearsal-setup-panel" onSubmit={event=>{event.preventDefault();if(ready)onStart();}} aria-busy={busy}>
      <div className="rehearsal-panel-heading"><span className="rehearsal-kicker">ANTES DE ENTRAR</span><h2>Prepare a conversa.</h2></div>
      <div className="rehearsal-step-label"><span aria-hidden="true">{pitchReady?<Check size={13}/>:'01'}</span><label className="rehearsal-label" htmlFor="rehearsal-pitch">O que você vai apresentar?</label></div>
      <textarea id="rehearsal-pitch" rows={5} maxLength={7000} value={pitch} disabled={busy} onChange={event=>onPitch(event.target.value)} placeholder="Qual é a ideia, para quem ela importa e o que você quer demonstrar?" aria-describedby="rehearsal-pitch-hint"/>
      <div className="rehearsal-field-meta" id="rehearsal-pitch-hint"><span>{pitchReady?pitch.length.toLocaleString('pt-BR')+' / 7.000':'Pode ser um rascunho. Mínimo de 30 caracteres.'}</span>{artifactId&&<span><FileText size={13}/> Material conectado</span>}</div>
      <div className="rehearsal-audience-heading"><div className="rehearsal-step-label"><span aria-hidden="true">{selected.length?<Check size={13}/>:'02'}</span><div><span className="rehearsal-label">Quem estará na sala?</span><small>Escolha até três perfis profissionais.</small></div></div><span aria-live="polite">{selected.length}/3</span></div>
      {audiences.length===0?<div className="rehearsal-empty-audience"><Users size={24}/><strong>Convide o primeiro olhar.</strong><p>Adicione um perfil com fontes para dar contexto às perguntas.</p><button type="button" className="rehearsal-link-button" disabled={busy} onClick={onAudience}>Preparar minha audiência <ArrowRight size={16}/></button></div>:<div className="rehearsal-profile-grid" role="group" aria-label="Perfis disponíveis">{audiences.map(profile=>{const active=selected.includes(profile.id);const disabled=busy||(!active&&selected.length>=3);return <button key={profile.id} type="button" className={'rehearsal-profile '+(active?'rehearsal-profile-selected':'')} aria-pressed={active} disabled={disabled} onClick={()=>onToggle(profile.id)}><span className="rehearsal-avatar" aria-hidden="true">{profile.name.slice(0,1).toUpperCase()}</span><span><strong>{profile.name}</strong><small>{profile.role}</small>{(profile.synthetic||profile.isFictional)&&<em>Exemplo fictício</em>}</span><span className="rehearsal-check" aria-hidden="true">{active?<Check size={16}/>:'+'}</span></button>})}</div>}
      <p className="rehearsal-ready-hint" aria-live="polite">{busy?'Relacionando seu pitch aos perfis selecionados…':hint}</p>
      <button type="submit" className="rehearsal-primary" disabled={!ready}>{busy?<><LoaderCircle className="rehearsal-spin" size={17}/> Preparando sua sala…</>:<>Entrar na sala <ArrowRight size={17}/></>}</button>
      <p className="rehearsal-fine-print">Ensaio com fontes. Sem prever o que alguém pensa.</p>
    </form>
  </section>;
}

function RotateMark(){return <span className="rehearsal-caption-mark" aria-hidden="true">↶</span>;}
