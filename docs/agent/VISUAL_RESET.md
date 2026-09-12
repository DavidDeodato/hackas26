# Redirecionamento visual — 2026-09-12

Estado: IMPLEMENTACAO PENDENTE; usuario rejeitou design/UX anterior. Teste funcional nao aprova visual.

## Direcao vinculante

Experiencia futurista, autoral e imersiva. Palco 2.5D pre-modelado; nao gerar sala inteira ao vivo. Personalizar contexto, papeis, elenco, tela e interacoes a partir dos dados. Uma acao primaria por momento, navegacao secundaria discreta, fonte e incerteza acessiveis. Nao substituir funcionalidade por decoracao.

Referencia local verificada: ../projeto_hackathon/app/components/campobounty/atlas.tsx importa Three, OrbitControls e RoomEnvironment. Reutilizar principios de cena interativa com selecao sincronizada, nao copiar dominio rural.

## Donos e fronteiras

- MARCA: tokens e direcao de arte; comunicar diretamente SALA e ROOT. Sem editar CSS global.
- SALA: cena e experiencia de ensaio; pesquisa curta de bibliotecas oficiais, implementacao na stack existente e QA visual.
- ROOT fork8: shell, CSS global, integracao e correcao de grounding no prepareWork.
- AUDIENCIA/MESA: consistencia local com tokens; AUDIENCIA restaura perfis apos reload.
- IMAGENS: assets pontuais demandados por SALA; arte quente anterior opcional, nunca dependencia.
- QA: reabrir gate visual, comparar antes/depois desktop/mobile e preservar testes funcionais.
- VIDEO: manter MP4 anterior como backup, recapturar nova experiencia quando estavel.

## Aceite

Screenshots reais desktop/mobile sem overflow, hierarquia clara, palco dominante, texto legivel, teclado/reduced-motion, fluxo fonte-pergunta-resposta-feedback-replay preservado. Nada de declarar visual aprovado apenas por build verde.

Risco adicional confirmado pelo QA: revisao de material inventa funcionalidades; ROOT notificado para corrigir e retestar antes de promover entrega fundamentada.

Proximo passo: MARCA transmite tokens; SALA/ROOT implementam em escopos disjuntos; QA revisa; VIDEO recaptura. Coordenador acompanha handoffs.

## Progresso conferido

- MARCA entregou `docs/brand/DIRECAO_ARTE_IMERSIVA.md` e `public/brand/rebobina-logo-horizontal-dark.svg`; informou transmissao direta a SALA/ROOT. Esses tokens substituem a paleta clara anterior.
- SALA recebeu o reset e iniciou alteracoes no componente de cena; pesquisa oficial registrada na execucao. Aceite visual ainda PENDENTE, nao confundir com o STATUS ready historico do handoff SALA.
- AUDIENCIA implementou GET /rehearsal/state e SavedAudienceList (codigo conferido pelo coordenador); QA independente de regressao solicitado. Relato do executor: reload, desktop/mobile, build e 15 testes passaram.
- MESA notificada para seguir o mesmo contrato visual, sem alterar CSS global.
