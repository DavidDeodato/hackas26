import type { Action, Attempt, Scenario, WorldEvent, WorldState } from './types.js';

export const actions: {id:Action;label:string;description:string}[] = [
 {id:'verify',label:'Consultar as fontes',description:'Veja estoque e prazo antes de decidir.'},
 {id:'accept',label:'Confirmar o pedido',description:'Comprometer a quantidade e o prazo solicitados.'},
 {id:'adjust',label:'Propor uma alternativa',description:'Limitar a oferta ao que os registros sustentam.'},
 {id:'clarify',label:'Pedir confirmação',description:'Não prometer o que ainda falta esclarecer.'},
 {id:'reject',label:'Recusar o pedido',description:'Encerrar o atendimento sem assumir compromissos.'},
];
export function initialState(s:Scenario):WorldState { return {step:0,remainingStock:s.stock,committed:0,consulted:false,clarified:false,issues:[],resolved:false,outcome:'O atendimento está aberto. Você decide como seguir.'}; }
export function transition(s:Scenario, prior:WorldState, action:Action):{state:WorldState;explanation:string} {
 if(prior.resolved) throw new Error('Esta tentativa já terminou. Rebobine para experimentar outra decisão.');
 if(!actions.some(a=>a.id===action)) throw new Error('Ação não suportada.');
 if(prior.step>=6) throw new Error('Limite de etapas atingido. Inicie outra tentativa.');
 if(action==='verify' && prior.consulted) throw new Error('As fontes já foram consultadas nesta tentativa.');
 const state:WorldState={...prior,issues:[...prior.issues],step:prior.step+1};
 let explanation='';
 if(action==='verify') { state.consulted=true; explanation=`Estoque: ${s.stock===null?'não informado':s.stock+' unidades'}. Prazo: ${s.deliveryDays===null?'não informado':s.deliveryDays+' dia(s)'}. Informação ausente não é autorização para prometer.`; state.outcome='Fontes abertas. Agora decida o que pode confirmar.'; }
 else if(action==='accept') {
   if(s.stock===null) state.issues.push('Quantidade disponível não confirmada.');
   else if(s.requested>s.stock) state.issues.push(`Pedido de ${s.requested} unidades excede o estoque de ${s.stock}.`);
   if(s.deliveryDays===null) state.issues.push('Prazo de entrega não confirmado.');
   else if(s.deliveryDays>s.requestedDays) state.issues.push(`Entrega em ${s.requestedDays} dia(s) não é sustentada pelo prazo de ${s.deliveryDays} dia(s).`);
   state.committed=s.requested;
   state.remainingStock=s.stock===null?null:Math.max(0,s.stock-s.requested);
   state.resolved=true;
   explanation=state.issues.length?'A confirmação criou compromisso sem suporte. O estoque físico não ficou negativo: a diferença é uma promessa que não pode ser atendida com os fatos atuais.':'Quantidade e prazo estão sustentados pelos fatos. Aceitar a sugestão foi uma decisão adequada neste cenário.';
   state.outcome=state.issues.length?'Pedido confirmado com pendências.':'Pedido confirmado com suporte.';
 } else if(action==='adjust') {
   const proposed=s.stock===null?0:Math.min(s.stock,s.requested);
   state.resolved=true;
   if(s.stock===null || s.deliveryDays===null) {state.clarified=true;state.outcome='Proposta preparada; confirmação ainda necessária.';}
   else state.outcome=`Alternativa: ${proposed} unidade(s), prazo de ${s.deliveryDays} dia(s).`;
   explanation=`Você propôs ${proposed} unidade(s) com base no estoque conhecido. ${s.deliveryDays===null?'O prazo continua pendente.':`O prazo informado é ${s.deliveryDays} dia(s).`} A aceitação pelo cliente não é presumida; nenhum estoque foi reservado.`;
 } else if(action==='clarify') {state.resolved=true;state.clarified=true;state.outcome='Confirmação solicitada, sem promessa antecipada.';explanation=(s.stock===null||s.deliveryDays===null)?'Existe informação ausente. Você manteve o atendimento aberto sem inventar uma resposta.':(s.stock<s.requested||s.deliveryDays>s.requestedDays)?'Você pediu alinhamento para uma condição que os registros não sustentam. Ainda não existe pedido confirmado.':'Os registros já sustentam o pedido. Pedir mais confirmação é possível, mas adiciona uma etapa que talvez não fosse necessária.';}
 else {state.resolved=true;state.outcome='Atendimento encerrado sem pedido.';explanation=(s.stock!==null && s.stock>=s.requested && s.deliveryDays!==null && s.deliveryDays<=s.requestedDays)?'Havia suporte para atender. Recusar toda sugestão de IA também pode deixar trabalho válido sem fazer.':'Você evitou um compromisso sem suporte, mas não explorou uma alternativa nem pediu a informação ausente.';}
 return {state,explanation};
}
export function replay(s:Scenario, events:WorldEvent[], count=events.length):WorldState {let state=initialState(s);for(const e of events.slice(0,count))state=transition(s,state,e.action).state;return state;}
export function explore(s:Scenario, depth=3){let nodes=0,terminal=0,unsupported=0;const visit=(state:WorldState,d:number)=>{nodes++;if(state.resolved){terminal++;if(state.issues.length)unsupported++;return;}if(d===0)return;for(const a of actions){if(a.id==='verify'&&state.consulted)continue;visit(transition(s,state,a.id).state,d-1);}};visit(initialState(s),depth);return {nodes,terminal,unsupported,depth};}
export function currentState(attempt:Attempt){return replay(attempt.scenario,attempt.events);}
