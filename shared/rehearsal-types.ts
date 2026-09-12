export interface SourceDocument { id:string; title:string; content:string; url?:string }
export interface EvidenceRef { sourceId:string; quote:string }
export interface AudienceLens { label:string; hypothesis:string; evidence:EvidenceRef[]; confidence?:'limited'|'supported'; limitation?:string }
export interface AudienceProfile { id:string; name:string; role:string; lenses:AudienceLens[]; limitations?:string[]; sourceIds?:string[]; synthetic?:boolean; isFictional?:boolean; createdAt:string }
export interface RehearsalQuestion { id:string; audienceId:string; text:string; rationale:string; evidence:EvidenceRef[]; focus:'clarity'|'evidence'|'impact'|'feasibility'|'accessibility'; speculative?:boolean }
export interface RehearsalTurn { id:string; questionId:string; answer:string; feedback:{strength:string;gap:string;suggestion:string;evidence:EvidenceRef[]}; createdAt:string }
export interface RehearsalSession { id:string; title:string; pitch:string; audiences:AudienceProfile[]; questions:RehearsalQuestion[]; turns:RehearsalTurn[]; artifactId?:string; parentSessionId?:string; generation:'ai'|'example'; createdAt:string }
export interface RehearsalWorkspace { audiences:AudienceProfile[]; sessions:RehearsalSession[]; activeSessionId:string|null }
export interface MapAudienceInput { name:string; role:string; sources:SourceDocument[] }
export interface GenerateRehearsalInput { pitch:string; audiences:AudienceProfile[]; sources:SourceDocument[]; artifactId?:string }
export interface EvaluateAnswerInput { session:RehearsalSession; questionId:string; answer:string; sources:SourceDocument[] }
