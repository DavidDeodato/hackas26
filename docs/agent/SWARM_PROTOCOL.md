# REBOBINA — CONTRATO COMUM DOS FORKS

AVISO ROOT: ler `CONTRACT_NOTICE.md`. Ambos nomes de contrato/endpoints são compatíveis. ROOT é o fork8 de integração/base; o fork7 encerrou distribuição. Não criar integrador adicional.

Versao 1 — 2026-09-12. Este arquivo vence propostas anteriores de produto nesta fase. Nao e alegacao de implementacao concluida.

## Missao congelada

CORE: ensaiar uma apresentacao e perguntas dificeis usando o pitch e evidencias profissionais sobre a audiencia. Jornada: trazer pitch e materiais → mapear lentes de avaliacao → gerar perguntas fundamentadas → responder na sala ludica 2.5D → receber feedback fundamentado → rebobinar e revisar a resposta/material.

Nao prever pessoas nem inferir personalidade, saude mental ou pensamentos privados. Perfis sao lentes profissionais hipoteticas com fontes e incerteza. Documentos sinteticos ficam claramente identificados como exemplos. Pergunta combinada com jurado e demonstracao de ensaio, nunca prova de previsao espontanea. Nao inventar votos, eficacia educacional, resultados ou testemunhos. Entrevistas e atendimento sao extensoes, nao caminho critico.

## Estado confirmado de partida

React/TypeScript/Vite + Express. PostgreSQL dedicado conectado. OpenAI autenticada e primeira geracao real de cenario concluida. Build e 10 testes de motor passaram antes do pivot. App local http://localhost:4173. Quatro paginas de atendimento existentes; nao apagar. Novo core de apresentacoes ainda precisa ser construido e integrado. Flow/ElevenLabs em abas Chrome, sem integracao runtime. Hugging Face autenticado. Credenciais somente servidor; nunca incluir em assets, docs, logs ou bundles.

## Identidade congelada para todos

Nome Rebobina. Promessa: ensaie conversas que importam. Portugues brasileiro natural, curto, sem infantilizar. Mundo caloroso, isometrico, personagens acolhedores; ferramentas claras e discretas. Fundo #f7f8f3, superficie #fffefa, texto #2e3933, verde #304e3e, acento #e6edc5. Manrope em titulos, DM Sans em texto; fallbacks sans-serif. Icones Lucide. Sem neon, roxo generico, glassmorphism ou landing page em lugar do produto. Texto legivel, foco visivel, teclado, movimento reduzido e layout mobile. Marca pode refinar simbolo mantendo nome/paleta e sem bloquear implementacao.

## Donos e arquivos exclusivos

- ROOT (chat original): integracao, App.tsx, main.tsx, styles.css, src/lib/*, server/index.ts, server/store.ts, server/config.ts, shared/rehearsal-types.ts, package*, configuracoes e documentacao central. Somente ROOT muda contratos, instala dependencias, inicia/reinicia servidor ou faz deploy.
- CORE: server/rehearsal/**, shared/rehearsal-engine.ts, tests/rehearsal*.test.ts.
- SALA: src/pages/RehearsalPage.tsx, src/components/rehearsal/**. CSS com prefixo rehearsal-.
- AUDIENCIA: src/pages/AudiencePage.tsx, src/components/audience/**, research/rehearsal/**. CSS com prefixo audience-.
- MESA: src/pages/WorkPage.tsx, src/pages/MaterialsPage.tsx, src/components/work/**. Nao editar styles.css; CSS novo separado.
- QA: scripts/qa-rehearsal*, tests/qa-rehearsal*, docs/agent/handoffs/qa*, artifacts/qa/**. Nao corrigir produto fora do escopo: registrar falha reproduzivel para o dono.
- MARCA: public/brand/**, docs/brand/**. Nao editar favicon, CSS ou App diretamente; ROOT integra.
- VIDEO: artifacts/demo/**, docs/demo/**. Nao alterar codigo nem disputar abas com QA. Criar/usar sua propria aba. Nao publicar nem submeter inscricao.

Nao modificar outros projetos, segredos, arquivos de outro dono, lockfile, branch compartilhada ou resetar Git. Todos trabalham diretamente no checkout C:/Users/lucas/Desktop/projetos/hackas26. Se um fork estiver em worktree diferente, nao copiar por cima: avisar ROOT com caminho e diff. Nao criar subagentes adicionais. Nao usar Sites.

## Comunicacao sem reuniao

Cada agente escreve apenas docs/agent/handoffs/<SEU-PAPEL>.md com STATUS (working/ready/blocked), arquivos, contrato implementado, verificacoes reais, limitacoes e proximo passo. Escrever um primeiro estado assim que iniciar, atualizar ao entregar ou bloquear. Mudanca de contrato: registrar REQUEST no proprio handoff e continuar no contrato atual. Nao esperar consenso para detalhes internos reversiveis. Nao criar requisitos silenciosamente.

ROOT consulta handoffs e integra. Nao depender de mensagens entre forks. Nao editar registros dos outros. Se faltar endpoint, usar fixture local explicitamente marcada apenas em desenvolvimento; jamais declarar integracao pronta com fixture. Nao commitar trabalho de terceiros. Nao iniciar daemon novo ou matar servidor existente.

## Contrato de dados/API congelado

Tipos em shared/rehearsal-types.ts. Importar tipos; nao duplicar. Toda API retorna JSON e erros {error:string}. Usar api() de src/lib/api.ts (prefixo /api implicito).

- GET /rehearsal/state → RehearsalWorkspace.
- POST /rehearsal/audience {name,role,sourceIds:string[]} → {profile:AudienceProfile,workspace:RehearsalWorkspace}. ROOT resolve sourceIds em materiais da sessao.
- POST /rehearsal/generate {pitch:string,audienceIds:string[],artifactId?:string} → {session:RehearsalSession,workspace:RehearsalWorkspace}.
- POST /rehearsal/answer {sessionId,questionId,answer} → {turn:RehearsalTurn,workspace:RehearsalWorkspace}.
- POST /rehearsal/rewind {sessionId,keepTurns:number} → {session:RehearsalSession,workspace:RehearsalWorkspace}. Preservar original; criar ramificacao.

CORE exporta server/rehearsal/service.ts: mapAudience(input:MapAudienceInput):Promise<AudienceProfile>; generateRehearsal(input:GenerateRehearsalInput):Promise<RehearsalSession>; evaluateAnswer(input:EvaluateAnswerInput):Promise<RehearsalTurn>. ROOT faz rotas, isolamento e persistencia. CORE pode ler server/config.ts; nao editar. Schema Zod, fontes exatas verificadas, timeout e respostas honestas. Nao acessar chaves no browser.

SALA exporta default RehearsalPage sem props; usa endpoints acima. Inicio aceita useLocation().state {pitch?:string,artifactId?:string}. Rota /ensaio e home / apontarao para essa pagina. Navegar /audiencia para perfis, /mesa para revisar {artifactId?,reflection?:string}. AUDIENCIA exporta default AudiencePage sem props e usa useWorkspace() para materiais; cria fonte via POST /materials existente antes de mapear. MESA muda CTA principal para /ensaio passando {pitch:artifact.content,artifactId:artifact.id}. Atendimento anterior permanece secundario em /atendimento, integrado por ROOT.

## Entrega e prazo

Primeiro slice compilavel em ate 12 minutos apos iniciar; fechamento de escopo em 25 minutos. Nao esperar acabamento total para entregar. CORE/SALA/AUDIENCIA primeiro; MARCA e VIDEO nao bloqueiam nucleo. QA inicia com contrato e testa partes conforme disponiveis. Video pode capturar partes prontas, mas nao representar fixture como chamada real. Se captura real indisponivel, entregar roteiro e declarar o bloqueio; nao fingir gravacao.

Aceite final: pitch + fontes → perguntas com lastro → resposta → feedback → nova tentativa preservada → revisao, persistente apos reload. Uma apresentacao, ate 3 perfis, 3 perguntas. Sem voz obrigatoria, geracao 3D runtime, auth complexa, entrevistas ou integracoes extras. Logs e testes, nao narrativa de pronto. ROOT ainda faz verificacao minima de integracao; nao existe consenso garantido so por documento.
