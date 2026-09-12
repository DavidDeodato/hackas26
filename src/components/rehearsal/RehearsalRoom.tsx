import {useEffect,useRef} from 'react';
import {ArrowRight,BookOpen,Check,LoaderCircle,MessageCircle,RotateCcw,Users} from 'lucide-react';
import type {EvidenceRef,RehearsalQuestion,RehearsalSession,RehearsalTurn} from '../../../shared/rehearsal-types';
import SpatialStage from './SpatialStage';

interface Props {session:RehearsalSession;question:RehearsalQuestion|null;turn?:RehearsalTurn;answer:string;busy:boolean;onAnswer:(value:string)=>void;onSubmit:()=>void;onNext:()=>void;onRewind:()=>void;onReview:()=>void;onNew:()=>void}
const focusLabel:Record<RehearsalQuestion['focus'],string>={clarity:'Clareza',evidence:'Evidências',impact:'Impacto',feasibility:'Viabilidade',accessibility:'Acessibilidade'};

function Evidence({items,label}:{items:EvidenceRef[];label:string}){
  if(!items.length)return null;
  return <details className="rehearsal-evidence"><summary><BookOpen size={15}/>{label} <span>{items.length}</span></summary>{items.map((item,index)=><blockquote key={item.sourceId+'-'+index}>{item.quote}<cite>Fonte de contexto vinculada</cite></blockquote>)}</details>;
}

export default function RehearsalRoom({session,question,turn,answer,busy,onAnswer,onSubmit,onNext,onRewind,onReview,onNew}:Props){
  const complete=!question;
  const index=question?session.questions.findIndex(item=>item.id===question.id):session.questions.length;
  const person=session.audiences.find(item=>item.id===question?.audienceId);
  const heading=useRef<HTMLHeadingElement>(null);
  const reading=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(reading.current)reading.current.scrollTop=0;heading.current?.focus({preventScroll:true});},[session.id,question?.id,turn?.id]);
  return <section className="rehearsal-room" aria-labelledby="rehearsal-room-title">
    <header className="rehearsal-room-header">
      <div><span className="rehearsal-kicker">{session.generation==='example'?'ENSAIO COM EXEMPLO':'SUA SALA DE ENSAIO'}</span><h1 id="rehearsal-room-title">{session.title}</h1><p>{session.audiences.length} {session.audiences.length===1?'perfil na sala':'perfis na sala'} <span aria-hidden="true">·</span> {session.questions.length} perguntas possíveis</p></div>
      <button className="rehearsal-secondary" disabled={busy} onClick={onNew}>Novo ensaio</button>
    </header>
    {question&&!turn&&<a className="rehearsal-mobile-jump" href="#rehearsal-current-question">Ir para a pergunta <ArrowRight size={15}/></a>}
    <div className="rehearsal-room-layout">
      <div className="rehearsal-world-column">
        <SpatialStage people={session.audiences.map(({id,name,role})=>({id,name,role}))} activePersonId={question?.audienceId} phaseLabel={complete?'RODADA CONCLUÍDA':turn?'HORA DE REFINAR':'PERGUNTA '+(index+1)+' DE '+session.questions.length} title={question?'Um olhar para '+focusLabel[question.focus].toLowerCase()+'.':'Seu próximo ensaio começa daqui.'}/>
        <details className="rehearsal-accessible-list"><summary><Users size={15}/> Audiência e contexto</summary><ul>{session.audiences.map(profile=><li key={profile.id}><strong>{profile.name}</strong>, {profile.role}</li>)}</ul><p><strong>Seu pitch:</strong> {session.pitch}</p></details>
      </div>
      <aside id="rehearsal-current-question" className="rehearsal-coach rehearsal-coach-refined" aria-label="Pergunta e devolutiva" aria-busy={busy}>
        <div className="rehearsal-round-progress" aria-label={complete?'Rodada concluída':'Pergunta '+(index+1)+' de '+session.questions.length}>
          <span>{complete?'Rodada concluída':turn?'Sua devolutiva':'Pergunta '+(index+1)+' de '+session.questions.length}</span>
          <div aria-hidden="true">{session.questions.map((item,i)=><i key={item.id} className={i<index||(i===index&&turn)?'is-done':i===index?'is-current':''}/>)}</div>
        </div>
        <div ref={reading} className="rehearsal-coach-reading" key={session.id+'-'+(question?.id||'done')+'-'+(turn?.id||'question')}>
          {complete?<div className="rehearsal-complete"><span className="rehearsal-complete-icon"><Check size={25}/></span><h2 ref={heading} tabIndex={-1}>Cada resposta,<br/>um passo adiante.</h2><p>Seu ensaio está salvo. Leve os aprendizados para o material ou tente a rodada novamente.</p><p className="rehearsal-preserved-note">As respostas originais ficam preservadas.</p></div>:turn?<div className="rehearsal-feedback">
            <span className="rehearsal-kicker">O QUE LEVAR PARA A PRÓXIMA TENTATIVA</span><h2 ref={heading} tabIndex={-1}>Um pouco mais<br/>de clareza.</h2>
            <h3><Check size={15}/> O que funcionou</h3><p>{turn.feedback.strength}</p><h3>Onde refinar</h3><p>{turn.feedback.gap}</p>
            <div className="rehearsal-suggestion"><MessageCircle size={17}/><div><strong>Experimente assim</strong><p>{turn.feedback.suggestion}</p></div></div>
            <details className="rehearsal-rationale-details"><summary>Rever minha resposta</summary><p className="rehearsal-original-answer">{turn.answer}</p></details>
            <Evidence items={turn.feedback.evidence} label="Fontes da devolutiva"/>
          </div>:<div className="rehearsal-answer">
            {person&&<div className="rehearsal-speaker"><span className="rehearsal-avatar" aria-hidden="true">{person.name.slice(0,1).toUpperCase()}</span><div><strong title={person.role}>{person.name}</strong></div></div>}
            <span className="rehearsal-question-focus">{focusLabel[question.focus]}</span>
            <h2 ref={heading} tabIndex={-1} className={question.text.length>160?'rehearsal-long-question':undefined}>{question.text}</h2>
            <details className="rehearsal-rationale-details"><summary>Por que essa pergunta?</summary><p>{question.rationale}</p></details>
            <Evidence items={question.evidence} label="Fontes da pergunta"/>
          </div>}
        </div>
        <div className="rehearsal-coach-footer">
          {complete?<div className="rehearsal-footer-actions"><button className="rehearsal-primary" disabled={busy} onClick={onReview}>Revisar na mesa <ArrowRight size={17}/></button><button className="rehearsal-secondary" disabled={busy} onClick={onRewind}><RotateCcw size={15}/> {busy?'Rebobinando…':'Repetir a rodada'}</button></div>:turn?<div className="rehearsal-footer-actions"><button className="rehearsal-primary" disabled={busy} onClick={onNext}>{index===session.questions.length-1?'Concluir a rodada':'Próxima pergunta'} <ArrowRight size={17}/></button><button className="rehearsal-secondary" disabled={busy} onClick={onRewind}><RotateCcw size={15}/> {busy?'Rebobinando…':'Tentar esta resposta de novo'}</button></div>:<form className="rehearsal-composer" onSubmit={event=>{event.preventDefault();if(!busy&&answer.trim().length>=3)onSubmit();}}>
            <label className="rehearsal-label" htmlFor="rehearsal-answer">Como você responderia?</label>
            <textarea id="rehearsal-answer" rows={3} maxLength={5000} value={answer} disabled={busy} onChange={event=>onAnswer(event.target.value)} placeholder="Ensaie aqui, com suas próprias palavras…" aria-describedby="rehearsal-answer-hint" onKeyDown={event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter'&&!busy&&answer.trim().length>=3){event.preventDefault();onSubmit();}}}/>
            <div className="rehearsal-answer-meta" id="rehearsal-answer-hint"><span>Ctrl / ⌘ + Enter para enviar</span><span>{answer.length.toLocaleString('pt-BR')} / 5.000</span></div>
            <button type="submit" className="rehearsal-primary" disabled={busy||answer.trim().length<3}>{busy?<><LoaderCircle className="rehearsal-spin" size={16}/> Preparando sua devolutiva…</>:<>Receber devolutiva <ArrowRight size={17}/></>}</button>
          </form>}
        </div>
      </aside>
    </div>
  </section>;
}
