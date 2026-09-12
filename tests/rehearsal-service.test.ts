import test from 'node:test';
import assert from 'node:assert/strict';
import { config } from '../server/config';
import { evaluateAnswer, generateRehearsal, mapAudience } from '../server/rehearsal/service';
import type { AudienceProfile, RehearsalSession, SourceDocument } from '../shared/rehearsal-types';

const source: SourceDocument = {id: 'source-1', title: 'Regulamento', content: 'A banca avalia clareza, viabilidade e impacto mensurável.'};
const originalFetch = globalThis.fetch;
const originalKey = config.openaiKey;
function respond(payload: unknown) {
  globalThis.fetch = async () => new Response(JSON.stringify({status: 'completed', output: [{content: [{type: 'output_text', text: JSON.stringify(payload)}]}]}), {status: 200});
  config.openaiKey = 'test-key';
}
test.afterEach(() => { globalThis.fetch = originalFetch; config.openaiKey = originalKey; });

test('audience mapping keeps exact quotes and downgrades invented references', async () => {
  respond({lenses: [
    {label: 'Clareza', hypothesis: 'Pode observar clareza.', evidence: [{sourceId: source.id, quote: 'avalia clareza'}], confidence: 'supported'},
    {label: 'Orçamento', hypothesis: 'Pode perguntar custo.', evidence: [{sourceId: source.id, quote: 'orçamento máximo'}], confidence: 'supported'},
  ], limitations: ['As fontes não descrevem perguntas individuais.'], synthetic: false});
  const profile = await mapAudience({name: 'Banca', role: 'avaliadora', sources: [source]});
  assert.deepEqual(profile.lenses[0]!.evidence, [{sourceId: source.id, quote: 'avalia clareza'}]);
  assert.deepEqual(profile.lenses[1]!.evidence, []);
  assert.equal(profile.lenses[1]!.confidence, 'limited');
  assert.ok((profile.limitations ?? []).some(item => /hipóteses profissionais/i.test(item)));
});

test('question generation removes invented references and explicitly marks speculation', async () => {
  const audience: AudienceProfile = {id: 'audience-1', name: 'Banca', role: 'avaliadora', lenses: [], limitations: [], sourceIds: [source.id], synthetic: false, createdAt: ''};
  respond({title: 'Ensaio do pitch', questions: [{audienceId: audience.id, text: 'Qual impacto será medido?', rationale: 'Explora o impacto.', evidence: [{sourceId: source.id, quote: 'impacto inexistente'}], focus: 'impact', speculative: false}]});
  const result = await generateRehearsal({pitch: 'Nosso produto reduz retrabalho com uma revisão guiada e mensurável.', audiences: [audience], sources: [source]});
  assert.equal(result.questions.length, 1);
  assert.deepEqual(result.questions[0]!.evidence, []);
  assert.equal(result.questions[0]!.speculative, true);
  assert.match(result.questions[0]!.rationale, /hipótese de ensaio sem citação/i);
});

test('answer feedback stays about the answer and drops unsupported evidence', async () => {
  const session: RehearsalSession = {id: 'session', title: 'Ensaio', pitch: 'Nosso produto reduz retrabalho com uma revisão guiada e mensurável.', audiences: [], questions: [{id: 'question', audienceId: 'audience', text: 'Como mede impacto?', rationale: 'Teste', evidence: [], focus: 'impact', speculative: true}], turns: [], generation: 'ai', createdAt: ''};
  respond({strength: 'A resposta propõe medir tempo.', gap: 'Não define a linha de base.', suggestion: 'Inclua período e comparação.', evidence: [{sourceId: source.id, quote: 'linha de base obrigatória'}]});
  const result = await evaluateAnswer({session, questionId: 'question', answer: 'Vamos medir o tempo economizado.', sources: [source]});
  assert.deepEqual(result.feedback.evidence, []);
  assert.match(result.feedback.gap, /análise textual da resposta/i);
  assert.equal(result.answer, 'Vamos medir o tempo economizado.');
});
