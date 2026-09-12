# Revisao adversarial do metodo de selecao

## Escopo e veredito

Em 12/09/2026, tres agentes revisores separados avaliaram `IDEA_GENERATION_AND_SELECTION_METHOD.md`. O objeto foi o desenho do processo, nao uma solucao e nao os jurados reais do evento. Os papeis sao simulados; nao houve especialistas externos nem validacao com a banca do hackathon.

Veredito inicial: corrigir antes de executar. Um revisor reprovou a execucao integral; os outros dois exigiram revisao. A [V2](IDEA_METHOD_V2.md) recebeu segunda leitura dos tres, todos com parecer de aptidao para piloto sem bloqueador documental residual. Isso verifica coerencia; custo operacional e eficacia competitiva ainda nao foram observados.

## Composicao da banca do metodo

| Revisor / papel simulado | Competencias reunidas | Mandato |
|---|---|---|
| audit_selection | Desenho de selecao, criatividade e validade de avaliacao | Detectar filtros precoces, falsa precisao, conservadorismo e falsa independencia das personas |
| audit_product | Direcao de produto/demo, acessibilidade e impacto | Detectar vies estetico, inchaco, comparacao fraca e substituicao de teste humano por narrativa |
| audit_execution | Lideranca tecnica de hackathon e operacao de pesquisa | Verificar prazo, custo do funil, dependencias, parada e passagem para construcao |

O coordenador integrou os pareceres e editou o metodo. Os revisores receberam o mesmo documento e trabalharam em leitura apenas; nao receberam os pareceres iniciais dos demais antes de concluir. Passes separados reduzem contaminacao direta, mas nao produzem independencia estatistica: compartilham modelo e contexto. Convergencia e pista, nao prova.

Esses papeis julgam o instrumento de decisao. As biografias da banca real ajudam a testar produtos depois; nao garantem competencia para auditar pontuacao, selecao ou custo de pesquisa.

## Protocolo executado

1. Cada revisor retornou ate seis achados com secao, severidade, contraexemplo e correcao verificavel.
2. Coordenador consolidou argumentos repetidos, sem votar por maioria.
3. Criada V2 e preservada a versao anterior com aviso de substituicao.
4. Tres revisores releram a V2 e apontaram residuos.
5. Ajustes finais separaram qualidade de suporte de evidencia e exigiram deadline absoluto e fichas curtas por lote.

## Achados e resolucao

| ID | Problema | Origem | Correcao na V2 |
|---|---|---|---|
| M-01 | Palco elimina antes da pesquisa; rubrica soberana apenas no discurso | Selecao e produto | Checagem minima antes do corte; caminhos por valor/tecnica e experiencia |
| M-02 | Gate confunde desconhecimento com impossibilidade | Selecao | Impedimento, incerteza e fraqueza separados; descarte por prazo tem motivo proprio |
| M-03 | Pisos 16/25 e 18/25 e scores sem calibracao | Selecao | Removidos pisos; comparacao pelos quatro criterios e analise de sensibilidade |
| M-04 | Dez personas convertem opinioes correlacionadas em votos | Selecao | Objecoes com premissas; repeticao conta uma vez; sem media, mediana ou veto pessoal |
| M-05 | Processo sem orcamento, parada e limite de retrabalho | Execucao e selecao | Modos adaptativos, teto temporal, reserva de entrega e uma correcao por candidata |
| M-06 | Quatro horas nominais tratadas como tempo restante | Execucao | Contrato de tempo real, equipe, recursos e regras |
| M-07 | Integracao principal testada tarde | Todos | Teste decisivo antecipado; fallback preserva beneficio |
| M-08 | Storyboard confundido com produto acessivel/funcional | Todos | Evidencias separadas; tarefa, ajuda, erros, recuperacao e tipo de participante |
| M-09 | Tres a cinco capacidades ancora expansao | Produto | Nenhum minimo; nucleo completo e teste de remocao |
| M-10 | Chat/texto e IA nao indispensavel viram filtros | Produto e selecao | Contribuicao incremental demonstravel e neutralidade de formato |
| M-11 | Antes/depois sem alternativa competente | Produto | Comparacao na mesma tarefa/entrada, com limite declarado |
| M-12 | Tres finalistas obrigatorias; handoff insuficiente | Execucao e selecao | Vagas opcionais; contrato executavel, cortes e gatilhos |
| M-13 | Primeira V2 mistura qualidade com maturidade da evidencia | Selecao e produto, segunda leitura | Eixos separados de potencial e suporte; risco explicito |

## Casos adversariais documentais

| Caso abstrato | Comportamento exigido | Inspecao |
|---|---|---|
| A espetacular; B discreta com maior beneficio | B nao cai apenas por palco | Coberto pelos dois caminhos |
| API desconhecida | Teste curto, sem declarar impossibilidade | Coberto pelas classes de obstaculo |
| Dez personas repetem premissa errada | Um argumento a verificar | Coberto pelo protocolo de objecoes |
| Uma capacidade profunda versus cinco paginas | Quantidade nao pontua | Coberto pela elaboracao |
| Storyboard bonito sem uso assistivo | Compreensao nao equivale a acessibilidade | Coberto pela matriz de evidencia |
| Texto melhora tarefa; multimodal nao melhora | Formato nao determina elegibilidade | Coberto pela comparacao |
| Pesquisa consome construcao | Deadline e reducao de etapas | Regra coberta; eficacia exige piloto |
| Candidata mediana testada versus ousada incerta | Distinguir potencial e suporte | M-13 incorporado |

Sao testes de raciocinio sobre regras escritas; nao experimentos com participantes.

## Segunda leitura e limites

- Selecao: apta para piloto; seis problemas centrais corrigidos. Ressalva de separar qualidade de suporte incorporada em M-13.
- Produto: nenhum bloqueador residual; confirmou formato neutro, comparacao, teste antecipado e acessibilidade. Mesma ressalva incorporada.
- Execucao: apta para piloto curto; pediu deadline absoluto e dez lentes em fichas curtas por lote, incorporados.

As pequenas edicoes finais respondem diretamente a essas ressalvas e foram conferidas pelo coordenador; nao houve terceira rodada independente. Nao se afirma validacao empirica nem probabilidade conhecida de vitoria.

## Encerramento e proximo passo

Auditoria documental concluida. Proximo passo: piloto da V2 no ciclo de teses, medindo tempo, diversidade, descartes por evidencia, estabilidade da escolha e qualidade do contrato. Se o custo ultrapassar a reserva ou as mesmas duvidas voltarem sem alterar decisao, simplificar. Nenhuma ideia foi gerada nesta auditoria.
