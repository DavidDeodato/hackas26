# REBOBINA — CONTRATO COMUM DOS FORKS

AVISO ROOT: ler `docs/agent/CONTRACT_NOTICE.md`. Ambos nomes de contrato/endpoints são compatíveis. ROOT é o fork8 de integração/base; o fork7 encerrou distribuição. Não criar integrador adicional.

Prioridade vigente: ensaiar APRESENTACOES e perguntas dificeis, com base no pitch e em evidencias profissionais da audiencia. Entrevistas ficam fora desta entrega. Atendimento existente permanece como demonstracao secundaria; nao reescrever seu motor.

## Produto e honestidade
Pitch + documentos profissionais → lentes de avaliacao fundamentadas → perguntas plausiveis → resposta do usuario → feedback com evidencia → nova tentativa → material revisado.
Nao alegar leitura mental, diagnostico psicologico ou previsao do comportamento de uma pessoa. Cada lente e hipotese com fonte e limite. Nao inferir atributos sensiveis. Documentos ficticios devem ser identificados como ficticios. Uma pergunta previamente combinada para a demo deve ser identificada como ensaio combinado, nunca como previsao espontanea.

## Estado confirmado antes dos forks
React/TS/Vite + Express em http://localhost:4173. PostgreSQL dedicado conectado; OpenAI autenticado e geracao real de floricultura concluida. Build passou; dez testes do motor de atendimento passaram. Quatro paginas existentes, mundo SVG interativo. QA completo/mobile e novo fluxo de apresentacao ainda pendentes. Servidor existente pertence ao integrador; nao encerrar, reiniciar ou abrir outro na mesma porta.

## Regra de integracao
Este chat original e o INTEGRADOR. Somente ele edita src/App.tsx, src/styles.css, src/lib/*, shared/types.ts, server/index.ts, server/store.ts, server/config.ts, package*.json e configuracoes globais.
Cada fork escreve somente no seu escopo. Sem git reset, checkout, stash, commits ou deploy. Nao instalar dependencias. Nao editar arquivos de outro dono. Mudanca de contrato: registrar em docs/agent/handoffs/SEU_ID.md, com proposta e impacto; continuar com adaptador local, sem alterar contrato unilateralmente.
Leia este arquivo e shared/rehearsal.types.ts antes de trabalhar. Nao reabrir pesquisa ou arquitetura geral. Nao aguardar outro fork: componentes recebem props tipadas; dados de exemplo precisam estar rotulados e nao podem ser apresentados como chamada real. Erros reais devem aparecer na UI, sem sucesso ficticio.

## Design congelado para construir em paralelo
Nome: Rebobina. Portugues brasileiro. Marca acolhedora, ludica adulta, editorial limpa. Fundo #f7f8f3, papel #fffefa, texto #2e3933, verde #304e3e, lima #e6edc5. Fontes atuais Manrope/DM Sans com fallback. Sem neon, cyberpunk, gradientes roxos, excesso de cards ou landing page antes da atividade. Mundo isometrico 2.5D e a experiencia central. Controles legiveis, teclado, foco, contraste e movimento reduzido. Branding propoe acabamento dentro desta direcao; nao muda layout/tema global sozinho.

## Donos exclusivos
- A1 motor: server/rehearsal/*, shared/rehearsal-engine.ts, tests/rehearsal*.test.ts.
- A2 sala: src/pages/RehearsalPage.tsx, src/components/rehearsal/*.
- A3 audiencia: src/pages/AudiencePage.tsx, src/components/audience/*, research/rehearsal-audience-examples.md.
- A4 mesa: src/pages/WorkPage.tsx, src/pages/MaterialsPage.tsx, src/components/work/*.
- A5 QA: scripts/qa-rehearsal*, tests/rehearsal-api*, docs/agent/qa-rehearsal/*; codigo dos demais somente leitura.
- A6 marca: public/brand/*, docs/brand/*; nao editar favicon existente, CSS global ou App.
- A7 video: demo/*; app e demais arquivos somente leitura. Nao compartilhar/publicar automaticamente.

## Contrato de UI e API
A2 exporta default RehearsalPage sem props. Usa api de src/lib/api e endpoints abaixo. Recebe opcionalmente location.state {pitch,artifactId}. A3 exporta default AudiencePage sem props. Rotas do integrador: / e /ensaio sala; /audiencia perfis; /mesa e /materiais existentes; /atendimento mundo antigo; /tentativas historico antigo.
GET /api/rehearsals/state → RehearsalWorkspace.
POST /api/rehearsals/audience {name,role,sourceIds:string[]} → {profile:AudienceProfile,workspace:RehearsalWorkspace}. Fonte vem de materiais da sessao; servidor resolve IDs.
POST /api/rehearsals/generate {pitch,audienceIds:string[],artifactId?:string} → {session:RehearsalSession,workspace:RehearsalWorkspace}.
POST /api/rehearsals/answer {sessionId,questionId,answer} → {turn:RehearsalTurn,workspace:RehearsalWorkspace}.
POST /api/rehearsals/rewind {sessionId,keepTurns:number} → {session:RehearsalSession,workspace:RehearsalWorkspace}. Preserva original, cria ramificacao.
Erros {error:string}, HTTP nao-2xx. Enquanto endpoint nao integrado, mostrar indisponibilidade; nao mascarar como sucesso.
A1 exporta mapAudience(input:MapAudienceInput):Promise<AudienceProfile>, generateRehearsal(input:GenerateRehearsalInput):Promise<RehearsalSession>, evaluateAnswer(input:EvaluateAnswerInput):Promise<RehearsalTurn> em server/rehearsal/service.ts. O integrador fornece rotas, sessao, persistencia e isolamento. A1 pode importar config de server/config.ts; nunca expor segredos. IDs UUID, timestamps ISO, referencias por sourceId+quote.

## Comunicacao sem reuniao
Cada fork cria e atualiza SOMENTE seu docs/agent/handoffs/Ax.md: STATUS (working/ready/blocked), arquivos, exports, teste, limitacoes, proximo passo. Primeira versao funcional em 12 minutos; acabamento em mais 10. Registre READY assim que compilavel, nao espere perfeicao. Antes de tocar dependencia compartilhada, releia este contrato. Integrador resolve divergencias e executa testes finais; usuario nao e mensageiro entre agentes.
Video consulta handoffs e HTTP/estado visivel; grava trechos prontos imediatamente, sem esperar todas as paginas. Nao ocupar a mesma aba de outros testes. QA usa sessao/aba propria e somente dados ficticios. Nenhum fork altera credenciais ou outros projetos. Tokens nunca entram em prints, logs, video ou Git.
