# CORE handoff

STATUS: ready

Arquivos entregues:

- `server/rehearsal/service.ts`
- `shared/rehearsal-engine.ts`
- `tests/rehearsal-engine.test.ts`
- `tests/rehearsal-service.test.ts`

Contrato implementado: `mapAudience`, `generateRehearsal` e `evaluateAnswer` usam Responses API com a chave/modelo de `server/config.ts`, timeout de 45 s, Structured Outputs e validação Zod. Material, pitch, perfil e resposta são tratados como dados não confiáveis. Perfis são lentes profissionais hipotéticas, sem psicologia ou previsão. Referências são filtradas novamente no servidor e só sobrevivem quando `sourceId` existe e `quote` é substring literal da fonte. Pergunta sem referência válida vira especulativa; feedback sem referência válida se declara análise textual. O ensaio gera de uma a três perguntas. `branchRehearsalSession`/`rewindRehearsalSession` criam cópia profunda com `parentSessionId` e preservam a sessão original.

Verificações reais:

- `npm test`: 15 testes, 15 passaram, 0 falharam.
- `npm run build`: TypeScript e Vite passaram; 1.860 módulos transformados.
- Smoke OpenAI real de `mapAudience`: 3 lentes; todas as referências retornadas conferidas como trechos literais; 4 limitações. Saída registrada apenas como contagem/booleanos, sem credencial ou conteúdo sensível.
- Testes cobrem ramificação imutável, limites de `keepTurns`, descarte de citação inventada, downgrade de confiança, especulação explícita e feedback sem evidência falsa.

Limitações: o CORE não alterou rotas, persistência, contratos, configuração nem UI, conforme propriedade de arquivos. A primeira tentativa do smoke por `tsx -e` falhou antes da chamada por top-level await em CJS; repetida com IIFE, passou.

Próximo passo: ROOT pode importar `branchRehearsalSession` na rota de rewind (a rota já contém lógica equivalente), reiniciar o servidor sob sua responsabilidade e executar o smoke integrado pitch → perguntas → resposta → rewind.
