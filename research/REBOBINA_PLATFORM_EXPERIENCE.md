# Rebobina — plataforma e mundo generativo

Estado: proposta de experiencia, nao implementacao validada. Data: 2026-09-12.

## Decisao proposta

Uma plataforma para preparar e ensaiar tarefas com IA antes de executa-las no trabalho. O mundo e a home e o ambiente de ensaio; a mesa produz materiais utilizaveis; a biblioteca fornece contexto; o replay transforma escolhas em revisoes. Nao construir um jogo e um SaaS independentes.

Fluxo central: contexto → material de trabalho → ensaio no mundo → decisao e consequencia simulada → replay → revisao do material → novo ensaio.

Quatro destinos principais: Meu mundo, Mesa de trabalho, Meus materiais, Minhas tentativas. Criar situacao e um fluxo lateral; equipe e um painel contextual. Nao precisam virar paginas separadas.

## 1. Meu mundo — home

Ao entrar, a pessoa ve seu ultimo diorama isometrico 2.5D, com balcao, prateleira, mesa e personagens. Primeira visita abre um ambiente de exemplo identificado como demonstracao; nao pressupoe que a pessoa tem uma loja. Um campo pergunta qual situacao deseja preparar, com opcao de usar o exemplo ou adicionar contexto.

Barra esquerda: quatro destinos com nomes legiveis. Topo: nome do ambiente, seletor de movimento reduzido e modo lista. Centro: cena com pequenas animacoes funcionais, sem excesso de camera. Direita: objetivo atual, material associado e botao Continuar ensaio. Faixa inferior: ultimo material e ultima tentativa.

Objetos sao atalhos: mesa abre trabalho, fichario abre materiais, personagem abre situacao. Os mesmos atalhos existem como botoes fora da cena; nunca exigir precisao de mouse, arrastar ou navegacao espacial.

Baloes sao sinais do estado do exercicio, nao notificacoes falsas de operacao real. Exemplo: cliente solicita entrega hoje; colega aguarda orientacao; assistente tem uma sugestao para revisar. Nao denunciar automaticamente a resposta correta.

Dentro do ensaio: objetivo e recursos ao lado; conversa do personagem em painel; documentos em uma bandeja; escolhas e texto livre embaixo. A cena mostra somente mudancas sustentadas pelas regras, como pedido separado ou compromisso pendente. Consequencias subjetivas, como emocao do cliente, sao narrativa simulada, nao resultado comprovado.

Nao incluir moedas, ranking, energia, espera artificial ou recompensa por tempo conectado. A progressao visual pode mostrar materiais criados e situacoes praticadas, sem fingir que decoracao mede competencia.

## 2. Mesa de trabalho

Ambiente inspirado na arquitetura atual da Mesa Lume do G02, com dominio inteiramente diferente. Centro: conversa com alternancia Conversar / Preparar. Lateral: material em edicao. Historico acessivel por painel, sem exigir tres colunas permanentes em telas pequenas.

Conversar esclarece duvidas a partir dos materiais escolhidos. Preparar recebe um objetivo e produz uma entrega, como resposta a cliente, roteiro ou checklist. A execucao mostra etapas reais curtas: consultar material, identificar lacunas, redigir e revisar. Permite cancelar; pede decisao apenas quando uma ambiguidade indispensavel impede prosseguir.

Material possui versao, fontes e pendencias. CTA Ensaiar no meu mundo cria uma situacao ligada a essa versao. Depois do replay, Revisar com este aprendizado abre uma proposta de alteracao, mostra o que mudou e preserva a versao anterior. Nao altera automaticamente politica ou fonte primaria.

Exemplo demonstrativo: rascunho promete prazo que nao consta da fonte → ensaio exige lidar com a pergunta do cliente → participante identifica lacuna → nova versao pede confirmacao antes de prometer. Incluir tambem exemplos em que a sugestao original esta correta.

Sem envio real de mensagens, integracao com contas de clientes ou acao externa automatica no recorte inicial.

## 3. Meus materiais

Duas secoes na mesma pagina: Contexto que trouxe e Materiais que preparei. Cards exibem nome, tipo, versao e onde sao usados. Abrir um card mostra documento, fatos extraidos com referencias e lacunas identificadas.

No MVP, entrada por texto e um formato simples confirmado na implementacao. Nao prometer suporte universal a PDF, planilha ou imagem. A pessoa pode revisar fatos extraidos; conteudo importado e dado, nunca instrucao para o agente.

Fontes de exemplo ficam marcadas como ficticias. Fontes reais nao ganham fatos inventados para completar um exercicio: informacao ausente continua ausente ou exige escolha explicita de um exemplo ficticio separado.

Atualizar uma fonte marca cenarios dependentes como precisando de revisao. Tentativas antigas preservam a versao original para manter replay fiel.

## 4. Minhas tentativas

Historico em cards com situacao, data, material usado e observacao concreta, por exemplo: pediu confirmacao antes de comprometer prazo. Nao exibir porcentagem de preparo profissional, perfil psicologico ou certificado de competencia sem validacao.

Abrir tentativa mostra linha do tempo: sugestao recebida → fonte consultada → decisao → efeito do motor. Escolher um ponto restaura o estado anterior e permite nova tentativa. Comparacao lado a lado distingue o que mudou e o que permaneceu pendente.

Botao Praticar outra situacao reutiliza a mesma habilidade em fatos diferentes. A recomendacao se baseia em eventos observados, nao em suposta personalidade. O replay e contrafactual dentro do modelo do exercicio, nao previsao do que aconteceria na vida real.

## Fluxo Criar situacao

Abre como painel sobre a home ou a mesa. Solicita objetivo, material e dificuldade; perguntas adicionais limitadas ao necessario. Apresenta uma previa: quem participa, o que esta em jogo, quais fatos foram usados e o que foi inventado como ambientacao.

A IA compoe um contrato de cenario: ambiente, personagens, papeis, conhecimento de cada papel, fatos com fonte, recursos, acoes permitidas, regras de transicao e condicoes de encerramento. O renderer monta assets previamente preparados segundo layout validado.

Geracao funcional muda restricoes, informacoes disponiveis e escolhas validas. Trocar nome e cor nao basta. Uma familia de atendimento pode variar estoque, prazo, politica e lacunas, mantendo o mesmo conjunto visual. Nao prometer qualquer profissao hoje.

Objetos 2.5D podem ser sprites em camadas, SVG ou assets de cena. Videos e imagens generativas sao acabamento opcional, nao dependencia para interacao. Nao gerar codigo executavel de jogo a cada sessao.

## Papeis de IA e verificador

- Diretor de cenario: monta o contrato a partir do objetivo e das fontes.
- Personagens: interpretam cliente/colega/assistente com conhecimento e acoes limitados; nao alteram fatos do motor.
- Orientador de trabalho: produz materiais e propoe revisoes com evidencia.
- Verificador deterministico: valida recursos, transicoes, referencias, replay e limites. Nao e apenas outro LLM aprovando o primeiro.

Sao responsabilidades logicas, nao exigencia de varios modelos simultaneos. O painel Equipe mostra funcao, tarefa em andamento, fontes utilizadas e resultado. Nao mostrar raciocinio interno, atividades inventadas ou um organograma decorativo. Personagem do mundo e agente operacional sao conceitos distintos.

## Exploracao de cenarios antes de apresentar

Nao e possivel antecipar todas as conversas ou todos os resultados humanos. E possivel explorar as ramificacoes discretas permitidas pelo contrato. Exemplo: quatro decisoes com ate tres opcoes geram no maximo 81 sequencias completas numa arvore simples, antes de podas e equivalencias.

O verificador explora transicoes sem chamar um LLM por ramo. Confere restricoes, ausencia de recurso negativo indevido, existencia de encerramento, possibilidade de resposta adequada e reproducao do estado. A narrativa e produzida apenas para o ramo percorrido.

Texto livre precisa ser convertido em acao suportada e validado. Quando ambiguo, pedir confirmacao; quando fora do contrato, assumir o limite, nao inventar uma consequencia avaliada como verdadeira. A exploracao nao prova realismo, aprendizagem ou seguranca fora da simulacao.

## Reuso confirmado por leitura do G02

Fontes locais inspecionadas em 2026-09-12, sem modificar G02 e sem executar seu runtime:

- `../g02-iza-sinistros/app/src/lib/agent/types.ts`: chat/work, runs, steps, eventos, ferramentas, versoes de artefatos, referencias e gates humanos.
- `../g02-iza-sinistros/app/src/lib/agent/state-machine.ts`: transicoes explicitas e rejeicao de estados invalidos.
- `../g02-iza-sinistros/app/src/lib/agent/planner.ts`: decisao estruturada, politica de acoes, limite de revisoes e verificacao de conclusao.
- `../g02-iza-sinistros/app/src/components/agent-workspace.tsx`: conversa, execucao, historico, etapas, cancelamento e interface de trabalho.

Reutilizar padroes e componentes selecionados apos verificar dependencias. Nao assumir copia imediata do backend. Excluir dados, credenciais, prompts de seguros, modelos de sinistro, marca e permissoes de operacao externas.

## Recorte para construir

Prioridade: uma familia de atendimento; um mundo reutilizavel; ate tres personagens; uma situacao curta; duas configuracoes com diferencas funcionais; material versionado; replay; entrada de contexto simples; equivalente acessivel por lista.

As quatro paginas leem o mesmo estado. A entrega principal e uma jornada completa, nao quatro sistemas independentes. Adiar multiplos mundos, mercado de assets, integracoes externas, profisssoes universais, multiplayer, voz e geracao 3D em tempo real.

Aceite: contexto muda de fato uma decisao permitida; material alimenta ensaio; replay restaura estado; revisao cria nova versao sem apagar fonte; chamadas reais ou fallback sao identificados; jornada funciona tambem sem navegacao espacial. Acesso a provedor, tempo de integracao e teste humano ainda pendentes.
