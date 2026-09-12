import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {Workspace} from '../../shared/types';
import {api} from './api';
interface Store {workspace:Workspace;setWorkspace:(w:Workspace)=>void;mutate:(path:string,body:unknown)=>Promise<void>;busy:boolean;notify:(message:string)=>void;notice:string;health:{storage:string;aiConfigured:boolean}|null}
const Context=createContext<Store|null>(null);
const bootstraps=new Map<string,Promise<[Workspace,NonNullable<Store['health']>]>>();
export function WorkspaceProvider({children,identityKey='guest'}:{children:ReactNode;identityKey?:string}){const [workspace,setWorkspace]=useState<Workspace|null>(null),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[error,setError]=useState(''),[health,setHealth]=useState<Store['health']>(null);
 useEffect(()=>{let ignore=false;setWorkspace(null);setError('');setNotice('');let pending=bootstraps.get(identityKey);if(!pending){pending=Promise.all([api<Workspace>('/state'),api<NonNullable<Store['health']>>('/health')]);bootstraps.set(identityKey,pending);const current=pending;void pending.finally(()=>{if(bootstraps.get(identityKey)===current)bootstraps.delete(identityKey);}).catch(()=>{});}pending.then(([w,h])=>{if(!ignore){setWorkspace(w);setHealth(h);}}).catch(e=>{if(!ignore)setError(e.message);});return()=>{ignore=true;};},[identityKey]);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),7000);return()=>clearTimeout(timer);},[notice]);
 async function mutate(path:string,body:unknown){setBusy(true);try{setWorkspace(await api<Workspace>(path,body));}catch(e){setNotice((e as Error).message);throw e;}finally{setBusy(false);}}
 if(error)return <div className="loading-screen"><h1>Não conseguimos abrir seu espaço.</h1><p>{error}</p><button onClick={()=>location.reload()}>Tentar novamente</button></div>;
 if(!workspace)return <div className="loading-screen"><span className="brand-symbol">◀◀</span><h1>Abrindo seu espaço…</h1></div>;
 return <Context.Provider value={{workspace,setWorkspace,mutate,busy,notify:setNotice,notice,health}}>{children}</Context.Provider>;
}
export function useWorkspace(){const context=useContext(Context);if(!context)throw new Error('Workspace não disponível');return context;}
