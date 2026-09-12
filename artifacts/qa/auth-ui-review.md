# Auth UI - verificação local

Status: READY_LOCAL; cross-tab logout PENDENTE; deploy público em verificação separada.

Fonte canônica: `artifacts/qa/auth-ui-report.json`, executado em 2026-09-12T17:41:38Z, 13 checkpoints, exatamente um cadastro sintético UI e zero chamadas de IA. Não rerodar `scripts/qa-rehearsal-auth-ui.cjs` sem nova autorização: ele criaria outra conta. A senha temporária permaneceu apenas em memória e foi descartada com o navegador.

## Confirmado

- Login desktop 1280x720 e mobile 390x844 sem overflow horizontal, com cena 3D real. Alternância de senha funciona; credencial inválida apresenta erro. HTTP 401 dessa tentativa é esperado.
- Cadastro único pela UI; edição e salvamento do nome e avatar masculino/cacheado/terracota. A prévia de avatar corresponde às opções selecionadas.
- Avatar do perfil aparece no palco (`data-presenter=profile`) e permanece após reload. Nome, cabelo e cor persistem no diálogo reaberto.
- Logout retorna ao login e limpa `history.state`. Relogin da mesma conta restaura nome/cabelo. Novo logout seguido de demonstração não exibe o nome anterior e mantém estado de navegação limpo.
- Zero page errors ou erros de console inesperados. Auth: register/profile/logout/login válidos HTTP 200; somente login inválido retorna 401.
- Diálogo aberto apresenta dois canvases legítimos (palco ao fundo e prévia); diálogo fechado apresenta um. Isto não caracteriza vazamento.

## Evidência visual

- `auth-ui-login-desktop.png`, `auth-ui-login-mobile.png`, `auth-ui-login-error.png`.
- `auth-ui-profile-desktop.png`, `auth-ui-profile-mobile.png`.
- `auth-ui-stage-desktop.png`, `auth-ui-stage-mobile.png`.
- `auth-ui-demo-after-logout.png`.

Perfil desktop/mobile inspecionado pelo QA: avatar real, seletores e botão Salvar perfil legíveis. Revisão visual independente dos quatro PNGs login/palco não identificou P0/P1; P2 no login mobile: junção de texto “respostas.Chegue” e corte da cena decorativa à direita. Captura full-page não prova comportamento de sobreposição da barra fixa durante scroll.

## Limites e próximo passo

Cross-tab logout não foi executado: a solicitação chegou após o teste encerrar o contexto e descartar sua credencial temporária. Não foi criado segundo cadastro. ROOT/coordenador foram avisados para usar sessão da suíte pública já autorizada, se disponível. A aprovação local não comprova autenticação no deploy público; consultar evidência pública separada.
