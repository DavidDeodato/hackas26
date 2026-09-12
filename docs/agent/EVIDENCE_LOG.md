# Log de evidencias

## EVD-20260912-015 — Ciclo e probe Rebobina

- Fato: geracao em dois contextos sem historico, verificacao de capacidades, pesquisa de alternativas, confronto de dois revisores e dez lentes publicas em lote.
- Artefatos: `research/IDEATION_RUN_001.md`, `research/REBOBINA_PROPOSAL.md`.
- Comando: `node research/experiments/rebobina-probe.mjs`.
- Resultado observado: PASS_SYNTHETIC_MECHANISM_ONLY; 8 assercoes iniciais, 27 composicoes, replay deterministico e tratamento de dado ausente.
- Limite: nenhuma UI, API paga/modelo ou pessoa testada. Comportamento das regras sinteticas nao e impacto no mundo real.

## EVD-20260912-014 — Auditoria adversarial e segunda leitura

- Fato: tres agentes revisores distintos analisaram o metodo, retornaram criticas e releram a V2; todos consideraram a revisao apta para piloto.
- Artefatos: `research/METHOD_ADVERSARIAL_REVIEW.md`, `research/IDEA_METHOD_V2.md`.
- Limite: papeis simulados, nao especialistas externos; casos documentais e nao validacao empirica. Ajustes finais pequenos conferidos pelo coordenador.
- Proximo passo: medir tempo e utilidade no primeiro ciclo real de teses.

## EVD-20260912-013 — Elaboracao seletiva incorporada

- Fato: etapa 7A adicionada ao metodo e conectada ao funil e a Banca 1.
- Evidencia: `research/IDEA_GENERATION_AND_SELECTION_METHOD.md`.
- Limite: protocolo escrito; nenhuma candidata elaborada ou integrada neste ciclo.
- Proximo passo: comparar recortes elaborados quando houver sementes selecionadas.

## EVD-20260912-001 — Evento e agenda

- Fato: evento local, hosts, local, agenda, patrocinio, premios e banca.
- Fonte: [Luma oficial](https://luma.com/h4h-sao-paulo?locale=pt).
- Impacto: fixa a janela de quatro horas e o contexto Cognition/Devin.

## EVD-20260912-002 — Origem e missao civica

- Fato: o hackathon sucede a Humans in AI Week, parte de problemas locais e nao tem resultado comercial predefinido.
- Fontes: [anuncio global](https://fortune.com/press-releases/ai-collective-hack-for-humanity-global-civic-hackathon-2026-08-17/) e [recap](https://newsletter.aicollective.com/p/humans-in-ai-week-recap-895e).
- Impacto: pessoa, comunidade e agencia humana sao parte do problema, nao adorno de pitch.

## EVD-20260912-003 — Trilhas, criterios e mentoria

- Fato: quatro trilhas e quatro pilares de 25%; produto funcional; video como apresentacao e demo; uso de Devin recomendado.
- Fontes: texto de submissao copiado pelo time e transcricao privada fornecida pelo time; os originais nao foram publicados.
- Limite: regras integrais e formato do video nao foram verificados publicamente.

## EVD-20260912-004 — Trabalho e divisao digital

- Fato: exposicao ocupacional e ganho potencial sao desiguais; desemprego agregado baixo convive com informalidade e subutilizacao.
- Fontes: [OIT/Banco Mundial](https://www.ilo.org/publications/buffer-or-bottleneck-employment-exposure-generative-ai-and-digital-divide) e [IBGE](https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/45920-pnad-continua-taxas-anuais-de-desocupacao-sao-as-menores-da-serie-em-20-unidades-da-federacao).

## EVD-20260912-005 — Letramento e desigualdade de uso

- Fato: 32% dos usuarios de Internet usaram IA generativa, com forte diferenca por renda e escolaridade; falta de habilidade e pacote de dados sao barreiras.
- Fonte: [TIC Domicilios 2025](https://cetic.br/pt/noticia/50-milhoes-de-brasileiros-ja-usam-ia-mas-potenciais-beneficios-continuam-limitados-as-camadas-de-maior-renda-e-escolaridade/).

## EVD-20260912-006 — Acessibilidade

- Fato: 14,4 milhoes de pessoas com deficiencia no Censo 2022; LBI e WCAG estabelecem autonomia, desenho universal e criterios testaveis.
- Fontes: [IBGE](https://educa.ibge.gov.br/jovens/materias-especiais/22695-censo-2022-7-3-da-populacao-com-2-anos-ou-mais-tinha-alguma-deficiencia.html), [LBI](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) e [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## EVD-20260912-007 — Resiliencia urbana

- Fato: milhoes de viagens diarias, alertas recorrentes de alagamento, plano municipal continuo e dados publicos fragmentados.
- Fontes: [SPTrans](https://www.sptrans.com.br/relatorio-integrado-da-administracao-2024/), [CGE](https://cge.prefeitura.sp.gov.br/v3/sala-de-imprensa.jsp?data=2026-03-23), [PPC](https://legislacao.prefeitura.sp.gov.br/portaria-prefeito-pref-1759-de-1-de-outubro-de-2025), [Olho Vivo](https://www.sptrans.com.br/desenvolvedores/) e [GeoSampa](https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/srv/resources/datasets/432c06b1-03a1-4b1f-9210-423e1b58e869).

## EVD-20260912-008 — Composicao e lentes publicas da banca

- Fato: a pagina oficial lista dez pessoas sob o titulo conjunto “mentores e jurados”, cobrindo transformacao, engenharia, comunidade, educacao, UX, venture capital, founders e agentes.
- Fontes: [Luma oficial](https://luma.com/h4h-sao-paulo?locale=pt) e perfis registrados em `research/SOURCE_REGISTER.md`, `SRC-JDG-001` a `SRC-JDG-015`.
- Inferencia: o padrao coletivo favorece problema real, produto ponta a ponta, controle humano, acessibilidade demonstrada, arquitetura explicavel e demo memoravel.
- Limite: nao esta publico quem vota, se todos avaliam todas as equipes ou como as notas sao agregadas.
- Impacto: teses futuras devem passar pela banca adversarial do dossie antes de promocao.

## EVD-20260912-009 — Repositorio publico

- Fato: a pasta foi inicializada como repositorio Git e publicada na conta autorizada como repositorio publico.
- Fonte: [DavidDeodato/hackas26](https://github.com/DavidDeodato/hackas26), branch `main`.
- Verificacao: visibilidade `PUBLIC`, remoto `origin` e branch local rastreando `origin/main`.
- Integridade: a transcricao privada nao foi copiada; caminhos locais e padroes de segredo foram removidos ou ignorados antes do primeiro push.
- Impacto: pesquisa, decisoes, riscos e proximos passos agora possuem URL compartilhavel e historico versionado.

## EVD-20260912-010 — Identidade e vies institucional

- Fato: a The AI Collective e uma nonprofit com frentes de comunidade, governanca/public interest e conexao founder-investidor; seus eventos gerais nao sao exclusivamente sociais.
- Fontes: [perspectiva institucional](https://www.aicollective.com/files/Trust%20in%20the%20Age%20of%20Acceleration.pdf), [Institute](https://institute.aicollective.com/about), [Collective Investments](https://investments.aicollective.com/about) e [retrospecto 2025](https://newsletter.aicollective.com/p/2025-retrospective-the-year-the-ai).
- Fato: o H4H e o recorte explicitamente civico, local, inclusivo e sem resultado comercial predefinido.
- Fonte: [anuncio global](https://fortune.com/press-releases/ai-collective-hack-for-humanity-global-civic-hackathon-2026-08-17/) e comunicacao institucional registrada em `SRC-INS-006`.
- Inferencia: o vies combinado favorece produto funcional, problema local, agencia humana, confianca concreta e demo legivel.
- Impacto: futuras teses devem atender simultaneamente ao polo builder e ao polo civico.

## EVD-20260912-011 — Precedentes e ausencia de historico direto

- Fato: SOLTutor.ai foi 1o lugar e IEPrep 2o lugar no AI for Learning & Development Build Challenge do capitulo Hampton Roads; Lettuce Talk About AI aparece como vencedor e Career Strategist Pro recebeu Merit Award.
- Fontes: [evento](https://ai-challenge-regent-aichr.devpost.com/), [galeria](https://ai-challenge-regent-aichr.devpost.com/project-gallery) e paginas registradas em `SRC-PRC-003` a `SRC-PRC-006`.
- Fato: nao foi localizado arquivo oficial de vencedores anteriores do H4H da The AI Collective; o ciclo global de 2026 e apresentado como iniciativa nova.
- Risco controlado: resultados da Santa Clara University e de outros eventos homonimos foram classificados como `SRC-X-*` e excluidos como precedente institucional.
- Impacto: o desafio Hampton Roads e o comparavel mais forte, mas nao substitui a rubrica de Sao Paulo.

## EVD-20260912-012 — Metodo de ideacao proposto

- Fato: existe um protocolo escrito para gerar teses diversas, eliminar falhas fatais, pesquisar semifinalistas, aplicar a rubrica, testar palco e usar dez lentes sinteticas da banca.
- Fonte: `research/IDEA_GENERATION_AND_SELECTION_METHOD.md`.
- Verificacao: o protocolo explicita entradas, gates, scorecards, vieses, papeis, saida e criterio de pronto.
- Limite: ainda aguarda validacao; nenhuma tese foi executada ou avaliada.
- Impacto: o ciclo pode ser reproduzivel e auditavel, em vez de depender da primeira intuicao.

## EVD-20260912-016 — Base tecnica proposta do Rebobina

- Fato: o usuario forneceu a pesquisa complementar do Rebobina e solicitou sua inclusao como base tecnica, com autoria Devin, na branch `Icaro-Devin`.
- Artefato: [Pesquisa complementar: Rebobina e Hack for Humanity Sao Paulo 2026](../../research/REBOBINA_TECHNICAL_BASIS.md), vinculada a `SRC-REB-001`.
- Proveniencia: texto e referencias recebidos nesta conversa; autoria atribuida a Devin conforme solicitado.
- Limite: esta evidencia comprova a incorporacao documental, nao a verificacao independente das fontes, a disponibilidade do G02 ou o impacto do produto.
- Impacto: oferece ao Codex e ao time uma base proposta para revisao, sem aprovar produto, trilha, arquitetura ou liberar os gates existentes.
