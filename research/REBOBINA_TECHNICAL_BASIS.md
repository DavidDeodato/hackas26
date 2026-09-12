# Pesquisa complementar: Rebobina e Hack for Humanity São Paulo 2026

> **Autoria:** Devin
>
> **Status:** base técnica de pesquisa em rascunho, sujeita à validação do time
>
> **Atualização:** 12 de setembro de 2026
>
> **Escopo:** pesquisa de contexto, enquadramento do problema, aderência temática, hipótese de solução, MVP, riscos e plano inicial de validação
>
> **Nota:** este documento separa fatos, hipóteses e decisões. Ele não deve ser apresentado como validação de impacto concluída.
>
> **Proveniência:** pesquisa fornecida pelo usuário nesta conversa para incorporação ao repositório com autoria atribuída a Devin. O conteúdo e as referências foram preservados; as fontes externas e os números não foram revalidados nesta incorporação.
>
> **Uso no projeto:** as recomendações e as “decisões atuais” da seção 15 pertencem ao conceito proposto. Sua inclusão não altera os gates de aprovação em [Controle do projeto](../docs/agent/PROJECT_CONTROL.md) nem constitui aprovação de produto, trilha, stack ou arquitetura.

## 1. Síntese executiva

O Rebobina é uma proposta de **ensaio seguro para decisões profissionais assistidas por inteligência artificial**. A experiência transforma materiais fornecidos pelo usuário em uma situação simulada de trabalho, permite que a pessoa tome decisões, mostra consequências delimitadas pelas regras do exercício e possibilita voltar a um ponto anterior para revisar tanto a decisão quanto o artefato produzido.

O ciclo de valor proposto é:

material contextual → entrega assistida por IA → ensaio → decisão humana → consequência simulada → replay → revisão fundamentada

A pesquisa indica aderência temática desigual e, por isso, recomenda um posicionamento explícito:

- **Trilha principal:** deslocamento no mercado de trabalho.
- **Capacidade habilitadora:** letramento técnico em IA.
- **Requisito transversal:** acessibilidade.
- **Trilha não atendida no recorte atual:** resiliência urbana.

O principal diferencial não é a aparência 2.5D nem a presença de múltiplos agentes. É a ligação causal entre o material real da pessoa, as regras da situação, a decisão tomada e a revisão verificável de uma entrega. A solução procura desenvolver julgamento humano, em vez de automatizar a decisão ou atribuir uma pontuação opaca de preparo profissional.

O conceito apresenta forte compatibilidade com a proposta declarada do Hack for Humanity: tecnologia a serviço das pessoas, participação de quem vive o problema, produção de algo concretamente útil e preservação da agência humana. Essa compatibilidade ainda é **parcialmente hipotética**, pois faltam dois elementos de evidência: validação com trabalhadores do público-alvo e verificação da base técnica G02 citada na proposta original.

## 2. Contexto do Hack for Humanity

O comunicado da The AI Collective descreve o Hack for Humanity como uma mobilização cívica global realizada entre setembro e outubro de 2026, em 120 capítulos e 50 países. Segundo a própria organização, três temas emergiram de encontros comunitários anteriores: deslocamento profissional, letramento técnico e acessibilidade. Cada capítulo também pode trabalhar prioridades locais. A proposta declarada é aplicar IA ao interesse público e envolver pessoas próximas do problema na construção da resposta ([Fortune, comunicado da The AI Collective](https://fortune.com/press-releases/ai-collective-hack-for-humanity-global-civic-hackathon-2026-08-17/)).

A página do capítulo de São Paulo reforça que os projetos devem enfrentar uma questão local e gerar impacto positivo. Também informa que projetos vencedores poderão ser convidados para apresentação na newsletter global da comunidade, com alcance declarado superior a 300 mil pessoas ([Hack for Humanity: São Paulo](https://luma.com/h4h-sao-paulo?locale=pt)).

### 2.1. Nota sobre o destaque internacional

As publicações no [Markets Insider](https://markets.businessinsider.com/news/currencies/the-ai-collective-announces-hack-for-humanity-a-global-civic-hackathon-across-50-countries-1034122356), [USA Today](https://www.usatoday.com/press-release/story/40261/the-ai-collective-announces-hack-for-humanity-a-global-civic-hackathon-across-50-countries/) e [Fortune](https://fortune.com/press-releases/ai-collective-hack-for-humanity-global-civic-hackathon-2026-08-17/) são versões distribuídas do mesmo comunicado. A Fortune identifica o conteúdo como comunicado, conteúdo pago e material da EZ Newswire. Portanto, esses links demonstram distribuição e alcance da comunicação, mas não constituem três validações jornalísticas independentes.

Essa distinção orienta a estratégia do projeto: para conquistar interesse editorial posterior, o Rebobina precisa produzir evidência própria, como um problema local documentado, uma pessoa real envolvida no desenho, uma demonstração funcional e uma mudança observável antes e depois do ensaio.

## 3. Método e limites da pesquisa

A pesquisa complementar examinou uma seleção de matérias editoriais do Business Insider publicadas entre janeiro de 2023 e setembro de 2026. A busca foi feita sobre sitemaps mensais e páginas individuais relacionadas aos quatro temas do hackathon. Fontes oficiais de São Paulo também foram consultadas durante a avaliação da trilha local.

As evidências foram interpretadas nas seguintes categorias:

- **Dado observacional:** análise de vagas, salários, uso ou composição de equipes.
- **Pesquisa institucional ou patrocinada:** útil para identificar sinais, mas dependente da metodologia e dos interesses da organização responsável.
- **Política ou caso empresarial documentado:** demonstra uma decisão real, sem necessariamente provar seus efeitos.
- **Relato pessoal:** útil para compreender experiências e necessidades, mas insuficiente para estimar prevalência ou causalidade.
- **Opinião ou projeção:** cenário que deve ser atribuído ao autor, empresa ou instituição que o formulou.

### Limitações

- A cobertura do Business Insider é predominantemente norte-americana, anglófona e concentrada em trabalho de escritório, empresas de tecnologia e universidades.
- Parte das matérias resume pesquisas de bancos, consultorias, fornecedores ou empresas interessadas; isso não equivale a replicação independente.
- Exposição de uma ocupação à IA não significa que toda a ocupação será automatizada.
- Redução de vagas e salários também pode refletir juros, desaceleração econômica, terceirização e correção do excesso de contratações da pandemia.
- Algumas páginas podem estar sujeitas a paywall ou limite de acesso.
- Ainda não foi conduzida pesquisa de campo com o público prioritário do Rebobina.
- A base G02 e o arquivo original citados na proposta não foram localizados no ambiente usado para esta análise.

## 4. Principais achados por tema

### 4.1. Deslocamento no mercado de trabalho

A conclusão mais defensável do corpus não é a ocorrência de desemprego em massa facilmente atribuível à IA. Os sinais aparecem primeiro como **menos contratações, redução de tarefas iniciais, pressão sobre salários, mudança no conteúdo das funções e transferência do custo de adaptação para o trabalhador**.

Dados da Revelio Labs reportados pelo Business Insider indicaram redução de 19% na presença de tarefas executáveis por IA em descrições de vagas ao longo de três anos. Depois do lançamento do ChatGPT, vagas em ocupações de alta exposição caíram 31%, contra 25% nas de baixa exposição. A associação é relevante, mas não demonstra causalidade exclusiva da IA ([Business Insider: empresas contratando menos em funções expostas à IA](https://www.businessinsider.com/ai-hiring-white-collar-recession-jobs-tech-new-data-2025-6)).

Entre recém-formados, a Handshake observou crescimento de 21% nas candidaturas e redução de 15% nas vagas. No setor de tecnologia, as vagas passaram de aproximadamente 625 mil em janeiro de 2023 para 467 mil em março de 2025; a participação das posições iniciais caiu de 24% para 21%. A mesma matéria destaca o risco de eliminar justamente as tarefas pelas quais profissionais iniciantes aprendiam fundamentos, contexto e julgamento ([Business Insider: enfraquecimento da entrada profissional da Geração Z](https://www.businessinsider.com/tech-broken-career-ladder-gen-z-entry-level-jobs-ai-2025-4)).

Um estudo da Apollo reportado em 2026 encontrou associação entre alta exposição à IA e redução de 6,7% no crescimento do salário real após 2023, com efeitos maiores entre trabalhadores de menor renda e serviços. Trata-se de um white paper com limitações, não de uma identificação causal definitiva ([Business Insider: exposição à IA e crescimento salarial](https://www.businessinsider.com/ai-could-lower-workers-pay-job-market-impact-2026-7)).

Ao mesmo tempo, há criação e recomposição de trabalho. Vagas que mencionavam IA alcançaram 4,2% das listagens em dezembro de 2025, com concentração em dados, analytics, marketing e recursos humanos ([Business Insider: crescimento das vagas relacionadas à IA](https://www.businessinsider.com/ai-job-listings-surge-record-broader-hiring-slows-2026-2)). Uma análise de milhões de anúncios destacou julgamento, desenho de sistemas, depuração, governança de dados, avaliação de modelos, comunicação e conhecimento de domínio como capacidades valorizadas ([Business Insider: capacidades procuradas na era da IA](https://www.businessinsider.com/ai-tech-jobs-skills-employers-want-2026-7)).

Um relato profissional situado em São Paulo ajuda a aproximar esse debate do contexto local. Um tradutor descreveu aumento de produtividade com IA, acompanhado da necessidade de revisar gramática, contexto, expressões locais e conteúdo de maior risco. O caso é anedótico e não representa sozinho toda a profissão, mas ilustra uma função que se transforma sem eliminar a responsabilidade humana ([Business Insider: tradutor em São Paulo usando IA](https://www.businessinsider.com/language-translator-uses-ai-wont-replace-adapt-2024-10)).

**Implicação para o Rebobina:** uma resposta responsável deve operar no nível de tarefas, decisões e competências transferíveis. O produto não deve prever que uma profissão desaparecerá. Deve criar um espaço para praticar as capacidades humanas que continuam necessárias quando tarefas específicas mudam.

### 4.2. Letramento técnico

O letramento técnico descrito pelo corpus vai além de aprender comandos. Ele envolve compreender o funcionamento probabilístico dos modelos, escolher tarefas adequadas, fornecer contexto, proteger dados, reconhecer incerteza, verificar fontes e assumir responsabilidade pela entrega final.

Explicadores do Business Insider descrevem modelos de linguagem como sistemas que aprendem padrões de texto e produzem continuações prováveis. Fluência não equivale a verdade, intenção ou compreensão humana ([Business Insider: como chatbots de IA funcionam](https://www.businessinsider.com/how-ai-chatbots-like-chatgpt-work-explainer-2023-7)).

Uma pesquisa encomendada pela Workday, com 3.200 líderes e empregados, estimou que quase 40% do valor economizado com IA era perdido em correção e desalinhamento; apenas 14% dos empregados relatavam resultados claramente positivos e consistentes. Os números devem ser atribuídos à pesquisa patrocinada, mas reforçam a importância da revisão humana ([Business Insider: retrabalho provocado por erros de IA](https://www.businessinsider.com/workday-study-looks-at-time-spent-fixing-ai-errors-2026-1)).

A PwC criou sessões práticas e de baixo risco porque o treinamento inicial ainda deixava uma lacuna entre conhecer a tecnologia e aplicá-la em situações reais de trabalho ([Business Insider: sessões práticas de prompting na PwC](https://www.businessinsider.com/pwc-prompting-parties-teach-employees-how-to-use-ai-2024-12)). Em outro levantamento reportado pelo BI, 33% dos líderes usavam IA frequentemente, contra 16% dos colaboradores individuais; clareza sobre o plano de adoção estava associada a maior preparo e conforto ([Business Insider: diferença de adoção entre líderes e colaboradores](https://www.businessinsider.com/ai-usage-in-workplace-statistics-gallup-poll-2025-6)).

Fluxos longos também acumulam risco. Uma ilustração matemática reportada pelo BI mostrou que uma taxa hipotética de 1% de erro independente por etapa levaria a aproximadamente 63% de probabilidade de ao menos um erro em cem etapas. Isso não é uma taxa universal observada, mas demonstra por que agentes e automações precisam de checkpoints e validação ([Business Insider: erros acumulados em agentes de IA](https://www.businessinsider.com/ai-agents-errors-hallucinations-compound-risk-2025-4)).

**Implicação para o Rebobina:** o produto deve ensinar a pessoa a julgar uma resposta antes que ela afete um cliente. Fontes, lacunas, decisões, versões e limites precisam permanecer visíveis. A IA pode sugerir e adaptar; não pode substituir a decisão nem esconder a incerteza.

### 4.3. Acessibilidade

A cobertura sobre tecnologia assistiva reforça três princípios: incluir pessoas com deficiência desde o início, reduzir custo e dependência de hardware especializado e oferecer diferentes formas de interação.

Uma reportagem sobre robótica e tecnologia assistiva observou que adoção depende de preço, alcance e envolvimento precoce das pessoas com deficiência no desenvolvimento ([Business Insider: tecnologia assistiva e mobilidade](https://www.businessinsider.com/advancements-ai-robotics-powering-new-assistive-tech-mobility-aids-accessibility-2024-10)). Recursos como rastreamento ocular, atalhos vocais, feedback háptico e processamento no próprio dispositivo mostram o potencial de tornar acessibilidade parte da experiência principal ([Business Insider: controle ocular e recursos de acessibilidade da Apple](https://www.businessinsider.com/apple-eye-tracking-accessibility-control-iphone-ipad-2024-5)).

A personalização também pode reduzir barreiras cognitivas. Um relato sobre uma estudante com dislexia descreveu o uso de IA para simplificar e reorganizar materiais, acompanhado de verificação contra as próprias anotações. Trata-se de uma experiência individual, não de evidência causal generalizável ([Business Insider: IA como apoio a uma estudante com dislexia](https://www.businessinsider.com/how-chatgpt-ai-helps-student-overcome-dyslexia-learning-challenges-2023-3)).

Por outro lado, sistemas podem reproduzir exclusão. A cobertura do BI reuniu casos de erro em reconhecimento facial e preconceito contra dialetos, associados a dados pouco representativos e equipes que não refletem as populações afetadas ([Business Insider: vieses raciais em sistemas de IA](https://www.businessinsider.com/ai-racism-bias-new-inclusive-solutions-2024-3)).

**Implicação para o Rebobina:** o modo lista deve oferecer as mesmas ações, informações e consequências do ambiente visual. Teclado, foco visível, leitor de tela, alto contraste, legendas, linguagem simples e movimento reduzido devem ser testados, não apenas declarados. Português brasileiro, variações linguísticas e estereótipos dos personagens também exigem avaliação.

### 4.4. Resiliência urbana

As matérias analisadas mostram uma evolução de modelos climáticos abstratos para ferramentas que transformam risco em decisão local. Entre os padrões recorrentes estão localização do impacto, uso de mapas e dados públicos, comunicação compreensível, indicação de incerteza e priorização de pessoas vulneráveis.

O Business Insider descreveu soluções que combinam dados de inundação, infraestrutura e retorno esperado para orientar intervenções urbanas, mas também registrou limitações e premissas dos modelos ([Business Insider: adaptação de cidades a calor e inundações](https://www.businessinsider.com/startups-working-help-cities-adapt-to-rising-flooding-and-heat)). Uma ferramenta do World Resources Institute traduziu projeções climáticas para efeitos cotidianos em aproximadamente mil cidades ([Business Insider: impactos climáticos localizados](https://www.businessinsider.com/what-the-climate-crisis-could-feel-like-in-your-city-2024-9)). Em Tampa, realidade aumentada acessível por QR code foi usada para tornar projetos de infraestrutura climática compreensíveis sem exigir aplicativo ou equipamento especializado ([Business Insider: realidade aumentada para infraestrutura resiliente](https://www.businessinsider.com/augmented-reality-ar-tampa-urban-infrastructure-development-climate-resiliency-planning-2025-6)).

São Paulo dispõe de fontes relevantes para uma solução distinta de mobilidade climática: a [API Olho Vivo da SPTrans](https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/) documenta posição, previsão de chegada e indicador de veículo acessível; o [CGE](https://www4.cgesp.org/v3/alagamentos-classificacao.jsp) classifica alagamentos; o [GeoSampa](https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/srv/resources/datasets/432c06b1-03a1-4b1f-9210-423e1b58e869) oferece série histórica; e o [Direto do Metrô](https://www.metro.sp.gov.br/sua-viagem/direto-metro/) informa falhas que alteram o tempo de viagem.

**Implicação para o Rebobina:** não existe aderência direta no recorte atual. Adicionar uma enchente a uma simulação genérica não transforma o produto em solução de resiliência urbana. Uma proposta de mobilidade, como Ponto Seguro SP, deve permanecer alternativa separada, com problema, público, fontes e métricas próprios.

## 5. Matriz de aderência do Rebobina

| Tema ou princípio | Aderência atual | Evidência no conceito | Lacuna a validar |
| --- | --- | --- | --- |
| Deslocamento profissional | Forte | Prática de tarefas, revisão de entregas e desenvolvimento de julgamento | Definir trabalhador em transição e efeito sobre autonomia ou segurança econômica |
| Letramento técnico | Muito forte | Fontes, lacunas, decisão humana, histórico, replay e verificador de regras | Declarar e medir as competências aprendidas |
| Acessibilidade | Promissora | Modo lista, teclado e movimento reduzido previstos | Provar paridade, testar leitor de tela e envolver pessoas com deficiência |
| Resiliência urbana | Ausente | O pequeno comércio é apenas o ambiente da simulação | Exigiria mudança real de problema e público; não deve ser alegada no MVP atual |
| Problema humano e local | Parcial | Situação cotidiana de atendimento | Falta evidência de campo em São Paulo |
| Pessoas próximas do problema | Ainda não comprovada | Uso de materiais do próprio usuário | Personalização não substitui co-design ou teste com trabalhadores |
| Agência humana | Muito forte | Pessoa decide, compara tentativas e revisa | Garantir que a interface não entregue a resposta antes da decisão |
| Utilidade concreta | Forte como hipótese | Resultado final é um artefato de trabalho melhorado | Demonstrar mudança observável antes e depois |

## 6. Enquadramento do problema

### 6.1. Fatos de contexto

- Tarefas e vagas iniciais estão mudando em ocupações expostas à IA.
- Empresas esperam maior fluência em IA, mas o acesso a treinamento e tempo protegido é desigual.
- Treinamento genérico não garante aplicação correta em uma situação de trabalho.
- Resultados produzidos por IA podem exigir correção, verificação e julgamento humano.
- Acessibilidade e participação do público afetado precisam entrar no desenho desde o início.

### 6.2. Hipóteses ainda não validadas

- Trabalhadores de atendimento em pequenos negócios de São Paulo estão sendo orientados ou pressionados a utilizar IA sem espaço seguro para praticar.
- Uma resposta incorreta ou promessa sem base pode afetar confiança do cliente, renda e permanência profissional.
- Ensaiar com materiais próximos da realidade ajuda a pessoa a identificar lacunas que um curso genérico não evidencia.
- O replay melhora a capacidade de justificar e revisar uma decisão.
- O ambiente 2.5D aumenta compreensão ou engajamento sem infantilizar o usuário.
- A base G02 já contém componentes suficientes para reduzir o esforço de implementação.

### 6.3. Problema provisório

> Pessoas que trabalham em pequenos negócios precisam aprender a usar IA em tarefas que afetam clientes, mas não possuem um ambiente seguro para praticar com as regras do próprio trabalho, reconhecer informações ausentes e corrigir decisões antes que o erro aconteça em uma situação real.

### 6.4. Público prioritário provisório

Atendente, vendedor ou responsável por um pequeno comércio que recebe pedidos por canais digitais, utiliza regras de prazo e entrega e possui pouca experiência em avaliar respostas produzidas por IA.

Esse perfil é uma **proto-persona**, não uma persona validada. Características demográficas, comportamentais ou econômicas não devem ser inventadas antes de pesquisa de campo.

### 6.5. Job-to-be-Done

> Quando eu precisar usar IA para responder a uma situação real de trabalho, quero ensaiar com as regras relevantes e observar as consequências das minhas decisões, para ganhar autonomia sem colocar clientes ou minha renda em risco.

## 7. Hipótese de solução e teoria de mudança

### 7.1. Hipótese de solução

Se a pessoa puder transformar um material de trabalho em uma situação simulada, tomar uma decisão antes de receber o feedback, rastrear cada afirmação até sua fonte, voltar ao ponto da decisão e revisar a entrega, então será mais capaz de identificar lacunas e produzir uma resposta fundamentada do que após receber apenas uma explicação ou sugestão pronta da IA.

### 7.2. Teoria de mudança provisória

| Etapa | Mudança esperada | Estado da evidência |
| --- | --- | --- |
| Entrada | Usuário fornece material mínimo e contextual | Previsto no conceito |
| Atividade | Prepara, ensaia, decide e rebobina | Previsto no conceito |
| Resultado imediato | Identifica lacuna e corrige o artefato | Hipótese testável no MVP |
| Capacidade | Melhora verificação, julgamento e uso responsável de IA | Hipótese que exige repetição e avaliação |
| Impacto | Maior autonomia diante de mudanças profissionais | Objetivo de longo prazo, ainda não demonstrado |

## 8. Proposta de experiência

### 8.1. Mundo

Um ambiente pequeno e coerente, inicialmente um comércio, no qual objetos e personagens representam situações reais do exercício. A experiência visual não deve conter mecânicas de retenção artificial, moedas ou espera. Todo o fluxo precisa existir também em modo lista.

### 8.2. Mesa de trabalho

Espaço para compreender informações e preparar uma entrega, como resposta a cliente, checklist ou roteiro. O documento deve mostrar fontes utilizadas, lacunas e versões. O botão central é **“Ensaiar no meu mundo”**, que transforma a entrega em uma situação interativa.

### 8.3. Materiais

Área para textos e instruções fornecidos pelo usuário e artefatos produzidos durante a experiência. Fatos extraídos devem permanecer ligados aos respectivos trechos de origem. Informação ausente continua ausente; exemplos fictícios devem ser rotulados como fictícios.

### 8.4. Tentativas e replay

Linha do tempo que conecta sugestão, fonte, decisão e consequência simulada. A pessoa escolhe um ponto, volta àquele estado, toma outra decisão e compara o resultado antes e depois. O produto mostra comportamentos observados, sem produzir uma pontuação inventada de preparo para o mercado.

## 9. Fronteiras de responsabilidade da IA

| Função | Papel da IA | Controle determinístico necessário |
| --- | --- | --- |
| Extração de fatos | Propor fatos e lacunas a partir do material | Preservar trecho de origem, bloquear afirmação sem suporte e permitir correção humana |
| Composição da situação | Selecionar personagens, objetivos e variações dentro de um esquema | Limitar fatos disponíveis, decisões válidas e estados possíveis |
| Diálogo dos personagens | Expressar o papel e reagir à decisão | Impedir alteração das regras ou criação de fatos empresariais |
| Consequências | Produzir apenas a narrativa textual de uma consequência já definida | Motor de regras determina a transição e a consequência pedagógica |
| Orientação e revisão | Explicar lacuna e sugerir revisão | Feedback deve citar material, decisão e regra aplicada |
| Avaliação profissional | Nenhum papel para gerar nota de empregabilidade | Exibir somente comportamentos observáveis e mudanças entre versões |

Para o MVP, essas funções não exigem vários agentes autônomos. Uma integração de modelo com saídas estruturadas, combinada a uma máquina de estados e regras determinísticas, reduz complexidade e risco.

## 10. Escopo recomendado do MVP

### Cenário único

Pedido urgente em um pequeno comércio.

### Componentes mínimos

1. Um material fictício com condições de entrega.
2. Um fato confirmado: prazo normal de dois dias.
3. Uma lacuna: entrega expressa não informada.
4. Um cliente solicitando entrega no mesmo dia.
5. Uma resposta inicial preparada com apoio da IA.
6. Até dois personagens.
7. Até três decisões e duas ramificações principais.
8. Uma consequência controlada por regras.
9. Um replay a partir de uma decisão.
10. Uma revisão do documento com comparação entre versões.
11. Alteração de uma regra do material que muda a decisão adequada.
12. Paridade funcional entre ambiente visual e modo lista.

### Fora do caminho crítico

- Geração de objetos ou cenários 3D em tempo real.
- Várias profissões e famílias de situações.
- Importação universal de PDF, imagem e planilha.
- Árvore aberta de conversas e consequências.
- Vários agentes autônomos expostos na interface.
- Score de empregabilidade ou prontidão profissional.
- Painel de desempenho individual para empregadores.
- Integração com a proposta de resiliência urbana.

## 11. Critérios de aceite

- Toda afirmação empresarial relevante aponta para um trecho do material ou aparece explicitamente como fictícia.
- A ausência de informação sobre entrega expressa permanece visível.
- A IA não transforma a lacuna em política da empresa.
- O usuário toma uma decisão antes de receber a explicação corretiva.
- Consequências válidas são determinadas por regras, não inventadas livremente pelo modelo.
- A tentativa pode ser retomada a partir de uma decisão anterior.
- A resposta revisada permanece como nova versão e a anterior continua disponível.
- Alterar uma condição do material modifica fatos, decisão adequada e feedback.
- O fluxo completo pode ser concluído por teclado e no modo lista.
- Conteúdo visual não é a única forma de comunicar estado, erro ou consequência.
- O sistema evita alegações de que pode prever comportamento humano ou medir empregabilidade.

## 12. Métricas e cama de teste mínima

### Métrica principal

**Taxa de revisão fundamentada:** percentual de participantes que, após o replay, corrigem a entrega respeitando as regras citadas e sem adicionar afirmações não sustentadas.

### Métricas auxiliares

- Tempo até a resposta revisada.
- Quantidade de promessas não sustentadas na primeira e na segunda versão.
- Percentual de participantes que conseguem explicar por que a primeira resposta era insegura.
- Taxa de conclusão do mesmo fluxo no modo visual e no modo lista.
- Quantidade de intervenções do facilitador necessárias para concluir o ensaio.

### Teste inicial

- **Participantes:** cinco pessoas próximas do público-alvo.
- **Procedimento:** todas recebem o mesmo material e o mesmo pedido urgente; a primeira tentativa ocorre antes do feedback; a segunda ocorre após o replay.
- **Sinal observável:** mudança entre a resposta inicial e a resposta revisada.
- **Critério inicial de sucesso:** ao menos quatro participantes identificam a lacuna e produzem revisão correta em até cinco minutos.
- **Guardrails:** zero afirmações sem fonte na versão final; nenhuma exposição de dado real de cliente ou empresa; fluxo principal concluído apenas por teclado e modo lista.
- **Limite do teste:** cinco participantes permitem identificar problemas de conceito e usabilidade, mas não demonstram impacto duradouro, aprendizagem generalizável ou melhora de empregabilidade.

### Roteiro inicial de entrevista

As perguntas devem buscar comportamentos passados e situações reais, evitando induzir concordância com a solução:

1. Conte uma situação recente em que você precisou responder a um cliente sem possuir todas as informações.
2. Onde você procura regras de prazo, preço ou entrega?
3. Você já utilizou IA para preparar esse tipo de resposta? O que aconteceu?
4. Como você percebe e corrige uma resposta incorreta?
5. Qual erro nessa tarefa poderia afetar mais o cliente ou o seu trabalho?
6. Praticar antes do envio seria útil ou seria apenas uma etapa adicional?
7. Um ambiente visual como este pareceria acolhedor, infantil ou indiferente?

Um sinal favorável seria o surgimento espontâneo de incerteza, consulta dispersa, retrabalho ou receio de prometer algo sem confirmação. Um sinal contrário seria a existência de um processo simples e confiável ou a ausência de valor percebido no ensaio e no replay.

## 13. Riscos e mitigação

| Risco | Consequência | Mitigação inicial |
| --- | --- | --- |
| Solução antes do problema | Banca percebe um jogo procurando uma necessidade | Abrir apresentação com pessoa, tarefa, erro e mudança observável |
| Escopo visual excessivo | Ciclo central não fica funcional | Um ambiente, um material, um cenário e duas ramificações |
| Gamificação infantilizante | Rejeição pelo público adulto | Chamar de ensaio seguro; oferecer modo lista equivalente; testar tom e estética |
| Alucinação de política empresarial | Orientação falsa ao usuário | Vínculo com trechos, lacuna explícita e motor de regras |
| Consequência simulada tratada como previsão | Falsa confiança | Rotular resultado como simulação pedagógica e mostrar regra aplicada |
| Exposição de dados | Vazamento de políticas, clientes ou conversas | Usar dados fictícios no MVP; minimizar, redigir e permitir exclusão em versões futuras |
| Prompt injection nos materiais | Documento tenta alterar comportamento do sistema | Tratar materiais como dados, aplicar separação de instruções e validar saídas estruturadas |
| Vigilância de trabalhadores | Uso punitivo das tentativas | Dados pertencem ao usuário; sem ranking ou compartilhamento patronal por padrão |
| Dependência da IA | Pessoa aceita sugestão sem raciocinar | Exigir decisão antes do feedback e revisão humana da entrega |
| Estereótipos de personagens | Exclusão ou reforço de preconceitos | Restringir atributos irrelevantes, revisar linguagem e testar públicos diversos |
| Acessibilidade cosmética | Modo alternativo inferior | Compartilhar o mesmo estado e ações entre modo visual e lista; testar com tecnologia assistiva |
| Alegação ampla de impacto | Promessa não sustentada de segurança econômica | Medir revisão fundamentada; tratar autonomia e empregabilidade como hipóteses de longo prazo |

## 14. Matriz de rastreabilidade

| Hipótese | Evidência atual | Oportunidade | Requisito do MVP | Critério de aceite | Métrica |
| --- | --- | --- | --- | --- | --- |
| Ensaiar antes de agir melhora a revisão | Mudança de tarefas, necessidade de prática e retrabalho reportados; efeito do produto ainda não testado | Praticar uma decisão sem atingir cliente real | Ensaio, consequência e replay | Versão final respeita as regras do material | Taxa de revisão fundamentada |
| Materiais do usuário tornam a prática contextual | Inferência do conceito, sem evidência de campo específica | Condicionar situação às regras relevantes | Extração, fonte e lacuna confirmadas | Alterar o material muda fatos, decisão e feedback | Percentual de participantes que reconhece relação com o próprio trabalho |
| Replay contribui para julgamento | Hipótese pedagógica ainda não testada | Comparar decisão, consequência e alternativa | Linha do tempo e retorno consistente de estado | Usuário refaz a decisão e explica a mudança | Conclusão do replay e correção após replay |
| Modo lista reduz barreiras do ambiente visual | Evidência geral de acessibilidade; implementação não verificada | Entregar o mesmo fluxo sem dependência visual | Paridade de estados e ações | Fluxo completo por teclado e modo lista | Taxa de conclusão nos dois modos |
| Atendimento de pequeno comércio é um recorte relevante | Proto-persona sem entrevista | Problema estreito, local e demonstrável | Cenário de pedido urgente | Dor reconhecida em pesquisa de campo | Frequência da dor e valor percebido do ensaio |

## 15. Decisões atuais

1. Posicionar o Rebobina como simulador de autonomia profissional, não como plataforma genérica de mundos ou jogo multiagente.
2. Escolher deslocamento profissional como trilha principal.
3. Tratar letramento técnico como o mecanismo pelo qual o impacto pode acontecer.
4. Tratar acessibilidade como requisito verificável desde o MVP.
5. Não alegar aderência a resiliência urbana no recorte atual.
6. Não combinar Rebobina e Ponto Seguro SP no mesmo MVP.
7. Medir revisão fundamentada, não engajamento ou pontuação de preparo.
8. Utilizar regras determinísticas para fatos, transições e consequências críticas.
9. Utilizar apenas material fictício enquanto privacidade, retenção e exclusão não estiverem implementadas.

## 16. Perguntas de pesquisa abertas

1. Quem foi a pessoa ou situação real que inspirou o cenário de atendimento?
2. Trabalhadores do público prioritário já usam IA? Em quais tarefas e com quais riscos percebidos?
3. Qual erro concreto eles gostariam de praticar antes de enfrentar no trabalho?
4. O replay melhora a revisão ou apenas torna a experiência mais agradável?
5. O ambiente 2.5D ajuda na compreensão ou pode infantilizar e distrair?
6. O modo lista oferece valor equivalente para quem não utiliza a cena visual?
7. Quais componentes do G02 existem e funcionam hoje?
8. Como materiais, versões e tentativas são armazenados, excluídos e protegidos?
9. Qual parte da experiência realmente necessita de geração por IA?
10. Que resultado seria significativo para a comunidade depois do hackathon?

## 17. Gate de continuidade

O desenvolvimento do mundo visual deve avançar somente quando duas incertezas forem reduzidas:

### Gate técnico

- Repositório G02 localizado e executado.
- Conversa, materiais, documentos versionados e histórico comprovados no código ou no produto em execução.
- Lacunas de integração registradas.

### Gate de problema

- Ao menos uma pessoa do público prioritário ouvida, idealmente três.
- Uma situação de risco ou incerteza real documentada sem dados pessoais.
- Confirmação de que praticar antes de responder teria valor para a pessoa.

### Decisão Go

Avançar com Rebobina quando a base técnica reduzir efetivamente o esforço e a pesquisa com usuários sustentar o problema. Caso uma dessas condições falhe, reduzir o escopo, reposicionar a experiência ou reconsiderar a alternativa de produto.

## 18. O que este documento não afirma

- Que a IA é a única causa das mudanças observadas no mercado de trabalho.
- Que todas as profissões expostas serão substituídas.
- Que o Rebobina já melhora empregabilidade, renda ou segurança econômica.
- Que uma consequência simulada prevê a reação de clientes reais.
- Que a experiência já atende integralmente a critérios formais de acessibilidade.
- Que a base G02 já possui todas as integrações descritas.
- Que a divulgação do hackathon em três veículos representa três reportagens editoriais independentes.

## 19. Formulação curta recomendada

> O Rebobina é um ambiente de ensaio seguro para pessoas cujas tarefas estão mudando com a IA. Ele transforma materiais do trabalho em situações práticas, permite testar uma resposta, observar uma consequência simulada, rebobinar decisões e revisar a entrega com fontes e lacunas visíveis. A IA ajuda a preparar e explicar; a decisão continua humana e as regras não podem ser reescritas pelo modelo.

## 20. Referências prioritárias

### Hackathon e comunidade

- [The AI Collective anuncia o Hack for Humanity, Fortune/EZ Newswire, 17 ago. 2026](https://fortune.com/press-releases/ai-collective-hack-for-humanity-global-civic-hackathon-2026-08-17/)
- [Hack for Humanity: São Paulo, página oficial do evento](https://luma.com/h4h-sao-paulo?locale=pt)

### Deslocamento profissional

- [Empresas contratando menos em funções que a IA pode executar, Business Insider, 2 jun. 2025](https://www.businessinsider.com/ai-hiring-white-collar-recession-jobs-tech-new-data-2025-6)
- [Redução de oportunidades iniciais em tecnologia, Business Insider, 24 abr. 2025](https://www.businessinsider.com/tech-broken-career-ladder-gen-z-entry-level-jobs-ai-2025-4)
- [Exposição à IA e crescimento salarial, Business Insider, 30 jul. 2026](https://www.businessinsider.com/ai-could-lower-workers-pay-job-market-impact-2026-7)
- [Crescimento de vagas que mencionam IA, Business Insider, 6 fev. 2026](https://www.businessinsider.com/ai-job-listings-surge-record-broader-hiring-slows-2026-2)
- [Capacidades procuradas em milhões de vagas, Business Insider, 3 jul. 2026](https://www.businessinsider.com/ai-tech-jobs-skills-employers-want-2026-7)
- [Tradutor em São Paulo relata como utiliza e revisa IA, Business Insider, 20 out. 2024](https://www.businessinsider.com/language-translator-uses-ai-wont-replace-adapt-2024-10)

### Letramento técnico

- [Como chatbots de IA funcionam, Business Insider](https://www.businessinsider.com/how-ai-chatbots-like-chatgpt-work-explainer-2023-7)
- [Retrabalho associado a erros de IA, Business Insider, 14 jan. 2026](https://www.businessinsider.com/workday-study-looks-at-time-spent-fixing-ai-errors-2026-1)
- [Sessões práticas de prompting na PwC, Business Insider, 28 dez. 2024](https://www.businessinsider.com/pwc-prompting-parties-teach-employees-how-to-use-ai-2024-12)
- [Diferença de uso de IA entre líderes e colaboradores, Business Insider, 16 jun. 2025](https://www.businessinsider.com/ai-usage-in-workplace-statistics-gallup-poll-2025-6)
- [Risco acumulado em agentes de IA, Business Insider, 17 abr. 2025](https://www.businessinsider.com/ai-agents-errors-hallucinations-compound-risk-2025-4)

### Acessibilidade

- [Tecnologia assistiva, robótica e mobilidade, Business Insider, 16 out. 2024](https://www.businessinsider.com/advancements-ai-robotics-powering-new-assistive-tech-mobility-aids-accessibility-2024-10)
- [Rastreamento ocular e recursos de acessibilidade da Apple, Business Insider, 15 maio 2024](https://www.businessinsider.com/apple-eye-tracking-accessibility-control-iphone-ipad-2024-5)
- [IA como apoio a uma estudante com dislexia, Business Insider, 4 mar. 2023](https://www.businessinsider.com/how-chatgpt-ai-helps-student-overcome-dyslexia-learning-challenges-2023-3)
- [Vieses raciais em sistemas de IA, Business Insider, 20 abr. 2024](https://www.businessinsider.com/ai-racism-bias-new-inclusive-solutions-2024-3)

### Resiliência urbana e fontes locais

- [Adaptação urbana a calor e inundações, Business Insider, 26 mar. 2024](https://www.businessinsider.com/startups-working-help-cities-adapt-to-rising-flooding-and-heat)
- [Impactos climáticos localizados em cidades, Business Insider, 19 set. 2024](https://www.businessinsider.com/what-the-climate-crisis-could-feel-like-in-your-city-2024-9)
- [Realidade aumentada para infraestrutura resiliente, Business Insider, 11 jun. 2025](https://www.businessinsider.com/augmented-reality-ar-tampa-urban-infrastructure-development-climate-resiliency-planning-2025-6)
- [Documentação da API Olho Vivo, SPTrans](https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/)
- [Classificação de alagamentos, CGE São Paulo](https://www4.cgesp.org/v3/alagamentos-classificacao.jsp)
- [Ocorrências históricas de alagamento, GeoSampa](https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/srv/resources/datasets/432c06b1-03a1-4b1f-9210-423e1b58e869)
- [Situação operacional em tempo real, Metrô de São Paulo](https://www.metro.sp.gov.br/sua-viagem/direto-metro/)

---

Este documento deve ser atualizado quando houver evidência de campo, acesso ao G02, protótipo funcional e resultados do primeiro teste. Mudanças de posicionamento precisam preservar a cadeia:

hipótese → evidência → decisão → oportunidade → requisito → critério de aceite → métrica
