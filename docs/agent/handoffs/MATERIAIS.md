# Materiais — READY / freeze local

## Resultado

Página alinhada à referência `design/references/page-materiais-v1.png`, inspecionada visualmente: inventário compacto à esquerda e biblioteca WebGL à direita (~63/37), carvão/marfim/pêssego, sem a herança verde da Mesa. Em celular, inventário e ações aparecem antes do cenário. Primeiro botão Abrir fonte visível na primeira tela de 390×844.

Busca por título/conteúdo e filtros Todos/Fontes/Pitches são locais. Fontes e artefatos preservam separação, versão, trecho, data e navegação. Versão com sucessora recebe rótulo histórico. Estado vazio de pitches aponta à Mesa; fonte vazia aponta ao formulário. Não há miniaturas fictícias, imagens raster fingindo 3D ou chamadas novas de IA.

Formulário: upload .txt acessível por botão, limite de 48 KB/12.000 caracteres, rejeição explícita sem truncar texto ou substituir rascunho, erro inline, bloqueio de salvar vazio e fechamento durante save, Radix com teclado/Escape. `/api/materials`, `parentId` e navegação de artefato para `/mesa` com `artifactId` preservados.

## Arquivos próprios

- `src/pages/MaterialsPage.tsx`
- `src/components/materials/materials.css`
- Este handoff.

Nenhuma alteração em MiniWorld, renderer, mesa.css, estilos globais, backend ou rotas.

## Evidência

- `npm run build`: PASS (TypeScript + Vite), aviso conhecido do chunk Three >500 KB.
- `npx tsc --noEmit`: PASS após a composição final TSX.
- `artifacts/qa/3d-final-local-materiais-report.json`: desktop 1440×1000 e mobile 390×844, HTTP200, canvas único, renderer ready, dimensões positivas, zero overflow, zero console/page errors; 3D confirmado nos PNGs.
- `artifacts/qa/3d-final-local-materiais-desktop.png`
- `artifacts/qa/3d-final-local-materiais-mobile.png`
- `artifacts/qa/materials-form-mobile.png`: diálogo cabe em 390px.
- `artifacts/qa/materials-functional.json`: 12 verificações passaram, zero chamadas IA, zero erros de página. Formulário vazio; importação .txt; rejeição >12.000 sem perder texto; falha HTTP503 controlada com preservação do rascunho; save real; nova versão; v1+v2 após reload; busca sem resultado; filtro artefatos; foco/Escape; CTA Mesa; diálogo mobile. O único console error foi o HTTP503 intencional do teste.

As duas gravações de QA são versões de uma fonte fictícia identificada, em sessão isolada. Não são conteúdo do usuário nem prova de ganho de aprendizagem.

## P1 renderer

Diagnóstico compartilhado com `/root/mini_world_fix`: canvas ready/visível/geometria positiva mas pixels vazios na captura inicial, sem causa CSS. Correção pertence àquele worker. Capturas finais desta página mostram a estante 3D real em desktop e celular.

## Limites e próximo passo

### Correção final de acessibilidade — retorno de foco

O modal agora registra `document.activeElement` ao abrir e restaura esse launcher em `onCloseAutoFocus`. A edição retorna à própria linha; inclusão retorna ao botão de inclusão que a iniciou. `npx tsc --noEmit` passou. `artifacts/qa/materials-focus-return.json` registra oito checks desktop/mobile: Adicionar fonte, Adicionar uma fonte e Abrir fonte com Escape; Abrir fonte com botão Fechar. Todos restauraram exatamente o elemento original, zero page errors, zero gravações e zero chamadas IA. CSS e composição permanecem congelados.

READY para integração e deploy do ROOT/coordenador. QA cobre localhost:4173; publicação desta revisão ainda depende do coordenador. Aceite estético humano separado dos checks. Navegação de artefato mantém o contrato existente; teste funcional desta rodada evitou gerar artefato via IA e verificou o CTA vazio de acesso à Mesa.
