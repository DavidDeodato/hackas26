"""Read-only, offline word timing check of the v4 narrated MP4."""
import json
import sys
import faulthandler
faulthandler.dump_traceback_later(30)
print('Loading local transcription runtime...', file=sys.stderr, flush=True)
from faster_whisper import WhisperModel

print('Loading cached small model...', file=sys.stderr, flush=True)
model = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4,
                     local_files_only=True)
faulthandler.cancel_dump_traceback_later()
print('Transcribing local media...', file=sys.stderr, flush=True)
segments, info = model.transcribe(sys.argv[1], language='pt', beam_size=5,
                                 word_timestamps=True, vad_filter=False)
for segment in segments:
    print(json.dumps({
        'start': segment.start,
        'end': segment.end,
        'text': segment.text,
        'words': [{'start': word.start, 'end': word.end, 'word': word.word}
                  for word in segment.words],
    }, ensure_ascii=False), flush=True)
