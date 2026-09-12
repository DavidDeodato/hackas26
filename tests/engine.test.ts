import test from 'node:test';
import assert from 'node:assert/strict';
import { actions, currentState, explore, initialState, replay, transition } from '../shared/engine';
import { exampleScenario } from '../shared/examples';
import type { Action, Scenario, WorldEvent } from '../shared/types';

function scenario(stock: number | null = 12, deliveryDays: number | null = 1): Scenario {
  return { ...exampleScenario(), stock, deliveryDays, requested: 8, requestedDays: 1 };
}
function trace(s: Scenario, decisions: Action[]): WorldEvent[] {
  let state = initialState(s);
  return decisions.map((action, index) => {
    const before = state;
    const result = transition(s, before, action);
    state = result.state;
    return { id: `event-${index}`, action, before, after: state, explanation: result.explanation, at: '2026-09-12T12:00:00.000Z' };
  });
}

test('identical event replay is deterministic and does not mutate scenario/events', () => {
  const s = scenario();
  const events = trace(s, ['verify', 'accept']);
  const original = structuredClone({ s, events });
  assert.deepEqual(replay(s, events), replay(s, events));
  assert.deepEqual(replay(s, events), events.at(-1)!.after);
  assert.deepEqual({ s, events }, original);
  assert.deepEqual(currentState({ id: 'attempt', scenario: s, events, createdAt: '' }), replay(s, events));
});

test('every transition preserves its input state and scenario', () => {
  for (const { id } of actions) {
    const s = scenario(4, null);
    const state = initialState(s);
    const original = structuredClone({ s, state });
    transition(s, state, id);
    assert.deepEqual({ s, state }, original);
  }
});

test('supported acceptance completes useful work without invented issues', () => {
  const s = scenario();
  const result = transition(s, initialState(s), 'accept');
  assert.equal(result.state.resolved, true);
  assert.equal(result.state.committed, 8);
  assert.equal(result.state.remainingStock, 4);
  assert.deepEqual(result.state.issues, []);
});

test('unsupported acceptance records quantity and deadline failures without negative physical stock', () => {
  const s = scenario(4, 2);
  const result = transition(s, initialState(s), 'accept');
  assert.equal(result.state.issues.length, 2);
  assert.equal(result.state.remainingStock, 0);
  assert.equal(result.state.committed, 8);
});

test('missing quantity or deadline stays unknown, never silently becomes supported', () => {
  for (const [stock, days] of [[null, 1], [12, null], [null, null]] as const) {
    const s = scenario(stock, days);
    const accepted = transition(s, initialState(s), 'accept').state;
    assert.equal(accepted.issues.length, Number(stock === null) + Number(days === null));
    if (stock === null) assert.equal(accepted.remainingStock, null);
    const clarified = transition(s, initialState(s), 'clarify').state;
    assert.equal(clarified.committed, 0);
    assert.equal(clarified.remainingStock, stock);
    assert.equal(clarified.clarified, true);
  }
});

test('rejecting everything loses a supported task rather than earning automatic success', () => {
  const s = scenario();
  const rejected = transition(s, initialState(s), 'reject');
  const accepted = transition(s, initialState(s), 'accept');
  assert.equal(rejected.state.committed, 0);
  assert.equal(accepted.state.committed, s.requested);
  assert.match(rejected.explanation, /trabalho válido sem fazer/);
});

test('terminal decisions cannot create repeated commitments', () => {
  for (const action of ['accept', 'adjust', 'clarify', 'reject'] as Action[]) {
    const s = scenario();
    const state = transition(s, initialState(s), action).state;
    for (const next of actions) assert.throws(() => transition(s, state, next.id), /já terminou/);
  }
});

test('rewinding to a prefix permits a new branch without modifying the original', () => {
  const s = scenario(4, 2);
  const original = trace(s, ['verify', 'accept']);
  const snapshot = structuredClone(original);
  const prefix = replay(s, original, 1);
  assert.equal(prefix.consulted, true);
  assert.equal(prefix.resolved, false);
  const branch = transition(s, prefix, 'clarify').state;
  assert.equal(branch.committed, 0);
  assert.equal(branch.remainingStock, 4);
  assert.equal(replay(s, original).committed, 8);
  assert.deepEqual(original, snapshot);
  assert.deepEqual(replay(s, original, 0), initialState(s));
});

test('repeated verification and unknown actions are rejected', () => {
  const s = scenario();
  const verified = transition(s, initialState(s), 'verify').state;
  assert.throws(() => transition(s, verified, 'verify'), /já foram consultadas/);
  assert.throws(() => transition(s, initialState(s), 'invent' as Action), /não suportada/);
});

test('25-case finite exploration preserves stock bounds and reports only genuine unsupported acceptance', () => {
  let cases = 0;
  for (const stock of [null, 0, 4, 8, 12]) {
    for (const days of [null, 0, 1, 2, 3]) {
      const s = scenario(stock, days);
      const adjusted = transition(s, initialState(s), 'adjust').state;
      assert.ok(adjusted.committed >= 0 && adjusted.committed <= s.requested);
      if (stock === null) assert.equal(adjusted.remainingStock, null);
      else {
        assert.ok(adjusted.committed <= stock);
        assert.ok(adjusted.remainingStock! >= 0 && adjusted.remainingStock! <= stock);
      }
      const supported = stock !== null && stock >= s.requested && days !== null && days <= s.requestedDays;
      const tree = explore(s, 3);
      assert.deepEqual(tree, explore(s, 3));
      assert.ok(tree.nodes > 0 && tree.nodes <= 156);
      assert.ok(tree.terminal > 0 && tree.terminal < tree.nodes);
      assert.equal(tree.unsupported, supported ? 0 : 2);
      assert.deepEqual(explore(s, 0), { nodes: 1, terminal: 0, unsupported: 0, depth: 0 });
      cases++;
    }
  }
  assert.equal(cases, 25);
});
