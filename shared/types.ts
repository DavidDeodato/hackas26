export type Theme = 'cafe' | 'florist' | 'shop';
export interface Character { id:string; name:string; role:'customer'|'colleague'|'assistant'; color:string; greeting:string }
export interface SceneObject { kind:'counter'|'shelf'|'table'|'plant'|'crate'; x:number; y:number }
export interface Scenario { id:string; title:string; businessName:string; theme:Theme; objective:string; context:string; product:string; stock:number|null; requested:number; deliveryDays:number|null; requestedDays:number; facts:{label:string;value:string;quote:string}[]; characters:Character[]; objects:SceneObject[]; suggestion:string; generation:'ai'|'example'|'local'; assumptions:string[]; createdAt:string; sourceMaterialId?:string; artifactId?:string; artifactVersion?:number }
export type Action = 'accept'|'verify'|'adjust'|'clarify'|'reject';
export interface WorldState { step:number; remainingStock:number|null; committed:number; consulted:boolean; clarified:boolean; issues:string[]; resolved:boolean; outcome:string }
export interface WorldEvent { id:string; action:Action; before:WorldState; after:WorldState; explanation:string; at:string }
export interface Attempt { id:string; scenario:Scenario; events:WorldEvent[]; parentAttemptId?:string; createdAt:string }
export interface Material { id:string; title:string; content:string; kind:'source'|'artifact'; version:number; createdAt:string; parentId?:string; sources:string[] }
export interface Workspace { scenarios:Scenario[]; activeScenarioId:string; attempts:Attempt[]; activeAttemptId:string; materials:Material[]; rehearsal?:import('./rehearsal-types').RehearsalWorkspace }
export interface WorkResult { content:string; generation:'ai'|'local'; steps:string[]; sources:string[] }
