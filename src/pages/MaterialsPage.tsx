import {useMemo,useRef,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,BookOpen,Check,FileText,History,Plus,Save,Search,Upload,X} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import {useWorkspace} from '../lib/workspace';
import {api} from '../lib/api';
import type {Material,Workspace} from '../../shared/types';
import MiniWorld from '../components/spatial/MiniWorld';
import '../components/materials/materials.css';

type MaterialFilter='all'|'source'|'artifact';
const searchable=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
const formatDate=(value:string)=>new Date(value).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});

export default function MaterialsPage(){
 const {workspace,setWorkspace,notify}=useWorkspace();
 const navigate=useNavigate();
 const uploadRef=useRef<HTMLInputElement>(null);
 const launcherRef=useRef<HTMLElement|null>(null);
 const [editing,setEditing]=useState<Material|null>(null);
 const [open,setOpen]=useState(false);
 const [title,setTitle]=useState('');
 const [content,setContent]=useState('');
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState('');
 const [imported,setImported]=useState('');
 const [filter,setFilter]=useState<MaterialFilter>('all');
 const [query,setQuery]=useState('');
 const grouped=useMemo(()=>({source:workspace.materials.filter(m=>m.kind==='source').slice().reverse(),artifact:workspace.materials.filter(m=>m.kind==='artifact').slice().reverse()}),[workspace.materials]);
 const revisedIds=useMemo(()=>new Set(workspace.materials.map(material=>material.parentId).filter(Boolean)),[workspace.materials]);
 const matching=useMemo(()=>workspace.materials.filter(material=>
  (filter==='all'||material.kind===filter)&&searchable(material.title+' '+material.content).includes(searchable(query.trim()))
 ),[workspace.materials,filter,query]);

 function edit(material?:Material){
  launcherRef.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
  setEditing(material??null);setTitle(material?.title??'');setContent(material?.content??'');setError('');setImported('');setOpen(true);
 }
 async function save(){
  if(saving||!title.trim()||!content.trim())return;
  setSaving(true);setError('');
  try{
   const response=await api<{workspace:Workspace}>('/materials',{title:title.trim(),content:content.trim(),parentId:editing?.id});
   setWorkspace(response.workspace);setOpen(false);
   notify(editing?'Nova versão salva. A versão anterior continua disponível.':'Fonte salva. Você já pode usá-la na mesa.');
  }catch(saveError){setError((saveError as Error).message);}finally{setSaving(false);}
 }
 async function importText(file?:File){
  if(!file)return;
  setError('');setImported('');
  if(!/\.txt$/i.test(file.name)&&file.type!=='text/plain'){setError('Escolha um arquivo de texto .txt.');return;}
  if(file.size>48000){setError('O arquivo deve ter até 48 KB. Você também pode colar um trecho abaixo.');return;}
  try{
   const text=await file.text();
   if(text.length>12000){setError('O arquivo tem mais de 12.000 caracteres. Cole o trecho que deseja usar.');return;}
   setContent(text);setTitle(current=>current||file.name.replace(/\.txt$/i,'').slice(0,100));setImported(file.name);
  }catch{setError('Não foi possível ler o arquivo. Tente outro .txt ou cole o conteúdo.');}
 }

 return <div className="materials-page">
  <header className="page-heading materials-heading">
   <div><span className="eyebrow">SUA BIBLIOTECA</span><h1>Meus materiais<span className="heading-dot">.</span></h1><p>O contexto da conversa. O caminho das suas ideias.</p></div>
   <button className="button primary" onClick={()=>edit()}><Plus size={17}/> Adicionar fonte</button>
  </header>

  <div className="materials-columns">
  <section className="materials-world" aria-label="Sua biblioteca de contexto">
   <MiniWorld variant="materials" count={workspace.materials.length} label="Boas conversas têm uma base."/>
   <div className="materials-world-footer"><span><BookOpen size={15}/>{grouped.source.length} {grouped.source.length===1?'fonte':'fontes'}</span><span><FileText size={15}/>{grouped.artifact.length} {grouped.artifact.length===1?'pitch ou resposta':'pitches e respostas'}</span><span className="materials-history-note"><History size={15}/>Cada revisão guarda a anterior</span></div>
  </section>

  <section className="materials-library" aria-label="Materiais salvos">
   <div className="materials-toolbar">
    <div className="materials-filters" role="group" aria-label="Filtrar materiais">
     {([{value:'all',label:'Todos',count:workspace.materials.length},{value:'source',label:'Fontes',count:grouped.source.length},{value:'artifact',label:'Pitches e respostas',count:grouped.artifact.length}] as const).map(option=><button key={option.value} type="button" aria-pressed={filter===option.value} onClick={()=>setFilter(option.value)}>{option.label}<span>{option.count}</span></button>)}
    </div>
    <div className="materials-search"><Search size={17} aria-hidden="true"/><input aria-label="Buscar nos materiais" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Buscar nos materiais"/>{query?<button type="button" aria-label="Limpar busca" onClick={()=>setQuery('')}><X size={15}/></button>:null}</div>
   </div>
   {query?<p className="materials-search-summary" role="status">{matching.length} {matching.length===1?'material encontrado':'materiais encontrados'} para “{query}”</p>:null}
   {query&&!matching.length?<div className="materials-no-results"><Search size={26}/><h2>Nenhum material por aqui.</h2><p>Tente outra palavra ou procure em todos os materiais.</p><button className="text-button" onClick={()=>{setQuery('');setFilter('all');}}>Limpar busca <ArrowRight size={15}/></button></div>:
    (['source','artifact'] as const).filter(kind=>filter==='all'||filter===kind).map(kind=>{
     const items=grouped[kind].filter(material=>matching.includes(material));const isSource=kind==='source';
     if(query&&!items.length)return null;
     return <section className="materials-collection" key={kind} aria-labelledby={'collection-'+kind}>
      <div className="materials-collection-heading"><div><span className="materials-section-number">{isSource?'01':'02'}</span><h2 id={'collection-'+kind}>{isSource?'Fontes da apresentação':'Pitches e respostas'}</h2></div><p>{isSource?'Referências para fundamentar o que você diz.':'Da primeira ideia à próxima versão.'}</p></div>
      <div className="materials-cards">
       {items.map(material=><article className={'materials-document materials-document--'+kind} key={material.id}>
        <span className="materials-document-symbol" aria-hidden="true">{isSource?<BookOpen size={22}/>:<FileText size={22}/>}</span>
        <div className="materials-document-body"><div className="materials-document-meta"><span>{isSource?'Fonte':'Pitch / resposta'}</span><span className="materials-version">v{material.version}{revisedIds.has(material.id)?' · histórico':''}</span></div><h3>{material.title}</h3><p>{material.content.slice(0,130)}{material.content.length>130?'…':''}</p>
         <footer><span>{formatDate(material.createdAt)}</span><button className="text-button" onClick={()=>isSource?edit(material):navigate('/mesa',{state:{artifactId:material.id}})}>{isSource?'Abrir fonte':'Abrir na mesa'}<ArrowUpRight size={15}/></button></footer>
        </div>
       </article>)}
       {isSource&&!query?<button className={'materials-add-card'+(!items.length?' materials-add-card--empty':'')} onClick={()=>edit()}><span className="materials-add-icon"><Plus size={22}/></span><strong>{items.length?'Adicionar uma fonte':'Sua conversa começa aqui.'}</strong><span>{items.length?'Uma referência, notas ou critérios.':'Cole suas notas ou importe um .txt para dar contexto à preparação.'}</span><span className="materials-add-link">{items.length?'Colar texto ou importar .txt':'Adicionar primeira fonte'}<ArrowUpRight size={15}/></span></button>:null}
       {!items.length&&!isSource?<div className="materials-empty"><span className="materials-empty-icon"><FileText size={25}/></span><div><h3>A próxima versão começa na mesa.</h3><p>Transforme suas fontes em um pitch ou resposta. Ao salvar, o material aparece aqui.</p></div><button className="button secondary" onClick={()=>navigate('/mesa')}>Ir para a mesa <ArrowRight size={16}/></button></div>:null}
      </div>
     </section>;
    })
   }
  </section>
  </div>

  <Dialog.Root open={open} onOpenChange={value=>{if(!saving)setOpen(value);}}><Dialog.Portal>
   <Dialog.Overlay className="dialog-overlay materials-dialog-overlay"/>
   <Dialog.Content className="dialog-panel materials-dialog" onCloseAutoFocus={event=>{event.preventDefault();launcherRef.current?.focus({preventScroll:true});}} onEscapeKeyDown={event=>{if(saving)event.preventDefault();}} onPointerDownOutside={event=>{if(saving)event.preventDefault();}}>
    <Dialog.Close className="icon-button dialog-close" aria-label="Fechar" disabled={saving}><X size={20}/></Dialog.Close>
    <span className="materials-dialog-icon"><BookOpen size={25}/></span><span className="eyebrow">{editing?'VERSÃO '+editing.version+' → '+(editing.version+1):'NOVA REFERÊNCIA'}</span>
    <Dialog.Title>{editing?'Sua fonte, uma versão adiante.':'Dê contexto à conversa.'}</Dialog.Title>
    <Dialog.Description>{editing?'Edite o conteúdo e salve uma nova versão. A original permanece na biblioteca.':'Adicione referências, notas ou critérios para fundamentar sua preparação.'}</Dialog.Description>
    <form onSubmit={event=>{event.preventDefault();void save();}}>
     <label className="field-label" htmlFor="material-title">Título</label><input id="material-title" value={title} onChange={event=>setTitle(event.target.value)} maxLength={100} required disabled={saving} placeholder="Ex.: critérios da apresentação"/>
     <div className="materials-content-label"><label className="field-label" htmlFor="material-content">Conteúdo</label><span>{content.length.toLocaleString('pt-BR')} / 12.000</span></div><textarea id="material-content" value={content} onChange={event=>setContent(event.target.value)} rows={7} maxLength={12000} required disabled={saving} placeholder="Cole aqui as informações que devem sustentar a preparação…"/>
     <input ref={uploadRef} className="materials-file-input" tabIndex={-1} aria-label="Arquivo de texto" type="file" accept=".txt,text/plain" disabled={saving} onChange={event=>{void importText(event.target.files?.[0]);event.target.value='';}}/>
     <div className="materials-import-row"><button type="button" className="materials-import-button" disabled={saving} onClick={()=>uploadRef.current?.click()}><Upload size={16}/>Importar .txt</button><span>Até 48 KB e 12.000 caracteres</span></div>
     {imported?<p className="materials-imported" role="status"><Check size={14}/>{imported}</p>:null}
     {error?<p className="materials-form-error" role="alert">{error}</p>:null}
     <p className="fine-print">Inclua apenas o contexto necessário. Evite dados pessoais e informações confidenciais.</p>
     <button className="button primary wide" type="submit" disabled={saving||!title.trim()||!content.trim()}><Save size={16}/>{saving?'Salvando…':editing?'Salvar nova versão':'Salvar fonte'}</button>
    </form>
   </Dialog.Content>
  </Dialog.Portal></Dialog.Root>
 </div>;
}
