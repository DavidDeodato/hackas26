import {Info,ShieldCheck,UserRoundSearch} from 'lucide-react';
import type {AudienceProfile} from '../../../shared/rehearsal-types';
import LensCard from './LensCard';

interface AudienceProfileViewProps {
  profile: AudienceProfile;
  sourceTitles: Record<string,string>;
}

export default function AudienceProfileView({profile,sourceTitles}:AudienceProfileViewProps){
  const limitations=profile.limitations||[];
  return <section className="audience-result" id="audience-profile-result" tabIndex={-1} aria-label={`Lentes de ${profile.name}`} aria-live="polite">
    <header className="audience-result-header">
      <div className="audience-result-avatar"><UserRoundSearch size={23}/></div>
      <div><span>03 · LENTES PARA ENSAIO</span><h2>{profile.name}</h2><p>{profile.role}</p></div>
      {profile.synthetic&&<strong className="audience-synthetic-badge">Exemplo sintético</strong>}
    </header>
    {profile.synthetic&&<div className="audience-synthetic-notice"><Info size={16}/><span>Este exemplo foi criado para demonstrar o fluxo. Não é um documento nem uma fala real desta pessoa.</span></div>}
    <div className="audience-result-explainer"><ShieldCheck size={16}/><p>Estas são lentes profissionais hipotéticas para preparar perguntas. Não descrevem personalidade, intenção ou comportamento futuro.</p></div>
    <div className="audience-lens-grid">
      {profile.lenses.map((lens,index)=><LensCard key={`${lens.label}-${index}`} lens={lens} sourceTitles={sourceTitles}/>)}
    </div>
    <div className="audience-limitations">
      <h3>Limites deste mapeamento</h3>
      {limitations.length>0?<ul>{limitations.map((item,index)=><li key={`${item}-${index}`}>{item}</li>)}</ul>:<p>As fontes não informaram limitações adicionais. Trate todas as lentes como hipóteses de preparação.</p>}
    </div>
  </section>;
}
