import {ArrowUpRight,Clock3,Database,UserRoundSearch} from 'lucide-react';
import type {AudienceProfile} from '../../../shared/rehearsal-types';

interface SavedAudienceListProps {
  profiles: AudienceProfile[];
  selectedId: string | null;
  loading: boolean;
  error: string;
  onSelect: (profile: AudienceProfile) => void;
}

export default function SavedAudienceList({profiles,selectedId,loading,error,onSelect}:SavedAudienceListProps){
  return <section className="audience-saved" aria-labelledby="audience-saved-title">
    <header className="audience-saved-heading">
      <div><Database size={15}/><h2 id="audience-saved-title">Audiências salvas</h2></div>
      <span>{loading?'Sincronizando…':`${profiles.length} ${profiles.length===1?'perfil':'perfis'}`}</span>
    </header>
    {error&&<p className="audience-saved-error" role="alert">{error}</p>}
    {!loading&&!error&&profiles.length===0&&<div className="audience-saved-empty"><UserRoundSearch size={18}/><span>Informe nome, papel e fontes para criar seu primeiro perfil. As lentes, citações e limitações ficarão salvas aqui.</span></div>}
    {profiles.length>0&&<div className="audience-saved-list">
      {profiles.slice().reverse().map(profile=><button
        type="button"
        key={profile.id}
        className={`audience-saved-item${selectedId===profile.id?' audience-saved-item-active':''}`}
        aria-pressed={selectedId===profile.id}
        onClick={()=>onSelect(profile)}
      >
        <span className="audience-saved-avatar">{profile.name.trim().charAt(0).toUpperCase()||'A'}</span>
        <span className="audience-saved-copy"><strong>{profile.name}</strong><small>{profile.role}</small></span>
        <span className="audience-saved-meta"><Clock3 size={11}/>{new Date(profile.createdAt).toLocaleDateString('pt-BR')}</span>
        <span className="audience-saved-open">Ver lentes <ArrowUpRight size={13}/></span>
      </button>)}
    </div>}
  </section>;
}
