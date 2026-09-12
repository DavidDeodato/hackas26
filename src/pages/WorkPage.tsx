import {useMemo,useRef,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowRight,ArrowUp,Check,ChevronDown,Download,FileText,LoaderCircle,MessageCircle,Presentation,RotateCcw,Sparkles,Square} from 'lucide-react';
import {useWorkspace} from '../lib/workspace';
import {api} from '../lib/api';
import type {Material,Workspace,WorkResult} from '../../shared/types';
import MiniWorld from '../components/spatial/MiniWorld';
import '../components/work/work-polish.css';

type MesaState={artifactId?:string;reflection?:string};

const pitchPrompts=[
 {label:'Preparar um pitch',icon:FileText,prompt:'Prepare um pitch curto com problema, proposta, evidências e próximo passo.'},
 {label:'Revisar uma resposta',icon:MessageCircle,prompt:'Revise esta resposta para deixá-la clara, direta e sustentada pelas fontes.'},
 {label:'Encontrar lacunas',icon:Sparkles,prompt:'Liste as perguntas difíceis que esta apresentação ainda não responde.'}
];

export default function WorkPage(){
 const location=useLocation();
 const incoming=(location.state as MesaState|null)??null;
 return <WorkStudio key={`${location.pathname}:${JSON.stringify(incoming)}`} incoming={incoming}/>;
}

function WorkStudio({incoming}:{incoming:MesaState|null}){
 const {workspace,setWorkspace,notify}=useWorkspace();
 const navigate=useNavigate();
 const initialArtifact=incoming?.artifactId
  ?workspace.materials.find(material=>material.id===incoming.artifactId&&material.kind==='artifact')
  :workspace.materials.filter(material=>material.kind==='artifact').at(-1);
 const [selectedId,setSelectedId]=useState(initialArtifact?.id??'');
 const [mode,setMode]=useState<'chat'|'work'>('work');
 const [reflectionPending,setReflectionPending]=useState(Boolean(incoming?.reflection?.trim()));
 const [prompt,setPrompt]=useState(()=>incoming?.reflection?.trim()
  ?`Revise este material a partir do feedback do ensaio. Preserve o que funcionou e corrija apenas o que o feedback sustenta.\n\nFeedback do ensaio:\n${incoming.reflection.trim()}`.slice(0,5000)
  :'');
 const sourceMaterials=useMemo(()=>workspace.materials.filter(material=>material.kind==='source'),[workspace.materials]);
 const artifacts=useMemo(()=>workspace.materials.filter(material=>material.kind==='artifact').slice().reverse(),[workspace.materials]);
 const [selectedSources,setSelectedSources]=useState<string[]>(()=>initialArtifact
  ?initialArtifact.sources.filter(id=>sourceMaterials.some(source=>source.id===id)).slice(0,9)
  :sourceMaterials.slice(-2).map(material=>material.id));
 const [running,setRunning]=useState(false);
 const [reply,setReply]=useState('');
 const [steps,setSteps]=useState<string[]>([]);
 const [error,setError]=useState('');
 const abort=useRef<AbortController|null>(null);
 const promptRef=useRef<HTMLTextAreaElement>(null);
 const artifact=artifacts.find(material=>material.id===selectedId);
 const activeSources=selectedSources.filter(id=>sourceMaterials.some(material=>material.id===id));
 const validPrompt=prompt.trim().length>=3;
 const canRehearse=Boolean(artifact?.content.trim())&&!running;
 const missingOriginal=Boolean(incoming?.artifactId)&&!initialArtifact;

 function usePrompt(value:string){
  setMode('work');setPrompt(value);setError('');
  promptRef.current?.focus({preventScroll:true});
 }

 function openArtifact(id:string){
  setSelectedId(id);setReply('');setSteps([]);setError('');
  const material=artifacts.find(item=>item.id===id);
  if(material)setSelectedSources(material.sources.filter(sourceId=>sourceMaterials.some(source=>source.id===sourceId)).slice(0,9));
 }

 async function run(){
  const cleanPrompt=prompt.trim();
  if(cleanPrompt.length<3||abort.current)return;
  setRunning(true);setSteps([]);setError('');
  const controller=new AbortController();
  abort.current=controller;
  try{
   const sourceIds=Array.from(new Set([...activeSources,...(artifact?[artifact.id]:[])]));
   const result=await api<{result:WorkResult;workspace:Workspace;material?:Material}>('/work',{
    prompt:cleanPrompt,mode,sourceIds,parentId:mode==='work'?artifact?.id:undefined
   },controller.signal);
   setWorkspace(result.workspace);setReply(result.result.content);setSteps(result.result.steps);
   if(result.material)setSelectedId(result.material.id);
   setPrompt('');setReflectionPending(false);
  }catch(cause){
   if((cause as Error).name==='AbortError'){
    notify('Espera interrompida. A execução enviada pode terminar no servidor.');
    api<Workspace>('/state').then(setWorkspace).catch(()=>undefined);
   }else setError((cause as Error).message);
  }finally{setRunning(false);abort.current=null;}
 }

 function download(){
  if(!artifact)return;
  const url=URL.createObjectURL(new Blob([artifact.content],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');
  link.href=url;
  link.download=`rebobina-${artifact.title.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')||'pitch'}-v${artifact.version}.txt`;
  link.click();URL.revokeObjectURL(url);
 }

 return <div className="work-page">
  <header className="page-heading">
   <div><span className="eyebrow">PREPARE, ENSAIE, REBOBINE</span><h1>Mesa de trabalho<span className="heading-dot">.</span></h1><p>Construa seu pitch e revise respostas com apoio das fontes.</p></div>
  </header>
  {reflectionPending?<div className="mesa-return" role="status">
   <RotateCcw size={18}/><div><b>De volta do ensaio</b><span>{missingOriginal?'O material original não foi encontrado. Seu feedback está no pedido abaixo.':'Seu feedback está no pedido abaixo. Preparar cria uma nova versão.'}</span></div>
  </div>:null}
  <div className={`work-layout${artifact?' has-artifact':''}${reflectionPending?' has-reflection':''}`}>
   <section className={`work-conversation${reply?' has-reply':''}`} aria-label="Orientador de preparação">
    <div className="work-topline">
     <div className="segmented" aria-label="Modo de trabalho">
      <button type="button" disabled={running} aria-pressed={mode==='chat'} className={mode==='chat'?'active':''} onClick={()=>setMode('chat')}><MessageCircle size={16}/> Conversar</button>
      <button type="button" disabled={running} aria-pressed={mode==='work'} className={mode==='work'?'active':''} onClick={()=>setMode('work')}><Sparkles size={16}/> Preparar</button>
     </div>
     <span className="mesa-orientador">Orientador</span>
    </div>
    <div className="conversation-body" tabIndex={reply?0:undefined} role={reply?'region':undefined} aria-label={reply?'Resposta do orientador':undefined}>
     {!reply?<div className="work-intro">
      <div className="mesa-mini-world"><MiniWorld variant="work" count={artifacts.length} label="Sua mesa de criação"/></div>
      <p>Prepare o que importa. Encontre as palavras antes de entrar na sala.</p>
      <div className="starter-prompts">{pitchPrompts.map(({label,icon:Icon,prompt:starter})=><button type="button" disabled={running} key={label} onClick={()=>usePrompt(starter)}><Icon size={17}/><span>{label}</span><ArrowRight size={15}/></button>)}</div>
     </div>:<>
      <div className="assistant-label"><Sparkles size={17}/> Orientador Rebobina</div>
      <div className="document-text">{reply}</div>
      {steps.length?<details className="mesa-result-details"><summary><Check size={15}/> Como foi preparado <ChevronDown size={14}/></summary><div className="run-steps">{steps.map((step,index)=><span key={index}><Check size={13}/>{step}</span>)}</div></details>:null}
     </>}
    </div>
    <div className="composer-area">
     <details className="source-selector">
      <summary><FileText size={15}/><span>Fontes selecionadas</span><b>{activeSources.length}</b><ChevronDown size={15}/></summary>
      <div className="mesa-source-list">{sourceMaterials.length?sourceMaterials.map(material=>{
       const checked=activeSources.includes(material.id);
       return <label key={material.id}><input type="checkbox" disabled={running||(!checked&&activeSources.length>=9)} checked={checked} onChange={event=>setSelectedSources(ids=>event.target.checked?Array.from(new Set([...ids,material.id])):ids.filter(id=>id!==material.id))}/><span>{material.title}<small>Versão {material.version}</small></span></label>;
      }):<p>Adicione uma fonte em Meus materiais para fundamentar a preparação.</p>}</div>
     </details>
     <form onSubmit={event=>{event.preventDefault();void run();}} aria-busy={running}>
      <label className="mesa-composer-label" htmlFor="mesa-prompt">{mode==='chat'?'Sua pergunta':'Seu pedido'}</label>
      <textarea id="mesa-prompt" ref={promptRef} disabled={running} value={prompt} onChange={event=>setPrompt(event.target.value)} aria-label="Pedido para o orientador" placeholder={artifact?'O que você quer melhorar nesta versão?':'Cole seu pitch ou descreva o que quer preparar…'} rows={3} maxLength={5000}/>
      <div className="composer-bottom">
       <span role="status">{running?<><LoaderCircle size={14} className="spin"/> Preparando…</>:mode==='work'?(artifact?`Revisão da v${artifact.version}. A anterior fica salva.`:'Preparar salva seu primeiro material.'):'Conversar não altera seus materiais.'}</span>
       {running?<button className="send-button mesa-stop" type="button" onClick={()=>abort.current?.abort()}><Square size={14}/> Parar espera</button>:<button className="send-button" disabled={!validPrompt} aria-label={mode==='work'?'Preparar material':'Enviar pergunta'}><span>{mode==='work'?'Preparar':'Enviar'}</span><ArrowUp size={17}/></button>}
      </div>
     </form>
     {error?<p className="mesa-error" role="alert">{error}</p>:null}
    </div>
   </section>
   <aside className="artifact-pane" aria-label="Material em revisão">
    <div className="artifact-header"><span><FileText size={17}/> Pitch e respostas</span>{artifact?<span className="tag">v{artifact.version}</span>:null}</div>
    {artifacts.length?<label className="mesa-artifact-picker"><span>Material aberto</span><select disabled={running} value={artifact?.id??''} onChange={event=>openArtifact(event.target.value)}><option value="">Novo material</option>{artifacts.map(item=><option value={item.id} key={item.id}>{item.title} · v{item.version}</option>)}</select></label>:null}
    {artifact?<><div className="mesa-document-scroll" tabIndex={0} role="region" aria-label="Texto do material"><h2>{artifact.title}</h2><div className="document-text artifact-content">{artifact.content}</div></div>
     <div className="artifact-footer">
      <button disabled={!canRehearse} className={`button ${validPrompt||running?'secondary':'primary'} wide`} onClick={()=>navigate('/ensaio',{state:{pitch:artifact.content,artifactId:artifact.id}})}><Presentation size={17}/> Ensaiar apresentação <ArrowRight size={16}/></button>
      <details className="mesa-artifact-actions"><summary>Outras ações <ChevronDown size={14}/></summary><div><button disabled={running} className="text-button" onClick={()=>usePrompt('Revise este material para uma apresentação: preserve a ideia central, torne a mensagem mais clara e mantenha somente afirmações sustentadas pelas fontes selecionadas.')}><RotateCcw size={15}/> Criar revisão</button><button className="text-button" onClick={download}><Download size={15}/> Baixar texto</button></div></details>
     </div>
    </>:<div className="artifact-empty"><span className="mesa-empty-mark"><FileText size={30} strokeWidth={1.25}/></span><h3>Seu pitch começa aqui.</h3><p>Use Preparar para transformar suas ideias na primeira versão.</p><span className="mesa-empty-next"><Presentation size={16}/> Depois, leve ao ensaio.</span></div>}
   </aside>
  </div>
  <details className="mesa-secondary"><summary>Outros tipos de conversa <ChevronDown size={14}/></summary><button className="text-button" onClick={()=>navigate('/atendimento')}>Explorar atendimento <ArrowRight size={15}/></button></details>
 </div>;
}
