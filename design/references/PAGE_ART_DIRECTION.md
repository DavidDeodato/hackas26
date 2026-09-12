# Direção visual das páginas — Rebobina

Status: referências entregues para implementação; aprovação visual das páginas depende de captura real.
Data: 12/09/2026.
Dono das referências: IMAGENS. Integração: ROOT8. Revisão independente: MARCA.

## Regra de aplicação

**REFERENCE ONLY.** Os PNGs guiam composição, escala, hierarquia e uso de espaço. O produto continua renderizando `MiniWorld`/canvas real e formulários, seletores, listas e leitura em HTML. Não importar estes PNGs para substituir o 3D ou os controles. A cena fotográfica/cinematográfica anterior não orientou esta rodada.

As imagens são candidatos de layout, não provas de funções implementadas, dados de usuários ou QA do produto. O exemplo Café Aurora aparece porque já existe nas capturas da aplicação e permanece explicitamente rotulado como exemplo.

## Arquivos e distribuição

| Página | Referência | Dimensões | Responsável pela página | Entrega |
|---|---|---|---|---|
| Audiência | [page-audiencia-v1.png](page-audiencia-v1.png) | 1505 × 1045 | AUDIÊNCIA | Enviada diretamente a AUDIÊNCIA e ROOT8; MARCA recebeu para revisão |
| Mesa | [page-mesa-v1.png](page-mesa-v1.png) | 1504 × 1046 | MESA / WorkPage | Enviada diretamente a MESA e ROOT8; MARCA recebeu para revisão |
| Materiais | [page-materiais-v1.png](page-materiais-v1.png) | 1505 × 1045 | Worker Materiais via ROOT8 | Enviada a ROOT8 para repasse ao worker; MARCA recebeu para revisão |

Geração nativa `image_gen`: uma chamada por página, usando a captura da principal e a captura da página como referências. As três saídas foram inspecionadas visualmente antes de distribuir; dimensões e integridade dos arquivos foram verificadas após salvar. Não houve instalação, alteração de componentes, reinício de servidor ou publicação nesta tarefa.

## Evidência consultada e limite temporal

- Principal aprovada como direção low-poly: `artifacts/qa/3d-final-local-primeira-visita-desktop.png`, gravada às 14:17:35 locais.
- Audiência: `artifacts/qa/3d-final-local-audiencia-desktop.png`, 14:17:38.
- Mesa: `artifacts/qa/3d-final-local-mesa-desktop.png`, 14:17:41.
- Materiais: `artifacts/qa/3d-final-local-materiais-desktop.png`, 14:18:52, e relatório `3d-final-local-materiais-report.json`.
- Código consultado: `src/pages/AudiencePage.tsx`, `WorkPage.tsx`, `MaterialsPage.tsx`; componentes `AudienceProfileView`, `SavedAudienceList`, `MiniWorld.tsx` e CSS de MiniWorld.
- A captura antiga de Materiais não mostrava a estante apesar do relatório registrar canvas e renderer ready. **Isso não comprova falha atual.** MARCA informou posteriormente que a estante renderiza em sua aba ao vivo, com canvas de 190 px. A causa da divergência não foi estabelecida por IMAGENS. ROOT8 foi informado; qualquer fix compartilhado pertence ao worker designado, sem duplicação pelos donos de página.
- Alterações concorrentes podem superar as capturas de partida. A crítica abaixo descreve a evidência inspecionada e a revisão comunicada por MARCA, não um diagnóstico congelado do estado atual.

## Sistema visual comum

- Fundo `#0b0d0f`, texto `#f2ede4`, foco/ação `#f1ad7a`; superfícies neutras quentes, como `#17191b`. Valores canônicos vencem as aproximações geradas no PNG.
- Manrope nos títulos e DM Sans no corpo, texto de formulário de 14–16 px quando couber; linhas de leitura curtas e contraste verificado na implementação.
- Navegação existente mantida. Sem novas saudações, perfis, métricas, notificações, busca, filtros ou funcionalidades de chat.
- Dioramas geométricos simples em ilha circular com aro bronze, madeira e sombra suave. Ampliar o enquadramento do objeto antes de aumentar a altura do bloco.
- Um CTA principal contextual. CTAs dependentes de dados continuam indisponíveis ou ausentes até a precondição real.
- A proporção da imagem não é uma especificação de altura. Validar o fluxo em 1280 × 720 e 390 × 844, com foco/teclado e sem sobreposição.
- MiniWorld é decorativo com contagem real limitada visualmente a seis objetos. Não existe identificação/click por objeto, raycasting de seleção, avatar derivado de pessoa ou nome de documento na lombada.

## Audiência

### Crítica de partida

O header, a roda, a lista de perfis, o cadastro, o formulário de fonte nova e o resultado ocupavam blocos separados. Isso dispersava o fluxo e empurrava a ação para baixo. Na revisão ao vivo de MARCA, a roda ocupava 413 px e o CTA estava em y=776 em viewport de 720 px; esse relato indica que a compactação deve priorizar o acesso ao formulário.

### Mudanças implementáveis

1. Grid de trabalho próximo de 55/45: cadastro e fontes à esquerda; roda, perfis salvos e leitura de resultado à direita.
2. Nome e Papel profissional lado a lado quando houver largura. Preservar nomes completos nos perfis salvos, com quebra de linha em vez de truncamento rígido.
3. Reutilizar `SourcePicker`; mover fonte nova para disclosure. Abertura revela os campos já existentes e `Salvar e selecionar`.
4. Aproximar `SavedAudienceList` e `AudienceProfileView`; seleção altera a leitura HTML do perfil, com lentes, citações e limitações existentes.
5. Roda legível sem somar outra seção hero. Usar a variante `audience` e a contagem real; perfis vazios mantêm cadeiras vazias.
6. Compactar os dois vazios da referência em uma mensagem de orientação quando não houver perfis. A combinação de dois grandes cards vazios não é requisito.
7. Helper de ação deve cobrir Nome, Papel e Fonte; a referência menciona apenas a fonte. Preservar `canMap` e explicar a precondição que falta.

### O que não existe / não implementar a partir do PNG

Não há perfis novos, análise ou citação produzida por esta tarefa. Placeholder “Ex.: Ana Martins” não é cadastro. Não criar identidade visual específica para cada pessoa, seleção de cadeira por clique ou previsão comportamental.

### Mobile

Título curto, formulário e CTA antes da leitura longa; cena compacta, campos empilhados, perfis completos e resultado em sequência. A ordem exata deve preservar o foco do usuário e o estado real.

## Mesa de trabalho

### Crítica de partida

A cena era pequena dentro de um banner alto; a introdução e os atalhos consumiam espaço antes da escrita. O painel vazio de artefato podia dominar a área sem oferecer trabalho útil. A captura inicial também mantinha superfícies azuladas. MARCA informou depois que o compositor atual já cabe em y=514–715: preservar essa melhora ao ampliar apenas o enquadramento do diorama.

### Mudanças implementáveis

1. Manter grade 70/30 desktop: criação à esquerda e prévia do material à direita.
2. `Conversar` e `Preparar` continuam modos existentes. A cena `work` introduz a criação, com desk legível em aproximadamente 200–240 px de altura; ela pode ceder espaço quando há resposta.
3. Três atalhos curtos alimentam os prompts existentes: preparar pitch, revisar resposta e encontrar lacunas. Não criar novos endpoints ou assistentes.
4. `source-selector` em disclosure junto ao composer. Preservar IDs de fonte e semântica: Preparar salva versão; Conversar não altera materiais.
5. Artefato à direita usa seletor real, título, versão e conteúdo retornado. `Ensaiar apresentação` navega com `pitch` e `artifactId`; baixar texto e criar revisão já existem.
6. O estado vazio gerado não tem artefato ou versão inventada. O botão “Ensaiar” desabilitado é ilustração do estado; manter a política atual de não oferecer a ação até existir material é aceitável.
7. Aplicar carvão e pêssego exatos: a imagem reteve azul residual nos campos e atalhos. Não copiar esse desvio nem adicionar o ícone informativo de Orientador como nova função.

### O que não existe / não implementar a partir do PNG

A prévia é somente leitura; revisão ocorre pelo pedido e cria outra versão. Não há editor rich text, edição direta com autosave, chat em tempo real, histórico de mensagens, anexos de áudio, colaboração ou artefato criado por esta geração. O `vN` só aparece quando há material real.

### Mobile

Modos → introdução curta/cena → pedido/fontes → resposta → material e ação de ensaio. Evitar aumentar o banner a ponto de esconder o compositor. Priorizar um scroll de página e limites confortáveis de textarea.

## Materiais

### Crítica de partida

Cards grandes dentro de seções extensas deixavam muito vazio para uma única fonte. O estado sem pitch era desproporcional. A ausência visual da estante na captura antiga era uma observação de snapshot, superada pelo relato de renderização ao vivo de MARCA.

### Mudanças implementáveis

1. Título e CTA `Adicionar fonte` no topo. Biblioteca de documentos ~65% e cena `materials` ~35% como ponto inicial, sem impor essa proporção em toda largura. Em notebook, priorizar `Abrir e versionar` e o início de Pitches visíveis, evitando um hero alto da estante.
2. Converter grade de cards em lista horizontal responsiva, com título completo, tipo, versão, trecho e ação. Isso usa os dados existentes, sem índice ou serviço novo.
3. Fontes e Pitches continuam grupos distintos. Fonte abre `Abrir e versionar`; artefato abre `Abrir na mesa`.
4. Vazio de pitches compacto e link `Ir para a mesa`. Revisões preservam versões anteriores, conforme o comportamento atual.
5. Reutilizar o diálogo já existente com título, conteúdo, importação `.txt` e salvar. Não implementar formulário novo só para imitar o PNG.
6. A estante fica visível como contexto espacial, sem deslocar o documento da tarefa principal. Não associar livro a título específico; a versão atual representa apenas quantidade.
7. Corrigir o ícone verde da fonte para pêssego. Ignorar placa de parede, frase decorativa, capa “Café Aurora”, livros adicionais e ornamentos arquitetônicos inventados pela geração. A geometria do MiniWorld existente continua sendo o limite de implementação.

### O que não existe / não implementar a partir do PNG

Não há livro clicável que abra a fonte, escrita de título na lombada, PDF/DOCX import, busca, filtros, ordenação, tags ou sincronização externa. A importação atual aceita texto `.txt`, até 48 KB, cortado no formulário a 12.000 caracteres. Não anunciar outros formatos.

### Mobile

Título/CTA → Fontes → Pitches → cena, ou cena muito compacta antes das listas quando não deslocar as ações. Não empilhar a coluna inteira de cenário desktop antes do conteúdo. Cada item quebra título e trecho naturalmente; ação e versão permanecem visíveis. Dialog deve manter título, campos e ação acessíveis sem colisão com o teclado.

## Verificação e pendência de integração

- As três referências preservam o uso de low-poly e as jornadas existentes. Todos os dados exibidos são vazios/placeholder ou o exemplo já presente no snapshot.
- Audiência: corrigir helper incompleto e compactar os dois vazios.
- Mesa: remover azul residual; não criar tooltip nem liberar ensaio sem material.
- Materiais: remover ícone verde e detalhes de cenografia que não existem no MiniWorld.
- MARCA revisou as três imagens e aceitou-as como direção com ressalvas, sem pedir regeneração. Orientou manter o enquadramento útil sem aumentar a altura e priorizar listas/ações de Materiais no notebook/mobile. Isso não equivale a aceite visual da implementação.
- ROOT8 recebeu cada arquivo imediatamente após inspeção, além das propostas enviadas antes das gerações. AUDIÊNCIA/MESA receberam diretamente; Materiais deve ser repassado pelo ROOT ao subagente correspondente. A tentativa de contato pelo app com Materiais foi rejeitada por se tratar de subagente v2; o caminho foi entregue ao ROOT.
- Aceite das páginas: screenshot real desktop/mobile com cenário visível e conteúdo legível; controles existentes funcionais; nenhum PNG substituindo canvas; nenhuma nova função inferida da imagem. Esse aceite pertence aos executores/QA.

## Integridade

| Arquivo | Bytes | SHA-256 |
|---|---:|---|
| page-audiencia-v1.png | 1279166 | B82393649F7811B790AA12693AEDE26EC59742A34796A5524CB8EF2E8B9A13CB |
| page-mesa-v1.png | 1187045 | 0C49A658A5B98933F496E5EA7F9981A12CF33C9511FA6F95D0D38B154FBE5CDF |
| page-materiais-v1.png | 1258390 | 9756AFBFBD2E989034843B7EDAA5D91E3EDCDECABFB0DC4FDDD0AA24B3B1241C |

## Prompts finais usados

### Audiência

```text
Use case: ui-mockup
Create ONE polished desktop UI reference image for Rebobina's "Minha audiência" page, approximately 1440x1000 landscape. REFERENCE ONLY for a working React application.
Input image 1 is the actual approved main page. Match its simple geometric LOW-POLY real-time 3D style and physical miniature island, not photorealistic people or architectural renders. Input image 2 is the existing audience page: preserve its real functions and meaningful UI labels, while improving layout.
Palette: warm charcoal #0b0d0f, panels #17191b, ivory #f2ede4, peach #f1ad7a, muted warm gray; no teal, no neon. Manrope headings and DM Sans body, crisp readable 14–16px UI text.
Composition: compact sidebar about 164px on the left with the lowercase rebobina. wordmark and only four existing destinations: "Sala de ensaio", "Minha audiência" active, "Mesa de trabalho", "Meus materiais". No greeting or user profile or made-up metrics.
Content starts with "Mapear audiência." and the short explanatory line "Lentes profissionais fundamentadas nas suas fontes."
Two purposeful columns, 55% left and 45% right, with generous but efficient 24px gutters. LEFT is the real form: "Quem participa?", labeled empty inputs "Nome" and "Papel profissional"; then "Fontes para o mapeamento", one unchecked source row "Condições do Café Aurora — exemplo" (actual existing explicitly synthetic fixture); compact disclosure "Trazer uma fonte"; then primary peach action "Mapear lentes profissionais" with footnote "Selecione uma fonte para continuar." Show the action disabled/subdued because fields are empty. Inputs have honest placeholder text only, no invented people.
RIGHT upper half: prominent beautifully framed low-poly miniature three EMPTY armchairs arranged in a circle around a small central table, potted plant, circular bronze-edged island; closely match the existing geometry in image 2 but enlarge it substantially so it feels like the application's spatial centerpiece. Title "Sua roda de audiência". Honest text "Cadastre os perfis que estarão no ensaio."
RIGHT below the scene: "Audiências salvas" and empty-state copy "Seus mapeamentos aparecerão aqui." then a compact result reading area "Lentes e fontes" with empty-state copy "Selecione um perfil para ler o mapeamento." No fake citations, no fake analysis, no example person.
Keep form and scene visually balanced and the primary action fully visible above the fold. Main 3D occupies a meaningful region, not a tiny decorative icon or full-screen background. The design should look implementable with current form components, HTML details and the existing MiniWorld canvas.
Do not add search, filters, score, chat, notifications, analytics, drag-and-drop, profile portraits, fabricated records, toolbars, stock photo, website hero marketing, mobile inset or arbitrary tiny text. One complete desktop reference image.
```

### Mesa

```text
Use case: ui-mockup
Create ONE refined implementable desktop UI reference for Rebobina's "Mesa de trabalho" page. Approximately 1440x1000 landscape.
Input 1: actual main page showing the approved small LOW-POLY real-time 3D aesthetic. Input 2: the existing Work page with a tiny real MiniWorld desk. Use these for visual/function reference. This is REFERENCE ONLY; preserve canvas-based miniature design.
Palette: warm charcoal #0b0d0f, panels #17191b, ivory #f2ede4, peach #f1ad7a; warm neutral shadows, no teal or cyan. Manrope and DM Sans, readable restrained hierarchy, original simple geometric low-poly props.
Use the same 164px sidebar and four existing navigation destinations: "Sala de ensaio", "Minha audiência", "Mesa de trabalho" active, "Meus materiais". Lowercase rebobina. wordmark. No greeting, avatar, metrics or invented user data.
Header "Mesa de trabalho." with "Construa seu pitch e revise respostas com apoio das fontes."
Content split 70% working area, 30% artifact area. Show a useful FIRST VISIT with NO fabricated document. LEFT: segmented buttons "Conversar" and "Preparar", Preparar active in warm peach. Below, a compact functional introduction around 240px tall: "Sua mesa de criação" on the left and a prominently readable LOW-POLY desk miniature on the right, round bronze-edged island, pale wood desk, laptop, lamp, one notebook and empty chair; match existing MiniWorld geometry but make it more legible, simple and elegant, no photo textures. The scene should not push the input below the fold.
Below scene place three slim starter prompt buttons with exact short texts "Preparar um pitch", "Revisar uma resposta", "Encontrar lacunas". These fill the EXISTING prompt composer; do not imply new features.
Then the source disclosure "Fontes selecionadas" collapsed, directly above a spacious charcoal TEXTAREA with placeholder "Cole seu pitch ou descreva o que quer preparar…". Bottom of composer displays "Preparar salva uma nova versão." and a small send arrow button, disabled while empty. All of this visible within the main desktop frame without nested scrolling.
RIGHT: persistent artifact reading panel titled "Pitch e respostas", with an empty document area "Seu pitch vai aparecer aqui." and "Use Preparar para criar a primeira versão." Bottom contains the future existing action "Ensaiar apresentação" shown disabled until a real material exists. Small contextual note "Abra um material salvo para ver suas versões." Do NOT show fake version numbers, invented artifact title, fabricated generated body, stats or false success.
Make the right panel restrained and narrow; it should visibly communicate its future document-reading role. No chat bubbles, chat history, voice, file upload, extra editor toolbar, analytics, notifications, search, filter or rich text formatting controls. Existing composer is plain text and the artifact is a read-only preview.
Overall should look like a coherent spatial creative tool, not a marketing website or a blank corporate dashboard. One complete desktop composition, no mobile inset.
```

### Materiais

```text
Use case: ui-mockup
Create ONE finished desktop UI design reference for Rebobina's "Meus materiais" page, around 1440x1000 landscape. REFERENCE ONLY, implementable in React with real existing controls and a WebGL MiniWorld.
Input image 1 is the approved main page LOW-POLY real-time 3D and physical diorama island. Input image 2 is the current Materials page. Fix composition and make the missing library miniature visible; do not copy the second image's cool cyan/blue colors or wasted space.
Palette must be warm neutral: near-black charcoal #0b0d0f, panels #17191b, ivory #f2ede4, peach #f1ad7a, warm brown bronze wood. NO blue, teal or cyan highlights. Manrope headers, DM Sans text. Typography is crisp and legible.
Sidebar 164px: lowercase "rebobina." and four existing links "Sala de ensaio", "Minha audiência", "Mesa de trabalho", "Meus materiais" selected in peach. Do not add greeting, user avatar, account records or analytics.
At top a concise header "Meus materiais." with subline "Fontes e versões para sustentar seu ensaio." and one primary peach button "Adicionar fonte".
Under header a purposeful two-column body. LEFT about 65%: functional library list, not a giant grid of cards. Section "Fontes da apresentação", thin divider, one dense but readable horizontal source row. Use only the actual existing source from the screenshot, explicitly labeled as an example: "Condições do Café Aurora — exemplo". A small "v1" badge, a short excerpt "Produto: caixas de café. Prazo de entrega: 2 dias.", and the existing row action "Abrir e versionar". Do not invent other documents or dates.
Then a compact section "Pitches e respostas" with the real empty state "Nenhum pitch preparado ainda." and "Comece na mesa e salve a primeira versão." A subtle text link "Ir para a mesa". No giant dashed empty rectangle.
At the bottom of the left library area add restrained explanatory copy "As revisões preservam as versões anteriores." with a small document icon. These are actual versioning semantics, no fake success alert.
RIGHT about 35%: prominent simple LOW-POLY miniature wooden bookshelf on a round bronze-rimmed island, one visible book representing the existing material, a small sculptural bookend, bench and potted plant. No highly realistic photo textures: simple flat geometry, bevelled edges, warm light, readable shapes like input 1. Title "Sua biblioteca de contexto". Supporting copy "Suas fontes ficam disponíveis para preparar e ensaiar." Scene clearly visible, not a blank region. It is the real MiniWorld materials variant rendered beautifully; no imaginary interactive book search or drag/drop.
Keep the overall composition concentrated in the top 750 pixels, with useful breathing room below. No giant full-width unused card. Controls remain normal HTML outside the scene. No filters, search field, tabs, sorting, tags, external sync, badges of approval, upload PDF, chat features or fabricated metrics. Actual import is .txt or pasted text via existing add-source dialog; don't invent other file support. No modal open in this reference.
One complete desktop page only. No photorealistic room, photographic portraits, stock photos, mobile inset, browser frame, screenshots of other pages, or fantasy UI.
```
