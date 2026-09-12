# DEPLOY — coordenador chat (4)

## Estado final deste executor — 2026-09-12, 14:43 SP

PUBLICADO: este coordenador concluiu `dpl_BLMN4ppkWA8CQ8vyR6LvFw3X9H7c` com build remoto1889 PASS, alias `https://rebobina-h4h.vercel.app`. Health público confirmou PostgreSQL/IA e `/api/auth/me` retornou visitante sem autenticação. Login novo com diorama foi conferido visualmente no browser público.

TRANSFERIDO: o usuário designou o fork `01a096b5-79d2-7881-ac03-e799808e9fb5` exclusivamente para deploy. O upload desse fork iniciou antes de chegar a coordenação e também terminou READY, com o mesmo bundle `index-DILHOC9X.js`. Alias final foi conferido por ele em `dpl_7UA74HgQKSbMXPvi6GFe6ERy8c4U`. Registro canônico daqui em diante: `DEPLOY_LATEST.md`. Nenhum terceiro deploy e nenhuma nova escrita de código por este coordenador após o freeze.

Evidência funcional nova diretamente lida: `artifacts/qa/root-auth-public.json`, PASS_AUTH_ACCOUNT_ISOLATION,17:43:10Z,12checks públicos incluindo cadastro de duas contas sintéticas, avatar persistido, isolamento, logout e relogin. UI local teve13checkpoints PASS segundo `auth-ui-report.json`; QA público complementar segue com responsável. Cross-tab foi corrigido estaticamente; prova dinâmica ainda é gate separado.

Este executor encerra publicação/engine congelada e pausa seu heartbeat para não disputar o novo dono. Vídeo v5 narrado/legendado está validado como backup; VIDEO produz novo pitch de até180s com navegação real, por pedido posterior do usuário. Nada foi submetido ao evento.

## Histórico visual — 2026-09-12, 14:24 SP

CONFIRMADO PUBLICAMENTE: `https://rebobina-h4h.vercel.app`, deployment `dpl_3m9aSmHyXQ7smm3PWZ3ckd5npvS1`, API/health200, PostgreSQL e IA reais, suíte de dez verificações PASS em `artifacts/qa/root-integration-public.json` (17:13:26Z). Esse deploy ainda não inclui a rodada visual mais recente com3D padrão e MiniWorlds.

PENDENTE: snapshot visual consolidado pelo gestor, novo deploy e QA público das quatro páginas. MiniWorld de Materiais já teve P1 encerrado em reteste visual independente: `page-polish-materiais-desktop.png` e `page-polish-materiais-mobile.png`, inspecionados também pelo coordenador. O import temporariamente ausente de materials.css foi concluído pelo dono. Não promover o checkout antes da liberação do acabamento global; não repetir chamadas de IA sem mudança de backend.

Próximo responsável: coordenador chat4 publica após o gestor liberar; QA confere páginas públicas. Nenhuma submissão ao evento autorizada ou realizada.

## Preflight da rodada 3D — 14:34 SP

`npm run build` e `npm test` executados pelo coordenador, exit0: TypeScript e Vite (1881 módulos), 16 testes aprovados. P0 transitório `Location.key` foi corrigido pelo MESA segundo o contrato do router local. Bundle atual: CSS131,08kB, JS348,50kB, Three lazy693,13kB; aviso conhecido de tamanho do Three, não falha de build. Shell possui READY/FREEZE em `SHELL_POLISH.md`. Gestor ainda consolida freeze final; MP4v5 em exportação não deve ser promovido antes de ffprobe/decodificação.

## Histórico — estados anteriores não substituem o estado atual

STATUS working. Usuario autorizou Vercel explicitamente. CLI autenticada; plugin Vercel sem teams retornados, CLI tem conta existente. Criados api/index.ts, vercel.json e .vercelignore. ROOT fork8 segue dono de server/index.ts e integracao; comunicacao enviada e confirmacao recebida. Nao usar Sites.

IMAGENS criado: 01a09687-5208-7180-9a5a-b5d9b202a04e. Escopo public/world-art e handoff proprio. SALA avisada para integrar sem bloquear interatividade.

Proximo: linkar novo projeto Vercel, configurar somente variaveis necessarias de forma privada, deploy e smoke publico. Nenhuma publicacao concluida ainda.

## Primeiros deploys — 2026-09-12

- Projeto Vercel `rebobina-h4h` criado/linkado; DATABASE_URL, OPENAI_API_KEY e OPENAI_MODEL configuradas via stdin privado.
- Duas publicacoes concluíram build e receberam READY, alias `https://rebobina-h4h.vercel.app`.
- HTML publico responde200, mas API/health responde500. Nao e produto publico funcional ainda.
- Causa confirmada no log runtime: ERR_MODULE_NOT_FOUND '/var/task/server/index' importado por api/index.js. API entry corrigido para ../server/index.js; ROOT encarregado de padronizar extensoes relativas server/shared antes de novo deploy.
- Visual cinematic implementado e QA local independente passou alternancia3D, mobile390, console, build e16testes. Video v3 entregue em artifacts/demo; derivado60s/legendas solicitados. Referencia conceitual nao e prova de funcionalidade.

Proximo: receber fix ESM do ROOT, redeploy, repetir smoke publico completo; somente entao informar plataforma pronta.

## Fix ESM — 2026-09-12

Fix ESM implantado em dpl_3m9aSmHyXQ7smm3PWZ3ckd5npvS1. GET publico /api/health respondeu200: oktrue, aiConfiguredtrue, storagepostgres. HTML tambem200. ROOT repete suiteAPI publica; QA inicia jornada real no browser publico. Video80s/60s eSRT existem; narração sintetica solicitada como incremento sem bloquear.

## PASS publico — 2026-09-12T17:13:26.269Z

Evidencia diretamente conferida: artifacts/qa/root-integration-public.json = PASS_LIVE_INTEGRATION em https://rebobina-h4h.vercel.app. Dez checks: DB, material, mapeamentoIA com citas, perguntasIA, feedback, rejeicao de resposta duplicada, replaypreservado/readback, isolamento de sessao, fontealheia rejeitada e revisaoversionada. Fonte sintetica marcada; pedidosIA reais; sem validacao de aprendizagem humana.

API publica funcional. QA browser publico e ajuste de primeiravisita com cena ainda em fechamento. Nao confundir APIpass com aceite visual subjetivo.
