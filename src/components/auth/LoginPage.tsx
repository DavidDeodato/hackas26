import {useState,type FormEvent} from 'react';
import {ArrowRight,Eye,EyeOff,LoaderCircle,LockKeyhole,Mail,UserRound,MessageSquareText,RotateCcw,Sparkles} from 'lucide-react';
import MiniWorld from '../spatial/MiniWorld';
import {useAuth} from '../../lib/auth';
import './auth.css';

export default function LoginPage(){
 const {login,register,enterDemo,error:sessionError,refresh}=useAuth();
 const [mode,setMode]=useState<'login'|'register'>('login'),[name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[visible,setVisible]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(event:FormEvent){event.preventDefault();if(busy)return;setError('');setBusy(true);try{if(mode==='register')await register(email.trim(),password,name.trim());else await login(email.trim(),password);}catch(e){setError(e instanceof Error?e.message:'Não foi possível entrar. Tente novamente.');}finally{setBusy(false);}}
 function switchMode(next:'login'|'register'){setMode(next);setError('');setPassword('');setVisible(false);}
 return <main className="auth-page">
  <section className="auth-story" aria-label="Seu espaço de preparação">
   <a className="auth-brand" href="/" aria-label="Rebobina, início"><img src="/brand/rebobina-logo-horizontal-dark.svg" alt="Rebobina"/></a>
   <div className="auth-story-copy"><span className="auth-eyebrow"><span/> CONVERSAS QUE IMPORTAM</span><h1>Seu próximo passo<br/>começa <em>antes.</em></h1><p>Ensaie a conversa. Explore outras respostas.<br/>Chegue mais preparado para o que importa.</p></div>
   <div className="auth-world"><MiniWorld variant="audience" count={3} label="Um espaço seguro para experimentar."/><div className="auth-scene-note"><span className="auth-scene-icon"><MessageSquareText size={17}/></span><div><strong>E se você tentasse de outro jeito?</strong><span>Aqui, sempre dá para rebobinar.</span></div><RotateCcw size={17}/></div></div>
   <footer className="auth-story-footer"><span><Sparkles size={14}/> Preparação com IA. Decisões suas.</span><span>Ensaio, não previsão.</span></footer>
  </section>
  <section className="auth-entry" aria-label={mode==='login'?'Entrar na sua conta':'Criar sua conta'}>
   <span className="auth-entry-index">01 / SEU ESPAÇO</span>
   <div className="auth-form-wrap">
    <div className="auth-form-icon"><LockKeyhole size={23}/></div>
    <span className="auth-eyebrow">{mode==='login'?'BOM TER VOCÊ AQUI':'UM NOVO COMEÇO'}</span>
    <h2>{mode==='login'?'A conversa começa aqui.':'Faça desse espaço seu.'}</h2>
    <p className="auth-intro">{mode==='login'?'Entre para continuar seus ensaios, ideias e descobertas.':'Crie sua conta, escolha seu avatar e prepare sua próxima conversa.'}</p>
    <div className="auth-mode" aria-label="Acesso à conta"><button type="button" aria-pressed={mode==='login'} className={mode==='login'?'selected':''} onClick={()=>switchMode('login')} disabled={busy}>Entrar</button><button type="button" aria-pressed={mode==='register'} className={mode==='register'?'selected':''} onClick={()=>switchMode('register')} disabled={busy}>Criar conta</button></div>
    <form onSubmit={submit} aria-busy={busy}>
     {mode==='register'?<label className="auth-field" htmlFor="auth-name"><span>Como podemos te chamar?</span><div><UserRound size={17}/><input id="auth-name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required minLength={2} maxLength={80} placeholder="Seu nome" disabled={busy}/></div></label>:null}
     <label className="auth-field" htmlFor="auth-email"><span>E-mail</span><div><Mail size={17}/><input id="auth-email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254} placeholder="voce@exemplo.com" disabled={busy}/></div></label>
     <label className="auth-field" htmlFor="auth-password"><span>Senha</span><div><LockKeyhole size={17}/><input id="auth-password" type={visible?'text':'password'} autoComplete={mode==='register'?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)} required minLength={mode==='register'?10:1} maxLength={128} placeholder={mode==='register'?'No mínimo 10 caracteres':'Sua senha'} disabled={busy} aria-describedby={mode==='register'?'auth-password-help':undefined}/><button className="auth-password-toggle" type="button" onClick={()=>setVisible(v=>!v)} aria-label={visible?'Ocultar senha':'Mostrar senha'} aria-pressed={visible}>{visible?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
     {mode==='register'?<small id="auth-password-help" className="auth-password-help">Use pelo menos 10 caracteres. Não reutilize uma senha importante.</small>:null}
     {error?<p className="auth-error" role="alert">{error}</p>:null}
     <button className="auth-submit" type="submit" disabled={busy}>{busy?<><LoaderCircle className="auth-spin" size={18}/> {mode==='login'?'Entrando…':'Criando seu espaço…'}</>:<>{mode==='login'?'Entrar no meu espaço':'Criar meu espaço'}<ArrowRight size={18}/></>}</button>
    </form>
    {sessionError&&!error?<p className="auth-connection-note" role="status">Não conseguimos verificar a sessão anterior. <button type="button" onClick={refresh}>Tentar novamente</button></p>:null}
    <div className="auth-demo-divider"><span/>OU CONHEÇA PRIMEIRO<span/></div>
    <button className="auth-demo" type="button" onClick={enterDemo} disabled={busy}>Explorar demonstração <ArrowRight size={15}/></button>
    <p className="auth-demo-note">Sem criar conta. Um espaço de demonstração neste navegador.</p>
   </div>
   <footer className="auth-entry-footer"><LockKeyhole size={12}/> Sua conta, seu espaço de preparação.</footer>
  </section>
 </main>;
}
