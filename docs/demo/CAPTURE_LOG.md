# Registro de capturas da demo

## Entrega atual — v5 pronta como backup

- MP4: `artifacts/demo/rebobina-demo-3d-v5-narrado-legendado.mp4`.
- SRT fiel: `artifacts/demo/rebobina-demo-3d-v5-ptbr.srt`. As mesmas legendas estão gravadas na imagem do MP4.
- Duração: 79,966667s; 3.972.535 bytes; H.264 1600×900, 30 fps constantes, SAR 1:1, DAR 16:9, 2.399 quadros.
- Áudio: AAC mono, 96 kHz, 79,959s. Vídeo e áudio iniciam em 0s.
- Exportação encerrou com código 0 e o MP4 inteiro foi decodificado sem erros.
- SHA-256 do MP4: `aef5be0dbc6835fa608d1a1767e403528b7346209b485a82888cbe15a033b0f7`.
- O áudio AAC da v4 foi copiado sem recodificação: hash de payload idêntico nas duas versões, `fd1f6be3c42c19da16f09d1b5c5c2640ac5afb834dae470a3c61a5d07d72f73e`.
- Quadros extraídos do MP4 em 12s, 33s, 51s e 68s. Inspeção de 33s confirmou o trecho literal ampliado; 51s confirmou a legenda sobre análise/hipótese; 68s confirmou a revisão v2 aberta.
- A v4 original permaneceu intacta. Não houve nova geração de voz nesta correção.

## Capturas e sequência

| Janela | Captura | Evidência exibida |
|---|---|---|
| 0–8s | `final-v5-01-mesa-com-material.png` | Material v1 aberto na Mesa |
| 8–20s | `final-v5-02-3d-principal.png` | Diorama 3D principal e pergunta real |
| 20–28,7s | `final-v5-03-3d-aproximado.png` | Palco aproximado |
| 28,7–31,9s | `final-v5-02-3d-principal.png` | Pergunta contextualizada |
| 31,9–37,4s | `final-v5-06-citacao-expandida.png` | Lastro da pergunta aberto e trecho literal ampliado |
| 37,4–40,66s | `final-v5-04-resposta.png` | Resposta digitada no fluxo |
| 40,66–54,3s | `final-v5-05-feedback.png` | Devolutiva real com limite de análise textual explícito |
| 54,3–64,6s | `final-v5-07-rebobinar.png` | Nova tentativa após rebobinar |
| 64,6–79,97s | `final-v5-08-mesa-revisao-v2.png` | Revisão v2 com fonte, persistida após reload; v1 preservada |

O viewport foi confirmado pelo navegador em 1600×900, DPR 1. Algumas capturas retornaram raster de 1585×892 por recorte da área com barra de rolagem; os derivados em `artifacts/demo/v5-normalized/` uniformizam os oito quadros para 1600×900 antes da montagem. O corte final não tem as barras laterais da v4.

## Legendas e voz

- 176 palavras completas, 29 blocos, até duas linhas e 42 caracteres por linha.
- Velocidade máxima de leitura: 19,21 caracteres/s; sem sobreposição.
- Timings de apoio gerados offline com faster-whisper small em cache e confrontados com texto-fonte e pausas. Sem alegação de escuta humana.
- A frase “O que não tem citação continua identificado como análise ou hipótese” aparece integralmente em 49,28–54,13s.
- Segmento de voz de 8–28s: `atempo=1.3884`; média de 159 palavras/minuto por contagem em espaços. A média não equivale à velocidade sem pausas.
- Narração sintética genérica `coral`, sem clonagem. O cenário 3D é pré-modelado; a imagem cinematográfica fica como alternativa.
- Comando de QA textual: `node artifacts/demo/qa-validate-v4-captions.mjs`.
- Evidências: `v4-asr-local-word-timings.json` e `V5_QA.json`.

## Contrato de verdade

O vídeo é uma montagem de capturas reais do app com materiais sintéticos, e essa classificação permanece visível no próprio vídeo. Não é gravação contínua.

A fonte “Critérios públicos QA visual” é fixture demonstrativa, não regra oficial do evento. O destaque reproduz literalmente “O comitê exige evidências verificáveis” e pertence à pergunta. A devolutiva seguinte declara que sua lacuna é uma análise textual sem evidência documental adicional.

A revisão foi gerada e salva pelo fluxo real da Mesa como v2. Após recarregar, v2 continuou aberta e v1 pôde ser selecionada. Isso demonstra versionamento local do material, não eficácia educacional ou validação comercial.

## Histórico preservado

| Arquivo | Duração | Classificação |
|---|---:|---|
| `rebobina-demo-provisorio-85s.mp4` | 84,97s | Backup silencioso do visual antigo |
| `rebobina-demo-cinematic-v2.mp4` | 77,97s | Backup visual intermediário |
| `rebobina-demo-cinematic-v3.mp4` | 79,97s | Backup silencioso cinematográfico |
| `rebobina-demo-cinematic-v3-60s.mp4` | 59,80s | Derivado silencioso |
| `rebobina-demo-cinematic-v3-narrado.mp4` | 79,97s | Backup narrado cinematográfico |
| `rebobina-demo-3d-v4.mp4` | 79,97s | Backup silencioso com 3D principal |
| `rebobina-demo-3d-v4-narrado.mp4` | 79,97s | Backup narrado anterior à correção de enquadramento |

## Pendência externa

Nova direção recebida depois da exportação: v6 com abertura de login/avatar de 6–10s. A v5 fica preservada como backup íntegro. A v6 aguarda READY explícito do ROOT para interface/backend e conta demonstrativa. O limite máximo oficial de duração não foi confirmado. Publicação, submissão e validação estratégica final pertencem ao ROOT.
