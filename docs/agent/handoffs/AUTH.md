# AUTH

STATUS: ready (backend e integração HTTP local verificados)

Atualização TRELLIS (pedido 17:50Z): `AvatarConfig.model?` e schema aceitam somente `procedural`, `trellis-masculine`, `trellis-feminine`. `defaultAvatar` permanece sem o campo; perfis antigos continuam válidos e o frontend interpreta ausência como procedural. PATCH parcial permite trocar model, com persistência JSONB já existente; cliente não fornece URLs. Caminhos fixos dos assets pertencem à integração frontend. `npx tsc --noEmit` exit0; `npx tsx --test tests/auth.test.ts` 4/4 passaram, incluindo enum, compatibilidade legada e rejeição de URL/modelo inválido. ROOT deve reiniciar para carregar esse schema e verificar PATCH integrado; AUTH não reiniciou nem publicou. Somente shared/auth.ts, server/auth.ts, teste e este handoff alterados nesta atualização.

Contrato pronto em `shared/auth.ts`: AvatarConfig, AuthUser e defaultAvatar. Endpoints: GET /api/auth/me retorna {user:null|AuthUser}; POST register {email,password,name}, POST login {email,password} retornam {user}; POST logout retorna {ok:true}; PATCH profile {name?,avatar?} retorna {user}. Senha de 10 a 128 caracteres. Cores do avatar devem ser hex #RRGGBB; avatar parcial via PATCH é aceito. Usar fetch com cookie same-origin. Frontend deve oferecer entrada explícita como visitante. Sem migração automática de dados de visitante para contas.

Implementado em `server/auth.ts`, `server/index.ts`, accessor mínimo em `server/store.ts`, `shared/auth.ts` e `tests/auth.test.ts`.

- PostgreSQL: `rebobina_users`, `rebobina_auth_sessions`, `rebobina_auth_limits`. Sem fallback de contas para arquivo local.
- Senha: scrypt assíncrono N=32768/r=8/p=3, salt aleatório 128 bits, comparação timingSafeEqual e derivação dummy para conta ausente. Hash/PII/credenciais não são registrados nos logs.
- Sessão: cookie rebobina_auth aleatório 256 bits; só SHA-256 do token fica na tabela; expiração absoluta de 7 dias; HttpOnly/SameSite Strict, Secure em Vercel/HTTPS. Login rotaciona token anterior; logout revoga em DB e limpa identidade visitante.
- Conta usa workspace `user:<UUID>` obtido no servidor. Cookie visitante só aceita 64 caracteres hex, portanto não pode selecionar workspace de conta. Trocar de login nunca importa materiais do visitante ou da conta anterior.
- Origin e Sec-Fetch-Site verificados para writes; /api exige JSON nas mutações. Login limitado em PostgreSQL por IP (30/15min) e conta (10/15min); cadastro 10/IP/15min; perfil 60/conta/15min. Escopos de rate limit são hashes.
- PATCH profile valida enums e hex #RRGGBB; atualiza avatar parcialmente no PostgreSQL sem substituir alterações de outro campo.

Evidência 2026-09-12 17:38Z:

- `npx tsc --noEmit`: exit 0.
- `npx tsx --test tests/auth.test.ts`: 3/3 passaram (salt/senha/bounds, namespace de workspace, origem/form submissions).
- `npx tsx scripts/root-serverless-check.ts`: PASS_SERVERLESS_IMPORT, storage=postgres, listenerStarted=false. Inicialização das tabelas de auth passou.
- `npm test`: 19/19 testes passaram, incluindo a regressão completa do motor/grounding.
- Evidência ROOT lida diretamente em `artifacts/qa/root-auth-local.json`, 17:39:12Z: PASS_AUTH_ACCOUNT_ISOLATION, 12 checks reais via HTTP local. Cadastro de duas contas, flags do cookie, isolamento de materiais entre contas/visitante, nome e avatar persistidos, origem rejeitada, avatar inválido rejeitado, revogação no logout, visitante sem dados da conta, senha incorreta rejeitada, relogin com mesmo ID/dados/avatar e senha curta rejeitada. Contas QA sintéticas, sem chamadas de IA.

Próximo: ROOT integra frontend e decide a publicação; após deploy, repetir o smoke público e conferir login/avatar no navegador. Nenhum restart/deploy realizado por AUTH. Sem OAuth, verificação de e-mail ou recuperação de senha no escopo entregue. Validação local não representa auditoria completa de segurança em produção.

Referências consultadas: [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html). Skill auth lida; aplicação Express e sessão própria conforme contrato autorizado.
