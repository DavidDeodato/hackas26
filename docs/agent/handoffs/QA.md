# QA — Rebobina

STATUS: auth_ui_local_ready_public_snapshot_in_progress

## Autenticação e avatar — estado vigente

`artifacts/qa/auth-ui-report.json` e `artifacts/qa/auth-ui-review.md`: 13 checkpoints locais concluídos, um cadastro sintético UI, zero IA e zero erros inesperados. Cadastro, avatar personalizado salvo, palco com perfil após reload, relogin da mesma conta e logout→demo sem nome/estado anterior passaram. PNGs login/perfil/palco desktop/mobile revisados sem P0/P1 visual. Cross-tab logout permanece PENDENTE: sessão encerrada e credencial descartada; não repetir cadastro. ROOT/coordenador avisados. Deploy público novo em verificação somente leitura, login + quatro rotas demo; o resultado substituirá a pendência histórica de snapshot.

## Mesa — estado preenchido e Novo material

`artifacts/qa/page-polish-mesa-review.md` consolida PNGs vazios, preenchidos e Novo material. Tres versoes reais existentes foram preservadas, v2 reabriu apos limpar selecao. Desktop1280x720 compositor/CTAs visiveis; mobile sem overflow. Sem IA nova. Observacao pendente: IAB desktop->mobile pode mostrar canvas vazio, recuperado por reload; teste headless independente nao reproduziu. `artifacts/qa/mesa-resize-report.json` e PNGs documentam ambos os caminhos. Nao confundir esta observacao com o P1 Materiais ja encerrado.

## Encerramento focal do P1 materiais

RESOLVIDO no reteste pelo mesmo pipeline headless que reproduziu a falha. `artifacts/qa/page-polish-materiais-desktop.png` e `artifacts/qa/page-polish-materiais-mobile.png` foram inspecionados: estante, banco e planta estao visiveis nas duas larguras. `artifacts/qa/page-polish-materiais-report.json` registra HTTP200, um canvas, renderer pronto, nenhum erro de console e nenhum overflow. A causa unica anterior nao foi comprovada; a correcao do renderer e a integracao da pagina precederam o reteste. Screenshots antigos `3d-final-local-materiais-*` permanecem historicos da falha e nao representam o estado vigente. P2 residual: icone da fonte parece encostado no canto superior esquerdo do card. O novo deploy consolidado ainda precisa de verificacao publica.

## Audiencia — captura de polimento

ATUALIZACAO FINAL: estado preenchido real capturado sem IA usando perfil persistido Profissional de demonstracao. Cinco PNGs `artifacts/qa/page-polish-audiencia-filled-*.png`; mobile em recortes390x720 de viewport390x844. Citacoes14px confirmadas em runtime, foco em resultado via Ver lentes, reload preservado, consoleIAB semerro/warning. Novo fit do MiniWorld mitigou diorama pequeno sem clipping desktop/mobile. CTA desktop1280x720 termina em y651.75. Capturas vazias tambem atualizadas; review acima detalha limites de captura.

Passe focal concluido com capturas reais `artifacts/qa/page-polish-audiencia-desktop.png` e `artifacts/qa/page-polish-audiencia-mobile.png`. Review contra `design/references/page-audiencia-v1.png` em `artifacts/qa/page-polish-audiencia-review.md`. CTA, teclado, maxLength, mobile e reduced-motion passaram sem POST/modelo. Zero erros no passe visual; avisos de driver GPU no passe de interacao separados do resultado. P2: diorama menor que a referencia (195 px desktop, 210 px mobile); perfil populado e fronteira de nove fontes nao foram regenerados neste escopo.

## Estado vigente — 3D padrao e MiniWorlds

Esta secao vence as aprovacoes visuais e pendencias de deploy historicas abaixo. O produto publico anterior passou a jornada real QA (perfil identificado, perguntas, resposta, feedback e replay) e a suite ROOT em `artifacts/qa/root-integration-public.json`; o HTTP 500 ESM antigo esta resolvido. O publico ainda nao foi revalidado no novo contrato visual 3D padrao.

- Capturas locais desktop 1440x1000 e mobile 390x844 persistidas em `artifacts/qa/3d-final-local-{primeira-visita,audiencia,mesa,materiais}-{desktop,mobile}.png`.
- Primeira visita com zero perfis ja apresenta palco 3D sem clique. Audiencia e Mesa apresentam seus dioramas nas duas larguras.
- Oito observacoes locais: HTTP 200, um canvas por rota, nenhum erro de console, nenhum overflow horizontal. Fonte: `artifacts/qa/3d-final-local-report.json`.
- P1 HISTORICO, RESOLVIDO no reteste acima: biblioteca `/materiais` ficava visualmente vazia apesar de canvas=1 e renderer=ready. Fonte da falha antiga: `artifacts/qa/3d-final-local-materiais-report.json`. Causa unica nao confirmada; PNGs `page-polish-materiais-*` comprovam a resolucao.
- Navegacao SPA removeu o canvas anterior nas quatro trocas. Perda de contexto WebGL controlada em audiencia exibiu fallback e preservou formulario editavel. Artefatos: `artifacts/qa/3d-final-local-lifecycle.json` e `artifacts/qa/3d-final-local-fallback.png`.
- Nenhuma nova chamada de IA foi executada nesta rodada visual. Contexto de navegador novo e isolado, sem importacao de cookies privados.
- Proximo passo vigente: capturar o deploy consolidado e revisar somente as alteracoes materiais restantes contra as referencias. P1 materiais ja foi retestado e encerrado.

## Gate visual reaberto — 2026-09-12

O usuario rejeitou explicitamente o design/UX observado. A aprovacao funcional abaixo continua valida, mas nao aprova a experiencia visual.

Estado anterior capturado:

- palco desenhado por SVG simples, sem a qualidade futurista, autoral e imersiva agora exigida;
- hierarquia dividida entre palco generico e card lateral, sem acabamento futurista/imersivo suficiente;
- mobile funcional e sem overflow, mas isso nao satisfaz o novo criterio estetico;
- video anterior deve permanecer somente como backup e nao representa o visual final.

Criterio de reaceite:

- palco 2.5D pre-modelado e autoral como elemento dominante no desktop, implementado em CSS, SVG ou Three conforme viabilidade;
- pergunta, personagem, estado e feedback legiveis sobre o palco, com contraste robusto;
- CTA principal inequivoco em setup, resposta, feedback, conclusao e revisao;
- nenhuma colisao, corte, controle oculto pelo nav ou overflow horizontal em 390x844;
- teclado, skip link, foco visivel, lista textual e `prefers-reduced-motion` preservados;
- build/testes, console e smoke funcional continuam verdes;
- evidencia comparativa desktop/mobile depois da integracao; somente entao VIDEO recaptura.

Cobranças enviadas diretamente a SALA, ROOT e MARCA pelos respectivos chats. QA nao editara arquivos desses donos.

Fonte vinculante: `docs/agent/VISUAL_RESET.md`. O PNG quente existente e opcional e nao constitui criterio de aceite; uma orientacao inicial em contrario foi explicitamente revogada nos chats SALA/MARCA.

### Passe independente do redesign

Evidencia confirmada pelo QA, nao apenas por relato dos donos:

- desktop: shell escuro legivel, palco espacial ocupa a maior parte da area util e rail lateral permanece secundario;
- mobile 390x844: palco 341x472,6 px; `scrollWidth=375` e viewport util 390, sem overflow horizontal;
- CTA de resposta mede 316x42 px e fica acima da navegacao fixa depois do scroll;
- resposta por `Ctrl+Enter` chegou a feedback real; CTAs `Rebobinar daqui` e `Proxima pergunta` apareceram;
- Audiência restaurou dois perfis persistidos apos reload e reabriu o perfil mais recente; sem overflow de pagina;
- Mesa mobile carregou com tokens escuros e `scrollWidth=375`; composer e painel continuam acessiveis por scroll;
- skip link recebeu outline aqua solido de 3 px; regras `prefers-reduced-motion` foram encontradas no CSS carregado.

P2 residual visual: o contexto curto do palco termina com elipse no meio da copy (`fontes...`); ajustar copy/clamp sem reabrir o layout inteiro.

### P0 — build e HMR quebrados durante o passe final

- Reproducao: com o redesign integrado, executar `npm run build` ou abrir a sala durante uma mudanca HMR.
- Observado: `src/components/rehearsal/spatial-scene.ts(211,364): TS1128 Declaration or statement expected`; a aba mobile exibiu overlay Vite e o console registrou falha ao recarregar `RehearsalRoom.tsx`.
- Impacto: build vermelho, console sujo e experiencia visual obstruida. O gate permanece `visual_blocked`.
- Dono correto: ROOT, responsavel por `spatial-scene.ts`; uma atribuicao inicial a SALA foi corrigida. O erro de sintaxe foi patchado e o build voltou a passar antes do passe seguinte.

### P0 — Three em `public` nao carrega no servidor Vite

- Reproducao: apos build verde, abrir `http://localhost:4173/` em aba limpa com a sessao de ensaio ativa.
- Observado: overlay Vite com `Failed to load url /vendor/three/three.module.min.js`; o arquivo em `public` nao pode ser importado por codigo-fonte. Contagem de `canvas`: 0. O palco caiu no fallback simplificado.
- Impacto: a experiencia WebGL nao existe no runtime real e o overlay cobre o produto. A distancia para `design/references/rebobina-cinematic-studio-v1.png` permanece material.
- Dono acionado: ROOT, responsavel por engine/vendor. SALA informada para nao disputar o arquivo.

Resolucao confirmada: ROOT moveu o vendor para `src/vendor/three` com import lazy bundlavel. Em nova aba limpa, o canvas WebGL apareceu, fallback ficou ausente e console permaneceu vazio.

## Gate visual final local

APROVADO para recaptura V2 local, com gaps P2 registrados.

- Referencia comparada diretamente: `design/references/rebobina-cinematic-studio-v1.png`.
- Desktop 1280: canvas WebGL 771,7x573 px, palco dominante, arquitetura curva, apresentador central, audiencia em arco, luz quente e rail lateral; `scrollWidth=1265` para viewport 1280.
- Mobile 390x844: canvas ativo, crop intencional sem overflow de pagina (`scrollWidth=390`), palco primeiro e navegacao fixa sem colisao.
- Interacao: selecionar outro perfil mudou `Em foco` e aproximou a camera; botao passou de `Aproximar` para `Voltar a visao geral`.
- Acessibilidade: skip link com outline de 3 px; alternativa textual preservada; emulacao `prefers-reduced-motion: reduce` ficou ativa, manteve o canvas e carregou sete regras de media sem erro.
- Regressao: resposta por `Ctrl+Enter` -> feedback real -> CTAs de replay/proxima pergunta passou no redesign.
- Audiência: dois perfis persistidos reapareceram apos reload; o mais recente abriu com lentes, fontes e limites.
- Mesa: mobile escura sem overflow; composer e material acessiveis por scroll.
- Final estatico: build com 1.877 modulos; 16/16 testes; smoke rapido de isolamento/segredo/erros JSON passou.

Evolucao final do palco:

- O modo padrao agora usa `public/world-art/cinematic-rehearsal-stage-v2.png`, 1585x992, com overlays de perfil, foco, fase e contexto vindos da sessao real.
- O rotulo `Cenario ilustrativo` fica visivel; a imagem nao e apresentada como pessoa ou ambiente gerado ao vivo.
- Em aba limpa desktop, asset 689x608 px, console vazio, `canvas=0` esperado e botao `Explorar em 3D` presente.
- `Explorar em 3D` criou exatamente um canvas e exibiu `Voltar ao cenario`; o retorno descartou o canvas e restaurou o modo cinematografico sem perder o estado.
- Mobile carregou o mesmo asset sem overflow e manteve nav, perfis e rotulo de incerteza legiveis.

Comparacao com a referencia: o modo cinematografico padrao agora se aproxima materialmente de `design/references/rebobina-cinematic-studio-v1.png` em escala humana, palco curvo, luz quente, apresentadora central, tres assentos e composicao com rail. A cena WebGL opcional continua estilizada e deve ser tratada como exploracao, nao como paridade fotografica.

Gaps P2:

- A cena WebGL opcional e um diorama 3D estilizado e nao alcanca a fidelidade do modo cinematografico; a rotulagem/alternancia evitam apresentar isso como equivalencia.
- O chunk Three minificado tem 693,13 kB (175,74 kB gzip) e gera warning de chunk acima de 500 kB; como carrega apenas ao explorar 3D, nao bloqueia o fluxo padrao, mas performance deve ser medida no publico.
- Em 720 px de altura, o CTA do rail pode exigir scroll por causa de perguntas longas. Continua acessivel e sem colisao, mas tem menos imediatismo que a referencia.
- Copy curta do palco ainda pode terminar com elipse pouco elegante; preferir limite sem corte no meio da frase.

Deploy publico continua pendente no handoff DEPLOY. Gate publico exige asset cinematografico HTTP 200, console vazio, uma resposta completa em desktop/mobile e alternancia 3D funcional quando acionada.

## Escopo

Validar o ciclo real integrado: fontes -> lentes com citacoes verificaveis -> perguntas -> resposta e feedback -> replay preservando o original -> revisao -> persistencia apos reload.

## Criterios adicionais

- isolamento entre sessoes;
- ausencia de segredo no bundle entregue ao navegador;
- erros visiveis e honestos;
- navegacao por teclado e foco visivel;
- layout mobile utilizavel;
- endpoint ausente registrado como pendente, nunca aprovado por fixture ou mock.

## Resultado verificado

- `npm test`: 15/15 testes passaram; inclui replay imutavel, limites de ramificacao e descarte de citacao inventada.
- `npm run build`: passou; 1.869 modulos; bundle JS 309,32 kB e CSS 43,79 kB.
- `scripts/qa-rehearsal-smoke.ps1 -Full`: passou em fonte -> lentes -> perguntas -> resposta/feedback -> rewind -> readback persistente.
- Duas sessoes HTTP receberam cookies distintos; material criado na sessao A nao apareceu na sessao B.
- Rewind criou novo `id` com `parentSessionId`, zerou os turnos pedidos e manteve a resposta no original apos novo GET.
- Bundle gerado sem `OPENAI_API_KEY`, `DATABASE_URL`, URL PostgreSQL ou assinatura `sk-*` obvia.
- Payload invalido retornou HTTP 400, JSON e `{error}` nao vazio.
- Aba local exclusiva de QA: console sem erro/warning no caminho integrado.
- Desktop: fonte salva, perfil persistido, citacoes literais visiveis, sala 2.5D, tres perguntas, `Ctrl+Enter`, feedback, rewind e Mesa observados em capturas da execucao.
- Mobile 390x844: `scrollWidth=375` para `innerWidth=390`, sem overflow horizontal; navegacao inferior e conteudo utilizaveis.
- Teclado: primeiro Tab focou `Pular para o conteudo`; outline computado `3px solid`, visivel. `Ctrl+Enter` enviou respostas.
- Revisao: material v1 criado, apareceu no seletor depois de reload; original e branch ja haviam sido confirmados pelo smoke de API.

## Falhas acionaveis

### RESOLVIDO — P1 — revisao da Mesa inventava funcionalidades sem lastro

- Dono provavel: ROOT, `server/ai.ts`, funcao `prepareWork` (instrucao generica nas linhas 28-30).
- Reproducao: criar fonte contendo apenas exigencia de evidencias verificaveis, limite de cinco minutos, clareza/impacto/viabilidade; concluir ensaio; clicar `Revisar na mesa`; preparar o texto pre-preenchido.
- Observado: o material salvo afirmou que existem `conferencia automatizada`, `moderacao humana`, `camadas translucidas e animacoes suaves`, e apresentou cronometro/indicadores como plano. Nenhum desses fatos constava nas fontes selecionadas; parte contradiz o estado observado do produto.
- Esperado: preservar fatos confirmados; marcar recomendacao sem lastro como hipotese/proximo passo, sem transformar sugestao do feedback em funcionalidade existente.
- Impacto: quebra o contrato de revisao sustentada pelas fontes e pode produzir alegacao publica falsa.
- Resolucao verificada: `prepareWork` passou a classificar esses pontos como `Pendente de confirmacao` ou `Proposta — nao representa funcionalidade ou resultado confirmado`.
- Evidencia canonica: `artifacts/qa/root-store-grounding.json` registra PASS conjunto para rejeicao CAS de revisao obsoleta, cota persistente por sessao e grounding da revisao viva.
- Regressao focal repetida pelo QA: `npx --no-install tsx --test tests/root-work-grounding.test.ts` — 1/1 teste passou em 2026-09-12.
- Limite: o teste impede a promocao documental desse caso conhecido; nao constitui verificacao semantica exaustiva de toda saida generativa.

### P2 — evidencia da sala identifica a fonte por UUID

- Dono provavel: SALA com apoio de ROOT no contrato, `src/components/rehearsal/RehearsalRoom.tsx`.
- Reproducao: abrir `Ver lastro da pergunta` ou `Evidencias usadas` depois de gerar/avaliar.
- Observado: `<cite>Fonte {sourceId}</cite>` exibe identificador tecnico, enquanto a pagina de audiencia exibe o titulo humano.
- Esperado: titulo verificavel da fonte, preservando `sourceId` internamente.
- Impacto: a citacao e literal, mas a origem nao e reconhecivel para quem ensaia.

## Pendente honesto

- Falha de provedor/rede visivel na UI nao foi provocada para evitar reiniciar ou sabotar o servidor compartilhado. O contrato HTTP 400 `{error}` passou e os componentes possuem `role="alert"`, mas a recuperacao visual sob indisponibilidade externa ainda precisa de fault injection controlada.
- Deploy publico permanece bloqueado de forma independente: a ultima versao informada pelo ROOT respondia HTTP 500 por import ESM. O P1 de grounding local esta encerrado e nao deve reaparecer como blocker desse deploy. O smoke publico aguarda nova versao testavel.

## Restricoes respeitadas

Sem instalar dependencias, reiniciar servidor, editar codigo de produto ou usar a aba do usuario/VIDEO.

## Proximo passo recomendado

ROOT deve entregar uma nova versao publica sem o HTTP 500; QA entao repete uma jornada desktop/mobile e confirma asset, console e alternancia 3D. O P2 de titulo de fonte pode entrar em passe posterior sem reabrir o P1 ja resolvido.
