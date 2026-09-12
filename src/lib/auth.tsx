import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import type {AuthUser,AvatarConfig} from '../../shared/auth';

type ProfilePatch={name?:string;avatar?:AvatarConfig};
interface AuthContextValue {
 user:AuthUser|null;loading:boolean;error:string;guest:boolean;sessionKey:string;
 login:(email:string,password:string)=>Promise<void>;
 register:(email:string,password:string,name:string)=>Promise<void>;
 logout:()=>Promise<void>;updateProfile:(patch:ProfilePatch)=>Promise<void>;
 enterDemo:()=>void;leaveDemo:()=>void;refresh:()=>void;
}
const AuthContext=createContext<AuthContextValue|null>(null);
const DEMO_KEY='rebobina.explicit-demo.v1';
const SESSION_EVENT='rebobina.auth-change.v1';
function notifyOtherTabs(){try{localStorage.setItem(SESSION_EVENT,`${Date.now()}:${Math.random()}`);}catch{/* Explicit focus revalidation remains available. */}}
function demoPreference(){try{return sessionStorage.getItem(DEMO_KEY)==='true';}catch{return false;}}
function setDemoPreference(value:boolean){try{if(value)sessionStorage.setItem(DEMO_KEY,'true');else sessionStorage.removeItem(DEMO_KEY);}catch{/* Session still works when storage is unavailable. */}}
function resetNavigation(){history.replaceState(null,'','/');window.dispatchEvent(new PopStateEvent('popstate',{state:null}));}

async function authRequest(path:string,method='GET',body?:unknown,signal?:AbortSignal):Promise<{user:AuthUser|null}>{
 const response=await fetch('/api/auth'+path,{method,credentials:'same-origin',headers:{'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:signal?AbortSignal.any([signal,AbortSignal.timeout(15000)]):AbortSignal.timeout(15000)});
 const data=await response.json().catch(()=>null);
 if(!response.ok)throw new Error(typeof data?.error==='string'?data.error:'Não foi possível acessar sua conta. Tente novamente.');
 if(!data||!('user' in data)){
  if(path==='/logout')return {user:null};
  throw new Error('A resposta da conta não está disponível. Tente novamente.');
 }
 return data;
}

export function AuthProvider({children}:{children:ReactNode}){
 const epoch=useRef(0);
 const [user,setUser]=useState<AuthUser|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[guest,setGuest]=useState(demoPreference),[revision,setRevision]=useState(0),[refreshId,setRefreshId]=useState(0);
 useEffect(()=>{const controller=new AbortController();let active=true;setLoading(true);setError('');
  authRequest('/me','GET',undefined,controller.signal).then(result=>{if(active){setUser(result.user);if(result.user){setGuest(false);setDemoPreference(false);}}}).catch(e=>{if(active&&!controller.signal.aborted)setError(e instanceof Error?e.message:'Não foi possível verificar sua conta.');}).finally(()=>{if(active)setLoading(false);});
  return()=>{active=false;controller.abort();};
 },[refreshId]);
 useEffect(()=>{const changed=(event:StorageEvent)=>{if(event.key!==SESSION_EVENT)return;epoch.current+=1;setLoading(true);setUser(null);setGuest(false);setDemoPreference(false);resetNavigation();setRevision(v=>v+1);setRefreshId(v=>v+1);};window.addEventListener('storage',changed);return()=>window.removeEventListener('storage',changed);},[]);
 useEffect(()=>{let active=true;const controller=new AbortController();const check=()=>{authRequest('/me','GET',undefined,controller.signal).then(result=>{if(!active||result.user?.id===user?.id)return;epoch.current+=1;resetNavigation();setUser(result.user);setGuest(false);setDemoPreference(false);setRevision(v=>v+1);setError('');}).catch(()=>{/* Keep the current view on transient network failure; mutations still require the server session. */});};window.addEventListener('focus',check);return()=>{active=false;controller.abort();window.removeEventListener('focus',check);};},[user?.id]);
 async function authenticate(path:string,body:unknown){const attempt=epoch.current;const result=await authRequest(path,'POST',body);if(attempt!==epoch.current)throw new Error('A sessão mudou em outra aba. Tente entrar novamente.');if(!result.user)throw new Error('Não foi possível iniciar a sessão.');resetNavigation();setDemoPreference(false);setGuest(false);setUser(result.user);setError('');setRevision(v=>v+1);notifyOtherTabs();}
 async function logout(){const attempt=epoch.current;await authRequest('/logout','POST',{});if(attempt!==epoch.current)return;resetNavigation();setDemoPreference(false);setGuest(false);setUser(null);setError('');setRevision(v=>v+1);notifyOtherTabs();}
 async function updateProfile(patch:ProfilePatch){const attempt=epoch.current;const result=await authRequest('/profile','PATCH',patch);if(attempt!==epoch.current)throw new Error('A sessão mudou. Reabra seu perfil para continuar.');if(!result.user)throw new Error('Entre novamente para salvar seu perfil.');setUser(result.user);}
 function enterDemo(){resetNavigation();setGuest(true);setDemoPreference(true);setRevision(v=>v+1);}
 function leaveDemo(){resetNavigation();setGuest(false);setDemoPreference(false);setRevision(v=>v+1);}
 return <AuthContext.Provider value={{user,loading,error,guest,sessionKey:`${user?.id||'guest'}:${revision}`,login:(email,password)=>authenticate('/login',{email,password}),register:(email,password,name)=>authenticate('/register',{email,password,name}),logout,updateProfile,enterDemo,leaveDemo,refresh:()=>setRefreshId(v=>v+1)}}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('Conta indisponível fora do AuthProvider.');return value;}
export function useOptionalAuth(){return useContext(AuthContext);}
