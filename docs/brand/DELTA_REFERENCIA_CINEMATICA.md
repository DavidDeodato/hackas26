# Delta implementavel — referencia cinematografica v1

Referencia canônica: `design/references/rebobina-cinematic-studio-v1.png`.

Estado: alvo conceitual. Nao comprova funcionalidade, asset final ou implementacao.

Contrato vigente: 3D low-poly pre-modelado e o modo principal aprovado. Esta imagem orienta luz, materiais e hierarquia; nao exige substituir o canvas por PNG nem perseguir fotorealismo. A ilustracao da sala permanece alternativa explicitamente nomeada ou fallback. Referencias de Audiencia, Mesa e Materiais devem partir dessa mesma linguagem 3D e paleta quente.

## O que deve sobreviver da imagem

- Proporcao: palco aproximadamente 70%, rail de pergunta aproximadamente 30%, fora a navegacao estreita.
- Arquitetura: curvas concavas, palco circular baixo e plateia em arco; nada de caixa/wireframe.
- Profundidade: foreground escuro, midground com pessoas, fundo iluminado. O olho chega ao apresentador antes da UI.
- Materiais: pedra/carvao fosco, tecido taupe e terracota, bronze escovado, madeira escura, tela marfim.
- Luz: ambiente quente controlado; recortes verticais pêssego, tela marfim como bounce e sombras suaves.
- Tipografia: pergunta grande e limpa; labels discretos com tracking, sem tiny code.
- Interface: rail estreito e continuo, sem pilha de cards; CTA pêssego solido e uma acao primaria.
- Humanidade: audiencia sentada e apresentador em escala crivel; tecnologia nao vira personagem principal.

## O que nao copiar nem prometer

- rostos/fisionomias da imagem;
- cumprimento pessoal, avatar ou audio se nao existem no produto;
- seletor de tipo, contador 0/800 ou etapas ficticias;
- foto/paisagem projetada como se viesse do material do usuario;
- nomes, cargos, depoimentos ou quote decorativa sem lastro;
- realismo fotografico impossivel para o `SpatialStage` atual.

## Delta contra a implementacao hacker/grid

| Atual rejeitado | Substituir por |
|---|---|
| Wireframe verde e linhas convergentes | Arquitetura curva solida, palco circular e degraus baixos |
| Glow mint como foco | Recorte pêssego quente e bounce marfim |
| Tela central com moldura de terminal | Superficie marfim ampla, limpa, com copy curta |
| Microtexto em caixa alta por toda parte | Um eyebrow por zona; restante em escala editorial |
| Personagens pequenos no vazio | Apresentador e audiencia maiores, ancorados em assentos/podio |
| Rail-card separado | Rail continuo integrado ao shell, pergunta 44–58 px |
| Verde como cor de marca | Pêssego focal; carvão, marfim e taupe como base |

## Critérios para SALA

- `SpatialStage` continua pre-modelado em codigo 3D, interativo por padrao e sem geracao de ambiente por IA em runtime.
- Remover grid como elemento dominante; geometrias curvas precisam construir o ambiente mesmo sem bloom.
- No primeiro viewport, apresentador, pelo menos dois assentos e pergunta curta devem ser identificaveis.
- Perfis mudam label/foco/assento e pequenos props fechados; nao mudam fisionomia por inferencia.
- Em reduced motion, manter enquadramento e luz; apenas retirar dolly/pulso.

## Critérios para ROOT

- Aplicar exclusivamente a paleta canônica v2 do documento de direcao.
- Navegacao estreita e silenciosa; estado ativo usa barra/ponto pêssego, nao bloco verde.
- Rail e shell compartilham carvao; divisao por linha marfim 14%, nao contraste branco/preto abrupto.
- Logo dark atualizado em `public/brand/rebobina-logo-horizontal-dark.svg`.
- Foco visivel usa pêssego com outline de 3 px e offset; nunca glow difuso.

## Gate de comparacao

Nova captura so avanca quando, lado a lado com a referencia, cumprir pelo menos:

1. mesma ordem perceptiva: apresentador → pergunta → audiencia → controles;
2. proporcao visual proxima de 70/30;
3. carvao/marfim/pêssego domina sem mint ou grid;
4. materiais e luz criam profundidade sem depender de texto tecnico;
5. fluxo real continua funcional e acessivel.
