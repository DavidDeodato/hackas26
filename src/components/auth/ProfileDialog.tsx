import {useEffect,useState,type FormEvent,type RefObject} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Check,LoaderCircle,LogOut,Save,SlidersHorizontal,X} from 'lucide-react';
import {defaultAvatar,type AvatarConfig} from '../../../shared/auth';
import {useAuth} from '../../lib/auth';
import AvatarPreview from '../avatar/AvatarPreview';

const palettes={
 skinColor:[['Porcelana','#f1c8aa'],['Areia','#deb08a'],['Mel','#c88f68'],['Canela','#a96f4d'],['Cacau','#75482f'],['Ébano','#4b3025']],
 hairColor:[['Escuro','#211e1b'],['Castanho','#382820'],['Cobre','#935139'],['Loiro','#c6a168'],['Grisalho','#a5a6a1'],['Violeta','#6a557d']],
 topColor:[['Floresta','#304e3e'],['Terracota','#b66d4d'],['Marfim','#e8dcca'],['Petróleo','#3c606c'],['Lavanda','#817094'],['Carvão','#303436']],
 pantsColor:[['Grafite','#333c43'],['Areia','#a5957d'],['Azul','#3d5167'],['Oliva','#566147'],['Vinho','#714e51'],['Preto','#282828']],
 shoesColor:[['Café','#342c27'],['Marfim','#ded4c5'],['Caramelo','#967455'],['Grafite','#343a3e']],
} as const;
type ColorField=keyof typeof palettes;
function ColorChoices({field,label,avatar,onChange}:{field:ColorField;label:string;avatar:AvatarConfig;onChange:(key:ColorField,value:string)=>void}){return <fieldset className="profile-control-group"><legend>{label}</legend><div className="profile-options">{palettes[field].map(([name,color])=><button key={color} type="button" className="profile-swatch" style={{backgroundColor:color}} aria-label={`${label}: ${name}`} aria-pressed={avatar[field].toLowerCase()===color} title={name} onClick={()=>onChange(field,color)}>{avatar[field].toLowerCase()===color?<Check size={13}/>:null}</button>)}</div></fieldset>;}

export default function ProfileDialog({open,onOpenChange,returnFocusRef}:{open:boolean;onOpenChange:(open:boolean)=>void;returnFocusRef:RefObject<HTMLElement|null>}){
 const {user,updateProfile,logout}=useAuth();const [name,setName]=useState(user?.name||''),[avatar,setAvatar]=useState<AvatarConfig>(user?.avatar||defaultAvatar),[busy,setBusy]=useState<'save'|'logout'|null>(null),[error,setError]=useState(''),[saved,setSaved]=useState(false);
 useEffect(()=>{if(open&&user){setName(user.name);setAvatar({...defaultAvatar,...user.avatar});setError('');setSaved(false);}},[open,user?.id]);
 if(!user)return null;
 function changeAvatar(key:keyof AvatarConfig,value:string){setAvatar(previous=>({...previous,[key]:value}));setSaved(false);}
 function chooseTemplate(template:AvatarConfig['template']){setAvatar(previous=>({...previous,template,hairStyle:template==='feminine'?'long':'short'}));setSaved(false);}
 function chooseModel(model:NonNullable<AvatarConfig['model']>){setAvatar(previous=>({...previous,model}));setSaved(false);}
 async function save(event:FormEvent){event.preventDefault();setBusy('save');setError('');try{await updateProfile({name:name.trim(),avatar});setSaved(true);}catch(e){setError(e instanceof Error?e.message:'Não foi possível salvar seu perfil.');}finally{setBusy(null);}}
 async function signOut(){setBusy('logout');setError('');try{await logout();}catch(e){setError(e instanceof Error?e.message:'Não foi possível sair. Tente novamente.');setBusy(null);}}
 return <Dialog.Root open={open} onOpenChange={value=>{if(!busy)onOpenChange(value);}}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog-panel profile-panel" onCloseAutoFocus={event=>{event.preventDefault();returnFocusRef.current?.focus();}} onEscapeKeyDown={event=>{if(busy)event.preventDefault();}}>
  <Dialog.Close className="icon-button dialog-close" aria-label="Fechar perfil" disabled={!!busy}><X size={20}/></Dialog.Close>
  <div className="profile-heading-icon"><SlidersHorizontal size={21}/></div><span className="eyebrow">DO SEU JEITO</span><Dialog.Title>Seu lugar na conversa.</Dialog.Title><Dialog.Description>Escolha como aparecer no seu espaço de ensaio.</Dialog.Description>
  <form onSubmit={save} aria-busy={!!busy}><fieldset disabled={!!busy} style={{border:0,padding:0,margin:0,minWidth:0}}><div className="profile-layout">
   <div className="profile-preview"><span className="profile-preview-label">SEU AVATAR · PRÉVIA</span><div className="profile-preview-stage"><AvatarPreview avatar={avatar}/></div><div className="profile-preview-footer"><strong>{name.trim()||'Seu avatar'}</strong><p>Uma representação escolhida por você.<br/>Não precisa se parecer com ninguém.</p></div></div>
   <div className="profile-controls"><label className="field-label" htmlFor="profile-name">Seu nome</label><input id="profile-name" autoComplete="name" value={name} minLength={2} maxLength={80} required onChange={e=>{setName(e.target.value);setSaved(false);}}/><p className="profile-email">{user.email}</p>
    <fieldset className="profile-control-group"><legend>Estilo do avatar</legend><div className="profile-model-options">{([['procedural','Personalizável'],['trellis-masculine','Modelo masculino'],['trellis-feminine','Modelo feminino']] as const).map(([model,label])=><button type="button" key={model} className="profile-option" aria-pressed={(avatar.model||'procedural')===model} onClick={()=>chooseModel(model)}>{label}</button>)}</div></fieldset>
    {!avatar.model||avatar.model==='procedural'?<><fieldset className="profile-control-group"><legend>Modelo de partida</legend><div className="profile-options"><button type="button" className="profile-option" aria-pressed={avatar.template==='feminine'} onClick={()=>chooseTemplate('feminine')}>Feminino</button><button type="button" className="profile-option" aria-pressed={avatar.template==='masculine'} onClick={()=>chooseTemplate('masculine')}>Masculino</button></div></fieldset>
    <fieldset className="profile-control-group"><legend>Cabelo</legend><div className="profile-options">{([['short','Curto'],['long','Longo'],['curly','Cacheado'],['bald','Sem cabelo']] as const).map(([value,label])=><button key={value} type="button" className="profile-option" aria-pressed={avatar.hairStyle===value} onClick={()=>changeAvatar('hairStyle',value)}>{label}</button>)}</div></fieldset>
    <div className="profile-colors"><ColorChoices field="skinColor" label="Tom de pele" avatar={avatar} onChange={changeAvatar}/><ColorChoices field="hairColor" label="Cor do cabelo" avatar={avatar} onChange={changeAvatar}/><ColorChoices field="topColor" label="Parte de cima" avatar={avatar} onChange={changeAvatar}/><ColorChoices field="pantsColor" label="Calça" avatar={avatar} onChange={changeAvatar}/><ColorChoices field="shoesColor" label="Calçados" avatar={avatar} onChange={changeAvatar}/></div><p className="profile-note">Todas as combinações ficam disponíveis em qualquer modelo personalizável.</p></>:<div className="profile-generated-note"><strong>Um personagem para chamar de seu.</strong>Este modelo 3D tem aparência pronta, sem edição separada de cabelo ou roupas. Salve para usá-lo como apresentador nas suas simulações.<p>Quer escolher cada detalhe? Volte para Personalizável.</p></div>}
   </div>
  </div></fieldset>
  {error?<p className="auth-error" role="alert">{error}</p>:null}{saved?<p className="profile-saved" role="status"><Check size={15}/> Perfil salvo. Seu avatar já está atualizado.</p>:null}
  <div className="profile-actions"><button type="button" className="profile-logout" onClick={signOut} disabled={!!busy}>{busy==='logout'?<LoaderCircle size={16} className="auth-spin"/>:<LogOut size={16}/>} Sair da conta</button><button type="submit" className="button primary" disabled={!!busy}>{busy==='save'?<LoaderCircle size={16} className="auth-spin"/>:<Save size={16}/>} {busy==='save'?'Salvando…':'Salvar perfil'}</button></div>
  </form>
 </Dialog.Content></Dialog.Portal></Dialog.Root>;
}
