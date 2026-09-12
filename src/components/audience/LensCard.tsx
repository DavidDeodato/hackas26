import {AlertCircle,Quote} from 'lucide-react';
import type {AudienceLens} from '../../../shared/rehearsal-types';

interface LensCardProps {
  lens: AudienceLens;
  sourceTitles: Record<string,string>;
}

export default function LensCard({lens,sourceTitles}:LensCardProps){
  return <article className="audience-lens-card">
    <header className="audience-lens-header">
      <span className="audience-hypothesis-label">Hipótese de lente</span>
      <span className={`audience-confidence audience-confidence-${lens.confidence||'limited'}`}>
        {lens.confidence==='supported'?'Com apoio nas fontes':'Lastro limitado'}
      </span>
    </header>
    <h3>{lens.label}</h3>
    <p className="audience-lens-hypothesis">{lens.hypothesis}</p>
    <div className="audience-evidence-stack">
      {lens.evidence.map((evidence,index)=><figure className="audience-evidence" key={`${evidence.sourceId}-${index}`}>
        <Quote size={14}/>
        <blockquote>“{evidence.quote}”</blockquote>
        <figcaption>{sourceTitles[evidence.sourceId]||'Fonte selecionada'}</figcaption>
      </figure>)}
      {lens.evidence.length===0&&<div className="audience-evidence-missing"><AlertCircle size={15}/> Nenhum trecho direto sustenta esta lente.</div>}
    </div>
    {lens.limitation&&<p className="audience-lens-limit"><AlertCircle size={13}/><span>{lens.limitation}</span></p>}
  </article>;
}
