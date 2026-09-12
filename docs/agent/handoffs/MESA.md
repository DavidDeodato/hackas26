# MESA

STATUS: ready
FREEZE: WorkPage e work-polish.css congelados para integracao em 2026-09-12, 14:36 SP.
RESSALVA: resize falhou no IAB, mas nao no teste headless independente; caracterizacao dessa divergencia permanece com o dono compartilhado. Nao ha evidencia de falha universal do renderer.

## Arquivos sob ownership atual

- `src/pages/WorkPage.tsx`
- `src/components/work/work-polish.css`
- `docs/agent/handoffs/MESA.md`

MaterialsPage foi liberada para outro dono. Nenhuma alteracao nova em App, router, API, MiniWorld, CSS global, dependencias ou Git nesta rodada.

## Entrega e contrato preservado

- Layout de preparacao/material com paleta carvao, marfim e pessego; cena 3D real compacta, tres atalhos, fontes e acoes secundarias recolhidas.
- Compositor com acao escrita Preparar/Enviar e alvo minimo de 44 px. Sem sticky mobile.
- Titulo e texto longo compartilham a rolagem do documento; CTA Ensaiar permanece separado no desktop.
- Abaixo de 950 px, pagina flui em uma coluna sem altura fixa cortando o compositor.
- Conversar nao cria material; Preparar envia `/work` com fontes e parentId quando revisa.
- Ate nove fontes mais o artefato, respeitando o limite de dez IDs.
- Mudancas de modo, fontes e material ficam bloqueadas durante a requisicao.
- Artefato anterior preservado pela API; selecao de versao, download e CTA de ensaio mantidos.
- CTA envia `{pitch:artifact.content,artifactId:artifact.id}` para `/ensaio`.
- Retorno `{artifactId?,reflection?}` preenche pedido de revisao. ID explicito ausente nao seleciona silenciosamente outro artefato.
- P0 corrigido: o shim `src/lib/router.tsx` possui somente pathname/state. Removido `location.key`; WorkStudio usa pathname + JSON.stringify(incoming), sem alterar o router compartilhado.

## Evidencia verificada nesta rodada

- `npx tsc --noEmit --pretty false`: PASS, exit 0.
- `npm run build`: PASS, exit 0, 1.881 modulos. Aviso nao bloqueante: Three lazy 693,13 kB / 175,74 kB gzip.
- Testes integrados desta rodada pertencem ao ROOT; nao repetidos por MESA. O resultado historico 16/16 nao e apresentado como nova execucao.
- URL local: http://localhost:4173/mesa.
- Desktop 1280x720: compositor y453–671; Preparar y602–646; painel e CTA Ensaiar visiveis. Documento longo com clientHeight241 e scrollHeight1367.
- Mobile390x844: largura sem overflow; Preparar y595–639, navegacao inicia y777.
- Mobile390x720: Preparar y595–639, navegacao inicia y653, folga14 px.
- Estado populated, selecao Novo material, acao primaria desabilitada sem pedido e atalho preenchendo pedido/habilitando Preparar conferidos no navegador.
- CTA Mesa → ensaio exercitado: texto completo de 1.730 caracteres e indicacao Material conectado na sala, sem iniciar uma nova chamada de IA.
- Console da Mesa: zero erros/warnings no trecho verificado.
- Incoming/reflection conferido no contrato e na inicializacao. Nao houve novo ensaio nem nova resposta IA para repetir a volta completa nesta rodada.
- Resposta longa do orientador: CSS permite rolagem desktop e fluxo mobile; nao gerar nova resposta apenas para QA. A leitura longa comprovada nesta rodada foi a previa de um artefato persistido.

## Capturas e relatorio canonicos do QA

Capturados apos o patch do router; inspecionados por MESA:

- `artifacts/qa/page-polish-mesa-desktop.png`: estado sem artefato, 3D visivel.
- `artifacts/qa/page-polish-mesa-mobile.png`: mobile vazio, 3D visivel.
- `artifacts/qa/page-polish-mesa-filled-desktop.png`: artefato aberto.
- `artifacts/qa/page-polish-mesa-new-desktop.png`: novo material.
- `artifacts/qa/page-polish-mesa-filled-composer-mobile.png`: compositor populated mobile; nesta captura o 3D esta vazio.
- `artifacts/qa/page-polish-mesa-report.json`: HTTP200, zero erros, sem overflow desktop/mobile, contexto isolado, zero chamadas IA.
- `artifacts/qa/page-polish-mesa-review.md`: QA adicional de versoes existentes, Novo material e divergencia entre navegadores.
- `artifacts/qa/mesa-resize-mobile.png` e `mesa-resize-mobile-reload.png`: teste headless independente com cena visivel apos resize e apos reload; ambas as imagens inspecionadas por MESA.
- `artifacts/qa/mesa-resize-report.json`: zero erros, viewport390x844, zero chamadas IA.

## Pendencia de renderer compartilhado

CONFIRMADO: resize CUA 1280x720 → 390x844 deixou MiniWorld vazio apesar de data-renderer=ready, host167x126/canvas217x164 e console limpo. Reload direto no mobile restaurou a cena. O screenshot populated mobile do QA tambem mostra ausencia visual, enquanto vazio mobile mostra a cena.

CONTRAPROVA 17:36:36Z: contexto headless novo nao reproduziu o sintoma; mesa visivel apos resize e apos reload, confirmado pelas imagens e relatorio acima. O sintoma permanece confirmado no IAB, nao como defeito geral em todos os navegadores.

Causa ainda nao comprovada. ROOT, gestor e QA receberam os dois resultados. MESA nao alterou MiniWorld. Canvas existente nao substitui verificacao da imagem.

## Proximo passo

ROOT integra este snapshot congelado; dono de MiniWorld decide ajuste ou caracterizacao especifica do IAB usando as duas evidencias. Nao alterar Mesa nem promover causa unica sem reproducao. Deploy, novo ensaio IA e publicacao nao foram executados por MESA.
