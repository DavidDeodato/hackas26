import {useRef,useState} from 'react';
import {NavLink,Route,Routes} from 'react-router-dom';
import {BookOpen,Check,ChevronRight,Presentation,LayoutPanelLeft,Sparkles,Users,X,Store,MessageSquareText,ScanText,Clapperboard,UserRound,LoaderCircle} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import {useWorkspace,WorkspaceProvider} from './lib/workspace';
import {AuthProvider,useAuth} from './lib/auth';
import LoginPage from './components/auth/LoginPage';
import ProfileDialog from './components/auth/ProfileDialog';
import WorldPage from './pages/WorldPage';
import WorkPage from './pages/WorkPage';
import MaterialsPage from './pages/MaterialsPage';
import AttemptsPage from './pages/AttemptsPage';
import RehearsalPage from './pages/RehearsalPage';
import AudiencePage from './pages/AudiencePage';
import './shell-polish.css';
const links=[{to:'/',label:'Sala de ensaio',short:'Ensaio',icon:Presentation},{to:'/audiencia',label:'Minha audiência',short:'Audiência',icon:Users},{to:'/mesa',label:'Mesa de trabalho',short:'Mesa',icon:LayoutPanelLeft},{to:'/materiais',label:'Meus materiais',short:'Materiais',icon:BookOpen}];
const roles=[{name:'Mapeador de audiência',icon:Users,text:'Organiza evidências profissionais em hipóteses de avaliação. Não infere pensamentos privados nem personalidade.'},{name:'Diretor de ensaio',icon:Clapperboard,text:'Cruza o seu pitch com essas lentes e sugere perguntas plausíveis. Não prevê o que alguém vai perguntar.'},{name:'Orientador de resposta',icon:MessageSquareText,text:'Analisa a clareza e as evidências da sua resposta e propõe melhorias para você revisar.'},{name:'Verificador de referências',icon:ScanText,text:'Código confere se os trechos citados estão nas fontes e preserva o histórico ao rebobinar. Não comprova a verdade de uma fonte.'}];
export default function App(){
 return <AuthProvider><AuthGate/></AuthProvider>;
}
function AuthGate(){
 const {user,loading,guest,sessionKey}=useAuth();
 if(loading)return <div className="auth-loading"><img src="/brand/rebobina-logo-horizontal-dark.svg" alt="Rebobina"/><div role="status"><LoaderCircle className="auth-spin" size={18}/> Preparando seu espaço…</div></div>;
 if(!user&&!guest)return <LoginPage/>;
 return <WorkspaceProvider key={sessionKey} identityKey={sessionKey}><AppShell/></WorkspaceProvider>;
}
function AppShell(){
 const {notice}=useWorkspace();const {user,leaveDemo}=useAuth();const [team,setTeam]=useState(false),[profile,setProfile]=useState(false);const teamButtonRef=useRef<HTMLButtonElement>(null),profileReturnRef=useRef<HTMLElement|null>(null);
 const openProfile=(element:HTMLElement)=>{if(!user){leaveDemo();return;}profileReturnRef.current=element;setProfile(true);};
 return <div className="app-shell rb-shell">
  <a className="skip-link" href="#main">Pular para o conteúdo</a>
  <aside className="sidebar" aria-label="Seu estúdio Rebobina">
   <NavLink to="/" className="brand"><img className="brand-wordmark" src="/brand/rebobina-logo-horizontal-dark.svg" alt="Rebobina"/><img className="brand-mobile-mark" src="/brand/rebobina-symbol.svg" alt="Rebobina"/></NavLink>
   <span className="nav-caption">SEU ESTÚDIO</span>
   <nav aria-label="Navegação principal">{links.map(({to,label,short,icon:Icon})=><NavLink end={to==='/'} to={to} key={to} className={({isActive})=>isActive?'nav-item active':'nav-item'}><span className="nav-icon" aria-hidden="true"><Icon size={19}/></span><span className="nav-label" aria-hidden="true">{short}</span><span className="nav-accessible-label">{label}</span><span className="nav-active-mark" aria-hidden="true"/></NavLink>)}</nav>
   <div className="sidebar-bottom">
    <NavLink to="/atendimento" className="other-lab"><Store size={15}/><span>Atendimento</span><ChevronRight size={12}/></NavLink>
    <button ref={teamButtonRef} className="team-button" aria-haspopup="dialog" onClick={()=>setTeam(true)}><span className="team-icon"><Sparkles size={17}/></span><span><b>Sua equipe</b><small>Os papéis da IA</small></span><ChevronRight size={14}/></button>
    <button type="button" className="session-label profile-trigger" aria-label={user?'Abrir meu perfil':'Entrar na minha conta'} aria-haspopup={user?'dialog':undefined} onClick={event=>openProfile(event.currentTarget)}><span className="session-avatar" aria-hidden="true" style={{backgroundColor:user?.avatar?.topColor}}>{user?user.name.slice(0,1).toUpperCase():<UserRound size={16}/>}</span><div><b>{user?user.name:'Entrar'}</b><small>{user?'Meu perfil':'Modo demonstração'}</small></div><ChevronRight size={12}/></button>
    <small className="prototype-label">Ensaio, não previsão.</small>
   </div>
  </aside>
  <button type="button" className="mobile-profile-trigger" aria-label={user?'Abrir meu perfil':'Entrar na minha conta'} aria-haspopup={user?'dialog':undefined} onClick={event=>openProfile(event.currentTarget)}><UserRound size={18}/></button>
  <main id="main" className="main-content" tabIndex={-1}><Routes>
   <Route path="/" element={<RehearsalPage/>}/><Route path="/ensaio" element={<RehearsalPage/>}/><Route path="/audiencia" element={<AudiencePage/>}/>
   <Route path="/mesa" element={<WorkPage/>}/><Route path="/materiais" element={<MaterialsPage/>}/><Route path="/atendimento" element={<WorldPage/>}/><Route path="/tentativas" element={<AttemptsPage/>}/><Route path="*" element={<RehearsalPage/>}/>
  </Routes></main>
  {notice&&<div className="toast" role="status"><Check size={16}/>{notice}</div>}
  <ProfileDialog open={profile} onOpenChange={setProfile} returnFocusRef={profileReturnRef}/>
  <Dialog.Root open={team} onOpenChange={setTeam}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog-panel rb-team-dialog" onCloseAutoFocus={event=>{event.preventDefault();teamButtonRef.current?.focus();}}>
   <Dialog.Close className="icon-button dialog-close" aria-label="Fechar"><X size={20}/></Dialog.Close><span className="eyebrow"><Users size={15}/> RESPONSABILIDADES CLARAS</span>
   <Dialog.Title>Sua equipe de IA</Dialog.Title><Dialog.Description>Cada papel tem um trabalho. Nenhum toma a decisão por você.</Dialog.Description>
   <div className="team-role-grid">{roles.map(({name,text,icon:Icon},i)=><div className="role-row" key={name}><span className="role-number">0{i+1}</span><span className="role-icon" aria-hidden="true"><Icon size={20}/></span><div><h3>{name}</h3><p>{text}</p></div></div>)}</div>
   <p className="fine-print"><Sparkles size={13}/> Papéis acionados quando necessários. Nenhuma mensagem é enviada para a pessoa representada.</p>
  </Dialog.Content></Dialog.Portal></Dialog.Root>
 </div>;
}
