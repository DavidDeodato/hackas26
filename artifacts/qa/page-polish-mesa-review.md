# QA focal da Mesa — 2026-09-12

URL: http://localhost:4173/mesa. Nenhuma chamada de modelo. Estado funcional: preenchido e Novo material verificados com versoes existentes; observacao de renderer em resize IAB permanece encaminhada ao dono.

## Evidencias

- Vazio: `page-polish-mesa-desktop.png`, `page-polish-mesa-mobile.png` e `page-polish-mesa-report.json`, contexto headless isolado.
- Preenchido: `page-polish-mesa-filled-desktop.png`, `page-polish-mesa-filled-mobile.png` (detalhe do material), `page-polish-mesa-filled-composer-mobile.png` (sintoma resize IAB) e `page-polish-mesa-filled-composer-mobile-reload.png` (recuperacao).
- Novo material: `page-polish-mesa-new-desktop.png`, `page-polish-mesa-new-mobile.png`.
- Resize independente: `mesa-resize-desktop.png`, `mesa-resize-mobile.png`, `mesa-resize-mobile-reload.png` e `mesa-resize-report.json`.

## Comportamento confirmado

A sessao IAB existente tinha tres versoes e abriu a v2 mais recente. Novo material foi selecionado pelo teclado no desktop e mobile: removeu o documento aberto do painel, mostrou o estado vazio e conservou as quatro opcoes (novo + tres versoes). Reabrir a v2 restaurou seu conteudo. Nenhuma versao foi criada ou removida.

Desktop1280x720: compositor termina em y671.39, botao Preparar em y646.39 e Ensaiar em y619.39. Texto de documento longo tem area de241px, conteudo1416px e overflow-y:auto. Mobile390x844: documento375px, compositor termina em y664.56 e envio em y639.56; material segue abaixo no fluxo. Capturas preenchidas mobile usam recortes390x720 do viewport390x844. Console IAB nao apresentou warning/error durante este fluxo.

## Divergencia de renderer

O IAB mostrou cena vazia depois de desktop->mobile, apesar de canvas1/ready; o PNG do compositor registra esse sintoma. Reload no mesmo viewport restaurou a mesa. `document.hidden=false` e visibilityState=visible apos reload. Nao se concluiu causa unica.

O teste independente headless em contexto novo NAO reproduziu a falha: mesa visivel tanto apos resize como apos reload, canvas1/ready e sem erros. As imagens foram inspecionadas. Por isso a observacao nao comprova uma falha universal do renderer e nao pode ser encerrada apenas por contagem de canvas. Donos receberam os dois resultados.

Proximo passo: dono compartilhado decidir ajuste ou caracterizacao IAB; QA de autenticacao so inicia POST apos AUTHREADY. Fluxos generativos previamente aprovados nao foram repetidos.
