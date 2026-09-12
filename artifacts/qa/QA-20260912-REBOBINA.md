# Evidencia QA — Rebobina — 2026-09-12

## Estado

Local aprovado tecnicamente e no gate visual V2, com gaps P2. O P1 de integridade de conteudo da Mesa foi corrigido, ganhou teste deterministico e esta encerrado com evidencia canonica. O unico bloqueio externo atual e o deploy publico HTTP 500 por import ESM, informado pelo ROOT e ainda pendente de nova versao testavel.

## Caminho executado

1. Fonte profissional criada e persistida.
2. Perfil de audiencia gerado com lentes e citacoes literais.
3. Pitch enviado com um perfil.
4. Tres perguntas reais geradas.
5. Respostas enviadas por teclado (`Ctrl+Enter`).
6. Feedback real exibido com forca, lacuna, sugestao e evidencia quando existente.
7. Rewind criou ramificacao e retornou a pergunta sem apagar o original.
8. Rodada concluida e enviada a Mesa.
9. Revisao v1 salva e reencontrada depois de reload.

## Checks repetiveis

```powershell
npm test
npm run build
.\scripts\qa-rehearsal-smoke.ps1
.\scripts\qa-rehearsal-smoke.ps1 -Full
```

Ultimo resultado: 15 testes, build aprovado, smoke rapido aprovado e smoke completo aprovado. O smoke completo confirma isolamento, citacoes literais, 1-3 perguntas, feedback, branch imutavel e persistencia apos readback.

Atualizacao final: 16/16 testes e build com 1.877 modulos. O teste novo confirma que `prepareWork` omite alegacao documental sem citacao valida e rotula sugestoes.

## Evidencia visual e telemetria

- Capturas desktop e mobile foram coletadas na aba in-app exclusiva desta execucao QA.
- Desktop cobriu audiencia, sala, feedback, fim da rodada e Mesa.
- Mobile: viewport 390x844, sem overflow horizontal (`scrollWidth=375`, `innerWidth=390`).
- Foco: skip link visivel com outline solido de 3 px.
- Console: zero erros e zero warnings no fluxo integrado final.

## Falha material

A revisao gerada na Mesa inicialmente converteu recomendacoes em fatos. ROOT corrigiu o grounding e o teste novo passou. Encerramento focal repetido pelo QA: `npx --no-install tsx --test tests/root-work-grounding.test.ts` retornou 1/1 PASS. O artefato `artifacts/qa/root-store-grounding.json` tambem registra PASS para CAS, cota persistente por sessao e grounding, com a limitacao explicita de que nao e uma verificacao semantica exaustiva.

Este P1 esta resolvido e nao deve ser usado como bloqueio do deploy. O HTTP 500 publico por import ESM e uma pendencia separada.

## Reset visual V2

- Referencia: `design/references/rebobina-cinematic-studio-v1.png`.
- Desktop real: WebGL ativo, palco curvo dominante, luz quente, apresentador central, audiencia em arco e rail lateral; console vazio.
- Mobile 390x844: WebGL ativo, sem overflow horizontal ou colisao com nav.
- Foco de perfil alterou camera e estado visivel.
- Reduced-motion foi emulado; canvas permaneceu funcional e regras de reducao estavam carregadas.
- Dois P0 transitorios foram encontrados e corrigidos: sintaxe do engine e import Three a partir de `public`.
- P2: diorama permanece menos fotorreal/cinematografico que a referencia; chunk Three 693,13 kB; CTA pode exigir scroll em telas baixas.

## Modo cinematografico final

- Padrao: asset pre-renderizado `cinematic-rehearsal-stage-v2.png`, com qualidade e composicao proximas da referencia.
- Transparencia: `Cenario ilustrativo`; perfis e pergunta continuam sendo overlays do estado real.
- Desktop/mobile: sem overflow ou erro de console em aba limpa.
- Alternancia verificada: cinematic (`canvas=0`, esperado) -> `Explorar em 3D` (`canvas=1`) -> `Voltar ao cenario` (`canvas=0`), preservando a sessao.
- Build final: 1.877 modulos; 16/16 testes. Warning residual: chunk Three 693,13 kB.
