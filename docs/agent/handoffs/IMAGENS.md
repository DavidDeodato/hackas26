# IMAGENS

STATUS: ready

## Entrega atual — referências de páginas low-poly

- `design/references/page-audiencia-v1.png` — 1505 × 1045.
- `design/references/page-mesa-v1.png` — 1504 × 1046.
- `design/references/page-materiais-v1.png` — 1505 × 1045.
- Direção, crítica por página, limitações, evidências e prompts completos: `design/references/PAGE_ART_DIRECTION.md`.
- REFERENCE ONLY: manter MiniWorld/canvas real e controles HTML; não usar os PNGs como telas do produto.
- Uma geração nativa por página; inspeção visual antes de distribuir. ROOT8 recebeu cada uma imediatamente, AUDIÊNCIA/MESA diretamente, Materiais via ROOT8; MARCA recebeu para revisão independente.
- O snapshot antigo de Materiais em branco não comprova falha atual: MARCA informou que a estante aparece ao vivo. Correções comuns de renderer pertencem ao worker designado pelo ROOT8.
- Próximo passo: executores aplicam layout/tokens e QA confere capturas reais. Nenhum componente, engine, servidor ou deploy foi alterado por IMAGENS.

As entregas cinematográficas abaixo são histórico; a direção atual usa o 3D low-poly aprovado da principal.

## Entrega vigente — cena cinematográfica v2

- `public/world-art/cinematic-rehearsal-stage-v2.png`
- Referência visual: `design/references/rebobina-cinematic-studio-v1.png`.
- Dimensões: `1585 × 992 px`.
- Tamanho: `1.946.080 bytes`.
- SHA-256: `7D1D877C7A91D42078C2232DC01E1FBB7073717F0EA845D9F9352823D6F16AB5`.
- Geração: ferramenta nativa `image_gen`, usando a referência local como guia visual.
- Uso aprovado: asset pré-renderizado de entrada, capa, fallback ou sala 2.5D standalone; não representa geração live.

### Resultado visual conferido

- Preserva a direção da referência: teatro curvo íntimo, carvão e âmbar, palco circular e acabamento cinematográfico maduro.
- Contém uma apresentadora estilizada e exatamente três avaliadores em poltronas, todos originais e sem aparência de pessoa pública.
- Não contém UI, navegação, cards, botões, textos, logos, watermark ou verde neon.
- A tela curva exibe somente uma paisagem costeira atmosférica, sem palavras ou elementos de interface.
- Não retornou ao escritório quente/genérico da v1.

### Prompt final resumido

```text
Use case: stylized-concept. Use Image 1 as faithful visual/compositional reference.
Create only the central cinematic rehearsal theater: elegant semi-circular charcoal architecture, rounded stage, warm metallic trim, restrained foliage, one original adult presenter and exactly three original adult audience figures in lounge chairs. Premium cinematic 3D diorama, mature stylized realism, concentric composition, low-key charcoal environment and amber lighting. Image only: no words, letters, numbers, logos, watermark, signage, UI, navigation, cards, buttons, browser chrome or split-screen. Avoid generic warm office, cream daylight studio, neon green, purple cyberpunk, glassmorphism and franchise styling.
```

### Distribuição

- SALA, MARCA e VIDEO devem consumir o caminho acima conforme seus escopos.
- ROOT mantém a integração 3D e decide a superfície final.
- Este asset não altera nem bloqueia a modelagem da SALA.

> Histórico da v1: a estética do asset quente/isométrico abaixo foi rejeitada. O arquivo permanece somente como backup e não deve orientar nem bloquear a nova sala 2.5D futurista da SALA.

## Entrega

- `public/world-art/rehearsal-room-warm-isometric-v1.png`
- Dimensões: `1536 × 1024 px`.
- Tamanho: `2.548.694 bytes`.
- SHA-256: `046E3018301F8C1C0F1A20974989C965D9268A4624B7F3F68BE59C12D6729215`.
- Geração: ferramenta nativa `image_gen`, modo built-in.

## Resultado visual conferido do backup rejeitado

- Sala de ensaio vazia em perspectiva elevada/isométrica suave.
- Palco de madeira clara, uma tela realmente vazia, jardim interno perimetral e exatamente três poltronas.
- Fundo creme, verde profundo, madeira clara e terracota compatíveis com a identidade congelada.
- Centro preservado para conteúdo dinâmico.
- Não há pessoas, texto, logos, watermark, botões ou UI embutida.
- Acabamento final ficou mais próximo de render editorial 3D suave do que de clay caricatural; a limitação é estética, não funcional.

## Prompt final

```text
Use case: stylized-concept
Asset type: optional background artwork for an interactive web rehearsal room
Primary request: create an original warm isometric rehearsal room that feels welcoming, calm, and editorial.
Scene/backdrop: a cream-colored open studio room with a light blond-wood platform, a small indoor garden integrated along the back and side edges, a modest stage with one large completely blank presentation screen, and exactly three comfortable armchairs arranged as an audience.
Subject: the empty rehearsal environment only; no people or characters.
Style/medium: polished original 3D clay render with soft rounded forms and the charm of a premium animated feature, without copying any franchise, character, or identifiable production design.
Composition/framing: wide landscape, elevated isometric 3/4 view. Preserve generous clean negative space through the center and upper-middle for dynamic UI overlays. Keep the stage toward the back, armchairs mainly in the lower and side zones, and plants around the perimeter. Strong readable silhouettes at web size.
Lighting/mood: warm diffuse daylight, soft ambient occlusion, gentle shadows, cozy and focused rather than childish.
Color palette: warm cream #f7f8f3 and #fffefa, deep muted green #304e3e, pale yellow-green #e6edc5, blond wood, restrained terracotta accents.
Materials/textures: matte clay, soft woven upholstery, pale natural wood grain, understated foliage.
Constraints: exactly three armchairs; one blank screen; no humans; no faces; no text; no letters; no numbers; no logos; no watermark. The image is background art, not a UI mockup, so include no buttons, panels, labels, bubbles, or interface chrome.
Avoid: neon, purple gradients, glassmorphism, photorealism, clutter, dark auditorium, franchise references, oversized props, text-like marks.
```

## Sugestão de integração anterior — não aplicar sem nova decisão

Sem editar o código da SALA, a composição foi comparada ao `viewBox="0 0 820 500"` atual. Para uso em `background-size: cover; background-position: center`, estes pontos são bons alvos iniciais para overlays:

| Elemento dinâmico | Coordenada aproximada no viewBox |
|---|---:|
| Pergunta sobre a tela | `x=430, y=45, w=225, h=105` |
| Apresentador no palco | centro em `x=500, y=205` |
| Perfil/poltrona esquerda | centro em `x=120, y=325` |
| Perfil/poltrona central | centro em `x=310, y=405` |
| Perfil/poltrona direita | centro em `x=645, y=400` |

Esta proposta foi superada pela nova direção visual. A SALA seguirá com palco 2.5D pré-modelado futurista e personalização semântica; as coordenadas ficam registradas apenas para rastreabilidade do backup.

## Verificações reais

- Arquivo copiado para o checkout e reaberto após a cópia.
- Dimensões, tamanho e hash conferidos localmente.
- Inspeção visual confirmou quantidade de poltronas, tela vazia e ausência de pessoas/texto/logos.
- Nenhum componente, CSS, dependência, servidor, credencial ou arquivo de outro dono foi alterado.

## Direção vigente e próximo passo

- Não gerar outra sala inteira nem arte quente de ambiente por iniciativa própria.
- A SALA foi avisada diretamente para solicitar somente assets raster pontuais que destravem a implementação, como texturas, materiais, props isolados ou cutouts.
- Não competir com a modelagem, não editar arquivos da SALA e não bloquear a entrega por geração de imagem.
- Nenhum asset adicional está em produção enquanto não houver pedido concreto da SALA.
