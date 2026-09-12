import {writeFile} from 'node:fs/promises';
import {config} from '../../server/config.ts';

if (!config.openaiKey) throw new Error('Credencial OpenAI não configurada no servidor.');

const input = `O Rebobina é um espaço seguro para ensaiar conversas que importam antes do momento real. No palco tridimensional pré-modelado, o contexto do ensaio personaliza a pergunta, destaca quem está falando e ajuda a pessoa a praticar a resposta. A ilustração fica disponível apenas como alternativa visual. A cena não é gerada ao vivo.`;

const response = await fetch('https://api.openai.com/v1/audio/speech', {
  method: 'POST',
  headers: {Authorization: `Bearer ${config.openaiKey}`, 'Content-Type': 'application/json'},
  signal: AbortSignal.timeout(90_000),
  body: JSON.stringify({
    model: 'gpt-4o-mini-tts',
    voice: 'coral',
    response_format: 'mp3',
    speed: 1,
    instructions: 'Fale em português brasileiro natural, com tom calmo, humano e seguro. Ritmo claro, sem soar como anúncio. Faça uma pausa breve antes da última frase.',
    input,
  }),
});

if (!response.ok) throw new Error(`Falha TTS ${response.status}`);
const bytes = new Uint8Array(await response.arrayBuffer());
await writeFile('artifacts/demo/rebobina-narracao-v4-segmento-8-28.mp3', bytes);
console.log(JSON.stringify({ok: true, model: 'gpt-4o-mini-tts', voice: 'coral', bytes: bytes.length}));
