import {useEffect,useMemo,useState} from 'react';
import {BookOpen,LoaderCircle,Plus,Save,Sparkles,UserRoundSearch} from 'lucide-react';
import {api} from '../lib/api';
import {useWorkspace} from '../lib/workspace';
import type {Material,Workspace} from '../../shared/types';
import type {AudienceProfile,RehearsalWorkspace} from '../../shared/rehearsal-types';
import SourcePicker from '../components/audience/SourcePicker';
import AudienceProfileView from '../components/audience/AudienceProfileView';
import SavedAudienceList from '../components/audience/SavedAudienceList';
import MiniWorld from '../components/spatial/MiniWorld';
import '../components/audience/audience.css';

type AudienceResponse={profile:AudienceProfile;workspace:RehearsalWorkspace};

export default function AudiencePage(){
  const {workspace,setWorkspace,notify}=useWorkspace();
  const [name,setName]=useState('');
  const [role,setRole]=useState('');
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [sourceTitle,setSourceTitle]=useState('');
  const [sourceContent,setSourceContent]=useState('');
  const [saving,setSaving]=useState(false);
  const [mapping,setMapping]=useState(false);
  const [mappingError,setMappingError]=useState('');
  const [profile,setProfile]=useState<AudienceProfile|null>(null);
  const [profiles,setProfiles]=useState<AudienceProfile[]>([]);
  const [loadingProfiles,setLoadingProfiles]=useState(true);
  const [profilesError,setProfilesError]=useState('');

  const materials=workspace.materials;
  const sourceTitles=useMemo(()=>Object.fromEntries(materials.map(material=>[material.id,material.title])),[materials]);
  const canMap=!!name.trim()&&!!role.trim()&&selectedIds.length>0&&selectedIds.length<=8&&!mapping&&!loadingProfiles&&!saving;
  const missingFields=[!name.trim()?'nome':null,!role.trim()?'papel profissional':null,!selectedIds.length?'uma fonte':null].filter(Boolean);

  function selectProfile(selected:AudienceProfile){
    setProfile(selected);
    requestAnimationFrame(()=>{
      const result=document.getElementById('audience-profile-result');
      result?.focus({preventScroll:true});
      result?.scrollIntoView({block:'start',behavior:'instant'});
    });
  }

  useEffect(()=>{
    let ignore=false;
    api<RehearsalWorkspace>('/rehearsal/state').then(result=>{
      if(ignore)return;
      setProfiles(result.audiences);
      setProfile(result.audiences.at(-1)||null);
    }).catch(error=>{if(!ignore)setProfilesError((error as Error).message);}).finally(()=>{if(!ignore)setLoadingProfiles(false);});
    return()=>{ignore=true;};
  },[]);

  async function saveSource(){
    if(!sourceTitle.trim()||!sourceContent.trim())return;
    setSaving(true);
    try{
      const result=await api<{workspace:Workspace;material:Material}>('/materials',{title:sourceTitle.trim(),content:sourceContent.trim()});
      setWorkspace(result.workspace);
      setSelectedIds(ids=>[...ids,result.material.id]);
      setSourceTitle('');
      setSourceContent('');
      notify('Fonte salva e selecionada para este mapeamento.');
    }catch(error){notify((error as Error).message);}
    finally{setSaving(false);}
  }

  async function mapAudience(){
    if(!canMap)return;
    setMappingError('');
    setMapping(true);
    try{
      const result=await api<AudienceResponse>('/rehearsal/audience',{name:name.trim(),role:role.trim(),sourceIds:selectedIds});
      selectProfile(result.profile);
      setProfiles(result.workspace.audiences);
      notify('Lentes profissionais mapeadas com fontes e limites.');
    }catch(error){setMappingError((error as Error).message);}
    finally{setMapping(false);}
  }

  return <div className="audience-page">
    <header className="audience-heading">
      <div><span className="audience-eyebrow"><UserRoundSearch size={14}/> PREPARE-SE PARA QUEM VAI OUVIR</span><h1>Mapear audiência<span>.</span></h1><p>Use evidências profissionais para antecipar lentes de avaliação — sem tentar prever pessoas.</p></div>
    </header>

    <div className="audience-workbench">
      <section className="audience-setup" aria-labelledby="audience-setup-title">
        <div className="audience-panel-heading"><span>01</span><div><h2 id="audience-setup-title">Quem participa?</h2><p>Identifique a pessoa e o papel relevante nesta apresentação.</p></div></div>
        <div className="audience-fields">
          <label htmlFor="audience-name">Nome</label>
          <input id="audience-name" value={name} onChange={event=>setName(event.target.value)} maxLength={80} placeholder="Nome do participante"/>
          <label htmlFor="audience-role">Papel profissional</label>
          <input id="audience-role" value={role} onChange={event=>setRole(event.target.value)} maxLength={150} placeholder="Ex.: liderança de produto"/>
        </div>

        <div className="audience-divider"/>
        <div className="audience-panel-heading"><span>02</span><div><h2>Quais fontes sustentam o ensaio?</h2><p>Selecione materiais já salvos. O mapeamento só usa essas fontes.</p></div></div>
        <SourcePicker materials={materials} selectedIds={selectedIds} onChange={setSelectedIds}/>
      <details className="audience-add-source">
        <summary><Plus size={16}/> Colar uma nova fonte</summary>
        <p>Cole um trecho público ou material autorizado. Ele ficará salvo em Meus materiais.</p>
        <label htmlFor="audience-source-title-input">Título da fonte</label>
        <input id="audience-source-title-input" value={sourceTitle} onChange={event=>setSourceTitle(event.target.value)} maxLength={100} placeholder="Ex.: Perfil profissional público"/>
        <label htmlFor="audience-source-content">Texto da fonte</label>
        <textarea id="audience-source-content" value={sourceContent} onChange={event=>setSourceContent(event.target.value)} maxLength={12000} rows={9} placeholder="Cole somente evidências profissionais relevantes. Evite dados pessoais e suposições."/>
        <button className="audience-save-button" disabled={saving||!sourceTitle.trim()||!sourceContent.trim()} onClick={()=>void saveSource()}>
          {saving?<LoaderCircle className="audience-spin" size={16}/>:<Save size={16}/>} {saving?'Salvando…':'Salvar e selecionar'}
        </button>
        <div className="audience-source-rule"><BookOpen size={15}/><span>Fonte não é biografia inventada. Registre autoria, contexto e o trecho que realmente existe.</span></div>
      </details>
        <button className="audience-map-button" disabled={!canMap} onClick={()=>void mapAudience()}>
          {mapping?<LoaderCircle className="audience-spin" size={17}/>:<Sparkles size={17}/>} {mapping?'Mapeando com as fontes…':'Mapear lentes profissionais'}
        </button>
        <p className="audience-map-footnote" role="status">{missingFields.length?`Para mapear, informe ${missingFields.join(', ')}.`:selectedIds.length>8?'Selecione no máximo 8 fontes.':`${selectedIds.length} de 8 fontes selecionadas · você revisa as hipóteses.`}</p>
        {mappingError&&<p className="audience-mapping-error" role="alert">{mappingError}</p>}
      </section>
      <div className="audience-review">
        <MiniWorld variant="audience" count={profiles.length} label="Sua roda de audiência"/>
        <SavedAudienceList profiles={profiles} selectedId={profile?.id||null} loading={loadingProfiles} error={profilesError} onSelect={selectProfile}/>
        {profile&&<AudienceProfileView profile={profile} sourceTitles={sourceTitles}/>}
      </div>
    </div>
  </div>;
}
