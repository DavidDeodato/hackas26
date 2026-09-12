# Controle do projeto

## Missao

Construir uma candidatura forte para o Hack for Humanity: Sao Paulo 2026, com impacto humano local, produto funcional, tecnologia criteriosa, acessibilidade comprovada e inovacao defensavel.

## Estado atual — canônico, 12/09 após correção ESM

ENTREGA CONFIRMADA 17:43Z — login, conta, perfil e avatar modular publicados em https://rebobina-h4h.vercel.app. Deploy final dpl_7UA74HgQKSbMXPvi6GFe6ERy8c4U, asset index-DILHOC9X. ROOT repetiu12checks de auth no público com PostgreSQL: PASS em `artifacts/qa/root-auth-public.json`. Build1889 e19/19 testes passaram; QA de navegador13checkpoints local (`artifacts/qa/auth-ui-report.json`) com cadastro, personalização, avatar no palco, recarga, logout, relogin e demonstração sem estado da conta. Capturas desktop/mobile inspecionadas diretamente pelo ROOT. Sincronização entre abas implementada e revisada estaticamente; teste dinâmico entre abas permanece pendente. Avatar runtime modular tem2silhuetas,4cabelos e5cores independentes. GLB feminino TRELLIS gerado de verdade, mas experimental sem rig e não usado como avatar editável; masculino bloqueado pela cota gratuita. Sem OAuth, e-mail verificado, recuperação de senha ou auditoria de produção. Vídeo novo segue com donoVIDEO e backupv5 íntegro. Detalhe no handoff `handoffs/ROOT_AUTH_AVATAR.md`.

ATUALIZAÇÃO 17:34Z — LOGIN/AVATAR: novo pedido explícito do usuário com janela de dez minutos. Auth real email/senha com sessão opaca PostgreSQL, workspace por conta, perfil e avatar modular editável em implementação. CORE backend/shared; SHELL frontend login/perfil; ROOT integração e isolamento; mini_world_fix builder/preview3D; coordenador4 apresentador/deploy; IMAGENS TRELLIS gratuito paralelo; QA e VIDEO preservam gates. Visitante fica somente pela opção explícita de demonstração, sem importar dados guest automaticamente para contas. Email verificado, OAuth, recuperação de senha e auditoria de produção não estão entregues. Não promover auth antes de teste de duas contas/logout/relogin e browser.

GATES VISUAIS PRÉ-AUTH: Sala, Audiência, Mesa, Materiais e shell passaram build e16testes. Materiais teve foco de retorno corrigido,8checks desktop/mobile (`artifacts/qa/materials-focus-return.json`). Audiência fit/citações e Mesa versão2 preservando1 verificados. MiniWorld Mesa teve captura vazia após resize somente IAB; teste headless não reproduziu e reload IAB restaura; causa não confirmada, não inventar diagnóstico. Vídeo v5 backup íntegro79,97s1600x900 com legendas, fontes e revisão; novo login ainda não capturado. Esse snapshot não comprova novo auth.

RODADA VISUAL SOLICITADA PELO USUÁRIO: gerar referências para Audiência/Mesa/Materiais a partir do3Dprincipal aprovado, criticar atuais e implementar umpágina/agente. Executores dessa rodada configurados gpt-6-astra/ultra. IMAGENS gera3refs e direção implementável; AUDIENCIA dono própria página; MESA apenasWorkPage/work-polish.css; novo subagent materials_page exclusivoMaterialsPage/src/components/materials; mini_world_fix exclusivoMiniWorld.tsx/css. ROOT coordena/integra, chat4preservaengine/API/deploy, QA/MARCA revisam. P1miniWorldMateriais invisível apesarcanvasnãozero emcorreção renderer; não promoveratéimagemreal. ReferênciaPNGnão substitui3D nem prova funcionalidades. Critério: página usável, autoral, coherente, desktop/mobile efluxos preservados; semderivarfeaturefake daimagem.

DECISÃO ATUAL DO USUÁRIO — RESTAURAR3D: usuário aprovou explicitamente a cenaWebGL lowpoly do print e pediu que volte como experiência principal, melhorada, com linguagem3D nas outras páginas. O padrão cinematic anterior está supersedido; imagem apenas alternativa/fallback. Coordenador4 alteraSpatialStage/engine; ROOT integra; worker mini_world escreve somente src/components/spatial/MiniWorld.tsx/mini-world.css para audiência/mesa/materiais. Critério:3D aparece sem clique na chegada, perguntas e dados permanecem, cenas auxiliares compactas distintas não bloqueiam trabalho, teclado/reducedmotion/mobile preservados, build/test/browser passam. Não reivindicar geração de todas as situações possíveis; personalização atual é dados/contexto/elenco sobre geometria pré-modelada.

PUBLICAÇÃO VALIDADA 17:13:26Z: redeploy ESM dpl_3m9aSmHyXQ7smm3PWZ3ckd5npvS1 em https://rebobina-h4h.vercel.app passou suíte real completa (exit0): PostgreSQL, fonte salva, perfil/perguntas/feedback IA, citações ancoradas, resposta duplicada rejeitada, rewind preservando original e reload, isolamento entre sessões, fonte alheia rejeitada, Work v1/v2 preservados. Evidência canônica `artifacts/qa/root-integration-public.json`. Substitui bloqueio de API500 descrito historicamente abaixo. QA visual público/submissão/aceite estético são gates separados; não houve validação humana de aprendizagem.

CONFIRMADO LOCAL: plataforma de ensaio de apresentações integrada. Fonte → audiência profissional → perguntas plausíveis → resposta/feedback → rewind imutável → revisão versionada passaram com IA real e PostgreSQL, usando materiais fictícios explicitamente marcados. Build e16/16testes passaram; cota persistente e rejeição de gravação concorrente obsoleta passaram. Mesa separa documentos/propostas/pendências e valida citações literais, sem garantir verdade semântica.

VISUAL ATUAL LOCAL: palco WebGL3D como padrão por aprovação explícita do usuário; imagem apenas alternativa/fallback rotulada. Câmera/telão/materiais refinados, seleção de perfis preenche o palco antes do ensaio. MiniWorld distintos em Audiência/Mesa/Materiais. Três referências de páginas inspecionadas e distribuídas (`design/references/PAGE_ART_DIRECTION.md`); Audiência e Mesa aplicadas, Materiais em finalização. Sidebar/controles/modais têm executor Astra ultra exclusivo (App/shell-polish.css). Estado de aceite por screenshot/QA nos handoffs; referências não provam implementação. API e personalização de elenco/contexto preservadas, sem alegação de prever todas as reações.

VÍDEO: v3 cinematográficos são backups, não versão vigente. VIDEO entregou v4 narrado com3D segundo handoff; auditoria pediu v5 com enquadramento16:9, citação aberta, revisão material e legendas incorporadas. Conferir `handoffs/VIDEO.md` e arquivo final antes de promover. Limite oficial/submissão/aprovação do usuário são gates separados.

PUBLICAÇÃO: API pública validada em10checks às17:13:26Z conforme evidência acima. O erro ESM inicial foi corrigido. Visual público ainda pode ser anterior à rodada3D/páginas atual; coordenador4 aguarda snapshot consolidado para redeploy, seguido de QA público. Não confundir API validada com visual atualizado.

PRÓXIMO PASSO: fechar QA de rendererMateriais e páginas/SALA/shell; ROOT libera snapshot ao coordenador4 para deploy e aoVIDEO para captura; QA confereURL. Sol dedicado executa commits atômicos locais de entregas estáveis com identidadeGitexistente verificada, sem tag/trailerCodex e sem push. Fontes operacionais: handoffs ROOT/SALA/AUDIENCIA/MESA/MATERIAIS/MINI_WORLD/VIDEO/DEPLOY/COMMITS e SWARM_THREADS. Segredos nunca nos registros.

## Histórico supersedido — não usar como status atual

ATUALIZAÇÃO CANÔNICA 12/09 14:00 SP, supersede fotografias históricas abaixo: ensaio de apresentações implementado e integrado ao PostgreSQL. Regressão real de fonte → audiência → perguntas → resposta → feedback → rewind → revisão versionada passou (`artifacts/qa/root-integration.json`,16:56:59Z), com fonte fictícia marcada. Quinze testes passaram. Workers paralelos ativos via coordenador chat4; ROOT fork8 dono integração/base. Cota diária PostgreSQL e controle de revisão concorrente implementados; regressão focal em `artifacts/qa/root-store-grounding.json`. Mesa agora separa fatos documentados/propostas/pendências e confere citações literais; não comprova verdade semântica das fontes. Visual anterior rejeitado: novo shell escuro integrado, sala/mesa em redesign, QA visual reaberto e vídeo anterior apenas backup. Deploy pertence ao coordenador4, não confirmado aqui. Próximo: fechar consistência visual e regressão antes de nova captura. Nunca tratar teste funcional como aprovação estética nem prova de ganho de aprendizagem.

**MVP LOCAL DE ATENDIMENTO CONSTRUIDO; PIVOT AUTORIZADO PARA ENSAIO DE APRESENTACOES; FORKS A SEREM ABERTOS PELO USUARIO.**

Estado atualizado 12/09: build passou, 10 testes de motor passaram, PostgreSQL dedicado conectado, OpenAI autenticada e primeira geracao de floricultura retornou HTTP200. App localhost:4173. QA completo ainda pendente. Novo foco e ensaio de apresentacoes/perguntas dificeis com lentes profissionais fundamentadas; nao previsao psicologica. [Protocolo canonico dos forks](SWARM_PROTOCOL.md) e [sete prompts](FORK_PROMPTS.md). ROOT integra; sete escopos disjuntos: CORE, SALA, AUDIENCIA, MESA, QA, MARCA, VIDEO. Prompts criados nao significam agentes iniciados. Proximo passo: usuario abrir forks locais com prompts; ROOT integrar os contratos.

Atualizacao de 12/09: usuario solicita mundo 2.5D generativo e paginas auxiliares com modo Work inspirado no G02. [Proposta detalhada de experiencia](../../research/REBOBINA_PLATFORM_EXPERIENCE.md): Meu mundo, Mesa de trabalho, Meus materiais e Minhas tentativas, ligados por material → ensaio → replay → revisao. Codigo de tipos, maquina de estados, planner e interface do G02 consultado somente para referencia; runtime nao testado e nenhum arquivo G02 alterado. Proposta ainda nao e requisito aprovado nem capacidade implementada. Proximo passo: apresentar desenho e fechar contrato minimo de construcao; provedor e integracao seguem pendentes.

O evento, as trilhas, os criterios, os dados-base, as restricoes de tempo e as lacunas de regulamento estao registrados no [dossie geral](../../research/HACK_FOR_HUMANITY_CONTEXT_DOSSIER.md). As lentes publicas dos dez mentores/jurados, convergencias, tensoes e perguntas adversariais estao no [dossie da banca](../../research/JUDGES_PUBLIC_BIAS_DOSSIER.md). A identidade da The AI Collective, os vieses institucionais e os precedentes comparaveis estao no [dossie institucional](../../research/INSTITUTIONAL_BIAS_AND_PRECEDENTS.md). O funil proposto para gerar, pesquisar e selecionar teses esta no [metodo de geracao e selecao](../../research/IDEA_GENERATION_AND_SELECTION_METHOD.md).

## Meta do ciclo atual

Resultado: [Rebobina](../../research/REBOBINA_PROPOSAL.md), selecionada apos 12 sementes brutas, 9 familias, quatro elaboracoes proporcionais, pesquisa cruzada, confronto de dois revisores e dez lentes publicas em lote. [Registro do ciclo](../../research/IDEATION_RUN_001.md). Limites: API de IA nao autenticada, teste humano pendente, novidade comparativa e hipotese. Proximo movimento: contrato de construcao com verificacao inicial do provedor e tarefa de compreensao.

Validar um metodo capaz de gerar diversidade real de teses e selecionar a candidatura mais competitiva sem confundir novidade, beleza, complexidade ou afinidade presumida com a banca.

Revisao adversarial de 12/09: tres revisores avaliaram o metodo e releram a V2. O protocolo canonico e [IDEA_METHOD_V2.md](../../research/IDEA_METHOD_V2.md); o anterior permanece historico. Quantidades adaptam-se ao tempo restante, evidencia minima precede corte por palco, pisos artificiais foram removidos e personas produzem objecoes, nao votos. Pareceres e correcoes em [METHOD_ADVERSARIAL_REVIEW.md](../../research/METHOD_ADVERSARIAL_REVIEW.md). Coerencia documental verificada; eficacia operacional aguarda piloto.

## Criterio de aceite do ciclo

- fontes oficiais priorizadas;
- transcricao separada de regra oficial;
- fatos, inferencias e pendencias distintos;
- quatro trilhas analisadas;
- criterios traduzidos em evidencia observavel;
- viabilidade de dados e riscos mapeados;
- nenhuma ideia promovida prematuramente.
- fatos publicos da banca separados de inferencias sobre lentes de avaliacao;
- incerteza preservada sobre quem efetivamente vota e como as notas sao agregadas.
- identidade ampla da The AI Collective separada do recorte civico especifico do H4H;
- precedentes classificados por proximidade e eventos homonimos excluidos;
- ausencia de historico verificavel de vencedores anteriores do H4H da The AI Collective declarada como lacuna.

## Escopo ainda nao decidido

- trilha;
- publico e problema;
- proposta de valor;
- arquitetura;
- stack;
- divisao de agentes;
- deploy e distribuicao.

## Stop gates

- Nao escolher ideia sem pessoa, dor local, fonte e tarefa critica.
- Nao usar IA sem necessidade demonstravel.
- Nao declarar acessibilidade sem teste.
- Nao declarar seguranca de rota com dado historico ou atrasado.
- Nao tratar incentivo ao Devin como criterio formal.
- Nao distribuir agentes sem escopos disjuntos, contratos e integrador.
- Nao declarar regra de submissao que nao esteja no formulario ou em confirmacao oficial.

## Fonte de verdade

1. Regras oficiais e formulario do evento.
2. [Dossie de contexto](../../research/HACK_FOR_HUMANITY_CONTEXT_DOSSIER.md).
3. [Dossie publico da banca](../../research/JUDGES_PUBLIC_BIAS_DOSSIER.md).
4. [Dossie institucional e precedentes](../../research/INSTITUTIONAL_BIAS_AND_PRECEDENTS.md).
5. [Metodo V2](../../research/IDEA_METHOD_V2.md) e [auditoria do metodo](../../research/METHOD_ADVERSARIAL_REVIEW.md).
6. [Registro de fontes](../../research/SOURCE_REGISTER.md).
7. Registros em `docs/agent/`.
8. Conversa apenas como pista, salvo quando reproduz material primario identificado.
