# Deploy mais recente — 12/09/2026 14:43 SP

## Atualização canônica — TRELLIS integrado, 14:59 SP

ROOT_READY_TRELLIS recebido; publicado `dpl_4EugVZDywe8DK1RV7V4ropVMMc7J`, READY, alias confirmado por inspect. URL imutável https://rebobina-h4h-hlmwwh1wd-potaozinho440-1103s-projects.vercel.app. Build remoto1892 PASS; público `/assets/index-BPk4bX_A.js`, GLTFLoader chunk `GLTFLoader-DhN4Iq1T.js`. HTML200, health ok/postgres, auth/me visitante null. Ambos GLBs públicos baixados e SHA256 comparados aos arquivos locais: iguais, cabeçalho glTF íntegro. Feminino1309452 bytes, masculino1283312 bytes. ROOT assume teste público de persistência do campo model; QA visual local de ambos foi condição da liberação. Sem novos cadastros/IA por este fork. Nenhum deploy concorrente iniciado nesta rodada.

## Atualização canônica — avatar V2, 14:53 SP

Após READY/FREEZE do dono SHELL, publicado `dpl_DKMy9Puw2MgU1NazMGQr5NX7oc6g`. Alias real confirmado por inspect: https://rebobina-h4h.vercel.app → https://rebobina-h4h-jjuxsbvvr-potaozinho440-1103s-projects.vercel.app, READY. Build local/remoto1889 módulos, testes locais22/22 exit0. Asset público `/assets/index-DmrjZ9ey.js` corresponde ao build; HTML/asset200, health ok/postgres e auth/me visitante null. Inclui avatar refinado, default visitante e preservação de câmera do palco conforme handoffs dos donos. Nenhuma alteração de implementação/configuração/segredos/Git por este fork. QA visual público do V2 é gate separado; não atribuir capturas do bundle antigo a este novo.

## Histórico anterior

ATUALIZAÇÃO CONFIRMADA 14:45 SP: outro fork publicou concorrentemente `dpl_Ho3yYN9KLLdXo6zs4SCbA9cB4C7T`, agora destino real do alias segundo `vercel inspect`. READY, URL imutável https://rebobina-h4h-d09esmy2t-potaozinho440-1103s-projects.vercel.app. Mesmo JS `/assets/index-DILHOC9X.js`; HTML200, health ok/postgres e auth/me visitante null conferidos novamente. Este fork não iniciou nova publicação. ROOT foi informado; resultado público de autenticação existe em `artifacts/qa/root-auth-public.json`, 17:43:10Z, separado do smoke atual.

CONFIRMADO: publicação solicitada diretamente pelo usuário concluída em produção.

- Alias: https://rebobina-h4h.vercel.app
- Deployment final do alias, confirmado por `vercel inspect`: `dpl_7UA74HgQKSbMXPvi6GFe6ERy8c4U`, READY.
- URL imutável: https://rebobina-h4h-9zr7lad26-potaozinho440-1103s-projects.vercel.app
- Build local e remoto passaram: 1889 módulos; JS `/assets/index-DILHOC9X.js`.
- GET público HTML200 e asset200; bundle contém login e perfil novos.
- GET `/api/health`: ok=true, storage=postgres.
- GET `/api/auth/me`: JSON com user=null para visitante.
- Nenhuma alteração de código, credenciais, configuração ou Git realizada por este fork de deploy.

Concorrência registrada: outro coordenador havia iniciado `dpl_BLMN4ppkWA8CQ8vyR6LvFw3X9H7c` antes da comunicação de exclusividade chegar. Ambos terminaram; alias final confirmado no deployment acima. Nenhuma terceira publicação iniciada. Coordenadores informados.

Gate separado: ROOT8 executa teste funcional público de contas; QA verifica visual. Este registro comprova publicação e smoke HTTP, não substitui esses testes nem aceite visual.
