# QA da audiencia — polimento local

Estado: aprovado no escopo focal final; P2 de escala mitigado pelo fit da camera. Data: 2026-09-12. URLs: http://localhost:4173/audiencia (vazio) e http://127.0.0.1:4173/audiencia (perfil persistido).

## Passe final preenchido e enquadramento

O ultimo passe substitui a limitacao anterior de nao inspecionar o perfil preenchido. A sessao IAB de `http://127.0.0.1:4173/audiencia` continha `Profissional de demonstracao`, reutilizado sem nova geracao. Três lentes, trechos e fontes foram inspecionados no runtime; todas as citacoes possuem 14px. `Ver lentes` transferiu o foco para `audience-profile-result`. Reload preservou o perfil. Desktop1280x720: CTA y605.75–651.75, canvas1, documento1265px, sem corte de objetos no diorama. Mobile390x844: documento375px, canvas1 e diorama completo depois do novo fit de camera. Console IAB sem warning/error; apenas mensagens dev/HMR.

Capturas preenchidas: `page-polish-audiencia-filled-desktop.png` (pagina inteira), `page-polish-audiencia-filled-citations-desktop.png`, `page-polish-audiencia-filled-mobile.png` (detalhe da primeira lente), `page-polish-audiencia-filled-citations-mobile.png` e `page-polish-audiencia-filled-stage-mobile.png`. Os recortes mobile medem390x720 dentro do viewport390x844; a captura longa IAB sofreu limitacao de compositor WebGL e foi substituida pelos recortes nativos inspecionados. Nao houve composicao ou alteracao de conteudo de imagem. As capturas vazias `page-polish-audiencia-{desktop,mobile}.png` foram atualizadas no pipeline headless isolado em1280x720/390x844.

O antigo P2 de diorama excessivamente pequeno foi mitigado pelo novo enquadramento: cadeiras, plataforma e planta ficaram mais presentes e sem clipping nas duas larguras. A composicao permanece mais compacta que o mockup, para manter o CTA dentro de720px. Nao e paridade pixel a pixel com a referencia.

## Evidencia persistida

- `page-polish-audiencia-desktop.png`: captura real com viewport1280x720, pagina inteira; substituiu a captura inicial1440x1000.
- `page-polish-audiencia-mobile.png`: captura real 390x844, pagina inteira.
- `page-polish-audiencia-report.json`: HTTP, canvas, dimensoes e erros do passe visual.
- `page-polish-audiencia-form.json`: estados do CTA, disclosure por teclado, limites e rede.

As capturas foram inspecionadas diretamente e comparadas com `design/references/page-audiencia-v1.png`. A referencia e uma intencao visual, nao screenshot do produto.

## Resultado

O header unico, formulario esquerdo, fonte recolhivel, CTA agrupado e contexto direito seguem a organizacao da referencia. O formulario aparece perto de y175 no desktop. Nome e papel ficam lado a lado; no mobile empilham. A fonte de exemplo quebra linha sem ocultar o titulo. O diorama real esta visivel nas duas larguras, com um canvas e sem overflow horizontal.

O CTA inicia desabilitado e informa nome, papel e fonte ausentes. Cada campo preenchido reduz corretamente a lista; selecionar a fonte habilita o CTA. Disclosure abre e fecha com Enter. Inputs confirmam maxLength 80 e 150. Reduced-motion emulado permanece ativo com canvas presente. Nenhum POST ou chamada de modelo foi feito.

No passe visual final: zero erros de console ou pagina, HTTP 200. No passe separado de interacao: nenhuma falha HTTP nem erro de aplicativo; Chromium headless emitiu quatro avisos de driver GPU `ReadPixels`. Nao apresentar esta rodada como console absolutamente vazio em todas as observacoes.

## Limites vigentes e historico superado

- HISTORICO SUPERADO: o passe inicial mediu canvas538x195desktop/354x210mobile e diorama pequeno. O fit de camera posterior ampliou os objetos; os PNGs atuais e a secao de passe final acima sao a evidencia vigente. Nao reutilizar as medidas antigas como tamanho atual do objeto renderizado.
- Mobile prioriza o formulario; o mundo aparece apos scroll. O CTA exige scroll para ficar inteiramente acima da navegacao fixa.
- Citacoes14px foram confirmadas no runtime preenchido no passe final. A limitacao inicial de ausencia de perfil foi superada pela recuperacao da sessao IAB persistida. Continua vigente somente a limitacao da fronteira de nove fontes, inspecionada em codigo sem criar materiais adicionais.
- O P0 temporario de importacao `materials.css` ausente ocorreu durante integracao. As capturas invalidas foram substituidas apos o arquivo existir e o runtime estabilizar.

Proximo passo: usar estes PNGs no handoff; repetir somente apos alteracao material de layout ou no deploy consolidado.
