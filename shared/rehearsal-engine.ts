import type { RehearsalSession } from './rehearsal-types.js';

export interface BranchOptions {
  id?: string;
  createdAt?: string;
}

/** Creates an independent branch and never mutates the source session. */
export function branchRehearsalSession(parent: RehearsalSession, keepTurns: number, options: BranchOptions = {}): RehearsalSession {
  if (!Number.isInteger(keepTurns) || keepTurns < 0 || keepTurns > parent.turns.length) throw new Error('Ponto de retorno inválido.');
  const branch = structuredClone(parent);
  branch.id = options.id ?? crypto.randomUUID();
  branch.parentSessionId = parent.id;
  branch.turns = structuredClone(parent.turns.slice(0, keepTurns));
  branch.createdAt = options.createdAt ?? new Date().toISOString();
  return branch;
}

export const rewindRehearsalSession = branchRehearsalSession;
