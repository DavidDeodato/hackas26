# Deploy público - autenticação e quatro rotas

Status: READY_SNAPSHOT. URL: https://rebobina-h4h.vercel.app

Fonte: `artifacts/qa/auth-public-report.json`, 2026-09-12T17:45:32Z. Dez capturas de login, Sala, Audiência, Mesa e Materiais em desktop 1280x720 e mobile 390x844. Bundle confirmado em todas: `/assets/index-DILHOC9X.js`.

## Confirmado

- Dez respostas HTTP 200; um canvas e renderer ready em cada captura; zero overflow horizontal.
- Zero erros de console, page errors ou respostas HTTP de erro. Sem chamadas de IA e sem cadastro de conta neste passe.
- Login novo com diorama real. Sala, roda de Audiência, escrivaninha da Mesa e estante de Materiais renderizadas visualmente nas duas larguras, não apenas canvas existente.
- CTAs legíveis; Mesa e Materiais preservam ações e conteúdo. Sala vazia mantém Entrar na sala desabilitado enquanto não atende os requisitos.
- `artifacts/qa/root-auth-public.json`, lido diretamente pelo QA: PASS_AUTH_ACCOUNT_ISOLATION com 12 checks em 17:43:10Z, incluindo isolamento, persistência de avatar, revogação, relogin, senha curta e cross-origin. Suíte executada por ROOT, não duplicada por QA.

## Limites

- QA fez interação de demonstração e leitura das quatro rotas, não cadastro ou edição de avatar no público. A UI autenticada foi exercitada localmente; o backend autenticado público tem evidência independente de ROOT.
- Logout entre abas permanece não exercitado neste passe. O código contém listener storage/focus, mas inspeção estática não comprova sincronização runtime.
- P2: no login mobile falta espaço em “respostas.Chegue”; parte da cena decorativa é recortada à direita.
- Capturas full-page preservam a barra fixa na posição do viewport inicial. Em Audiência mobile ela sobrepõe o CTA na imagem; isso isoladamente não comprova obstrução após scroll. Não confundir captura longa com viewport único.
- O primeiro ensaio de captura pegou a transição de abertura da demo e encerrou ao tentar um controle desktop oculto em mobile. O script passou a usar contextos separados por largura e espera por shell pronto; as dez imagens e o JSON atuais são do reteste concluído.

## Evidências

`auth-public-{login,sala,audiencia,mesa,materiais}-{desktop,mobile}.png`, junto do JSON canônico acima. Não houve implementação, deploy ou alteração de conta neste passe QA.
