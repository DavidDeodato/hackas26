# AUTH UI — código congelado para integração

Data: 2026-09-12, passe focal encerrado aproximadamente 17:43 UTC.

## Arquivos deste executor

- `src/App.tsx`: AuthProvider, gate antes do WorkspaceProvider, remount por sessionKey, nome real/avatar inicial no sidebar e botão móvel de perfil.
- `src/lib/auth.tsx`: useAuth/useOptionalAuth; me/login/register/logout/profile; demo explícita; timeout; descarte de respostas auth obsoletas; notificação entre abas por storage; revalidação ao ganhar foco; limpeza de history.state em troca de identidade.
- `src/components/auth/LoginPage.tsx`: entrada/cadastro reais, senha mínimo 10 e máximo 128, visibilidade da senha, erros/loading, opção de demonstração sem OAuth fictício; diorama MiniWorld 3D real.
- `src/components/auth/ProfileDialog.tsx`: nome, presets feminino/masculino, cabelo, cinco paletas curadas, preview AvatarPreview ao vivo, salvar e sair; foco de retorno ao botão de origem.
- `src/components/auth/auth.css`: composição responsiva e estados na paleta canônica carvão/pêssego.

Dependências entregues por outros donos: shared/auth.ts, backend auth, AvatarPreview/avatar-builder, main.tsx sem WorkspaceProvider externo, WorkspaceProvider com identityKey. Nenhuma escrita deste executor nesses arquivos.

## Verificação direta

- `npm run build`: PASS, 1889 módulos, aviso não bloqueante de chunk Three separado.
- `npm test`: PASS 19/19, zero falhas.
- CUA `http://localhost:4173/`: login desktop inspecionado com diorama renderizado, hierarquia e controles visíveis.
- Cadastro 390×844 inspecionado; medidas: innerWidth390, document.scrollWidth375, sem overflow horizontal; minlength da senha10; data-renderer ready.
- Console do passe de login: zero warn/error retornados.
- Viewport restaurado após verificação; screenshots inline na conversa, não salvos em PNG por este executor.

## Limites e próximo passo

- O QA coordenado pelo ROOT é dono do teste de cadastro → editar/salvar avatar → logout/relogin e da captura em arquivo. Este executor não afirma ter executado esse fluxo por navegador.
- Backend recebeu do ROOT relato de12 checks reais; consultar evidência canônica dele antes de promover o resultado, não contar o relato como teste deste executor.
- Synchronização entre abas foi implementada e revisada estaticamente; depende do passe dinâmico de QA. Cookies/sessões precisam continuar verificados pelo servidor.
- Login usa o diorama existente; perfil usa AvatarPreview. Não depende de geração externa/HF.
- Não há recuperação de senha, confirmação de e-mail ou OAuth nesta entrega. Não anunciados como disponíveis.
- ROOT integra a revisão consolidada; agente de deploy publica; agente de Git realiza commits. Nenhum commit/deploy por este executor.
