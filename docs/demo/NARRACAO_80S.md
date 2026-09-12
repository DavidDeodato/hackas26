# Narração PT-BR — corte 3D v5

## Texto efetivamente usado

**0–8s**

Apresentar uma ideia já é difícil. Responder perguntas sob pressão torna tudo ainda mais desafiador.

**8–28s**

O Rebobina é um espaço seguro para ensaiar conversas que importam antes do momento real. No palco tridimensional pré-modelado, o contexto do ensaio personaliza a pergunta, destaca quem está falando e ajuda a pessoa a praticar a resposta. A ilustração fica disponível apenas como alternativa visual. A cena não é gerada ao vivo.

**28,7–40,4s**

As perguntas são possibilidades de ensaio, construídas a partir do pitch, dos perfis escolhidos e das fontes disponíveis. Elas não tentam prever o que alguém pensa.

**40,7–54,1s**

Depois da resposta, a devolutiva mostra o que funcionou, onde a argumentação pode melhorar e quando existe evidência direta. O que não tem citação continua identificado como análise ou hipótese.

**54,6–64,1s**

Ao rebobinar, a tentativa original é preservada. Assim, a pessoa pode responder novamente e comparar caminhos sem apagar o processo.

**64,6–72,1s**

Por fim, o ensaio volta para a Mesa, onde pitch e respostas podem ser revisados com apoio das fontes.

**72,3–79,3s**

Rebobina. Ensaie conversas que importam, sem prever pessoas e sem esconder as limitações.

## Voz, ritmo e verificação

- Voz sintética genérica OpenAI `gpt-4o-mini-tts`, `coral`, sem clonagem.
- MP3 original: `artifacts/demo/rebobina-narracao-coral-original.mp3`, 79,104s.
- Atualização de 8–28s: `artifacts/demo/rebobina-narracao-v4-segmento-8-28.mp3`, 27,768s na geração e `atempo=1.3884` na montagem.
- O segmento tem 53 palavras por separação em espaços, contando “pré-modelado” como uma palavra. Na janela de 20s, o ritmo médio é 159 palavras/minuto. A antiga orientação de 125–135 palavras/minuto não descreve esse segmento.
- A fala completa tem 176 palavras; a média sobre 79,97s é aproximadamente 132 palavras/minuto, incluindo pausas.
- As 176 palavras estão presentes no SRT, sem paráfrases ou omissão da frase sobre citação, análise e hipótese.
- Alinhamento local: faster-whisper small já disponível em cache, CPU int8, português e timestamps por palavra. A ortografia foi conferida contra o texto enviado ao TTS; a detecção de pausas ajudou a ajustar os inícios dos blocos.
- O reconhecimento automático é uma verificação auxiliar de conteúdo e sincronização, não uma escuta humana. Não foi identificado corte material de frase na transcrição.
- Evidência: `artifacts/demo/v4-asr-local-word-timings.json`; validação: `artifacts/demo/qa-validate-v4-captions.mjs`.
- SRT corrigido v4 e SRT v5: 29 blocos, até duas linhas e 42 caracteres por linha; velocidade máxima de leitura de 19,21 caracteres/s; sem sobreposição.
- A v5 reaproveita o áudio AAC da v4, sem nova chamada de geração de voz.

## Relação entre fala e imagem

A citação ampliada em 31,9–37,4s pertence à pergunta. O trecho literal é “O comitê exige evidências verificáveis”, extraído do material sintético vinculado ao ensaio. A devolutiva posterior é análise textual e declara ausência de evidência documental adicional. O encerramento mostra uma revisão real v2 na Mesa; a v1 foi preservada e continuou disponível após recarregar.

O vídeo é uma montagem de capturas reais do aplicativo com material demonstrativo sintético, voz sintética e legendas incorporadas. Não é uma gravação contínua de navegação.
