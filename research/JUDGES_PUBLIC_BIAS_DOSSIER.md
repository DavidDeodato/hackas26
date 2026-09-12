# Dossie publico da banca: lentes, sutilezas e perguntas provaveis

## Sumario executivo

A pagina oficial lista dez profissionais sob o titulo conjunto **“mentores e jurados”**. Ela nao informa quem efetivamente vota, se todos avaliam todos os projetos, nem como as notas individuais sao agregadas. Por isso, este documento nao tenta prever votos pessoais. Ele usa historico profissional, projetos e publicacoes publicas para formular **hipoteses de lentes de avaliacao**, sempre subordinadas a rubrica oficial.[1]

O padrao coletivo mais forte nao e “quanto mais IA, melhor”. A convergencia publica da banca aponta para seis expectativas:

1. **problema real antes da ferramenta**;
2. **algo funcional e demonstravel, nao apenas uma narrativa**;
3. **humano no comando, com falha, validacao e limite explicitos**;
4. **jornada simples e acessibilidade comprovada por comportamento**;
5. **arquitetura explicavel e plausivel fora da demo**;
6. **historia curta: para quem, qual dor, o que muda e qual evidencia prova isso**.

Ha uma tensao importante. Parte da banca vem de venture capital, startups e produto; outra parte vem de comunidade, educacao, UX, engenharia corporativa e transformacao operacional. Uma ideia que pareca comercialmente atraente, mas trate impacto social como embalagem, pode perder a lente civica do evento. Uma proposta socialmente bonita, mas sem mecanismo tecnico, teste ou fluxo real, pode perder a ala de engenharia. A candidatura forte precisa satisfazer a intersecao.

Este dossie ainda **nao escolhe ideia, trilha ou tecnologia**. Ele cria uma lente adversarial para avaliar teses futuras.

## 1. Metodo e limites

### 1.1 O que foi investigado

- pagina oficial do evento e composicao publica da banca;
- perfis mantidos pelos proprios profissionais;
- publicacoes, projetos e falas publicas recorrentes;
- empresas e comunidades com as quais atuam;
- cultura publica dos organizadores e do The AI Collective;
- sinais que se repetem entre mais de um perfil.

### 1.2 Escala de confianca

| Nivel | Significado |
|---|---|
| Alto | sinal direto, repetido e coerente com funcao/projetos publicos |
| Medio | inferencia consistente a partir de mais de uma evidencia, sem declaracao sobre julgamento |
| Baixo | pista plausivel, mas insuficiente para orientar decisao sozinha |

### 1.3 Limites epistemicos

- Cargo nao prova preferencia de voto.
- Curtida, compartilhamento ou recomendacao de terceiro tem peso menor que projeto ou texto autoral.
- Perfil publico favorece temas que a pessoa escolheu comunicar; nao representa toda a sua avaliacao.
- A rubrica oficial de quatro criterios continua superior a qualquer inferencia deste documento.
- Os dez nomes sao **mentores e jurados**; nao esta confirmado que todos componham a decisao final.
- Nao foram usados dados pessoais, contatos privados ou fontes de procedencia duvidosa.

## 2. Mapa rapido da banca

| Pessoa | Lastro publico mais distintivo | Lente provavel | Confianca |
|---|---|---|---:|
| Andre Andreazzi | transformacao operacional e IA orientada a dor mensuravel | necessidade real, fluxo ponta a ponta, valor e escala | Alta |
| Douglas O. Luciano | Java, consultoria, projeto de automacao semantica com HITL e evidencia | arquitetura, resiliencia, integracao e prova de execucao | Alta |
| Fabiola Kian | educacao, comunidade, WoHackers e mentoria | inclusao, compreensao, participacao e clareza do pitch | Media-alta |
| Leandro Leite | sistemas criticos, Java/AWS e fluxo de engenharia assistido por agente | confiabilidade, seguranca, CI/teste e aplicacao real | Media-alta |
| Professor Isidro | ensino de software, Java Champion, julgamento humano e edge cases | explicabilidade, corretude, responsabilidade e fundamentos | Alta |
| Rodrigo Andrade | UX/service design, IBM e trabalho voluntario ligado a deficiencia visual | jornada, evidencia de acessibilidade e traducao da necessidade | Alta |
| Artur Dias | investimento pre-seed AI-native e validacao de tese | problema grande, time capaz, diferenciacao e caminho de adocao | Alta |
| Marcelo Okano | founder/CTO, comunidade Codex e governanca de agentes | uso competente de agentes, seguranca, contexto e demonstracao | Alta |
| Pedro Nagamine | founder da Bido, narrativa de pitch e iteracao com usuarios | memorabilidade, ambicao, feedback real e velocidade de aprendizado | Media-alta |
| Joao Belluzzo Neto | CTO da Bido e historico publico ligado a hackathons | densidade tecnica, execucao rapida e produto funcionando | Media |

## 3. Perfis individuais

### 3.1 Andre Andreazzi — transformacao que comeca na dor

**Confirmado.** Andre se apresenta como cofundador da Einklang.AI e ex-lider de transformacao, com passagem por McKinsey, IBM e HP. Em publicacoes recentes, critica implementacoes isoladas de IA e defende partir de uma necessidade relevante e mensuravel, entender o fluxo ponta a ponta e ligar tecnologia a resultado operacional.[2][3]

**Lente inferida.** Deve ser especialmente sensivel a uma IA “colada” sobre uma dor vaga. Provavelmente procurara a cadeia entre problema, processo atual, gargalo, intervencao e resultado. Escalabilidade, para essa lente, nao e apenas infraestrutura: e saber se o mecanismo se repete em outros contextos sem depender de trabalho manual oculto.

**Perguntas que o projeto precisa suportar.**

- Qual dor foi observada e como sabemos que ela importa?
- O que muda no fluxo completo, e nao apenas numa tela?
- Qual indicador melhora e qual e o baseline?
- Onde existe operacao humana escondida na demo?
- A IA e o mecanismo necessario ou apenas a interface mais chamativa?

**O que tende a perde-lo.** Lista de features sem nexo causal, numero de agentes como argumento de valor, impacto estimado sem premissas e “escala” confundida com hospedagem em nuvem.

### 3.2 Douglas O. Luciano — sistema integrado, resiliente e verificavel

**Confirmado.** Douglas atua na Mobile Saude e descreve seu foco no ecossistema Java. Seu projeto publico OpenJarvis integra backend legado, interface web, orquestrador com IA, cache, Selenium e associacao semantica. O fluxo inclui validacao humana e gera PDF como evidencia de execucao. Ele tambem comunica interesse por produtividade sem abrir mao de implementacao concreta e comunidade tecnica.[4]

**Lente inferida.** Tem repertorio para distinguir um prototipo realmente integrado de uma interface que simula inteligencia. A presenca de contexto de saude e consultoria tambem torna plausivel uma preocupacao com precisao, aderencia ao usuario e consequencia do erro, embora nao devamos atribuir a ele uma politica especifica que nao declarou.

**Perguntas provaveis.**

- Quais componentes estao realmente conectados agora?
- O que acontece quando o modelo, seletor, API ou dado falha?
- Onde entra a validacao humana e qual evidencia fica registrada?
- O sistema resiste a mudanca de contexto ou foi ajustado para uma unica demo?
- Por que essa arquitetura e proporcional ao problema?

**O que tende a perde-lo.** Fluxo encenado, dependencia externa sem fallback, arquitetura falada mas nao observavel e agente que executa acao sensivel sem checkpoint.

### 3.3 Fabiola Kian — inclusao concreta e comunicacao que acolhe

**Confirmado.** Fabiola tem historico publico em educacao, comunidade, DIO e WoHackers. Ao falar sobre sua participacao no Hack for Humanity, conecta tecnologia, empreendedorismo e impacto, e enfatiza representacao, aprendizagem, colaboracao e conexoes. Na conversa fornecida pelo time, diferencia letramento de acessibilidade, cobra produto funcional e orienta que o video una apresentacao da ideia e demonstracao.[5][6]

**Lente inferida.** Deve perceber rapidamente se o publico vulneravel e sujeito da solucao ou apenas personagem do pitch. Pode valorizar linguagem compreensivel, onboarding e capacidade de explicar o beneficio a quem nao e tecnico. Sua propria explicacao das trilhas sugere atencao a confusoes conceituais.

**Perguntas provaveis.**

- A pessoa comum entende o que fazer sem ajuda do time?
- Quem do publico participou da definicao ou do teste?
- A solucao amplia acesso ou apenas muda a embalagem?
- Qual diferenca concreta existe entre educar sobre IA e usar IA para remover uma barreira?
- O video mostra a transformacao ou apenas descreve a intencao?

**O que tende a perde-la.** Persona abstrata, linguagem excessivamente tecnica, acessibilidade declarada sem uso demonstrado e impacto social paternalista.

### 3.4 Leandro Leite — engenharia aplicada em contexto critico

**Confirmado.** Leandro publica sobre Java, Spring, Quarkus e AWS e mantem portfolio tecnico. Um relato publico do organizador Matheus Pagani descreve uma demonstracao de Leandro sobre uso de Devin em sistemas de autenticacao do Itau, indo da especificacao a CI/CD verde dentro de um fluxo de equipe hibrida. Como esse segundo ponto e relato de terceiro, ele e contextual, nao prova uma preferencia individual de julgamento.[7][8]

**Lente inferida.** Deve valorizar software que chega ao fim do fluxo, com especificacao clara, teste e integracao. O contexto de autenticacao de alta escala aumenta a probabilidade de perguntas sobre seguranca e confiabilidade, mas nao autoriza afirmar que esses serao seus criterios pessoais.

**Perguntas provaveis.**

- Qual e o contrato de entrada e saida do componente de IA?
- O caminho principal roda de verdade e tem teste?
- Que dado sensivel entra no sistema e como e protegido?
- O que foi produzido por agente e o que foi revisado pelo time?
- Qual falha impediria este desenho de operar em escala?

**O que tende a perde-lo.** “Funciona na minha maquina”, agente sem supervisao, credencial exposta, ausencia de teste e arquitetura desproporcional ao tempo do hackathon.

### 3.5 Professor Isidro — entendimento, corretude e autoria humana

**Confirmado.** Isidro e Java Champion e professor. Em textos publicos recorrentes, diferencia codigo que passou num teste de software correto; pede leitura de diff, capacidade de explicar arquitetura, depuracao, edge cases, isolamento, revisao e cuidado com segredos e licencas. Sua formulacao central e que delegar trabalho a IA pode ser saudavel, mas terceirizar julgamento nao e.[9]

**Lente inferida.** E provavelmente o perfil mais propenso a furar “magica de demo”. Deve testar se o time entende o que construiu, se reconhece limites e se a arquitetura tem razao de existir. Um erro admitido com fallback coerente pode ser melhor recebido do que uma promessa absoluta.

**Perguntas provaveis.**

- Por que a solucao esta correta, alem de ter funcionado uma vez?
- Qual edge case foi testado e o que aconteceu?
- O time consegue explicar cada decisao arquitetural?
- Onde a IA pode errar e quem responde pela decisao final?
- Se o modelo for removido, qual parte do valor desaparece?

**O que tende a perde-lo.** Jargao sem compreensao, resposta gerada tratada como verdade, deploy autonomo sensivel, ausencia de limites e autoria terceirizada ao agente.

### 3.6 Rodrigo Andrade — servico compreensivel, adotavel e acessivel

**Confirmado.** Rodrigo atua com UX e service design na IBM, possui formacao em Enterprise Design Thinking para IA e historico de traduzir necessidades de clientes para sistemas. Seu voluntariado na Fundacao Dorina Nowill envolveu materiais para conscientizacao e melhoria da vida de pessoas com deficiencia visual.[10]

**Lente inferida.** Deve olhar para a jornada inteira, inclusive antes e depois da tela demonstrada. A acessibilidade pode ser avaliada como capacidade real de concluir uma tarefa, nao como selo. Tambem pode notar quando a solucao resolve a necessidade do builder em vez da pessoa atendida.

**Perguntas provaveis.**

- Quem e a pessoa, em qual contexto e qual tarefa tenta concluir?
- Onde exatamente a jornada quebra hoje?
- Qual evidencia mostra que a nova experiencia e compreensivel?
- O que acontece sob estresse, baixa visao, baixa alfabetizacao ou outra restricao pertinente?
- Como o servico se integra aos canais e atores que ja existem?

**O que tende a perde-lo.** Tela bonita sem jornada, checklist de WCAG sem teste de tarefa, excesso de passos e solucao que transfere carga para o usuario.

### 3.7 Artur Dias — tese validavel e potencial de continuidade

**Confirmado.** Artur e cofundador e Venture Partner da Canastra Ventures, focada em startups AI-native pre-seed. O programa publico da Canastra enfatiza time comprometido com um problema, profundidade em IA, validacao constante da tese, piloto em operacao, sinais iniciais de tracao e execucao sem glamour. Artur tambem declarou apoio a um compromisso de investimento etico.[11][12]

**Lente inferida.** Deve reconhecer rapidamente se a proposta tem uma tese real ou apenas uma demo. Pode valorizar ambicao e caminho de continuidade, mas o evento declara finalidade civica e nao comercial; portanto, pitch de startup nao substitui impacto social.

**Perguntas provaveis.**

- O problema e grande e frequente para um publico claramente definido?
- Que comportamento de usuario valida a tese?
- Por que esta equipe ou mecanismo consegue resolver melhor?
- Qual e a diferenca defensavel em relacao ao que ja existe?
- Qual seria o primeiro piloto real depois do hackathon?

**O que tende a perde-lo.** TAM abstrato, monetizacao prematura, “AI-first” sem profundidade, mercado sem usuario e tracao simulada.

### 3.8 Marcelo Okano — agentes com governanca, contexto e resultado

**Confirmado.** Marcelo se apresenta como fundador da OKN, investidor, engenheiro e Codex Ambassador. Organiza atividades da comunidade Codex e publica sobre agentes de longa duracao, engenharia de contexto e riscos de autonomia. Em uma analise recente, defende controle de permissoes, isolamento, monitoramento de trajetorias e capacidade humana de interromper operacoes.[13][14]

**Lente inferida.** Nao deve se impressionar apenas porque o projeto usou agentes. O diferencial tende a estar em mostrar que a orquestracao reduziu ambiguidade ou trabalho, que os agentes tinham fronteiras claras e que houve supervisao. Por proximidade com a ferramenta patrocinada, tambem pode perceber rapidamente uso cenografico do Devin.

**Perguntas provaveis.**

- Por que um agente e necessario neste ponto do fluxo?
- Quais permissoes, ferramentas e limites ele possui?
- Como contexto, handoff, erro e estado sao observados?
- Onde o humano aprova, corrige ou interrompe?
- O uso de agentes melhora o produto do usuario ou apenas a velocidade do time?

**O que tende a perde-lo.** Multiagente como diagrama decorativo, autonomia sem governanca, prompts como unica arquitetura e alegacao de seguranca sem controle operacional.

### 3.9 Pedro Nagamine — demo memoravel e iteracao agressiva

**Confirmado.** Pedro e cofundador e CEO da Bido. Seu historico publico conecta a empresa a projetos nascidos em hackathons, participacao em ecossistema de startups e iteracao rapida de tese, produto e narrativa com base em usuarios. Ele tambem relata a importancia de uma apresentacao curta e memoravel para abrir uma conversa.[15][16]

**Lente inferida.** Deve valorizar clareza instantanea, energia de builder e capacidade de transformar feedback em mudanca concreta. Como founder de infraestrutura para comercio agentico, pode se interessar por mecanismos tecnicamente ambiciosos, mas isso nao significa preferencia por fintech ou blockchain.

**Perguntas provaveis.**

- Consigo repetir em uma frase o que muda para o usuario?
- Qual foi o aprendizado mais importante obtido com uma pessoa real?
- O que voces cortaram para fazer o nucleo funcionar?
- Qual momento da demo prova o valor sem explicacao longa?
- O projeto ainda importa quando removemos o vocabulario de IA?

**O que tende a perde-lo.** Pitch esquecivel, problema que demora a aparecer, ausencia de iteracao e demo sem “momento de verdade”.

### 3.10 Joao Rubens Belluzzo Neto — densidade de execucao

**Confirmado.** Joao e listado como cofundador e CTO da Bido. Publicacoes do ecossistema o associam a forte experiencia em hackathons e execucao tecnica rapida; a contagem exata de vitorias aparece como relato de terceiros e nao foi tratada como fato independente.[1][17]

**Lente inferida.** Sua posicao e historico sugerem sensibilidade a escopo inteligente, integracao real e qualidade da construcao sob tempo curto. A confianca e menor porque ha menos material autoral publico acessivel.

**Perguntas provaveis.**

- Qual parte dificil foi realmente implementada?
- Onde esta o mecanismo tecnico que diferencia o projeto?
- O fluxo e reproduzivel ou depende da apresentacao?
- Que decisao de escopo permitiu entregar o essencial?

**O que tende a perde-lo.** Mock apresentado como produto, complexidade verbal sem codigo correspondente e muitos componentes incompletos.

## 4. Convergencias: o que eles provavelmente querem ver

### 4.1 Um problema especifico que o time conhece de perto — confianca alta

Andre, Fabiola, Rodrigo, Artur e o proprio The AI Collective convergem em comecar pelo problema e por quem o vive. A organizacao afirma explicitamente que pessoas proximas ao problema enxergam o que outsiders perdem.[18] Isso torna fraca uma persona criada apenas para caber numa tecnologia.

**Evidencia futura ideal:** uma observacao, fala, teste ou dado local que feche “quem sofre, quando, por que e com qual consequencia”.

### 4.2 Produto funcionando ponta a ponta — confianca alta

Douglas, Leandro, Isidro, Marcelo e Joao possuem sinais publicos de preferencia por fluxo executavel, integracao e verificacao. A mentoria local tambem afirmou que o produto precisa estar funcional. O “ponta a ponta” pode ser estreito, mas nao deveria esconder seu passo mais dificil atras de um mock.

**Evidencia futura ideal:** uma unica tarefa critica completada ao vivo ou em video, com estado real antes/depois e falha conhecida.

### 4.3 Humano no comando e erro visivel — confianca alta

Isidro e Marcelo sao explicitos sobre julgamento e governanca; Douglas implementa human-in-the-loop; a missao do evento fala em manter tecnologia a servico das pessoas. Isso sugere que uma interface que comunica incerteza e oferece correcao pode ser mais forte do que uma resposta artificialmente confiante.

**Evidencia futura ideal:** checkpoint, fonte, confianca, correcao, fallback e registro da decisao, conforme o risco do dominio.

### 4.4 Acessibilidade demonstrada, nao narrada — confianca alta

O criterio oficial ja exige evidencia. Rodrigo traz service design e contato com acessibilidade visual; Fabiola traz inclusao e educacao. A banca pode perceber rapidamente uma implementacao cosmética.

**Evidencia futura ideal:** uma pessoa ou tecnologia assistiva concluindo a tarefa critica, mais checks tecnicos pertinentes. Um teste real e estreito vale mais que “somos acessiveis para todos”.

### 4.5 Arquitetura explicavel em linguagem simples — confianca alta

Os engenheiros podem perguntar como; os perfis de comunidade e design precisam entender por que. A melhor explicacao conecta dado, decisao, modelo, controle humano e saida sem uma nuvem de buzzwords.

**Evidencia futura ideal:** diagrama de cinco a sete blocos no maximo, com entradas, responsabilidades, limites e um ponto de falha demonstravel.

### 4.6 Diferenca relevante, nao apenas LLM — confianca alta

Artur e Pedro devem testar a tese e o diferencial; Andre deve testar o valor operacional; Isidro e Marcelo podem retirar a camada de “magica”. A inovacao precisa sobreviver a pergunta: “por que isso nao e apenas um chatbot sobre X?”.

**Evidencia futura ideal:** comparacao curta com duas ou tres alternativas e uma mudanca observavel de acesso, decisao, confianca, custo, tempo ou resultado.

### 4.7 Demo curta, legivel e com um momento de verdade — confianca media-alta

Fabiola orientou combinar pitch e demo; Pedro publica sobre narrativa memoravel; a cultura publica do The AI Collective destaca demo ao vivo e perguntas sem filtro em seus eventos, embora isso nao seja regra formal deste hackathon.[6][19]

**Evidencia futura ideal:** situacao anterior, acao central, resultado e prova em uma sequencia que uma pessoa entende sem narracao defensiva.

## 5. Tensoes internas da banca

### 5.1 Civic tech versus startup pitch

Artur, Pedro e Joao podem reconhecer potencial de produto e continuidade. O evento, porem, afirma que nao foi desenhado para validar estrategia comercial.[18] A sintese correta e demonstrar adocao e sustentabilidade sem transformar vulnerabilidade humana em mercado cenografico.

### 5.2 Ambicao tecnica versus confiabilidade

Perfis de agentes e AI-native podem apreciar um mecanismo ousado. Isidro, Leandro e Douglas tendem a expor a fragilidade de uma arquitetura larga. Em quatro horas, profundidade no nucleo provavelmente vale mais que muitas integracoes superficiais.

### 5.3 Polimento versus autenticidade

UX e narrativa importam, mas uma interface perfeita demais com passos simulados pode levantar desconfianca entre pessoas experientes em hackathons. O polimento forte reduz friccao e torna evidencia legivel; nao esconde a falta de produto.

### 5.4 Escala versus localidade

Andre e Artur podem perguntar por escala; a missao pede problema local. O melhor equilibrio futuro e provar um recorte paulistano e explicar quais condicoes permitiriam replicar o mecanismo, sem fingir universalidade.

### 5.5 Automacao versus agencia humana

O patrocinio e os perfis ligados a agentes tornam orquestracao relevante. Ao mesmo tempo, Isidro, Marcelo, Douglas e a missao institucional favorecem controle humano. “Autonomo” nao deve ser vendido como valor por si so.

## 6. Sinais negativos transversais

Uma proposta futura fica vulneravel se apresentar qualquer combinacao destes sinais:

- “para todos” sem publico ou contexto local;
- estatistica nacional usada como prova de uma dor especifica de Sao Paulo;
- chatbot generico sem mecanismo proprio;
- IA usada onde regra deterministica seria mais segura e suficiente;
- impacto projetado sem baseline, comportamento ou premissa;
- acessibilidade limitada a contraste ou leitura de tela nao testada;
- varios agentes sem ownership, observabilidade ou necessidade;
- mock ou resposta pregravada tratado como integracao real;
- arquitetura impossivel de explicar pelo proprio time;
- promessa de seguranca, emprego, saude ou aprendizagem sem limite;
- pitch de startup que esquece a finalidade civica;
- demo longa que mostra menus, mas nao mostra uma vida ou decisao mudando.

## 7. Banca adversarial para usar depois

Antes de promover uma ideia, ela devera responder a estas dez perguntas:

1. **Andre:** qual dor mensuravel e qual mudanca no fluxo completo?
2. **Douglas:** qual integracao e real, e como o sistema falha com seguranca?
3. **Fabiola:** uma pessoa nao tecnica entende, usa e se sente incluida?
4. **Leandro:** qual teste, contrato e controle protege o caminho critico?
5. **Isidro:** por que esta correto, quais edge cases e quem julga?
6. **Rodrigo:** qual jornada foi observada e qual barreira foi de fato removida?
7. **Artur:** qual tese foi validada e por que o diferencial pode continuar?
8. **Marcelo:** por que agentes, com quais limites, estado e supervisao?
9. **Pedro:** qual e o momento memoravel que prova valor em segundos?
10. **Joao:** qual parte tecnicamente dificil esta funcionando de verdade?

Uma ideia que responde apenas a tres ou quatro perfis e arriscada. Uma ideia forte nao precisa agradar cada pessoa individualmente; precisa sobreviver a todas essas lentes sem contradizer a rubrica.

## 8. Conclusao operacional

O viés coletivo mais defensavel e **anti-teatro**: anti-problema inventado, anti-IA decorativa, anti-acessibilidade declarativa, anti-arquitetura que o time nao entende e anti-pitch sem produto. O que une a banca e a busca por uma solucao que seja simultaneamente humana, construida, compreensivel e continuavel.

Isso nao implica escolher a ideia mais complexa. Implica escolher futuramente um problema cuja transformacao possa ser vista, testada e explicada dentro da janela. A orquestracao de agentes so sera vantagem se aparecer como disciplina de execucao ou mecanismo do produto, nao como numero de robos.

## Fontes

1. The AI Collective. [Hack for Humanity: Sao Paulo — mentores e jurados](https://luma.com/h4h-sao-paulo?locale=pt). Consultado em 12 set. 2026.
2. Andre Andreazzi. [Perfil e publicacoes publicas](https://br.linkedin.com/in/andreandreazzi).
3. Einklang Academy. [About](https://einklang-academy.com/pt/about/).
4. Douglas O. Luciano. [Perfil e projeto OpenJarvis](https://br.linkedin.com/in/douglasluciano2).
5. Fabiola Kian. [Perfil e atividades publicas](https://br.linkedin.com/in/fabiola-kian).
6. Fabiola Kian. Transcricao privada fornecida pelo time; fala de mentoria, nao regulamento. O arquivo original nao foi publicado.
7. Leandro Leite. [Perfil e portfolio publico](https://br.linkedin.com/in/leandroleite-ti).
8. Matheus Pagani. [Relato sobre fluxo de Devin no Itau](https://www.linkedin.com/pulse/i-hosted-devin-specialist-from-ita%C3%BA-here-what-looks-dar%C3%B3s-pagani-omeaf). Fonte contextual de terceiro.
9. Professor Isidro. [Perfil, artigos e publicacoes](https://br.linkedin.com/in/professor-isidro-phd).
10. Rodrigo Andrade. [Perfil, formacao e voluntariado](https://br.linkedin.com/in/rodrigoandrade84).
11. Artur Dias. [Perfil e publicacoes sobre Canastra Ventures](https://www.linkedin.com/in/arturdiass).
12. Canastra Ventures. [Perfil institucional e tese AI-native](https://www.linkedin.com/school/canastra-ventures/).
13. Marcelo Okano. [Perfil e publicacoes publicas](https://br.linkedin.com/in/marcelookano).
14. Codex Sao Paulo. [Meetup sobre workflows modernos de engenharia](https://luma.com/ayg5q20m?locale=pt).
15. Pedro Nagamine. [Perfil e publicacoes publicas](https://br.linkedin.com/in/pedro-nagamine).
16. Pedro Nagamine. [Relato sobre pitch curto e founder-led growth](https://pt.linkedin.com/posts/pedro-nagamine_siliconvalley-startups-empreendedorismo-activity-7477098766865473536-HOQK).
17. Joao Rubens Belluzzo Neto. [Perfil publico](https://www.linkedin.com/in/bellujrb).
18. The AI Collective. [Anuncio global do Hack for Humanity](https://fortune.com/press-releases/ai-collective-hack-for-humanity-global-civic-hackathon-2026-08-17/). Conteudo distribuido pelo organizador.
19. The AI Collective. [Perfil institucional e cultura publica de demos](https://www.linkedin.com/company/aicollective/).
