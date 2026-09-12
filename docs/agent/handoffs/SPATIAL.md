# SpatialStage — coordenador chat4

## Integração GLB — 2026-09-12, 14:54 SP

QA LOCAL CONFIRMADO 14:57:25 SP: `artifacts/qa/glb-ui-report.json` e `glb-ui-review.md` lidos diretamente. Doze checkpoints concluídos: ambos os modelos reais em preview/palco, source correto/fallback false, salvar/reload, desktop/mobile sem overflow, GLBs HTTP200 e zero erros. Logout entre abas também passou localmente. VIDEO liberado para gravar local. Novo deploy público e sua verificação continuam separados e sob responsabilidade do gestor/DEPLOY; este executor permanece congelado.

Novo pedido do usuário retransmitido pelo ROOT8: suportar os dois avatares TRELLIS no palco e perfil. Escopo deste executor continua somente `SpatialStage.tsx` e `spatial-scene.ts`; SHELL fornece `avatar-loader.ts:createStageAvatar(T,config):Promise<Group>`, CORE mantém schema e QA verifica a experiência.

Implementado: aguardar factory antes de criar WebGLRenderer; AbortSignal evita montar cena cancelada e libera geometria/material/textura do modelo tardio. Wrapper normaliza pés em y0/altura2,08 sem sobrescrever orientação/transforms internos do loader. Câmera e interlocutor escolhidos são restaurados. `data-avatar-source` recebe `userData.model`, `data-avatar-fallback` recebe `userData.loadFallback`; fallback do GLB mostra aviso explícito, separado da ilustração para falha de WebGL.

Evidência já executada: smoke Node sobre `createSpatialScene` real, factory assíncrona abortada, resultado `PASS_ABORT_BEFORE_RENDERER`; descartou texture/material/geometry, sem criar renderer. Atualização 14:55 SP: loader real, GLTFLoader vendorizado (115044 bytes), feminino (1309452 bytes) e masculino (1283312 bytes) confirmados no disco; `npx tsc --noEmit --pretty false` executado após materialização, exit0. SHELL reportou build1892PASS. `SPATIAL_GLUE_READY`, arquivos congelados. Não classificar GLBs como visíveis/verificados até QA. Publicação exclusiva do DEPLOY dedicado após READY consolidado ROOT8.

## Avatar de perfil — 2026-09-12, 14:40 SP

FREEZE deste executor às14:43: QA local confirmou avatar cacheado/terracota salvo, visível no palco, mantido após reload e relogin (`auth-ui-report.json`,13checkpoints). API pública de contas/avatares passou12checks em `root-auth-public.json`. Publicação final/seguimento agora são do fork dedicado de deploy, registrado em `DEPLOY_LATEST.md`; este chat não deve retomar gestão macro ou criar writers.

INTEGRADO: SpatialStage recebe `presenterAvatar?: AvatarConfig` e, quando a prop está ausente, usa `useOptionalAuth()?.user?.avatar`. O builder compartilhado `createAvatar` é aplicado somente ao apresentador; jurados/audiência não recebem atributos do usuário. Atualização às 14:47 SP: sem provider/perfil, o apresentador também usa o builder compartilhado com `defaultAvatar`, removendo o modelo legado da experiência guest. `data-presenter` mantém a distinção entre perfil e padrão. Typecheck passou após este ajuste; publicar e verificar junto do refinamento do builder, sob responsabilidade de SHELL e do DEPLOY dedicado. Este executor não inicia outra publicação.

O motor aceita PresenterFactory opcional, normaliza cada figura para 2,08 unidades, pés sobre o palco, frente +Z e movimento discreto. Salvar nova configuração recria a cena e libera a antiga; perguntas e respostas são mantidas pelo componente proprietário. `data-presenter=profile` permite verificar a integração no QA.

Correção complementar de continuidade: o callback de criação restaura `selected ?? activePersonId` e `view` pelos valores mais recentes. Isso evita redefinir câmera/interlocutor quando a cena é reconstruída para trocar avatar. Typecheck passou; o novo snapshot exige o QA visual final do SHELL/DEPLOY, sem reutilizar a aprovação do bundle anterior como evidência desta alteração.

Evidências: TypeScript/Vite1887 módulos e19/19 testes passaram após integração. Smoke geométrico executado com os dois modelos e quatro cabelos:8/8 variantes normalizadas com pésy0/altura2,08 e dispose concluído. Não equivale a screenshot de perfil salvo: QA browser está em execução por seu responsável. API de autenticação passou12checks reais registrados em `root-auth-local.json`; cross-tab e UI são gates separados.

Próximo: congelar após QA avatar salvo→Sala→reload; coordenador publica snapshot auth integrado. Vídeov5 é backup validado sem login/avatar; v6 só após fluxo visível.

## Estado visual anterior — 2026-09-12, 14:24 SP

CONFIRMADO LOCAL: o diorama WebGL é o padrão, inclusive na primeira visita. O usuário aprovou o 3D e pediu sua preservação. A imagem cinematográfica é somente alternativa explícita (`Ver ilustração`) ou fallback de WebGL. Não substituir o mundo interativo por um PNG.

Escopo exclusivo deste coordenador: `SpatialStage.tsx`, `spatial-scene.ts`, `spatial-stage.css`, `src/vendor/three`. SALA integra o componente sem editar o motor. Os MiniWorlds de Audiência/Mesa/Materiais são de outros responsáveis coordenados pelo gestor.

Entrega: teatro pré-modelado com palco circular, parede acústica curva, poltronas, apresentador, iluminação quente, vegetação e câmera ortográfica com aproximação. Elenco e interlocutor em foco dependem dos perfis selecionados. Geometria determinística; sem geração de sala ao vivo ou previsão de pessoas. Prop compact para a primeira visita, controles HTML acessíveis, texturas procedurais leves, reduced-motion e descarte de recursos no unmount.

Evidências: typecheck/build e16testes passaram. `artifacts/qa/3d-final-local-report.json` confirma primeira visita, desktop1440/mobile390 sem overflow/console. `3d-final-local-lifecycle.json` confirma 3D→ilustração→3D alternando1→0→1canvas e descarte por navegação. QA também verificou fallbackWebGL com formulário utilizável. Testes técnicos não substituem aceite estético humano.

PENDENTE: API pública já passou em `artifacts/qa/root-integration-public.json`, mas o alias ainda serve a fotografia visual anterior à rodada3D. Aguardar gestor consolidar páginas antes do deploy final. O P1 do MiniWorld de Materiais foi encerrado por QA no reteste `page-polish-materiais-*`, com estante visível no desktop/mobile; o coordenador também inspecionou as imagens.

VIDEO prepara v5 a partir do v4 narrado, com citação expandida, revisão visível, enquadramento16:9 e legendas incorporadas. São montagens de capturas reais, não screencast contínuo.

Limitação: Three0.180.0 MIT, chunk693,13kB bruto/175,74kB gzip em lazy loading. Não personaliza rostos nem faz inferências sensíveis.

## Histórico supersedido — não usar como estado atual

ATUALIZACAO VINCULANTE: apos novo pedido do usuario no ROOTfork8, 3D voltou a ser PADRAO. A imagem e opcao explicita 'Ver ilustracao' ou fallback; nao substitui o mundo3D. Camera aproximada10%, altura reduzida, tela com frasecurta grande. Propcompact disponivel para previews, embora ROOT esteja criando MiniWorlds proprios emescopo isolado. APIpublicaPASS confirmado em root-integration-public.json aposfixESM; redeploydo3Ddefault ainda emfechamento.

Escopo exclusivo: SpatialStage.tsx, spatial-scene.ts, spatial-stage.css, src/vendor/three e public/vendor/three. SALA integra componente, nao edita engine.

Entrega: cena cinematografica pre-renderizada como padrao (asset IMAGENS), controles/perfis reais HTML, identificacao de cenario ilustrativo e botao Explorar em3D. Modo3D carrega Three somente sob demanda; geometria deterministica: palco circular, arquitetura curva, poltronas, elenco conforme perfis, apresentador, iluminacao quente, vegetacao e camera ortografica com aproximacao. Retorno ao cenario preserva fluxo.

Referencia: design/references/rebobina-cinematic-studio-v1.png, gerada com ferramenta nativa de imagem. Asset ilustrativo: public/world-art/cinematic-rehearsal-stage-v2.png. A imagem nao e uma sala gerada ao vivo nem representa fielmente as pessoas reais. Perguntas sao possibilidades, nao previsoes.

Biblioteca: Three0.180.0 reaproveitada do projeto CampoBounty, licenciaMIT copiada. Bundle lazy693.13kB bruto/175.74kB gzip. Sem dependencia remota/CDN.

Validacoes: tsc e Vite build passaram; runtime observado pelo coordenador e QA independente. QA reportou16testes e alternancia cinematic(canvas0) ->3D(canvas1) ->cinematic(canvas0), estado preservado, desktop/mobile390 e console sem erro. Evidencia canonica docs/agent/handoffs/QA.md.

Falhas resolvidas: fechamento sintatico do dispose; import publico Vite substituido por import lazy de src/vendor. O import antigo causa overlay em abas obsoletas; reload recria cena. Recursos WebGL descartados no unmount; ResizeObserver/IntersectionObserver/RAF limpos; reduced-motion respeitado.

Limitacoes: personagens3D estilizados; imagem primaria e ilustracao estatica com overlays. Chunk3D grande mas fora carregamento inicial. Criterio estetico final do usuario nao deve ser inferido de testes tecnicos. Cenario visual nao personaliza rostos nem faz inferencias sensiveis.

O próximo passo histórico acima foi substituído pela restauração do3D principal e pelos vídeos narradosv4/v5.
