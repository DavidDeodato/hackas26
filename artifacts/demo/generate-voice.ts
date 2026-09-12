import {writeFile} from 'node:fs/promises';
import {config} from '../../server/config.ts';

if (!config.openaiKey) throw new Error('Credencial OpenAI não configurada no servidor.');

const input = `Apresentar uma ideia já é difícil. Responder perguntas sob pressão torna tudo ainda mais desafiador.

O Rebobina é um espaço seguro para ensaiar conversas que importam antes do momento real. O cenário é ilustrativo e ajuda a pessoa a entrar na situação.

Quem quiser pode explorar a sala em três dimensões. Essa é uma visualização opcional, não uma sala gerada ao vivo.

As perguntas são possibilidades de ensaio, construídas a partir do pitch, dos perfis escolhidos e das fontes disponíveis. Elas não tentam prever o que alguém pensa.

Depois da resposta, a devolutiva mostra o que funcionou, onde a argumentação pode melhorar e quando existe evidência direta. O que não tem citação continua identificado como análise ou hipótese.

Ao rebobinar, a tentativa original é preservada. Assim, a pessoa pode responder novamente e comparar caminhos sem apagar o processo.

Por fim, o ensaio volta para a Mesa, onde pitch e respostas podem ser revisados com apoio das fontes.

Rebobina. Ensaie conversas que importam, sem prever pessoas e sem esconder as limitações.`;

const response = await fetch('https://api.openai.com/v1/audio/speech', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${config.openaiKey}`,
    'Content-Type': 'application/json',
  },
  signal: AbortSignal.timeout(90_000),
  body: JSON.stringify({
    model: 'gpt-4o-mini-tts',
    voice: 'coral',
    response_format: 'mp3',
    speed: 1,
    instructions: 'Fale em português brasileiro natural, com tom calmo, humano e seguro. Ritmo de apresentação claro, com pausas breves entre os parágrafos. Não dramatize e não soe como anúncio publicitário.',
    input,
  }),
});

if (!response.ok) {
  const safeMessage = (await response.text()).replace(/sk-[A-Za-z0-9_-]+/g, '[redacted]').slice(0, 500);
  throw new Error(`Falha TTS ${response.status}: ${safeMessage}`);
}

const bytes = new Uint8Array(await response.arrayBuffer());
await writeFile('artifacts/demo/rebobina-narracao-coral-original.mp3', bytes);
console.log(JSON.stringify({ok: true, model: 'gpt-4o-mini-tts', voice: 'coral', bytes: bytes.length}));
