# Rebobina — critica independente das tres paginas

Estado: critica e documentacao entregues; correcoes parciais revalidadas, QA final em andamento. Data: 2026-09-12.

## Contrato e evidencia

Preservar 3D low-poly real, materiais quentes e paleta carvao/marfim/pêssego. Os PNGs abaixo sao referencias, nao capturas do produto e nao substituem os canvases. Esta revisao nao alterou codigo, estilos ou imagens.

- Referencias inspecionadas: `design/references/page-audiencia-v1.png`, `design/references/page-mesa-v1.png` e `design/references/page-materiais-v1.png`.
- Baseline QA: `artifacts/qa/3d-final-local-report.json`, de 17:17:58Z, e `artifacts/qa/3d-final-local-materiais-report.json`, de 17:18:55Z; capturas desktop/mobile associadas. Esses arquivos antecedem as alteracoes atuais.
- Conferencia independente: aba propria Chrome em `http://localhost:4173`, paginas `/audiencia`, `/mesa` e `/materiais`, viewport 1280 x 720. Capturas e medidas DOM registradas nesta tarefa MARCA; nenhuma chamada de geracao, envio de formulario ou alteracao de dados.
- Nas tres leituras desktop, `scrollWidth = 1265` para viewport 1280 e nenhum warning/erro havia sido registrado ate entao. Ausencia de overflow nao significa hierarquia aprovada.
- A primeira tentativa de revisao mobile 390 x 844 encontrou um overlay de import durante integracao. Uma segunda passagem apos chegada do CSS recuperou as paginas; resultados na reverificacao abaixo.

## Audiencia — tres deltas prioritarios

| Prioridade | Evidencia observada | Ajuste e criterio de aceite |
|---|---|---|
| 1. Acao principal acessivel | No desktop atual, formulario com 434 px e coluna contextual com 587 px; botao Mapear com topo em y776, abaixo da primeira tela. | Favorecer trabalho, aproximadamente 55/45 quando couber; Nome/Papel lado a lado em desktop e reduzir espacos repetidos. Com uma fonte e disclosure fechado, campos e CTA devem caber em 1280 x 720 sem reduzir alvos de 44 px. |
| 2. Presenca util do 3D | Painel da roda com 413 px de altura; objeto ocupa aproximadamente 40% da largura contextual e sobra muito fundo vazio. | Aproximar enquadramento do diorama dentro do painel existente, sem aumentar o banner. Lista de perfis deve ficar junto da roda. Sem clique em personagem prometido: MiniWorld representa quantidade, nao identidade/seleção de uma pessoa. |
| 3. Resultado e vazio compactos | Mensagem de zero perfis e outro bloco vazio de 360 px repetem a orientacao; o segundo inicia em y708. | Uma orientacao curta quando vazio. Com perfil real, seletor e primeira lente com citacao devem assumir esse espaco. Manter fontes, limites e indicacao sintetica; nao inventar perfil para preencher layout. |

Critica da referencia: a composicao form/contexto e coerente, mas nao copiar o helper incompleto que fala apenas em selecionar fonte; o produto exige Nome, Papel e Fonte. O helper atual ja informa os tres. Nao reproduzir a altura artificial dos dois estados vazios do PNG.

## Mesa — tres deltas prioritarios

| Prioridade | Evidencia observada | Ajuste e criterio de aceite |
|---|---|---|
| 1. Continuidade da paleta | Painel de artefato, compositor e selecionados ainda tinham tons azulados na conferencia desktop. | Trocar os valores locais residuais por superficies quentes coerentes com o shell, texto marfim e foco pêssego. Nao copiar o azul residual do PNG. |
| 2. Escala do diorama | Mesa 3D renderizada, mas com objeto de aproximadamente 120 px no banner de 671 x 150 px. | Ampliar enquadramento sem transformar o cenario em hero alto. A estrutura ja permite escrever: compositor medido entre y514 e y715; preservar essa melhoria. |
| 3. Acao de preparar clara | Botao de envio medido em 33 x 33 px. | Alvo minimo de 44 x 44 px, estado habilitado inequívoco e nome acessivel coerente com Conversar/Preparar. Manter o ensaio condicionado a material real, sem inserir CTA ficticio para imitar o PNG. |

Critica da referencia: preservar a separacao entre trabalho e preview, as sugestoes curtas e fontes em disclosure. Nao copiar tooltip informativo inexistente no selo Orientador. Nao aumentar o banner para caber uma mesa maior; ajustar o enquadramento do 3D.

Risco separado, enviado ao dono e ao QA: `work-polish.css` aplicava `overflow:hidden` a `.conversation-body` em desktop. Resposta longa precisa continuar rolavel e legivel. A leitura posterior ja encontrou regra `.has-reply` com `overflow-y:auto`; isso e evidencia de correcao em codigo, nao teste de resposta longa concluido.

## Materiais — tres deltas prioritarios

| Prioridade | Evidencia observada | Ajuste e criterio de aceite |
|---|---|---|
| 1. Inventario antes de espaco vazio | Uma unica fonte ocupa card de 321 x 291 px dentro de secao de 1049 x 405 px; Pitches so comeca em y807. | Lista operacional de fontes/artefatos com titulo, versao, trecho e acao alinhados. Cerca de 65% para inventario e 35% para biblioteca em desktop quando couber. Primeira fonte e inicio de Pitches acessiveis sem uma rolagem longa. |
| 2. Biblioteca como contexto | Estante renderizou na conferencia atual, em canvas de 602 x 190 px. O PNG QA anterior mostrava area vazia. | Preservar o renderer existente e melhorar enquadramento/composicao; nao reimplementar por causa de um print antigo. Em mobile, lista primeiro ou biblioteca compacta; evitar um hero inteiro antes dos documentos. |
| 3. Hierarquia e linguagem honestas | Card/icone/acao ainda exibiam mint e superficies azuladas; Adicionar fonte ja era pêssego. | Um CTA principal Adicionar fonte; acoes de linha discretas, quentes e legiveis. Vazio de pitch compacto. Excluir placa, frase de parede e capa nominada do PNG: MiniWorld agrega contagem, nao mostra documento especifico nem livro clicavel. |

Critica da referencia: a lista horizontal e a biblioteca lateral resolvem a dispersao, mas proporcao e altura sao direcao, nao medidas rigidas. Nao exigir remodelagem ou uma biblioteca fotorealista para encerrar este ciclo.

## Integracao e fechamento

- Os tres conjuntos de deltas foram enviados diretamente ao IMAGENS; Audiencia e Mesa receberam os seus. Materiais foi encaminhado ao ROOT para o dono exclusivo da pagina.
- Falha observada entre 17:23 e 17:24Z: Vite nao resolveu `../components/materials/materials.css` importado por `MaterialsPage.tsx`. O arquivo ainda nao existia na verificacao local. ROOT e QA foram avisados; trata-se de pendencia de integracao, nao de falha estetica da referencia.
- Antes de encerrar implementacao, repetir desktop 1280 x 720 e mobile 390 x 844 apos a integracao estabilizar; conferir 3D visivel, CTA acessivel, nenhuma sobreposicao, teclado e leitura do conteudo real.
- Aceite desta MARCA: referencias coerentes como direcao, com ressalvas explicitas acima. Aceite do produto e das novas paginas permanece separado e depende de implementacao conferida, QA e validacao do usuario quando aplicavel.

Proximo movimento: donos implementam em seus escopos; QA registra nova captura e fluxo. MARCA mantem a direcao congelada e avalia somente os deltas entregues, sem abrir nova estetica ou geracao de imagem.

## Reverificacao apos os primeiros ajustes

Esta secao atualiza, sem apagar, os snapshots que motivaram os deltas.

- **Audiencia desktop, confirmado:** botao Mapear entre y605.75 e y651.75 em 1280 x 720; Nome/Papel lado a lado; roda com 286.67 px de altura; vazio duplicado removido. Os deltas de CTA e redundancia foram atendidos no estado vazio inspecionado. Enquadramento do objeto ainda pode ganhar presenca sem ampliar painel. Nao foi gerado perfil novo para validar o estado preenchido.
- **Mesa mobile, confirmado:** superficies quentes, diorama maior e botao de envio 44 x 44 px. Residuo P2: em 390 x 844 sem rolagem inicial, envio entre y753 e y797 e navegacao fixa entre y781 e y844; aproximadamente 16 px inferiores do alvo ficam sobrepostos. O centro ainda atinge o botao. Reservar area segura no compositor; nao foi afirmada quebra funcional.
- **Materiais, confirmado:** `src/components/materials/materials.css` passou a existir; apos reload, a pagina abriu e a estante 3D ficou visivel em mobile. O overlay de import nao reapareceu nessa passagem. Os logs retiveram os erros historicos da integracao, portanto nao foram descritos como console vazio.
- **Materiais mobile, pendente editorial:** a nova composicao ainda coloca a biblioteca alta antes do inventario; primeira acao Abrir fonte medida em y1048. Priorizar lista ou compactar biblioteca no celular. Isso e delta de hierarquia, nao prova de fluxo quebrado.
- Viewport temporario restaurado ao final. Nenhuma chamada IA ou alteracao de dados realizada. Donos e ROOT receberam esses readbacks; verificacao final do fluxo permanece com QA.
