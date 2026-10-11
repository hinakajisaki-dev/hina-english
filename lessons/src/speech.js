// Natural-sounding audio for words, example sentences, phrases and
// pronunciation sentences, made with Cloudflare's text-to-speech (Deepgram
// Aura). Each text is made once and kept in KV, so later plays are free.

const MODEL = "@cf/deepgram/aura-2-en";

export class SpeechError extends Error {}

export async function speechFor(env, text) {
  const voice = env.VOICE || "thalia";
  const key = `tts:${MODEL}:${voice}:${await sha256(text)}`;
  const saved = await env.AUDIO.get(key, "arrayBuffer");
  if (saved) return saved;

  const audio = await synthesize(env, text, voice);
  await env.AUDIO.put(key, audio);
  return audio;
}

async function synthesize(env, text, voice) {
  let output;
  try {
    output = await env.AI.run(MODEL, { text, speaker: voice });
  } catch (error) {
    console.error("tts error", error?.message);
    throw new SpeechError("audio could not be made");
  }
  const bytes = await toBytes(output);
  if (!looksLikeMp3(bytes)) {
    console.error("tts returned something other than MP3", typeof output, bytes.slice(0, 16));
    throw new SpeechError("audio could not be made");
  }
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

// Accept a stream, raw bytes or base64, whichever form the binding returns.
async function toBytes(output) {
  if (output instanceof ReadableStream) return new Uint8Array(await new Response(output).arrayBuffer());
  if (output instanceof ArrayBuffer) return new Uint8Array(output);
  if (ArrayBuffer.isView(output)) return new Uint8Array(output.buffer, output.byteOffset, output.byteLength);
  const base64 = typeof output === "string" ? output : output?.audio;
  if (typeof base64 === "string") return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new Uint8Array();
}

// MP3 files start with an ID3 tag or an MPEG frame sync.
function looksLikeMp3(bytes) {
  if (bytes.length < 4) return false;
  const id3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33;
  const frame = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0;
  return id3 || frame;
}

async function sha256(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
