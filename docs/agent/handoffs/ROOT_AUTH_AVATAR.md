# Entrega integrada de contas e avatar

Estado: CONFIRMADO local e público em 2026-09-12T17:43:10Z. Pedido do usuário iniciou às17:34Z.

## Entregue

- Login e cadastro email/senha; workspace persistente por conta; perfil com nome e avatar; saída e reentrada.
- Sessão opaca persistida por hash PostgreSQL, cookie HttpOnly/SameSite Strict/Secure público, scrypt com salt por senha, limite de tentativas persistente.
- Entrada com cena WebGL3D; editor com personagem3D modular, templates feminino/masculino, quatro cabelos, pele/cabelo/roupa/calça/calçados editáveis. Apresentador usa avatar salvo.
- Estado React remontado por sessão; bootstrap sem cache compartilhado persistente; navigation state limpo em transições de conta. Storage events/epoch/focus sincronizam abas.

## Evidências conferidas pelo ROOT

- `npm run build`: PASS1889 módulos. `npm test`: PASS19/19.
- `artifacts/qa/root-auth-local.json`:12checks reais PASS.
- `artifacts/qa/root-auth-public.json`:12checks reais PASS no domínio público às17:43:10Z;2contas sintéticas, zero IA.
- `artifacts/qa/auth-ui-report.json`:13checkpoints UI local,1conta sintética, zero erros inesperados e zero IA. Cadastro, nome/cabelo/cor salvos, reload, avatar no palco, logout, relogin e demonstração sem conta anterior.
- `artifacts/qa/auth-ui-login-desktop.png`, `auth-ui-profile-desktop.png`, `auth-ui-profile-mobile.png`: inspecionados diretamente. Demais capturas do fluxo no mesmo diretório.
- Deploy final: dpl_7UA74HgQKSbMXPvi6GFe6ERy8c4U; https://rebobina-h4h.vercel.app; asset index-DILHOC9X. Dois uploads sobrepostos do mesmo snapshot foram detectados na transferência ao novo dono; nenhum terceiro foi iniciado. Último alias verificado pelo dono em `DEPLOY_LATEST.md`.

## TRELLIS e limites

`public/avatar/generated/trellis-feminine-v1.glb` existe:1.309.452bytes, glTF2,1mesh, sem rig/animações. Gerado no Space comunitário após erro no Microsoft Space; o masculino encontrou cota gratuita esgotada. Proveniência em `design/avatar/TRELLIS_HANDOFF.md`. A malha gerada NÃO foi integrada ao renderer: customização funcional é geometria modular própria. Não confundir os dois resultados.

Teste dinâmico entre abas não foi executado; mitigação foi revisada estaticamente. Não há e-mail verificado, recuperação de senha, OAuth ou auditoria completa de segurança. Exemplo do ensaio não comprova previsão humana nem aprendizagem.

Próximo: QA faz smoke visual público sem mais contas/IA; VIDEO produz nova gravação com login e avatar, preservando v5. Git writer Sol é exclusivo para lotes congelados, sem push e sem trailer Codex. ROOT não assume vídeo final pronto antes do artefato validado.
