# VIDEO

STATUS: ready

## Estado atual — v5 pronta como backup; v6 aguardando liberação

- Objetivo: corrigir as lacunas visuais e de acessibilidade da v4, com 3D principal, citação legível da pergunta, revisão real na Mesa e legendas completas.
- Backup íntegro pronto: `artifacts/demo/rebobina-demo-3d-v5-narrado-legendado.mp4`.
- Exportação: exit 0; ffprobe e decodificação completa passaram. 79,966667s, 3.972.535 bytes, H.264 1600×900, 30 fps constantes, 2.399 quadros, SAR 1:1, DAR 16:9, início em 0s.
- Áudio AAC mono 96 kHz, início em 0s; hash do payload idêntico ao áudio v4. Legendas incorporadas na imagem.
- Quadros 33s, 51s e 68s inspecionados: citação legível, fala sobre análise/hipótese completa e revisão v2 aberta.
- Captura: viewport confirmado no navegador em 1600×900, DPR 1. Os oito quadros foram normalizados para 1600×900 antes da montagem para garantir geometria uniforme.
- Abertura: Mesa com material v1 aberto. Encerramento: revisão real v2, persistida após reload, com v1 ainda selecionável.
- A citação expandida é lastro da pergunta; entra em 31,9–37,4s, com ampliação documental do trecho literal.
- A devolutiva capturada declara análise textual sem evidência documental adicional. Não é apresentada como uma devolutiva apoiada naquela citação.
- O vídeo identifica materiais sintéticos e montagem de capturas. Perguntas são possibilidades de ensaio.
- Áudio: reaproveitado da v4, sem nova geração de voz. Segmento de 8–28s em 1,3884x, média de 159 palavras/minuto por contagem em espaços.
- Legendas: `artifacts/demo/rebobina-demo-3d-v5-ptbr.srt`, transcrição completa de 176 palavras em 29 blocos.
- QA das legendas: até 42 caracteres/linha, até duas linhas, máximo 19,21 caracteres/s, sem sobreposição; alinhamento automático local documentado.
- A v4 permaneceu inalterada: SHA-256 `66895b2cd1e302500791173d919805598591d33b03f0d9e2285605348817cd0c`.

## Evidências canônicas

- `artifacts/demo/final-v5-06-citacao-expandida.png`
- `artifacts/demo/final-v5-08-mesa-revisao-v2.png`
- `artifacts/demo/v4-asr-local-word-timings.json`
- `artifacts/demo/qa-validate-v4-captions.mjs`
- `artifacts/demo/V5_QA.json`
- `artifacts/demo/v5-qa-frame-33s.png` e `artifacts/demo/v5-qa-frame-68s.png`
- `docs/demo/NARRACAO_80S.md`
- `docs/demo/CAPTURE_LOG.md`

## Escopo e limites

Somente `artifacts/demo/**`, `docs/demo/**` e este handoff. Aba própria. Nenhuma alteração de código, reinício de servidor, publicação ou submissão. O fluxo do app foi exercitado com conteúdo demonstrativo; a geração de devolutiva e de revisão ocorreu pelo produto.

A fonte chamada “Critérios públicos QA visual” é material sintético de demonstração; não comprova regra oficial do evento. A duração máxima oficial continua pendente.

## Histórico — backups, não estado atual

| Versão | Arquivo | Situação |
|---|---|---|
| Provisória | `rebobina-demo-provisorio-85s.mp4` | Backup silencioso, 84,97s, visual antigo |
| Cinematográfica v2 | `rebobina-demo-cinematic-v2.mp4` | Backup intermediário, 77,97s |
| Cinematográfica v3 | `rebobina-demo-cinematic-v3-narrado.mp4` | Backup narrado, 79,97s; imagem principal da direção anterior |
| 3D v4 | `rebobina-demo-3d-v4-narrado.mp4` | Backup narrado, 79,97s; 3D principal; enquadramento/legendas revisados na v5 |

## Próximo passo

ROOT pode revisar o MP4 estável e as provas em 33s e 68s. A prioridade posterior é uma v6 com 6–10s de login/avatar. Plano: substituir os primeiros 8s da v5 pela abertura nova, reutilizando a voz e preservando citação/revisão. Capturar somente após READY explícito do backend/interface pelo ROOT; conta demonstrativa somente após esse gate. Não registrar senha/email pessoal nem alegar geração TRELLIS sem arquivo real. Nenhuma captura de autenticação foi iniciada. Aceite estratégico, limite oficial e eventual submissão pertencem ao ROOT.
