# Rebobina

## Proposta

Um simulador imersivo para aprender a decidir com IA antes de arriscar no trabalho. O participante assume um pequeno comercio, recebe pedidos e sugestoes de um assistente, consulta documentos e entrega um plano de atendimento. Suas escolhas alteram a cena. Quando algo da errado, pode rebobinar ate a decisao que produziu o efeito, consultar a evidencia e tentar novamente.

Publico inicial proposto: atendentes e pequenos empreendedores de Sao Paulo com pouca pratica de avaliacao de respostas de IA. Trilha primaria: letramento tecnico. A relacao com trabalho e secundaria; nao prometer emprego, produtividade real ou competencia certificada.

Recomendacao: construir um recorte de Rebobina. E a candidata mais defensavel entre as investigadas para combinar experiencia memoravel, julgamento humano, tecnologia explicavel e prazo. A superioridade e contextual e provisoria, nao uma prova de otimo global.

## Experiencia que a demo mostrara

Uma pequena loja aparece como um diorama autoral, com balcao, pedidos e caixas. A pessoa abre um atendimento: o cliente quer oito unidades. Uma sugestao do assistente diz que pode separar oito; o registro mostra quatro. Outra sugestao esta correta; uma terceira depende de informacao ausente.

O participante pode consultar, aceitar, corrigir ou pedir informacao. A tentativa de separar quantidade indisponivel aparece como pedido inconsistente dentro da simulacao. Ao rebobinar, ve a ligacao entre sugestao, registro e decisao; corrige a quantidade e deixa a entrega pendente de confirmacao. O plano final distingue o que pode executar do que precisa perguntar.

Esse exemplo e um caso de treinamento explicitamente controlado. Nao depende de provocar uma alucinacao real do modelo ao vivo, nem representa frequencia de erros de IA ou previsao economica de um comercio.

Uma segunda situacao muda fatos, ordem e tipo de decisao. Pode conter apenas sugestoes corretas, varios erros ou informacao realmente ausente. A pessoa precisa usar criterios, sem aprender que ha sempre uma pegadinha. Rejeitar toda sugestao tambem deixa trabalho valido por fazer.

## Produto e superficies

| Superficie | Funcao pratica | Expressao visual |
|---|---|---|
| Seu turno | Entrar em uma missao e escolher modo de leitura/movimento | Loja viva, aproximacao curta da camera e entrada direta |
| Bancada | Ler pedido, consultar fontes, editar plano e decidir | Documentos ligados a objetos e pedidos; estado visivel |
| Rebobinar | Comparar tentativas e localizar a decisao relevante | Linha do tempo controlavel, cena volta ao estado anterior |
| Registro | Guardar plano, pendencias e justificativas; tentar novo caso | Antes/depois legivel e eventos verificaveis |

As superficies podem ser estados do mesmo aplicativo. O valor vem do ciclo completo, nao de multiplicar paginas. Exportacao inicial em texto/JSON ou impressao do navegador, sem geracao sofisticada de PDF.

## Tecnologia e limites de IA

Arquitetura proposta: cenario estruturado → sugestoes do assistente → decisao humana → motor de regras → eventos e estado visual → replay → proximo cenario.

- O motor conhece os fatos do exercicio e classifica afirmacoes como sustentadas, contrariadas ou indeterminadas.
- O modelo adapta explicacoes e pode variar linguagem/contexto com base nas decisoes anteriores, dentro de parametros verificaveis.
- Valores, referencias e regras do cenario precisam ser validados antes da apresentacao. JSON valido sozinho nao garante verdade.
- Em caso de resposta invalida, rejeitar a variacao e usar exercicio curado, identificado como modo de demonstracao. Nao fingir chamada de IA ao vivo.
- O replay representa consequencias das regras do exercicio. Nao e modelo causal validado do mundo real.

Acesso de Gemini da aplicacao ainda nao confirmado. Primeira tarefa de implementacao: verificar provedor e uma geracao estruturada no servidor. Chave de API nao pode ir ao navegador. Sem acesso, o simulador funciona com casos curados, mas perde parte da defesa tecnologica adaptativa; essa perda precisa aparecer no pitch e na decisao de escopo.

## Direcao visual viavel

Direcao proposta: diorama 2.5D de comercio paulistano, materiais simples, luz quente, tipografia editorial legivel, movimento de caixas/pedidos e transicao de rebobinamento ligada ao estado. Uma cena rica e interativa tem prioridade sobre varias cenas incompletas. Usar CSS/SVG/Canvas inicialmente; Three.js pode elevar a cena se instalacao e integracao couberem no prazo.

Flow pode fornecer uma vinheta curta ou fundo antes da missao, caso um arquivo autorizado esteja disponivel. Video nao pode representar a interacao que estamos prometendo. Sem clipe pronto, a cena continua com movimento programatico. Unreal e geracao remota de modelos novos ficam fora do caminho critico.

A experiencia pratica deve ter equivalente em texto e botoes: teclado, foco visivel, rotulos, contraste, leitura sem cor exclusiva, sem arrastar obrigatorio e movimento reduzido. Imersao fica opcional. Testes de acessibilidade e compreensao ainda precisam ocorrer na construcao.

## Lastro e alternativas

O Sebrae-SP e Google lancaram em agosto de 2026 uma iniciativa de capacitacao em IA para pequenos negocios; isso mostra pertinencia local do tema, nao valida a demanda por Rebobina.^1 O Cate possui uma trilha de IA de 34 horas, com quatro cursos; ja existe oferta publica gratuita.^2

Experience AI ja ensina pensamento critico e confiabilidade de modelos, especialmente em contexto escolar.^3 VirtualSpeech ja oferece simulacoes imersivas, roleplay e feedback por IA.^4 Forage oferece simulacoes profissionais gratuitas.^5 Logo, jogo educativo, simulacao e IA adaptativa nao sao novidades suficientes isoladamente.

A diferenca proposta e a combinacao entre evidencia consultavel, decisao de trabalho, estado verificavel e replay da propria tentativa, seguida de outra situacao. Essa combinacao foi escolhida para ser demonstrada; nao houve busca exaustiva que permita afirmar ineditismo mundial.

UNESCO fornece lastro conceitual para julgamento critico e agencia no aprendizado de IA, mas o framework de estudantes nao comprova eficacia para trabalhadores adultos.^6 Um teste curto com participantes pode produzir sinal de compreensao; nao prova aprendizagem duradoura nem transferencia para emprego.

## Comparacao das propostas

| Candidata | Forca | Por que ficou atras da recomendacao |
|---|---|---|
| Rebobina | Fonte, escolha, consequencia e revisao aparecem no mesmo fluxo; bom uso funcional de animacao | Riscos: quiz disfarçado, adaptacao de IA ainda nao integrada e beneficio educacional nao testado |
| Turno Zero | Microtarefa profissional e amostra de trabalho; visual de transicao entre ocupacoes | Forage ja cobre simulacoes; traducoes de competencia nao demonstram empregabilidade nem transferencia real |
| Antes de Sair | Preparacao acessivel para atendimento publico, contexto SP claro | Ainda falta demonstrar vantagem sobre carta de servico/checklist; procedimentos reais aumentam responsabilidade e curadoria |
| Uma Porta a Menos | Reorganizar ambiente para remover barreiras torna a transformacao visual | Medidas fisicas, normas e validacao do ambiente nao cabem facilmente na prova de hoje; nao e inviavel em geral |

Descomplica SP possui estrutura real de atendimento e oferece cerca de 350 servicos; a existencia dessa oferta tambem e uma contraprova contra supor que um ensaio generico seja necessario.^7

Turno Zero e reserva conceitual, nao fallback tecnico instantaneo. O fallback de construcao de Rebobina e sua propria versao reduzida: uma missao completa, variacao curada, replay e interface acessivel. Migrar para outro produto tarde consumiria a reserva.

## O que foi testado

Executado `node research/experiments/rebobina-probe.mjs`.

- 8 assercoes iniciais e 27 combinacoes de afirmacoes sustentadas, contrariadas e indeterminadas.
- Replay reproduz o mesmo estado sem alterar os fatos originais.
- Ordem invertida preserva os totais nesse modelo limitado.
- Aceitacao indiscriminada produz compromissos sem suporte; rejeicao indiscriminada deixa trabalho valido sem executar.
- Caso diferente utiliza as mesmas regras sem depender da mesma posicao do erro.

Resultado: `PASS_SYNTHETIC_MECHANISM_ONLY`. E prova local de um mecanismo pequeno, sem interface, sem chamada a modelo e sem pessoa. Nao valida aprendizagem nem o produto completo. O script usa afirmacoes estruturadas simples; texto livre e extracao por modelo exigem validacao adicional.

## Contrato inicial de construcao

Responsavel pela integracao: coordenador desta tarefa. Divisao sugerida quando a construcao iniciar: experiencia/cena, motor/eventos e integracao IA/testes, com arquivos disjuntos e contrato de cenario compartilhado. Nenhum agente deve redefinir a tese durante a implementacao.

| Limite proposto (SP) | Entrega | Corte se falhar |
|---|---|---|
| 13h10 | Provedor de IA verificado; contrato de cenario; shell navegavel | Retirar geracao ao vivo da promessa ate haver chamada real; nao atrasar motor |
| 13h35 | Missao ponta a ponta com fatos, decisoes e replay | Cortar ambientacao extra e exportacao sofisticada |
| 14h05 | Segunda situacao, interface equivalente por teclado e acabamento da cena | Manter uma cena e variacao parametrica; sem novas integracoes |
| 14h25 | Congelamento de funcionalidades e fluxo revisado | Apenas corrigir bugs e preparar submissao |
| 14h40 | Video, links e verificacao final | Reserva ate 15h para envio |

Recalcular se a construcao comecar depois desses marcos; 15h continua sendo o limite informado. Confirmar formato do video e campos de envio durante o inicio da construcao.

Aceite minimo: usuario conclui uma tarefa; decisoes geram estado e trilha; replay deriva dos eventos; situacao diferente funciona; casos corretos tambem existem; saida distingue acao de pendencia; falha do modelo nao falsifica dados; fluxo equivalente por teclado; descricao separa simulacao de uso real.

## O que pode mudar a recomendacao

Se o replay nao melhorar a compreensao em relacao a mostrar a mesma evidencia estaticamente, perde-se a justificativa do efeito. Se o publico precisar de explicacao constante, simplificar linguagem e interacao. Se a contribuicao de IA se limitar a frases cosmeticas, reduzir a alegacao tecnica ou mudar o mecanismo. Se surgir evidencia concreta de uma barreira publica solucionavel hoje que supere esse beneficio, reconsiderar Antes de Sair antes do congelamento da construcao.

## Fontes

1. Sebrae-SP, [Sebrae-SP e Google firmam parceria para ensinar uso de IA para pequenos empreendedores](https://sp.agenciasebrae.com.br/inovacao-e-tecnologia/sebrae-sp-e-google-firmam-parceria-para-ensinar-uso-de-ia-para-pequenos-empreendedores/), 26 ago. 2026, atualizado em 27 ago. Consulta 12 set. 2026.
2. Cate, Prefeitura de Sao Paulo, [Trilha Inteligencia Artificial](https://cate.prefeitura.sp.gov.br/trilhas/trilha-inteligencia-artificial/), 4 maio 2026. Consulta 12 set. 2026.
3. Raspberry Pi Foundation/Google DeepMind, [Experience AI: AI and critical thinking](https://experience-ai.org/en/themes/ai-and-critical-thinking), consulta 12 set. 2026.
4. VirtualSpeech, [Training Library](https://virtualspeech.com/practice), consulta 12 set. 2026. Descricao do fornecedor, nao avaliacao independente.
5. Forage, [Free virtual job simulations and career prep](https://www.theforage.com/), consulta 12 set. 2026. Descricao do fornecedor.
6. UNESCO, [AI competency framework for students](https://www.unesco.org/en/articles/ai-competency-framework-students?hub=66682), 2024, atualizado em 2026.
7. Prefeitura de Sao Paulo, [Descomplica SP](https://prefeitura.sp.gov.br/web/inovacao/w/descomplica-sp), 16 jun. 2026.
8. Google, [Structured outputs](https://ai.google.dev/gemini-api/docs/structured-output), consulta 12 set. 2026. Capacidade documentada, nao acesso autenticado comprovado.
9. Google, [Get started with Google Flow](https://support.google.com/flow/answer/16353333?hl=en), consulta 12 set. 2026. Acesso condicionado a conta/plano/regiao.
