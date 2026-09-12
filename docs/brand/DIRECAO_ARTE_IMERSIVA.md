# Rebobina — direcao de arte imersiva

STATUS: direcao congelada — 3D pre-modelado principal; revisao por pagina em andamento

> **Atualizacao vinculante:** a primeira implementacao escura foi rejeitada pelo usuario por lembrar estetica hacker de 2010. A referencia canônica agora e `design/references/rebobina-cinematic-studio-v1.png`. Grid luminoso, mint, HUD, terminal, glow generalizado e microtexto tecnico estao proibidos.

Contrato vigente: preservar o 3D low-poly quente aprovado como linguagem principal. `SpatialStage` inicia no modo interativo; `MiniWorld` leva a mesma linguagem a Audiencia, Mesa e Materiais. PNGs sao referencias de composicao, nao substitutos do canvas. Na sala, a imagem existente pode aparecer como alternativa explicitamente chamada `Ver ilustração` ou fallback identificado. Referencias novas por pagina refinam layout e hierarquia sem reabrir paleta ou trocar 3D real por fotografia.

## Norte

**Palco de ensaio no intervalo entre bastidor e apresentacao.** O produto deve parecer um ambiente preparado para uma conversa importante: escuro, preciso, silencioso e humano. A interface fica na periferia; a pergunta e as pessoas ocupam o centro.

Nao e uma versao escura do dashboard atual. Tambem nao e fantasia medieval, fazenda, metaverso ou sala gerada ao vivo.

## Lastro visual consultado

- CampoBounty `design/concepts/campobounty-spatial-experience-v3.png`: objeto/territorio dominante, painel curvo secundario, fundo quase preto e uma unica cor focal.
- CampoBounty `design/concepts/campobounty-territory-experience-v3.png`: paisagem continua, selecao espacial ligada a informacao e hierarquia 70/30.
- CampoBounty `app/components/campobounty/atlas.tsx`: camera limitada, nevoa/depth cue, luz hemisferica + key quente + rim frio, foco com transicao de camera, labels HTML projetados e `prefers-reduced-motion`.
- Vesper `References/rural-chapel-gameplay-target-v1.png`: atmosfera por contraste de temperatura, silhuetas, profundidade em camadas e reflexo localizado.
- Vesper `QA/assets/VISUAL_REVIEW.md`: escala material consistente, reflexo guiado por relevo, geometria de silhueta e combate a repeticao visivel.

Adaptar os principios, nao copiar ruralidade, capela, terreno, personagens, marca ou composicao literal.

## Tokens inequívocos

```css
--rb-void: #0b0d0f;
--rb-depth: #111416;
--rb-surface: #171a1c;
--rb-surface-raised: #202326;
--rb-text: #f2ede4;
--rb-text-muted: #aaa39a;
--rb-line: rgba(242, 237, 228, .14);
--rb-focus: #f1ad7a;
--rb-focus-soft: rgba(241, 173, 122, .16);
--rb-human-warmth: #c9875b;
--rb-danger: #d77a6c;
--rb-shadow: 0 28px 80px rgba(0, 0, 0, .42);
--rb-radius-panel: 24px;
--rb-radius-control: 12px;
```

Regras:

- `--rb-focus` aparece apenas em foco, pergunta ativa, progresso e CTA principal. Nunca contornar todos os cards.
- `--rb-human-warmth` aparece em madeira, tecido, pele e luz de recorte; `--rb-focus` e o pêssego do CTA.
- Texto principal sobre `--rb-void` ou `--rb-surface`: branco quebrado. Texto secundario nunca abaixo de `--rb-text-muted`.
- Linhas sao estrutura sutil; profundidade vem de luz, sobreposicao e escala, nao de borda brilhante.
- Nada de mint, verde neon, roxo generico, arco-iris, bloom forte ou texto neon.

## Tipografia

- Display: **Manrope**, pesos 650–750, tracking `-.025em`; pergunta no rail entre 44 e 58 px desktop.
- Interface e leitura: **DM Sans**, pesos 400–600.
- Fallback local: Segoe UI Variable, confirmada instalada.

Manrope e DM Sans ja sao carregadas pelo projeto. Bahnschrift deixa a composicao tecnica demais e sai desta direcao. Evitar qualquer fonte sci-fi decorativa.

## Composicao da sala

- Desktop: palco ocupa 68–74% da largura; rail contextual ocupa 26–32%. Uma linha curva ou corte diagonal pode separar ambos.
- Mobile: palco primeiro em 62–68vh; pergunta e resposta sobem em sheet solida, sem miniaturizar o palco em um card.
- Camera obliqua cinematografica, com tres planos claros: plateia em sombra quente, apresentador no foco, arquitetura curva ao fundo.
- Maximo de tres pessoas na plateia. Silhuetas diferentes por papel profissional, sem pretender reproduzir aparencia real.
- A pergunta ativa nasce espacialmente acima/ao lado da pessoa e reaparece em HTML legivel no rail. O balao no palco e orientacao, nao recipiente de paragrafo.
- O feedback substitui o rail; nao empilhar pergunta, formulario, feedback e historico ao mesmo tempo.

## Palco 3D pre-modelado

Usar o palco autoral deterministico em codigo 3D, com geometria, materiais e variantes pre-modelados. Renderizacao WebGL em runtime esta autorizada; nao e geracao de ambiente por IA. Preservar estes planos:

1. fundo arquitetonico escuro;
2. plano de plateia;
3. mesa/cadeiras em midground;
4. apresentador em foreground;
5. luz e particulas discretas em overlay;
6. labels e controles HTML acessiveis.

Personalizacao semantica permitida:

- numero de assentos ocupados;
- papel/nome abreviado de cada lente;
- temperatura da key light conforme etapa (`preparar`, `responder`, `revisar`);
- posicao do foco e da pergunta ativa;
- pequenos props por categoria profissional, vindos de conjunto fechado.

Proibido gerar por IA sala, rosto ou ambiente em runtime. O conteudo dinamico seleciona variantes preexistentes e atualiza elenco, labels e foco. A antiga restricao a pipeline 3D foi substituida pela autorizacao do 3D pre-modelado em codigo.

## Luz e materiais

- Ambiente: carvao neutro e grafite quente, nunca verde/azul dominante.
- Key do apresentador: pêssego quente, suave e lateral; forma elipse no piso.
- Rim da audiencia: marfim quente em intensidade baixa.
- Materiais: pedra grafite fosca, metal bronze acetinado, tecido taupe/terracota, madeira escura e vegetacao pontual.
- Reflexo somente em piso/mesa perto do foco, com opacidade baixa; nenhuma superficie inteira espelhada.
- Adicionar grao muito fino ou vinheta leve apenas no palco, nunca sobre texto.

## Movimento

- Entrada de cena: `600ms`, opacidade + deslocamento maximo de 12px.
- Troca de pergunta: camera/spot faz `450–650ms` com easing `cubic-bezier(.22,1,.36,1)`.
- Estado de espera: respiracao de luz em `5–7s`, variacao maxima de opacidade 6%; sem flutuar cards.
- Rebobinar: trilha focal retorna por `700ms`; preservar a resposta original visivel na timeline.
- Hover: deslocamento maximo de 2px, sem escala maior que `1.015`.
- Em `prefers-reduced-motion`, remover dolly/parallax/pulso e usar crossfade de `120ms`.

## Logo no escuro

Usar `public/brand/rebobina-logo-horizontal-dark.svg`. Minimo 132 px de largura para wordmark; simbolo isolado minimo 24 px. Nao aplicar glow. A marca precisa conservar contraste mesmo com animacao e imagem atras; usar faixa/area `--rb-void` quando necessario.

## Gates visuais

- Em captura desfocada, ainda se identifica palco, apresentador, audiencia e pergunta ativa.
- Em escala de cinza, foco e hierarquia continuam claros.
- Nenhum texto importante fica dentro da arte raster.
- O CTA principal e a pergunta ativa concentram o pêssego focal; estados de foco e progresso usam acentos discretos da mesma paleta, nunca verde.
- A sala continua utilizavel por teclado e por lista alternativa.
- Contraste minimo: 4.5:1 para texto comum; 3:1 para texto grande e controles.
- O palco sem animacao continua completo e compreensivel.
- Na sala, validar 3D como modo inicial e alternancia explicita para ilustracao; ausencia de canvas so e esperada no modo ilustrativo ou fallback, nao como criterio do modo principal.
- Em Audiencia, Mesa e Materiais, o 3D apoia a tarefa e nao empurra a acao primaria para fora do primeiro viewport. O formulario/lista HTML permanece a interface acessivel e verificavel.
