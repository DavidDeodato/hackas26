# Reteste focal da biblioteca

Data: 2026-09-12. URL: http://localhost:4173/materiais. Estado: P1 de diorama invisivel resolvido no runtime local.

As capturas `page-polish-materiais-desktop.png` e `page-polish-materiais-mobile.png` foram geradas pelo mesmo navegador headless isolado que reproduziu a falha anterior. Inspecao visual direta confirmou estante, planta e banco nas duas larguras. O arquivo `page-polish-materiais-report.json` registra HTTP200, canvas=1, sem overflow horizontal e sem erros no passe visual.

A origem unica do defeito anterior nao foi demonstrada. O codigo de renderizacao e a pagina mudaram antes deste reteste; nao atribuir a resolucao a uma causa exclusiva sem lastro.

O icone de livro do card da fonte aparece encostado ao canto superior esquerdo, destoando do padding do restante do card (P2). Esta rodada fecha apenas o defeito visual conhecido. Nao constitui teste novo de salvar/versionar nem comparacao completa com referencia da pagina.

Nenhuma chamada de IA, fonte adicional ou cookie privado foi usado. O deploy publico consolidado permanece pendente.
