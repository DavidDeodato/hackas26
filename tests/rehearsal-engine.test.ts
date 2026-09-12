import test from 'node:test';
import assert from 'node:assert/strict';
import { branchRehearsalSession, rewindRehearsalSession } from '../shared/rehearsal-engine';
import type { RehearsalSession, RehearsalTurn } from '../shared/rehearsal-types';

function turn(id: string): RehearsalTurn {
  return {id, questionId: `q-${id}`, answer: `resposta ${id}`, feedback: {strength: 'clara', gap: 'curta', suggestion: 'detalhar', evidence: []}, createdAt: '2026-09-12T12:00:00.000Z'};
}
function session(): RehearsalSession {
  return {id: 'original', title: 'Pitch', pitch: 'Um pitch suficientemente longo para o ensaio.', audiences: [], questions: [], turns: [turn('1'), turn('2')], generation: 'ai', createdAt: '2026-09-12T12:00:00.000Z'};
}

test('rewind creates a branch while preserving the original session and nested turns', () => {
  const original = session();
  const snapshot = structuredClone(original);
  const branch = branchRehearsalSession(original, 1, {id: 'branch', createdAt: '2026-09-12T13:00:00.000Z'});
  assert.deepEqual(original, snapshot);
  assert.equal(branch.id, 'branch');
  assert.equal(branch.parentSessionId, original.id);
  assert.deepEqual(branch.turns, original.turns.slice(0, 1));
  assert.notEqual(branch.turns, original.turns);
  assert.notEqual(branch.turns[0], original.turns[0]);
  branch.turns[0]!.answer = 'editada na ramificação';
  assert.equal(original.turns[0]!.answer, 'resposta 1');
});

test('rewind accepts both ends and rejects invalid branch points', () => {
  const original = session();
  assert.equal(rewindRehearsalSession(original, 0, {id: 'zero'}).turns.length, 0);
  assert.equal(rewindRehearsalSession(original, 2, {id: 'all'}).turns.length, 2);
  for (const point of [-1, 3, 0.5, Number.NaN]) assert.throws(() => branchRehearsalSession(original, point), /inválido/);
});

