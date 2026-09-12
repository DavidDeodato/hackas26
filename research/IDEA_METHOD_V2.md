# Metodo de selecao de teses — versao 2

## Autoridade e estado

Esta versao substitui `IDEA_GENERATION_AND_SELECTION_METHOD.md`, preservado como historico. Origem: revisao adversarial do proprio metodo, registrada em `METHOD_ADVERSARIAL_REVIEW.md`. As bancas que avaliam produtos sao etapas posteriores e distintas dessa auditoria.

Estado: revisado para piloto. Coerencia metodologica nao prova capacidade de prever vencedores. Nenhuma tese de produto foi gerada ou selecionada nesta revisao.

## Objetivo e restricoes

Selecionar uma candidatura forte para a rubrica do evento, com transformacao humana demonstravel, tecnologia criteriosa, acessibilidade, inovacao e execucao no prazo. A probabilidade de ganhar nao e conhecida; nenhum score sintetico representa essa probabilidade.

Antes de iniciar o ciclo, o coordenador registra: hora atual e limite de submissao; tempo restante; capacidade disponivel do time; recursos e acessos; exigencias verificadas e pendentes; reserva para construir, integrar, testar, gravar e submeter. A janela nominal de quatro horas nao equivale ao tempo restante.

Duracao e regras do video, trabalho anterior e composicao votante permanecem pendentes no dossie. Nao presumir permissao de reutilizacao nem exigir demonstracao de tres minutos como regra oficial. Os roteiros internos sao ajustaveis ao formato confirmado.

## Orcamento e parada

Durante a janela de hacking, limitar o ciclo de escolha ao menor valor entre 30 minutos e 15% do tempo restante. Esta e uma regra operacional inicial, nao um achado cientifico; so reduzir a reserva de construcao com justificativa explicita do coordenador. Fora da janela, declarar um orcamento finito antes da primeira rodada.

- Modo curto: ate 12 sementes, 4 elaboracoes leves e 2 finalistas.
- Modo ampliado: ate 30 sementes, 6 a 8 elaboracoes e 3 a 4 semifinalistas.
- Quantidades sao tetos. Encerrar cedo quando houver evidencia suficiente; nao preencher vagas com teses fracas.
- Distribuicao inicial do tempo de escolha: 10% restricoes, 15% geracao, 35% checagem e elaboracao, 25% testes decisivos e 15% confronto/decisao.
- Uma rodada de correcao por candidata. Ao expirar: reduzir recorte, aceitar explicitamente incerteza residual, usar reserva ou descartar. Nenhuma pesquisa continua sem nomear a decisao que pode mudar.
- Registrar tempo efetivo. Se o protocolo consumir a reserva de entrega, reduzir etapas; nao manter ritual para declarar completude.
- Converter o orcamento em horario absoluto de decisao ao iniciar; aplicar as dez lentes em fichas curtas por lote dentro do tempo de confronto.

## Funil operacional

```text
restricoes e prazo de decisao
  → sementes diversas
  → checagem minima de problema, alternativa e dependencia
  → elaboracao seletiva + evidencia em paralelo
  → comparacao pelos quatro criterios e riscos
  → teste da incerteza decisiva
  → objecoes adversariais + lentes publicas
  → comparacao final e contrato de construcao
```

## Geracao e primeira checagem

Gerar sementes por pessoa, problema, mecanismo, contexto e dependencia. Agrupar duplicatas: trocar o nome ou a interface mantendo esses elementos nao constitui nova tese. Explorar assistencia, traducao, deteccao, simulacao, coordenacao, adaptacao e confianca sem quotas por categoria. Incluir recortes seguros e ousados.

Card curto: pessoa/contexto; tarefa e dor; mecanismo; contribuicao incremental da IA; transformacao demonstravel; fonte inicial; alternativa atual; dependencia mais incerta. O uso de IA precisa justificar ganho relevante em acesso, resultado, tempo ou capacidade. Nao precisa ser logicamente insubstituivel por um humano ou outro software.

Antes de qualquer eliminacao por palco, verificar minimamente o problema, a alternativa e a dependencia central. Registrar fonte, limite e eventual evidencia contraria. Uma oportunidade local pode usar dados de contexto mais amplos, desde que a ponte local esteja explicita como hipotese a testar.

Classificar obstaculos:

- **Impedimento comprovado:** incompatibilidade oficial, operacao central indisponivel sem contorno que preserve valor, ou dano incontornavel. Pode eliminar, com evidencia.
- **Incerteza critica:** desconhecimento de acesso, necessidade, uso ou viabilidade. Recebe teste curto; nao e chamado de impossibilidade.
- **Fraqueza comparativa:** pouco wow, mecanismo familiar, explicacao ruim ou alcance menor. Exige comparacao; nao constitui veto.

Se o prazo inviabilizar verificar uma dependencia indispensavel, registrar descarte por risco nao resolvido no prazo, nunca como prova de impossibilidade tecnica.

## Elaboracao seletiva

Selecionar por dois caminhos: potencial de valor/tecnica e potencial de experiencia/demo. Nenhum caminho dispensa aderencia aos quatro criterios. Reservar, quando houver evidencia plausivel, uma candidata promissora com apresentacao ainda fraca para evitar selecao apenas pela narrativa.

Cada selecionada recebe um pacote curto e comparavel:

1. Jornada: gatilho, entrada, decisao/acao e resultado; acompanhamento se pertinente.
2. Capacidades conectadas: o que cada uma acrescenta e como compartilham contexto. Sem minimo de funcionalidades.
3. Telas/estados e integracoes: tarefa, dado/acao habilitada, acesso, dependencia e fallback. Nenhuma pontuacao por quantidade.
4. Um momento principal de demonstracao e momentos de apoio apenas quando melhorarem a compreensao.
5. Recorte essencial, competitivo construivel e futuro. Futuro fica fora da nota de entrega.
6. Caminho critico e teste da principal incerteza; estimativas com premissas.

Aplicar testes de combinacao, remocao e nucleo: funcoes juntas precisam acrescentar valor; elementos sem efeito devem sair; o recorte reduzido precisa manter uma transformacao completa. Uma capacidade unica profunda pode avancar. Expansao forcada nao ganha vantagem.

## Pesquisa orientada a decisao e testes

Todas as candidatas recebem o mesmo conjunto minimo de perguntas, mas o tempo adicional vai para a incerteza capaz de mudar a escolha. Nao exigir a mesma quantidade de pesquisa sobre riscos ja resolvidos.

Cobrir problema/impacto, alternativas, tecnologia, acessibilidade e demo. Para cada finalista escolher o teste mais decisivo e registrar entrada, resultado, limitacao e consequencia. Testar acesso/dado/acao central cedo quando isso puder derrubar a proposta. Documentacao de API nao prova acesso operacional. Fallback precisa preservar o beneficio, e nao apenas manter uma tela aberta.

Comparar com a melhor alternativa pertinente na mesma tarefa e entrada: resultado, tempo, esforco, erro ou acesso, conforme o beneficio alegado. Se a comparacao nao puder ser executada, registrar a lacuna; nao encenar um processo anterior artificialmente ruim. Chat, texto, voz e interfaces visuais sao igualmente elegiveis quando adequados a tarefa.

Para acessibilidade, o roteiro explicita barreira, condicao, conclusao da tarefa, ajuda necessaria, erros e recuperacao. Identificar participante real do publico, proxy ou inspecao simulada sem dados pessoais desnecessarios. Criterios e plano de teste podem existir antes da construcao; resultado observado so existe depois da execucao.

Separar tipos de evidencia:

| Evidencia | O que pode sustentar | O que nao prova |
|---|---|---|
| Fonte local ou relato identificado | Existencia/contexto da dor | Adocao ou impacto do produto |
| Storyboard e observador sem contexto | Compreensao da proposta | Usabilidade, acessibilidade ou funcionamento |
| Chamada minima ou experimento tecnico | Viabilidade do mecanismo testado | Produto completo ou robustez geral |
| Tarefa com usuario pertinente/tecnologia assistiva | Resultado daquela tarefa e condicao | Representatividade ampla |
| Inspecao sintetica | Hipoteses e problemas candidatos | Teste com pessoas ou validacao externa |

Se nao houver pessoa disponivel, registrar limitacao e usar inspecao tecnica proporcional, sem fabricar testemunho ou aprovacao. Contato externo exige autorizacao; a selecao nao presume que ele ocorreu. Na fase de proposta, comparar potencial e evidencia observada separadamente; plano de teste nao recebe status de teste aprovado.

## Avaliacao e decisao

Manter os quatro criterios com pesos iguais informados pelo time: impacto social, tecnologia, polimento/acessibilidade e inovacao. Removidos os pisos internos de 16/25 e 18/25: nao tinham calibracao nem autoridade oficial.

Registrar dois eixos separados por criterio: **qualidade/potencial** (fraco, razoavel ou forte, com mecanismo e comparacao que justificam) e **suporte** (hipotese, fonte contextual, teste direto delimitado ou evidencia comparativa). Acrescentar confianca e lacuna decisiva. Uma candidata mediana muito testada nao vira excelente; uma ambiciosa sem teste nao vira comprovada. O coordenador explicita o trade-off entre potencial e risco. Notas numericas, se usadas para organizacao, nao criam cortes automaticos.

Palco, viabilidade e fit institucional explicam vantagens e riscos; nao formam uma segunda soma que conte polimento ou impacto duas vezes. Nao supor que participantes ou banca sejam majoritariamente nao tecnicos.

Comparar finalistas par a par: qual entrega melhor o conjunto da rubrica e por que, com qual custo de execucao? Em empate, testar a hipotese que distingue as duas. Variar as avaliacoes incertas dentro do plausivel: se a lider muda, registrar decisao instavel e buscar evidencia ou escolher o recorte de menor dependencia com trade-off explicito. Nao inferir vitoria de uma diferenca pequena de nota.

Antes de encerrar, reconsiderar uma candidata descartada na fronteira: teria avancado com a mesma elaboracao e evidencia? A recuperacao e permitida se houver motivo concreto, dentro do prazo.

## Bancas de solucoes: objecoes, nao eleicao simulada

Realizar primeiro um confronto sem nomes de jurados, pelas lentes de impacto, experiencia, diferenciacao e engenharia. Depois aplicar as dez lentes publicas documentadas aos finalistas, em lotes e com fichas limitadas a evidencias publicas. Isso atende a cobertura solicitada sem criar dez agentes permanentes.

Personas nao equivalem a votos independentes. Removidas media, mediana, menor nota e veto por personalidade inferida. Repeticoes do mesmo argumento contam uma vez. Cada objecao traz premissa, fonte ou hipotese, gravidade e teste/correcao. Discordancia ou ousadia nao elimina; impedimento demonstrado pode eliminar.

Perguntas centrais: o valor existe? O mecanismo funciona? A pessoa consegue concluir? A diferenca e relevante? A demonstracao prova o beneficio? A falha e recuperavel? Tratar beleza como experiencia intencional, sem exigir varias paginas ou efeitos visuais.

## Saida para construcao

Entregar principal e reserva se qualificadas; wildcard e opcional. Permitir nenhuma aprovada com motivo, sem inventar uma vencedora.

Contrato da principal: pessoa/tarefa; transformacao; escopo incluido e cortado; dados/integracoes com evidencias; caminho critico; dono da integracao; criterios de funcionamento; prova de acessibilidade planejada; roteiro; prazo para nucleo funcionar; gatilho para cortar extensoes ou ativar reserva; incertezas restantes. Nomear responsaveis disponiveis, sem inventar time.

A reserva deve funcionar como alternativa operacional, com dependencia distinta quando possivel. O piloto termina ao entregar escolha e contrato; a construcao verifica os resultados prometidos.

## Orquestracao

Coordenador controla prazo, registros e decisao. Geracao e critica ficam em passes separados. Pesquisadores recebem perguntas decisivas e escopos disjuntos; revisores nao contam sua opiniao como dado externo. Limitar a concorrencia a capacidade real (nesta sessao, coordenador e ate tres executores). Papeis nao exigem um agente por papel. Consolidacao de evidencias, decisoes e handoff pertence ao coordenador.

## Criterio de aceite metodologico

Revisao documental e casos adversariais podem comprovar coerencia interna. A primeira execucao ainda deve medir tempo, diversidade material, causas de descarte, mudancas por evidencia, completude do handoff e retrabalho. Somente esse piloto permite avaliar custo e utilidade operacional; resultado em competicao e evidencia posterior, nao garantia do metodo.
