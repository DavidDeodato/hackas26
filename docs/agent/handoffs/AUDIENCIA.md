# AUDIÊNCIA

STATUS: ready

### Fechamento pós-shell — 12/09, estado vigente

Escopo preservado: página e componentes de Audiência; sem mudança de API, contratos, renderer ou shell. A direção visual segue carvão/marfim/pêssego. As referências a verde e composições antigas nas seções históricas abaixo estão superadas.

- Botão indisponível neutro e legível; mensagem persistente de erro no mapeamento; ação explícita `Ver lentes` nos perfis salvos; disclosure e foco seguem o mesmo sistema de controles.
- Correção final: lista de fontes limitada a 120 px apenas em desktop com altura até 760 px. Com seis materiais persistidos, CTA passou de y718–764 para y648–694 em 1280×720. A última fonte continuou selecionável (scroll interno 394 px); preencher Nome/Papel/Fonte habilitou o botão. Não foi submetido novo mapeamento.
- Perfil `Profissional de demonstração` reaberto após reload: três citações, fontes e limitações preservadas. Selecionar o perfil transfere foco para `audience-profile-result`; primeira citação em y380–488 no desktop.
- Mobile 390×844 inspecionado com formulário, roda real, perfil e citações: documento 375 px, citações 14 px, sem overflow horizontal. `prefers-reduced-motion: reduce` confirmado, um canvas presente, console do caminho manual sem erros ou avisos. Emulação restaurada.
- MiniWorld atual inspecionado visualmente em desktop/mobile: roda e figura legíveis. Ajuste de câmera pertence ao executor do renderer; não foi feito nesta frente.
- Capturas QA reais, agora disponíveis e inspecionadas: `artifacts/qa/page-polish-audiencia-desktop.png`, `page-polish-audiencia-mobile.png`, `page-polish-audiencia-filled-desktop.png` e `page-polish-audiencia-filled-citations-mobile.png`. Também existem os recortes `filled-citations-desktop`, `filled-mobile` e `filled-stage-mobile` no mesmo diretório. Vazios capturados em 1280×720/390×844; os recortes mobile preenchidos têm 390×720 dentro de viewport 390×844 por limitação do compositor na captura longa. Sem montagem de imagens. Esses PNGs substituem a pendência de captura descrita nas revisões anteriores.
- `artifacts/qa/page-polish-audiencia-report.json` (17:30:36Z): estados vazios isolados em 1280×720/390×844, HTTP 200, renderer ready, sem overflow e erros vazios, zero chamadas IA. `page-polish-audiencia-form.json` registra teclado/disclosure e precondições: nenhum POST, quatro avisos GPU ReadPixels no passe de interação anterior, sem falha HTTP. Não confundir esses avisos com erro de aplicação nem afirmar console universalmente vazio.
- Revalidação final concluída: `npm run build` passou (1.881 módulos) e `npm test` passou com 16/16 testes, zero falhas. Um build intermediário encontrou erro concorrente `WorkPage.tsx:20` (`Location.key`); ROOT notificado e dono corrigiu o arquivo antes deste passe verde. Chunk Three.js permanece em 693 kB, limitação já conhecida do renderer compartilhado.

Próximo passo: ROOT integrar as evidências e concluir o gate de deploy do conjunto. Esta frente está pronta no escopo local, não publica nem altera o trabalho dos outros donos.

### Revisão MARCA aplicada — estado mais recente

- Grid desktop 55% trabalho /45% contexto, Nome/Papel lado a lado, labels13px e CTA46px.
- Medido em1280x720: CTA y606–652 (antes y776), roda287px de altura (antes413px). Cena continua real; zoom do enquadramento solicitado ao ROOT, dono do renderer.
- Vazio duplicado removido; uma orientação explica Nome/Papel/Fontes em Audiências salvas.
- Seleção de perfil transfere foco ao resultado, sem movimento animado; primeira citação medida em y380–488 após seleção. Perfil persistido preservado.
- Desktop e mobile390px reinspecionados: documento375px, sem overflow; console limpo após reload. Build passou, com aviso existente de tamanho do chunk Three.js.
- Bloqueio transitório de import materials.css durante gravação de outra frente foi resolvido por seu dono; nenhuma alteração fora da audiência.

## Polimento final — composição com 3D real

Referência inspecionada: `design/references/page-audiencia-v1.png`, usada para proporção e hierarquia; o produto mantém `MiniWorld` com canvas real e contagem persistida.

Estado mais recente (substitui as posições de header descritas nas revisões históricas abaixo): header curto, formulário à esquerda e coluna contextual à direita com MiniWorld, perfis salvos e resultado. Mobile empilha os blocos. Fonte nova recolhível, sem ocupar permanentemente o fluxo. Nome completo em cartões salvos, texto de evidência 14px e limitações 13px. CSS reescrito em uma única base canônica, removendo camadas antigas conflitantes.

| Critério | Antes | Depois verificado |
|---|---|---|
| Acesso ao formulário | Hero e salvos empurravam formulário para baixo | Formulário inicia em cerca de y174 no desktop 1440px |
| Fonte nova | Painel permanente concorrente | Disclosure nativo com teclado; seleção e CTA juntos |
| Nome salvo mobile | Reticências escondiam identidade | Nome e papel completos com quebra de linha |
| Evidência | Texto pequeno em cartões densos | Citações 14px; uma lente por faixa de leitura |
| Reload | Corrigido anteriormente | Perfil persistido e 3 lentes reaparecem após reload |
| CTA incompleto | Só pedia fonte | Enumera nome, papel e fonte ausentes |

Verificações desta revisão: build TypeScript/Vite passou; seleção de fonte + nome + papel habilitam CTA; disclosure abre/fecha; reload mantém perfil salvo. Desktop 1440x1000 e mobile 390x844 inspecionados em screenshots reais inline na tarefa. Mobile com `prefers-reduced-motion: reduce` emulado: media query verdadeira, 1 canvas presente, documento 375px sem overflow em viewport390, citações14px, zero warnings/errors no console. Emulação removida e viewport restaurado ao final. Não houve nova chamada de geração nem escrita de material no QA desta revisão.

Capturas PNG em disco: solicitadas ao pipeline QA do ROOT; esta ferramenta de captura retornou imagens inline, sem caminho de arquivo. Não apresentar o PNG de referência como captura do produto. O build mantém aviso do chunk Three.js acima de500kB; renderer compartilhado fora do escopo desta frente.

## Escopo

Implementar a jornada de mapeamento de lentes profissionais em `AudiencePage`, usando materiais persistidos e o contrato congelado de `/rehearsal/audience`.

## Arquivos

- `src/pages/AudiencePage.tsx`
- `src/components/audience/**`
- `research/rehearsal/DEMO_SOURCES.md`

## Contrato implementado

- Nome e papel profissional com validação mínima.
- Seleção múltipla de materiais existentes via `useWorkspace()`.
- Criação de fonte persistente via `POST /materials`, com atualização do workspace e seleção automática.
- Mapeamento via `POST /rehearsal/audience` com `{name, role, sourceIds}`.
- Cards de lentes com rótulo explícito de hipótese, confiança, trecho citado, título da fonte e limitação por lente quando disponível.
- Limitações gerais e aviso permanente de que o resultado não descreve personalidade, intenção ou comportamento futuro.
- Identificação visível de exemplo sintético quando `profile.synthetic` for verdadeiro.
- Layout responsivo e foco visível, com CSS exclusivo de prefixo `audience-`.
- Três fontes curtas de demonstração com lastro e regra de rotulagem em `research/rehearsal/DEMO_SOURCES.md`.

## Arquivos entregues

- `src/pages/AudiencePage.tsx`
- `src/components/audience/SourcePicker.tsx`
- `src/components/audience/LensCard.tsx`
- `src/components/audience/AudienceProfileView.tsx`
- `src/components/audience/SavedAudienceList.tsx`
- `src/components/audience/audience.css`
- `research/rehearsal/DEMO_SOURCES.md`
- `docs/agent/handoffs/AUDIENCIA.md`

## Verificações reais

- `npm run build`: passou (`tsc --noEmit` + Vite, 1.860 módulos transformados).
- `npm test`: 15/15 testes passaram, incluindo mapeamento de audiência com citações exatas e downgrade de referências inventadas.
- TypeScript isolado dos arquivos da frente: passou.
- Navegador local `http://127.0.0.1:4173/audiencia`: carregou e o fluxo de mapeamento retornou três lentes com fonte e limitações.
- Desktop: inspecionado visualmente; cards, trechos e limites legíveis, sem overflow observado.
- Mobile 390 × 844: inspecionado visualmente; campos e fontes empilham, navegação inferior permanece acessível.
- Console no caminho testado: 0 warnings e 0 errors.

## Correção após integração ROOT

- Corrigido o estado volátil da página: `AudiencePage` agora lê `GET /rehearsal/state` ao montar.
- O perfil persistido mais recente é aberto automaticamente após reload.
- Todos os perfis persistidos aparecem em `Audiências salvas` e podem ser selecionados sem nova geração.
- Após `POST /rehearsal/audience`, a lista local é sincronizada com `result.workspace.audiences`.
- Estados de sincronização, vazio e erro foram implementados sem fixture.
- Visual local atualizado para superfície escura e técnica, com o verde da marca como sinal funcional; nenhum CSS global foi alterado.
- Reload real confirmou `1 perfil(is)` e reabriu `Profissional de demonstração` com suas três lentes, fontes e limitações.
- Desktop e mobile 390 × 844 reinspecionados após a correção; console permaneceu com 0 warnings e 0 errors.
- Novo build completo passou com 1.870 módulos; os 15 testes continuam verdes.

## Limitações

- A integração de rota e navegação pertence ao ROOT; a página já apareceu integrada no servidor local durante a validação.
- A validação criou no workspace local um perfil de QA chamado `Profissional de demonstração`, usando a fonte de exemplo já existente. Nenhuma fonte pública ou biografia foi criada pelo teste.
- Não foi criado teste automatizado de componente; o contrato do motor/API já possui cobertura e o fluxo foi exercitado no navegador.

## Próximo passo

### Atualização visual coordenada

Correção integrada: MiniWorld agora ocupa uma segunda linha de largura completa no header. QA visual real em desktop e 390x844 confirmou texto e diorama completos. No mobile: viewport 390px, documento 375px, MiniWorld 311px, canvas presente, sem overflow horizontal e sem warnings/erros no console. Contagem visível de 1 perfil coincide com a lista persistida. Nenhum renderer alterado.

Somente `audience.css` migrado para tokens canônicos `--rb-*` da direção cinematográfica, retirando cores mint/verde fixas. CTA pêssego usa texto `--rb-void`; fontes e metadados têm 12px. Erro usa `--rb-danger`, confiança limitada tem borda tracejada e seleção usa foco. Header preparado para `.mini-world` de 220px ao lado do texto no desktop e empilhado no mobile. ROOT permanece responsável pelo import/insert do componente; nenhuma alteração de fluxo nesta revisão. Verificação visual da cena depende da integração do ROOT.

ROOT pode integrar/revisar o diff e QA pode repetir o fluxo completo com uma das fontes rotuladas de `DEMO_SOURCES.md`.
