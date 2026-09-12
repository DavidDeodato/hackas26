# MARCA — handoff

STATUS: working — critica por pagina entregue; revisao adversarial final aguarda congelamento

## Contrato vigente — 2026-09-12

Esta secao vence os estados e proximos passos historicos abaixo.

### Revisao adversarial final solicitada

Escopo recebido: coesao entre shell, Sala, Audiencia, Mesa e Materiais; somente P0/P1 acionaveis, com evidencia visual, sem escrever app. O integrador da revisao informou que Sala/Mesa/shell e zoom da Audiencia ainda estao em edicao e enviara `FREEZE FINAL` com snapshot/commit. Ate esse sinal, MARCA revisa apenas evidencias ja geradas e nao emite aceite final. Capturas `page-polish-*`, perfil com citacoes e modal mobile de Materiais foram inspecionados como evidencia preliminar. A critica anterior permanece entregue, nao equivale ao fechamento deste novo passe.

- Decisao recebida do ROOT: preservar 3D low-poly principal aprovado pelo usuario e paleta quente atual. Nao retornar para foto/PNG como modo principal.
- Confirmado por leitura de `src/components/rehearsal/SpatialStage.tsx`: estado inicial `interactive`; alternativa `Ver ilustração` / `Voltar ao 3D`; imagem somente no modo cinematic ou fallback. Isso confirma o contrato no codigo, nao um novo teste de runtime.
- Audiencia, Mesa e Materiais usam `MiniWorld`; cada referencia nova deve melhorar composicao e uso do 3D sem substitui-lo por raster.
- `GUIA_RAPIDO.md`, `DIRECAO_ARTE_IMERSIVA.md` e `DELTA_REFERENCIA_CINEMATICA.md` agora distinguem paleta atual de assets historicos, CTA pêssego de verde antigo e 3D em codigo de geracao de ambiente por IA.
- Escopo MARCA: somente documentos proprios; nenhum codigo, CSS global ou SVG alterado neste fechamento. Sem nova geracao de imagem pela MARCA.
- Proximo passo: donos concluem os deltas registrados em `docs/brand/CRITICA_PAGINAS_3D.md` e QA confere a implementacao estabilizada. Nenhum aceite estetico das novas paginas e inferido de checks tecnicos.

### Revisao independente das tres paginas

Entregue: `docs/brand/CRITICA_PAGINAS_3D.md`, com tres deltas por pagina, critica das tres referencias e medidas do runtime em 1280 x 720. As refs `page-audiencia-v1.png`, `page-mesa-v1.png` e `page-materiais-v1.png` foram abertas e inspecionadas. Deltas encaminhados ao IMAGENS e donos/ROOT.

Confirmado na reverificacao: Audiencia trouxe o CTA para y606–652 em 1280 x 720, reduziu roda de 413 para 287 px e removeu vazio duplicado. Mesa mobile agora quente, desk maior e botao 44 x 44 px. Materiais renderizou a estante, ao contrario do PNG QA antigo. Pendentes editoriais: enquadramento da roda; aproximadamente 16 px inferiores do envio da Mesa sobrepostos pela navegacao mobile; biblioteca alta antes do inventario de Materiais (primeira acao em y1048).

Import CSS ausente interrompeu a primeira passagem mobile; apos chegada do arquivo e reload, Materiais abriu e a estante ficou visivel, sem novo overlay. ROOT e QA receberam falha e recuperacao. Nenhuma chamada IA, mudanca de dados ou codigo efetuada pela MARCA. Proximo passo: QA recaptura a implementacao estabilizada e donos comprovam os criterios do documento.

## Historico — nao usar como contrato atual

Registros abaixo preservam verificacoes de versoes anteriores. `ready`, paleta clara e modo cinematic padrao nesses registros nao descrevem o estado vigente.

## Resultado

Kit vetorial autoral do Rebobina entregue dentro dos caminhos exclusivos. O simbolo combina uma seta de retorno com a abertura de um balao de conversa: ensaio, resposta e nova tentativa, sem alegar previsao de pessoas.

## Arquivos

- `public/brand/rebobina-symbol.svg` — simbolo principal quadrado.
- `public/brand/rebobina-logo-horizontal.svg` — assinatura horizontal principal.
- `public/brand/rebobina-logo-monochrome.svg` — assinatura em uma cor.
- `public/brand/rebobina-favicon-candidate.svg` — candidato de favicon, sem substituir o atual.
- `docs/brand/GUIA_RAPIDO.md` — conceito, voz, paleta, tipografia, tamanhos e usos.
- `docs/brand/preview.html` — prancha local para conferencia do conjunto e da reducao.

## Contrato implementado

- Nome preservado: **Rebobina**.
- Promessa institucional preservada: **ensaie conversas que importam**.
- Assinatura curta proposta: **Ensaie. Responda. Rebobine.**
- Paleta usada somente com `#f7f8f3`, `#fffefa`, `#2e3933`, `#304e3e` e `#e6edc5`.
- Manrope no wordmark e titulos; DM Sans no texto de apoio, com fallback sans-serif.
- Desenho construido somente com primitivas SVG; nenhum asset ou marca externa foi copiado.
- Nenhum arquivo de app, estilo global, favicon atual ou package foi alterado.

## Verificacoes reais

- Os quatro SVGs foram carregados e parseados como XML valido via PowerShell.
- A prancha `docs/brand/preview.html` foi renderizada em Chrome headless a 1200 x 900.
- A reducao foi conferida visualmente em 64 px, 32 px e 16 px; em 16 px permanecem distinguiveis a volta e a abertura inferior.
- Wordmark principal e versao monocromatica foram conferidos sobre superficies clara e verde.

## Limitacoes

- O wordmark permanece como texto SVG para respeitar Manrope e manter o arquivo leve; uma derivacao para grafica deve converter o texto em contornos.
- A decisao de substituir `/favicon.svg` e integrar a marca no app pertence ao ROOT.
- A versao monocromatica tem tinta `#2e3933`; sobre fundo escuro, pode ser invertida para branco somente em derivado de aplicacao.

## Proximo passo

ROOT pode integrar `rebobina-logo-horizontal.svg` em cabecalhos e, se aprovar a leitura em aba real, copiar o candidato para o caminho de favicon atual. Para uso compacto na navegacao, preferir `rebobina-symbol.svg` com rotulo acessivel `Rebobina`.

## Revisao da integracao ROOT — 2026-09-12

STATUS: ready com dois polimentos P2 nao bloqueantes

### Confirmado no app real

- URL conferida: `http://localhost:4173/`, HTTP 200.
- Desktop em 1280 x 720: wordmark carregado de `/brand/rebobina-logo-horizontal.svg`, renderizado em 171 x 42 px, sem distorcao, overflow horizontal, warning ou erro de console.
- Breakpoint compacto em 800 x 900: simbolo de `/brand/rebobina-symbol.svg` renderizado em 36 x 36 px; retorno e abertura de conversa continuam legiveis.
- O link da marca aparece na arvore de acessibilidade como `Rebobina`.
- Logo horizontal, simbolo e favicon atual responderam HTTP 200 com `image/svg+xml`.

### Polimentos objetivos para ROOT

1. **P2 — marca ausente no telefone:** em 390 x 844, `.sidebar .brand { display: none }` oculta o link inteiro. O `brand-mobile-mark` esta configurado como `display: block`, mas seu ancestral continua oculto. Nao ha marca ilegivel; ela nao aparece. Criterio de aceite, caso ROOT queira presenca persistente: exibir apenas o simbolo entre 20 e 24 px em uma area de cabecalho ou na barra inferior, com alvo clicavel minimo de 44 x 44 px e nome acessivel `Rebobina`, sem reduzir os quatro alvos de navegacao.
2. **P2 — favicon ainda pertence ao conceito anterior:** `index.html` continua apontando para `/favicon.svg`, cujo desenho sao dois triangulos de rewind. Criterio de aceite: apontar o link de icone para `/brand/rebobina-favicon-candidate.svg` ou substituir o derivado atual, mantendo resposta HTTP 200 e leitura em 16 x 16 px.

Nenhum desses pontos bloqueia o desenvolvimento nem exige alteracao dos SVGs entregues. Esta revisao nao mudou `App.tsx`, `styles.css`, `index.html` ou `public/favicon.svg`.

## Redirecionamento urgente — direcao imersiva escura

STATUS: ready para SALA e ROOT

O visual claro/isometrico anterior foi rejeitado. Novo norte canônico de arte: **palco de ensaio no intervalo entre bastidor e apresentacao**, escuro, sofisticado, espacial e humano. A especificacao implementavel esta em `docs/brand/DIRECAO_ARTE_IMERSIVA.md`.

Fonte vinculante conferida: `docs/agent/VISUAL_RESET.md`. Esta direcao detalha o reset sem substituir suas regras.

Entregas novas:

- `docs/brand/DIRECAO_ARTE_IMERSIVA.md` — tokens, composicao, luz, materiais, movimento, palco 2.5D, personalizacao semantica e gates.
- `public/brand/rebobina-logo-horizontal-dark.svg` — logo com wordmark claro e simbolo ajustado para fundo escuro.

Referencias locais verificadas: CampoBounty spatial/territory e `atlas.tsx`; Vesper target rural chapel e review de superficies. Foram extraidos principios de hierarquia espacial, luz e materialidade; a estetica rural nao deve ser copiada.

Direcao de implementacao daquela fase: SALA aplica o palco e seu CSS local; ROOT aplica tokens globais/navegacao quando seguro. Agente IMAGENS produz assets do cenario separadamente. A restricao original de pipeline foi substituida: 3D pre-modelado em codigo esta autorizado; geracao de ambiente por IA em runtime continua fora do escopo.

## Gate visual da primeira integracao escura

STATUS: working — aguardando correcoes dos donos

Captura real em `http://localhost:4173/`, viewport 1280 x 720:

- Confirmado: shell escuro, palco em planos e foco espacial substituem a caixa isometrica clara.
- Confirmado: palco ocupa aproximadamente dois tercos do conteudo util; rail permanece secundario.
- P1 SALA: titulo principal foi sobrescrito localmente com cor escura sobre `#070a0d` e ficou praticamente ilegivel. Deve herdar `--rb-text` do shell.
- P1/P2 SALA: rail da pergunta e controles locais ainda usam branco puro, rompendo a continuidade material do shell. Migrar para `--rb-surface`/`--rb-surface-raised` sem perder contraste.
- P2 SALA: texto dentro da tela do palco esta pequeno demais na captura. A cena deve mostrar apenas rotulo e pergunta curta; conteudo integral permanece no HTML do rail.

Falhas transmitidas diretamente aos donos. ROOT confirmou que o shell ja usa `--rb-text`; heading/rail estao sobrescritos pelo CSS local da SALA. Visual ainda nao aprovado; nova captura desktop/mobile obrigatoria apos integracao estabilizar.

## Gate visual apos correcao

STATUS: ready — P1 resolvidos

Capturas reais repetidas em desktop 1280 x 720 e mobile 390 x 844:

- Titulo agora usa `rgb(242, 246, 244)` (`--rb-text`) sobre fundo `rgb(7, 10, 13)` (`--rb-void`).
- Rail de pergunta e campo de resposta migraram para superficies escuras coerentes.
- Palco 2.5D permanece dominante, com arquitetura em planos, pergunta curta na cena e conteudo integral no rail HTML.
- Mobile: palco medido em 341 x 472,6 px, sem overflow horizontal (`scrollWidth` 375 no viewport util de 390).
- Favicon ativo em `/brand/rebobina-favicon-candidate.svg`.
- Nenhum warning ou erro de console encontrado nas capturas finais.
- Marca horizontal permanece legivel no shell desktop escuro.

P2 residual nao bloqueante enviado a SALA: no mobile, o texto de contexto do palco termina em `feedb...` no meio da palavra. Preferir copy curta completa ou clamp em fronteira de linha. O gate futurista/editorial pode seguir para QA, que continua responsavel pela aprovacao visual final do produto.

### Fechamento do P2

STATUS: superseded — higiene tecnica confirmada, direcao artistica rejeitada

SALA corrigiu o clamp e a captura real em 390 x 844 agora encerra o contexto em fronteira de palavra (`fontes,…`). Revalidado no app: sem overflow horizontal, titulo em `rgb(242, 246, 244)`, favicon novo ativo e nenhum warning/erro de console. Estes fatos continuam validos apenas como higiene tecnica.

## Segunda rejeicao visual do usuario

STATUS: working — nao aprovado

O usuario rejeitou a estetica resultante como `hacker 2010`. Portanto, o aceite anterior de contraste/overflow esta explicitamente revogado como aceite de direcao artistica.

Stop gates imediatos:

- nenhum grid luminoso como estrutura dominante;
- nenhum verde neon difuso, glow generalizado ou moldura de terminal;
- nenhum microtexto/tiny code usado para fabricar sofisticacao;
- nenhum painel que pareca HUD gamer ou dashboard dark recolorido;
- palco deve parecer estudio cinematografico/editorial humano, com grafite quente e materiais ricos;
- UI deve ocupar a periferia e respeitar o gesto espacial do `SpatialStage` da SALA;
- contraste, responsividade e build verde sao necessarios, mas nao aprovam o visual.

Pendente: receber a nova imagem de referencia gerada pelo coordenador, comparar captura real lado a lado e transmitir lacunas observaveis a SALA/ROOT. Nao declarar `ready` antes dessa comparacao.

## Referencia cinematografica recebida

STATUS: working — implementacao ainda nao comparada apos novo norte

Arquivo aberto e inspecionado: `design/references/rebobina-cinematic-studio-v1.png`. O alvo substitui a paleta mint e a linguagem wireframe por carvao neutro, marfim e pêssego, arquitetura curva, materiais quentes e hierarquia editorial 70/30.

Artefatos atualizados:

- `docs/brand/DIRECAO_ARTE_IMERSIVA.md` — paleta v2 e tipografia corrigidas.
- `docs/brand/DELTA_REFERENCIA_CINEMATICA.md` — comparacao implementavel, limites e gates.
- `public/brand/rebobina-logo-horizontal-dark.svg` — mint removido; versao carvao/marfim/pêssego.
- `public/brand/rebobina-logo-horizontal-cinematic.svg` — derivado explicito marfim/pêssego para integracao do shell, preservando o simbolo autoral.

Delta imediato: remover grid/wireframe, glow mint, moldura terminal e microtexto; ampliar pessoas, ancorar em arquitetura curva, integrar rail ao shell e usar pergunta grande. A imagem e conceitual: nao autoriza nomes, avatares, audio, etapas ou funcionalidades ficticias.

## Comparacao runtime x referencia cinematografica

STATUS: working — alinhamento estrutural confirmado; aceite do usuario pendente

Capturas reais: desktop 1280 x 720 e mobile 390 x 844. Referencias comparadas: `design/references/rebobina-cinematic-studio-v1.png` e `public/world-art/cinematic-rehearsal-stage-v2.png`.

Confirmado no runtime:

- carvao, marfim e pêssego substituíram mint/grid;
- palco WebGL curvo e rail editorial seguem proporcao aproximada 70/30;
- apresentador, audiencia e foco ativo estao semanticamente sincronizados;
- navegacao estreita e logo claro integram o shell;
- mobile: `SpatialStage` medido em 341 x 640 px, sem overflow horizontal;
- nenhum warning ou erro de console na captura.

Distancia restante sem exigir fotorealismo:

1. camera alta/afastada ainda faz o palco parecer maquete; aproximar 12–18% e baixar levemente o angulo;
2. tela do palco contem microtexto pouco legivel; remover texto decorativo ou usar frase curta real e grande, sem duplicar a pergunta ativa.

Os dois deltas foram enviados a SALA. `public/world-art/cinematic-rehearsal-stage-v2.png` foi inspecionado e funciona como capa/fallback/standalone, nao como prova de geracao live. Novo derivado de marca solicitado pelo ROOT: `public/brand/rebobina-logo-horizontal-cinematic.svg`.

Nao declarar visual aprovado antes do usuario/QA, mesmo com build e checks tecnicos verdes.

## Validacao historica do modo cinematografico + 3D opcional

STATUS: superseded — o usuario pediu posteriormente 3D principal; checks abaixo pertencem ao modo anterior

Decisao do dono do `SpatialStage` validada em runtime:

- modo padrao carrega `public/world-art/cinematic-rehearsal-stage-v2.png` em 1585 x 992, completo;
- texto visivel e honesto: `Cenario ilustrativo · perfis definidos pelos seus materiais`;
- overlays usam pergunta/categoria, interlocutor e perfis reais da sessao;
- botao `Explorar em 3D` abre a cena WebGL com um canvas e muda para `Voltar ao cenario`;
- retorno restaura o asset cinematografico e preserva a mesma pergunta/interlocutor;
- campo de resposta continua visivel; sem overflow horizontal ou warning/erro de console;
- `canvasCount = 0` no modo cinematografico e comportamento esperado, nao falha.

Leitura editorial: esta combinacao e materialmente mais fiel a referencia do que o WebGL isolado e nao finge foto dinamica nem geracao live. Ainda assim, o aceite estetico pertence ao usuario/QA e nao deve ser inferido destes checks.
