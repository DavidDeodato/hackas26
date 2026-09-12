import {BookOpen,Check,FileText} from 'lucide-react';
import type {Material} from '../../../shared/types';

interface SourcePickerProps {
  materials: Material[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function SourcePicker({materials,selectedIds,onChange}:SourcePickerProps){
  function toggle(id:string){
    onChange(selectedIds.includes(id)?selectedIds.filter(item=>item!==id):[...selectedIds,id]);
  }

  if(materials.length===0)return <div className="audience-empty-source">
    <FileText size={22}/>
    <div><strong>Nenhum material salvo ainda.</strong><span>Abra “Colar uma nova fonte” abaixo para começar.</span></div>
  </div>;

  return <div className="audience-source-list" role="group" aria-label="Materiais disponíveis">
    {materials.slice().reverse().map(material=>{
      const selected=selectedIds.includes(material.id);
      return <button
        type="button"
        key={material.id}
        className={`audience-source-option${selected?' audience-source-option-selected':''}`}
        aria-pressed={selected}
        onClick={()=>toggle(material.id)}
      >
        <span className="audience-source-icon">{material.kind==='source'?<BookOpen size={17}/>:<FileText size={17}/>}</span>
        <span className="audience-source-copy">
          <strong>{material.title}</strong>
          <small>{material.kind==='source'?'Fonte de contexto':'Material preparado'} · versão {material.version}</small>
        </span>
        <span className="audience-source-check" aria-hidden="true">{selected&&<Check size={14}/>}</span>
      </button>;
    })}
  </div>;
}
