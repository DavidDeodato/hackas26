import {useEffect,useMemo,useRef,useState} from 'react';
import {AlertCircle,LoaderCircle} from 'lucide-react';
import {useLocation,useNavigate} from 'react-router-dom';
import type {RehearsalSession,RehearsalTurn,RehearsalWorkspace} from '../../shared/rehearsal-types';
import RehearsalRoom from '../components/rehearsal/RehearsalRoom';
import RehearsalSetup from '../components/rehearsal/RehearsalSetup';
import {api} from '../lib/api';
import '../components/rehearsal/rehearsal.css';
import '../components/rehearsal/rehearsal-reset.css';

type IncomingState={pitch?:string;artifactId?:string}|null;
type GenerateResponse={session:RehearsalSession;workspace:RehearsalWorkspace};

export default function RehearsalPage(){
  const location=useLocation(),navigate=useNavigate(),incoming=location.state as IncomingState;
  const [workspace,setWorkspace]=useState<RehearsalWorkspace|null>(null),[session,setSession]=useState<RehearsalSession|null>(null),[pitch,setPitch]=useState(incoming?.pitch||''),[selected,setSelected]=useState<string[]>([]),[answer,setAnswer]=useState(''),[questionIndex,setQuestionIndex]=useState(0),[shownTurn,setShownTurn]=useState<RehearsalTurn|null>(null),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[error,setError]=useState('');
  const artifactId=incoming?.artifactId;
  const pendingRequest=useRef(false);
  useEffect(()=>{let active=true;api<RehearsalWorkspace>('/rehearsal/state').then(data=>{if(!active)return;setWorkspace(data);setSelected(ids=>ids.filter(id=>data.audiences.some(profile=>profile.id===id)));const current=data.sessions.find(item=>item.id===data.activeSessionId);if(current&&!incoming?.pitch){setSession(current);const firstOpen=current.questions.findIndex(question=>!current.turns.some(turn=>turn.questionId===question.id));setQuestionIndex(firstOpen<0?current.questions.length:firstOpen);}}).catch(reason=>{if(active)setError((reason as Error).message);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false};},[]);
  const question=session?.questions[questionIndex]||null;
  const currentTurn=useMemo(()=>shownTurn||(question?session?.turns.find(turn=>turn.questionId===question.id):undefined),[shownTurn,question,session]);
  function toggleAudience(id:string){if(pendingRequest.current)return;setSelected(ids=>ids.includes(id)?ids.filter(item=>item!==id):ids.length<3?[...ids,id]:ids);}
  async function start(){if(pendingRequest.current||!workspace||pitch.trim().length<30||selected.length===0)return;pendingRequest.current=true;setBusy(true);setError('');try{const result=await api<GenerateResponse>('/rehearsal/generate',{pitch:pitch.trim(),audienceIds:selected,artifactId});setWorkspace(result.workspace);setSession(result.session);setQuestionIndex(0);setShownTurn(null);setAnswer('');}catch(reason){setError((reason as Error).message);}finally{pendingRequest.current=false;setBusy(false);}}
  async function submitAnswer(){if(pendingRequest.current||!session||!question||answer.trim().length<3)return;pendingRequest.current=true;setBusy(true);setError('');try{const result=await api<{turn:RehearsalTurn;workspace:RehearsalWorkspace}>('/rehearsal/answer',{sessionId:session.id,questionId:question.id,answer:answer.trim()});setWorkspace(result.workspace);const updated=result.workspace.sessions.find(item=>item.id===session.id)||{...session,turns:[...session.turns,result.turn]};setSession(updated);setShownTurn(result.turn);}catch(reason){setError((reason as Error).message);}finally{pendingRequest.current=false;setBusy(false);}}
  function next(){if(pendingRequest.current)return;setQuestionIndex(index=>index+1);setShownTurn(null);setAnswer('');}
  async function rewind(){if(pendingRequest.current||!session)return;const keepTurns=question?Math.max(0,questionIndex):0;pendingRequest.current=true;setBusy(true);setError('');try{const result=await api<GenerateResponse>('/rehearsal/rewind',{sessionId:session.id,keepTurns});setWorkspace(result.workspace);setSession(result.session);setQuestionIndex(Math.min(keepTurns,result.session.questions.length));setShownTurn(null);setAnswer('');}catch(reason){setError((reason as Error).message);}finally{pendingRequest.current=false;setBusy(false);}}
  function review(){if(pendingRequest.current||!session)return;const reflection=session.turns.map(turn=>{const q=session.questions.find(item=>item.id===turn.questionId);return `${q?.text||'Pergunta'}\nResposta original: ${turn.answer}\nSugestão: ${turn.feedback.suggestion}`}).join('\n\n');navigate('/mesa',{state:{artifactId:session.artifactId,reflection}});}
  function reset(){if(pendingRequest.current)return;if(session){setPitch(session.pitch);setSelected(session.audiences.map(item=>item.id).filter(id=>workspace?.audiences.some(item=>item.id===id)));}setSession(null);setQuestionIndex(0);setShownTurn(null);setAnswer('');setError('');}
  if(loading)return <div className="rehearsal-status" role="status"><LoaderCircle className="rehearsal-spin" size={25}/><h1>Abrindo a sala…</h1><p>Buscando seus perfis e ensaios salvos.</p></div>;
  if(!workspace)return <div className="rehearsal-status rehearsal-status-error" role="alert"><AlertCircle size={27}/><h1>Não conseguimos abrir a sala.</h1><p>{error||'A conexão não respondeu.'}</p><button className="rehearsal-primary" onClick={()=>window.location.reload()}>Tentar novamente</button></div>;
  return <>{error&&<div className="rehearsal-error" role="alert"><AlertCircle size={16}/><span>{error}</span><button onClick={()=>setError('')} aria-label="Fechar aviso">×</button></div>}{session?<RehearsalRoom session={session} question={question} turn={currentTurn} answer={answer} busy={busy} onAnswer={setAnswer} onSubmit={()=>void submitAnswer()} onNext={next} onRewind={()=>void rewind()} onReview={review} onNew={reset}/>:<RehearsalSetup pitch={pitch} audiences={workspace.audiences} selected={selected} busy={busy} artifactId={artifactId} onPitch={setPitch} onToggle={toggleAudience} onStart={()=>void start()} onAudience={()=>navigate('/audiencia')}/>}</>;
}
