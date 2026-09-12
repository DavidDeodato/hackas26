# MiniWorld — renderer e cenas auxiliares

STATUS: ready — patch e regressão CUA concluídos; reteste independente no headless original é responsabilidade do QA/ROOT.

## Escopo

`src/components/spatial/MiniWorld.tsx` e `src/components/spatial/mini-world.css`. Este ciclo alterou somente o TSX; CSS existente preservado. Cenas WebGL locais distintas: roda de audiência, mesa e biblioteca. Three vendorizado e importado sob demanda; até seis objetos representam a contagem real. Sem geração de imagem, IA ou chamadas de escrita/API neste ciclo.

## Correção de 12/09

- `data-renderer=ready` só é definido depois da primeira chamada de renderização bem-sucedida. Antes, a montagem do renderer era suficiente para marcar ready, ainda antes do primeiro requestAnimationFrame.
- Uma exceção durante a renderização libera os recursos e ativa o fallback disponível.
- O retorno à visibilidade agenda um novo desenho mesmo quando geometria e câmera não mudaram. A renderização continua sob demanda; não foi habilitado preserveDrawingBuffer nem criado loop contínuo.
- Singular corrigido: `1 perfil`, `1 versão`, `1 material`. Contagem zero mantém o texto vazio próprio; plural e limite de seis objetos preservados.
- Cleanup, ResizeObserver, IntersectionObserver, limite de DPR, contexto perdido, reduced motion e navegação SPA permanecem no contrato.

## Evidências confirmadas

- `npm run build` passou antes e depois da integração do CSS de materiais: TypeScript e Vite, respectivamente 1880 e 1881 módulos. Apenas aviso existente de chunk Three maior que 500 kB.
- CUA em aba própria do navegador do Codex: biblioteca visível antes do patch com cinco materiais em `http://localhost:4173/materiais` e um material em `http://127.0.0.1:4173/materiais`.
- Após patch/reload: biblioteca visível no desktop e em viewport 390 x 844; uma canvas, estado ready, texto `1 material no seu espaço`, sem overflow e sem console warn/error nos checks daquele momento. Capturas estão nos resultados CUA deste ciclo; o QA independente deve salvar as capturas canônicas em `artifacts/qa/`.
- Probe temporário via CDP na própria aba envolveu drawElements e disparou evento sintético de visibilidade: repouso=0, oculto=0, retorno=15 chamadas, novo repouso=15. Isso comprova um redesenho finito ao retornar, sem atividade quando oculto ou após estabilizar. Probe e override foram removidos; não equivale a alternância física de abas.
- Após conclusão do CSS paralelo, navegação SPA audiência → mesa → materiais passou: as três cenas distintas visíveis, uma canvas em cada rota, estado ready e sem overflow. Audiência terminou o carregamento assíncrono com dois perfis; mesa mostrou duas versões; biblioteca mostrou cinco materiais, todos já existentes na sessão.
- Novo layout de materiais conferido em desktop 1440 x 1000 e mobile 390 x 844; biblioteca visível também com prefers-reduced-motion=reduce.
- Perda de contexto induzida somente na própria aba de teste: estado fallback, zero canvas, mensagem de disponibilidade do conteúdo e ações mantidas. Emulação de mídia/viewport e instrumentação foram desfeitas; reload restaura a cena.

## Limites e próximo passo

O P1 da captura headless original NÃO foi reproduzido no IAB; a causa exata continua não confirmada. O bootstrap de materiais monta a página apenas depois de `/state`, portanto a hipótese de count 0→1 durante esse bootstrap não foi corroborada. O patch corrige o estado de prontidão e torna a retomada mais robusta; não prova sozinho a causa da captura vazia.

Durante a regressão SPA, a edição paralela de MaterialsPage referenciou `materials.css` ainda inexistente e produziu overlay HMR. Dono avisado; CSS concluído, reload e build passaram depois. Os erros antigos permanecem no buffer de logs da aba; não foram observados novos erros de produto na regressão após reload. O IAB manteve document.visibilityState=visible ao alternar duas abas próprias, portanto não permitiu validar background físico; o evento sintético acima é a evidência disponível.

Próximo: ROOT/QA repetir a captura no ambiente headless que apresentou o P1 e salvar imagens/relatório canônicos. Não houve deploy ou reinício do servidor.
