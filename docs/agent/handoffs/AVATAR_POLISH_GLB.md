# Avatar — polimento e modelos gerados

Data: 2026-09-12. Estado: implementação e QA visual local concluídos; publicação e fluxo persistido são gates do ROOT/QA.

## Entrega deste executor

- `avatar-builder.ts`: silhueta esculpida, torso/roupa contínuos, olhos com íris e brilho, sobrancelhas, nariz, mãos/polegares, tênis arredondados e cabelos com volumes suaves. Oito combinações de template/cabelo preservadas. API e origem dos pés preservadas.
- `AvatarPreview.tsx` e `avatar-preview.css`: câmera e enquadramento integral, preview responsivo, carregamento de modelo assíncrono com versão por solicitação, descarte de resultados antigos, estados de erro e origem efetiva explícita.
- `avatar-loader.ts`: `loadAvatarModel` e alias `createStageAvatar`, retornando Promise de Group normalizado a 2,45 unidades com pés em y0. Whitelist de dois arquivos locais. Cache somente dos bytes; cada render tem geometrias/texturas próprias. Material com metalness0; fallback procedural explícito.
- `ProfileDialog.tsx`: seleção Personalizável / Modelo masculino / Modelo feminino. Cabelo/cores só aparecem no modo que efetivamente permite editá-los; modelos gerados têm aparência pronta e sem rig.
- `src/lib/auth.tsx`: revalidação ao focar outra aba atualiza avatar/nome do mesmo usuário sem desmontar o espaço ou mudar rota.
- `tests/avatar-builder.test.ts`: geometria finita em oito combinações, pés no chão, ausência de caixas, cores, pose sentada opcional e descarte de recursos compartilhados exatamente uma vez.
- Subagente independente criou apenas `src/vendor/three/GLTFLoader.js` e `BufferGeometryUtils.js`, oficiais r180, MIT, imports locais. Import e parse mínimo verificados pelo executor.

## Gates confirmados diretamente

- Build completo após integração GLB: PASS1892 módulos, loader em chunk separado ~45KB; aviso não bloqueante de tamanho do Three.
- Testes após polimento procedural: 22/22 PASS, incluindo os três testes novos.
- Nova execução integrada após GLB/model enum: 23/23 PASS, zero falhas, às17:57 UTC.
- CUA local `http://localhost:4173/`: avatar procedural cacheado e feminino/longo visualmente conferidos; reload comprovou geometria final, sem segmentos nos joelhos.
- Mobile390×844: avatar inteiro visível; document.scrollWidth390 e innerWidth390; preview ready; palco marcado profile; console sem warn/error no passe.
- CUA local modelos GLB: ambos efetivamente vistos renderizados. Feminino marcado `data-avatar-source=trellis-feminine`; masculino `data-avatar-source=trellis-masculine`, renderer ready, model-fallback false. Console retornou zero warn/error.
- Nenhuma conta criada, nenhum perfil salvo, nenhuma chamada IA feita por este executor nesta rodada. Alterações temporárias na prévia foram descartadas ao fechar. O perfil de demonstração já existente não foi modificado por este executor.
- Screenshots visuais estão inline na conversa; QA independente captura arquivos canônicos para vídeo.

## Integração por outros donos

- ROOT/CORE: campo opcional AvatarConfig.model e validação/persistência backend.
- Coordenador SpatialStage: factory assíncrona antes do renderer, avatar escolhido como apresentador, origem/fallback explícitos, preservação de câmera/seleção; default também usa o personagem polido.
- IMAGENS: os dois arquivos GLB com texturas embutidas em `public/avatar/generated/`.
- QA: gate salvar modelo → recarregar → mesmo modelo no palco. Não inferir esse gate apenas das capturas da prévia.
- DEPLOY único: publicação consolidada após aceite ROOT. A publicação anterior procedural não é evidência de publicação GLB.

## Limites

- Os GLBs são personagens de aparência fixa, sem rig/animação esquelética. Não representar roupas/cabelos como editáveis nesses modelos.
- Ouvintes do cenário conservam modelagem anterior nesta rodada; somente apresentador pessoal, padrão e preview usam o novo builder/GLBs.
- Próximo passo: ROOT anexar resultado persistido/publicação e VIDEO usar o bundle validado.
