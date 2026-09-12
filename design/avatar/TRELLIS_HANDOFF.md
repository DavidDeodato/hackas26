# Avatar TRELLIS — handoff

Estado: PARTIAL_SUCCESS. GLB entregue em 12/09/2026 às 17:40:09 UTC; documentação consolidada às 17:42:21 UTC. Gerações encerradas, sem retry da cota.
Dono: IMAGENS. Escopo: arquivos gerados e documentação; nenhum App, renderer, login ou cena modificado.

## Entregas reais

- [GLB feminino](../../public/avatar/generated/trellis-feminine-v1.glb): 1.309.452 bytes, GLB 2 íntegro, 4.592 triângulos, 3.479 vértices, uma malha, dois nós, um material, UV e textura PNG 1024 × 1024 embutida. Sem dependências externas, skeleton, skins ou animações.
- [Input feminino](avatar-feminine-input-v1.png): 1024 × 1536, 1.242.643 bytes.
- [Input masculino](avatar-masculine-input-v1.png): 1024 × 1536, 1.224.602 bytes.
- [Prévia original do Space](trellis-feminine-space-preview.mp4) e [frames conferidos](trellis-feminine-space-preview-frames.png).
- [Validação estrutural do GLB](trellis-feminine-validation.json).
- [Tentativa feminina](trellis-feminine-attempt.json), [tentativa masculina](trellis-masculine-attempt.json) e [script reproduzível](try_trellis_free.py).
- [Prompts de referência](PROMPTS.md) e [proveniência](../../public/avatar/generated/trellis-feminine-v1.provenance.json).

O masculino não tem GLB. Não substituir sua referência PNG por alegação de modelo gerado.

## Disponibilidade e execução

1. `https://huggingface.co/spaces/microsoft/TRELLIS` é a URL sem a pontuação final. A API oficial retornou `CONFIG_ERROR`: versão do torch incompatível com ZeroGPU. SHA observado: `e9f217fddcd570861645dcc67214d165dc73dd2c`.
2. A página pública redireciona para [trellis-community/TRELLIS](https://huggingface.co/spaces/trellis-community/TRELLIS), que estava `RUNNING` em ZeroGPU. SHA observado: `91c1b5afbf24094b3ec7d8a27ae2e49608bd668f`.
3. O Space comunitário expõe Gradio 5.34.2, upload, preprocess e `generate_and_extract_glb`. A primeira tentativa `/call` falhou com sessão não encontrada antes de geração. O transporte normal `/queue/join` + `/queue/data` funcionou.
4. Upload e preprocess dos dois PNGs concluíram. Feminino: geração solicitada às 17:39:46 UTC, GLB baixado às 17:40:09 UTC. Masculino: recusado às 17:39:46 UTC por `ZeroGPU quota exceeded`, 120 s solicitados e 0 s restantes, com reset indicado em cerca de 24 horas.
5. Sem token local disponível, chamadas foram anônimas dentro da cota gratuita. Não houve retry da cota, tentativa de contorno, novo job pago, endpoint contratado, instalação de dependências ou gasto autorizado adicional.
6. Parâmetros: seed 42; sparse guidance 7,5; 12 passos; latent guidance 3,0; 12 passos; simplificação 0,95; textura 1024; single image. O Space removeu o fundo no preprocess.

## Leitura visual e limites

A prévia do Space mostra figura feminina inteira, roupa marfim/carvão, tênis claros e cabelo curto, com continuidade observável entre frente, lado e costas. O estilo deriva das referências adultas low-poly originais, em pose neutra com braços afastados do corpo. A superfície final suaviza parte das facetas da imagem de entrada.

**A prévia não é um teste no renderer do Rebobina.** O código do Space renderiza Gaussian em cores e a malha intermediária em normais, lado a lado, antes da exportação GLB simplificada/texturizada. A estrutura do GLB final foi lida diretamente; aparência final com as luzes do app, pés no piso, escala e recorte ainda exigem integração/QA pelo dono.

AABB do GLB: aproximadamente x [-0,200; 0,200], y [-0,500; 0,500], z [-0,121; 0,120]. Altura próxima de uma unidade, origem próxima do centro; posicionamento no piso requer ajuste pelo integrador.

## Personalização e decisão

- Usar o GLB como prova de image-to-3D ou avatar estático experimental. Não bloqueia o avatar procedural.
- Cabelo, corpo e roupas estão na mesma malha/material. Não há grupos semânticos para trocar cabelo ou cor da camisa isoladamente.
- Mudar `baseColorFactor` do material tinge toda a textura, inclusive pele e cabelo. Personalização por peça exige segmentação, materiais separados, máscaras de textura ou retopologia.
- Não há rig: caminhar, gesticular ou falar por blendshapes exigiria trabalho adicional. Transformar o objeto inteiro não equivale a animação corporal.
- Uma nova geração pode mudar topologia, UV, proporção e pivô. Não usar regeneração como garantia de compatibilidade de peças.
- O avatar procedural modular continua sendo a rota apropriada para cabelo/roupas intercambiáveis no prazo. O GLB pode orientar sua linguagem visual sem substituir as peças.
- Masculino: TRIED_BLOCKED_BY_FREE_QUOTA. Próxima tentativa só após reset ou com acesso gratuito já disponível e autorizado; não escalar para hardware pago.

## Licenças e origem

- Código TRELLIS original: [repositório Microsoft](https://github.com/microsoft/TRELLIS), [MIT License](https://github.com/microsoft/TRELLIS/blob/main/LICENSE).
- Card do Space comunitário declara MIT; não havia arquivo LICENSE no caminho consultado (HTTP 404). O código do Space foi inspecionado como fonte de API, não instalado nem redistribuído.
- Modelo carregado pelo Space: `JeffreyXiang/TRELLIS-image-large`, cuja API resolve para [microsoft/TRELLIS-image-large](https://huggingface.co/microsoft/TRELLIS-image-large), card MIT, SHA `25e0d31ffbebe4b5a97464dd851910efc3002d96`.
- Inputs masculino/feminino: criados nesta tarefa com `image_gen` nativo, sem foto de pessoa real nem asset de terceiro fornecido. Guardar prompts e proveniência.
- MIT acima identifica software/modelo; não atribuí automaticamente uma licença MIT separada aos PNGs/GLB. Os outputs são gerados, não downloads de uma biblioteca de personagens licenciados. Aplicam-se os termos dos provedores usados; não foi verificada exclusividade jurídica dos outputs.
- Não há licença de rig, animação ou cabelo modular porque esses artefatos não foram gerados.

## Critério de encerramento desta tarefa

Cumprido: dois inputs reais, tentativa gratuita documentada, um GLB baixado e estruturalmente validado, prévia do Space inspecionada, limite da cota masculina e limites de modularidade registrados, arquivos enviados ao ROOT8.

Pendente fora deste escopo: aprovação visual do GLB no app e uso como personagem integrado. Não declarar login/avatar modular concluído a partir deste handoff.
