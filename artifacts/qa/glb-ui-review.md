# Gate dos dois avatares GLB

Status: PASS_LOCAL. Executado em 2026-09-12T17:57:25Z, http://localhost:4173.

Fonte canônica: `artifacts/qa/glb-ui-report.json`. Doze checkpoints concluídos, um cadastro fictício adicional explicitamente autorizado pelo coordenador, zero chamadas de IA. A mesma sessão foi utilizada para os dois modelos e para logout entre abas; senha mantida somente em memória e descartada após a conclusão. Não rerodar o script sem autorização para outro cadastro.

## Critérios atendidos

- Modelo feminino e Modelo masculino selecionados pela UI, com `data-avatar-source` respectivamente `trellis-feminine` e `trellis-masculine`, renderer ready e fallback false.
- Prévia visual dos dois modelos inspecionada: malhas/rostos/cabelos distintos, texturas presentes, corpo inteiro sem clipping material.
- Controles de cabelo/cor do avatar procedural ausentes no modo GLB. A interface explica que os modelos têm aparência pronta.
- Salvar perfil executado para cada modelo; `/api/auth/me` retornou o model correspondente com HTTP 200, inclusive após reload.
- Palco mobile e desktop após reload apresentou o modelo correspondente com source exato, renderer ready e `data-avatar-fallback=false`. Frames inspecionados, não apenas contagem de canvas.
- Arquivos GLB carregados com HTTP 200 e Content-Type `model/gltf-binary`; nenhum GLB 404 ou erro de browser/console.
- Sem overflow horizontal em 1280x720 e 390x844.
- Logout na segunda aba levou as duas abas ao login e limpou `history.state` na primeira. A pendência anterior de cross-tab está encerrada LOCALMENTE.

## Evidências

- `glb-ui-trellis-{feminine,masculine}-preview.png`.
- `glb-ui-trellis-{feminine,masculine}-profile-{desktop,mobile}.png`.
- `glb-ui-trellis-{feminine,masculine}-stage-mobile.png` e `*-stage-reload.png`.
- `glb-ui-cross-tab-logout.png`.
- Backend independente: `root-avatar-models-local.json`, sete checks PASS, lido diretamente pelo QA. Não substitui o gate visual acima.

## Limites e liberação

Gravação LOCAL liberada para VIDEO e coordenador com estas evidências. Novo deploy público ainda requer verificação própria; o snapshot público anterior não comprova os GLBs novos. Não foi criada simulação/ensaio com IA nesta rodada: o palco validado é o de preparação. Os GLBs não têm rig/animação e não oferecem customização separada de roupa/cabelo. A geração do vídeo, a aprovação estratégica e a publicação não pertencem a este gate QA.

Script: `scripts/qa-rehearsal-glb-ui.cjs`; não altera código do produto. O status COMPLETE do JSON mais os asserts e a inspeção visual sustentam este PASS_LOCAL.
