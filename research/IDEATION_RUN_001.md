# Ciclo curto de selecao de teses

## Contrato

Inicio verificado: 12/09/2026 12h48min21s, Sao Paulo. Limite externo informado: 15h. Limite interno anunciado: 13h08; encerrar antes quando houver recomendacao defensavel. Escopo: proposta e razoes, nao construcao integral do produto. Metodo: IDEA_METHOD_V2.md, modo curto.

Consolidacao e verificacao final: 12h53min35s. Tempo observado ate esse marco: 5min14s. Permanecem aproximadamente 2h06 para construcao/submissao, sujeito ao tempo de decisao e inicio efetivo. O ciclo foi encerrado antes do teto; nao foram feitas rodadas adicionais sem pergunta decisiva.

## Controle de contaminacao

Dois agentes geradores iniciados com `fork_turns=none`, recebendo somente trilhas, rubrica, prazo e capacidades declaradas. Foram instruidos a nao ler dossies de vencedores, exemplos de teste, historico ou propostas alheias. Isso reduz exposicao direta, mas nao garante independencia cognitiva ou ausencia de vies de treinamento. O coordenador ja conhecia o contexto e os precedentes; por isso nao forneceu sementes aos geradores. Sem alegacao de garantia absoluta de descontaminacao.

## Sementes e consolidacao

| Origem | Semente | Estado/motivo |
|---|---|---|
| human | Plantao de IA | Convergiu com Rebobina: mesma tarefa e publico, complementou conferência de fontes |
| experience | Rebobina | Recomendada apos elaboracao e confronto |
| human | Antes de Sair | Elaborada e comparada; utilidade incremental ainda incerta |
| experience | Primeira Visita | Agrupada com Antes de Sair |
| human | O que ja sei fazer | Entrevista converte experiencia em competencias; sem teste de empregador e alta proximidade de assistente de curriculo |
| human | Chuva no Caminho | Treino de decisao em alagamento; curadoria de seguranca e diferencial ainda pendentes |
| human | Meu Atendimento | Cartoes de comunicacao; beneficio plausivel, adequacao individual e diferencial ainda nao verificados |
| human | Troca de Tarefa | Agrupada com Turno Zero |
| experience | Turno Zero | Elaborada, reserva conceitual |
| experience | Antes da Chuva | Preparacao domestica; curadoria e transferencia ainda pendentes, sem vantagem clara sobre duas lideres |
| experience | Uma Porta a Menos | Elaboracao curta; risco de inferir medidas/acessibilidade sem verificacao |
| experience | Modo Ajuda | Treinar apoio digital sem tomar controle; publico e tarefa ainda pouco delimitados |

12 sementes brutas, 9 familias apos tres agrupamentos. Quatro elaboracoes proporcionais: Rebobina, Turno Zero, Antes de Sair e Uma Porta a Menos. Pesquisa publica mais profunda nas tres primeiras; a quarta permaneceu hipotese com limite de medida, nao impossibilidade demonstrada. As demais foram despriorizadas no prazo, nao provadas inferiores em todo contexto.

## Capacidade verificada e limites

Agente de capacidades verificou em leitura local: Node 24.15, npm 11.12 e Python 3.14 executam; projeto VESPER contem GLBs, scripts TRELLIS/rigging/composicao e importacao de clipes Flow; Unreal 5.8 e projeto existem, sem editor/build testados. Three/Vite nao estavam instalados no node_modules inspecionado. Scripts de Flow contem dependencias de caminho antigo; importacao de arquivos nao e API de geracao.

Gemini: adaptador em open-design existe, mas CLI/variaveis consultadas e OAuth padrao nao confirmaram acesso. Nenhum segredo foi exibido nem API paga chamada. Ausencia nessas rotas nao exclui conta no navegador. Estado no hackas26: sem app integrado. Escolha: web leve e ativos novos/simples; qualquer reutilizacao de asset deve respeitar regras do evento e licenca, sem presumir autorizacao.

## Confronto adversarial de solucoes

Dois revisores que nao geraram as sementes avaliaram as propostas. Ambos preferiram Rebobina como potencial, condicionado a nao virar quiz e a demonstrar mecanismo. As opinioes nao foram somadas como votos. Principais correcoes:

- Nao haver sempre um erro: composicoes variadas, inclusive todas corretas.
- Rejeitar tudo precisa deixar tarefa incompleta; objetivo e confianca calibrada.
- Consequencias sao da simulacao, nao previsao real.
- Nova situacao precisa mudar estrutura/dados; repetir resposta nao prova transferencia.
- IA deve adaptar dentro de fatos verificaveis; nenhuma alegacao de integracao antes do teste.
- Comparar com checklist/tarefa estatica quando houver pessoa disponivel. Nao houve teste humano neste ciclo.

## Dez lentes publicas, aplicadas em lote

| Lente baseada no dossie | Objecao decisiva | Resposta no recorte |
|---|---|---|
| Andre | Qual resultado alem do score? | Plano executavel/pendencias, sem alegar produtividade real |
| Douglas | Qual integracao e real? | Motor local testado; modelo ainda pendente e explicitado |
| Fabiola | Iniciante entende? | Linguagem cotidiana e tarefa curta; teste humano pendente |
| Leandro | Caso pode contradizer gabarito? | Validador de fatos/regras; JSON sozinho insuficiente |
| Isidro | Como tratar ambiguidade? | Sustentado, contrariado e indeterminado; pedir informacao permitido |
| Rodrigo | A cena vira barreira? | Fluxo textual/teclado equivalente, sem arrastar obrigatorio |
| Artur | Por que nao Forage/curso? | Replay da propria decisao vinculado a fontes; diferencial ainda a demonstrar |
| Marcelo | Agentes sao necessarios? | Sem agentes decorativos; separacao modelo/regras/decisao humana |
| Pedro | Qual momento memoravel? | Pedido inconsistente → rebobinar → fonte → nova decisao |
| Joao | O que funciona agora? | Probe do motor; interface/IA nao declaradas prontas |

Sao objecoes sinteticas com base em repertorio publico, nao previsoes de voto. Referencia: JUDGES_PUBLIC_BIAS_DOSSIER.md.

## Teste decisivo realizado e lacunas

`experiments/rebobina-probe.mjs`: 8 assercoes iniciais e 27 composicoes; motor/replay aprovados no escopo sintetico. Uma tarefa diferente reutiliza as regras; nao houve jogador humano. Fonte da selecao e uma combinacao de evidencia contextual, pesquisa de alternativas, potencial de produto e teste de engenharia delimitado.

A incerteza mais importante nao foi resolvida: compreensao/beneficio do replay em pessoas reais. Tambem falta chamada do provedor. Portanto, promover como **recomendacao para construcao com gates iniciais**, nao produto/impacto validado. A recomendacao muda se esses gates falharem.

## Decisao e fontes

Principal: Rebobina. Reserva conceitual: Turno Zero; fallback operacional: Rebobina reduzido. Antes de Sair foi reconsiderada na fronteira pelo beneficio local, mas sem evidencia de vantagem sobre apoio/checklist existentes nao superou o recorte recomendado. Nenhuma nota ou piso artificial decide a selecao.

Proposta, storyboard textual, comparacao, contrato e fontes exatas: [REBOBINA_PROPOSAL.md](REBOBINA_PROPOSAL.md). Nenhuma suposta superioridade universal ou garantia de vitoria foi produzida.
