import { createServerFn } from "@tanstack/react-start";

const FAL_BASE = "https://queue.fal.run";

type ToolKind = "image" | "video" | "audio" | "3d" | "chat" | "vision";

type FalTool = {
  id: string;
  label: string;
  category: string;
  kind: ToolKind;
  model: string;
  description: string;
};

export const FAL_TOOLS: FalTool[] = [
  { id: "image-generator", label: "AI Image Generator", category: "Image", kind: "image", model: "fal-ai/playground-v25", description: "Text → image" },
  { id: "image-upscaler", label: "Image Upscaler", category: "Image", kind: "image", model: "fal-ai/creative-upscaler", description: "Upscale images" },
  { id: "background-remover", label: "AI Background Remover", category: "Image", kind: "image", model: "fal-ai/bria/background/remove", description: "Remove the background" },
  { id: "image-editor", label: "Image Editor IA", category: "Image", kind: "image", model: "fal-ai/image-editing/background-change", description: "Edit with an instruction" },
  { id: "image-to-image", label: "Image to Image", category: "Image", kind: "image", model: "fal-ai/playground-v25/image-to-image", description: "Transform a reference" },
  { id: "inpainting", label: "AI Inpainting", category: "Image", kind: "image", model: "fal-ai/flux-lora-fill", description: "Replace a selected area" },
  { id: "product-photography", label: "AI Product Photography", category: "Image", kind: "image", model: "fal-ai/image-editing/background-change", description: "Turn products into ad visuals" },
  { id: "nano-banana-2", label: "Nano Banana 2", category: "Image", kind: "image", model: "nano-banana-2", description: "Fast image generation" },
  { id: "nano-banana-pro", label: "Nano Banana Pro", category: "Image", kind: "image", model: "nano-banana-pro", description: "High-detail image generation" },
  { id: "nano-banana-2-edit", label: "Nano Banana 2 Edit", category: "Image", kind: "image", model: "nano-banana-2/edit", description: "Edit images with instructions" },
  { id: "gpt-image-2", label: "GPT Image 2", category: "Image", kind: "image", model: "openai/gpt-image-2", description: "Detailed images and typography" },
  { id: "gpt-image-2-edit", label: "GPT Image 2 Edit", category: "Image", kind: "image", model: "openai/gpt-image-2/edit", description: "Precise image editing" },
  { id: "gpt-image-25-flare", label: "GPT Image 2.5 Flare", category: "Image", kind: "image", model: "openai/gpt-image-2.5/flare/text-to-image", description: "Fast, natural high-quality images" },
  { id: "gpt-image-25-sunburst", label: "GPT Image 2.5 Sunburst", category: "Image", kind: "image", model: "openai/gpt-image-2.5/sunburst/text-to-image", description: "Precision-focused premium images" },
  { id: "gpt-image-25-flare-edit", label: "GPT Image 2.5 Flare Edit", category: "Image", kind: "image", model: "openai/gpt-image-2.5/flare/edit", description: "Precise edits that preserve composition" },
  { id: "gpt-image-25-sunburst-edit", label: "GPT Image 2.5 Sunburst Edit", category: "Image", kind: "image", model: "openai/gpt-image-2.5/sunburst/edit", description: "Premium controlled image editing" },
  { id: "flux-kontext", label: "FLUX Kontext Pro", category: "Image", kind: "image", model: "flux-pro/kontext", description: "Edit images from text and reference images" },
  { id: "flux-2-pro", label: "FLUX.2 Pro", category: "Image", kind: "image", model: "flux-2-pro", description: "High-quality image generation and editing" },
  { id: "seedream-v5-pro-edit", label: "Seedream 5 Pro Edit", category: "Image", kind: "image", model: "bytedance/seedream/v5/pro/edit", description: "Precise edits with multiple references" },
  { id: "seedream-v5-lite-edit", label: "Seedream 5 Lite Edit", category: "Image", kind: "image", model: "bytedance/seedream/v5/lite/edit", description: "Fast precise image editing" },
  { id: "qwen-image-3", label: "Qwen Image 3", category: "Image", kind: "image", model: "alibaba/qwen-image-3/text-to-image", description: "Text-to-image generation" },
  { id: "grok-imagine-image", label: "Grok Imagine Image", category: "Image", kind: "image", model: "xai/grok-imagine-image", description: "Image generation with Grok Imagine" },
  { id: "birefnet-v2", label: "BiRefNet v2 Background Remover", category: "Image", kind: "image", model: "fal-ai/birefnet/v2", description: "High-resolution background removal" },

  { id: "text-to-video", label: "Text → Video", category: "Video", kind: "video", model: "fal-ai/wan/v2.2-a14b/text-to-video", description: "Generate video from text" },
  { id: "image-to-video", label: "Image → Video", category: "Video", kind: "video", model: "fal-ai/wan/v2.2-a14b/image-to-video", description: "Animate an image" },
  { id: "video-upscaler", label: "Video Upscaler", category: "Video", kind: "video", model: "fal-ai/video-upscaler", description: "Upscale video" },
  { id: "video-to-video", label: "Video → Video", category: "Video", kind: "video", model: "fal-ai/ltx-2.3-22b/distilled/image-to-video", description: "Restyle or transform video" },
  { id: "ai-video-editor", label: "AI Video Editor", category: "Video", kind: "video", model: "openrouter/router/video", description: "Analyze and create an edit plan" },
  { id: "lip-sync", label: "Lip Sync", category: "Video", kind: "video", model: "fal-ai/sync-lipsync/v3/image-to-video", description: "Synchronize a face to audio" },
  { id: "ai-avatar", label: "AI Avatar", category: "Video", kind: "video", model: "fal-ai/sync-lipsync/v3/image-to-video", description: "Talking avatar from image + voice" },
  { id: "video-background-remover", label: "Video Background Remover", category: "Video", kind: "video", model: "bria/video/background-removal", description: "Remove video background" },
  { id: "kling-v3-pro", label: "Kling Video 3.0 Pro", category: "Video", kind: "video", model: "kling-video/v3/pro/image-to-video", description: "Cinematic image-to-video with native audio" },
  { id: "minimax-h3-text", label: "MiniMax H3", category: "Video", kind: "video", model: "minimax/h3/text-to-video", description: "Text-to-video with strong prompt adherence" },
  { id: "minimax-h3-max-text", label: "MiniMax H3 Max", category: "Video", kind: "video", model: "minimax/h3-max/text-to-video", description: "High prompt adherence text-to-video" },
  { id: "minimax-h3-max-image", label: "MiniMax H3 Max Image to Video", category: "Video", kind: "video", model: "minimax/h3-max/image-to-video", description: "Animate images with H3 Max" },
  { id: "minimax-h3-max-reference", label: "MiniMax H3 Max Reference Video", category: "Video", kind: "video", model: "minimax/h3-max/reference-to-video", description: "Generate video from references" },
  { id: "minimax-h3-max-turbo", label: "MiniMax H3 Max Turbo", category: "Video", kind: "video", model: "minimax/h3-max-turbo/image-to-video", description: "Faster image-to-video generation" },
  { id: "minimax-h3-max-turbo-text", label: "MiniMax H3 Max Turbo Text to Video", category: "Video", kind: "video", model: "minimax/h3-max-turbo/text-to-video", description: "Fast text-to-video with H3 Max Turbo" },
  { id: "seedance-25-text", label: "Seedance 2.5 Text to Video", category: "Video", kind: "video", model: "bytedance/seedance-2.5/text-to-video", description: "Generate up to 30-second videos from text" },
  { id: "seedance-25-reference", label: "Seedance 2.5 Reference to Video", category: "Video", kind: "video", model: "bytedance/seedance-2.5/reference-to-video", description: "Use multimodal references for consistent scenes" },
  { id: "kling-v3-pro-i2v", label: "Kling 3.0 Pro Image to Video", category: "Video", kind: "video", model: "kling-video/v3/pro/image-to-video", description: "Cinematic animation with optional native audio" },
  { id: "pixverse-v6", label: "PixVerse V6", category: "Video", kind: "video", model: "fal-ai/pixverse/v6/text-to-video", description: "Stylized text-to-video" },
  { id: "grok-imagine-video", label: "Grok Imagine Video 1.5", category: "Video", kind: "video", model: "xai/grok-imagine-video/v1.5/image-to-video", description: "Animate images with Grok Imagine" },
  { id: "happy-horse-11", label: "HappyHorse 1.1", category: "Video", kind: "video", model: "alibaba/happy-horse/text-to-video", description: "Cinematic text-to-video generation" },
  { id: "wan-v27-text", label: "Wan 2.7 Text to Video", category: "Video", kind: "video", model: "fal-ai/wan/v2.7/text-to-video", description: "Flexible text-to-video generation" },
  { id: "wan-v30-prime", label: "Wan 3.0 Prime", category: "Video", kind: "video", model: "alibaba/wan-3.0-prime/image-to-video", description: "Premium image-to-video generation" },
  { id: "flux-3-i2v", label: "FLUX 3 Image to Video", category: "Video", kind: "video", model: "blackforestlabs/flux-3/image-to-video", description: "Animate images with FLUX 3" },
  { id: "ltx-25-fast", label: "LTX 2.5 Fast", category: "Video", kind: "video", model: "lightricks/ltx-2.5/image-to-video/fast", description: "Fast image-to-video generation" },

  { id: "speech-to-text", label: "Speech → Text", category: "Audio", kind: "audio", model: "fal-ai/speech-to-text", description: "Transcribe audio" },
  { id: "voice-changer", label: "Voice Changer", category: "Audio", kind: "audio", model: "openrouter/router/audio", description: "Transform or analyze voice" },
  { id: "voice-cloning", label: "Voice Cloning", category: "Audio", kind: "audio", model: "fal-ai/elevenlabs/voice-cloning", description: "Clone a reference voice" },
  { id: "ai-music", label: "AI Music Generator", category: "Audio", kind: "audio", model: "fal-ai/stable-audio", description: "Generate music" },
  { id: "sound-effects", label: "AI Sound Effects", category: "Audio", kind: "audio", model: "fal-ai/stable-audio", description: "Generate sound effects" },
  { id: "audio-enhancer", label: "Audio Enhancer", category: "Audio", kind: "audio", model: "openrouter/router/audio", description: "Clean and analyze audio" },
  { id: "eleven-v3-tts", label: "ElevenLabs TTS v3", category: "Audio", kind: "audio", model: "elevenlabs/tts/eleven-v3", description: "Expressive text-to-speech" },
  { id: "eleven-sfx-v2", label: "ElevenLabs Sound Effects v2", category: "Audio", kind: "audio", model: "elevenlabs/sound-effects/v2", description: "Generate sound effects from text" },
  { id: "stable-audio-3-music", label: "Stable Audio 3 Music", category: "Audio", kind: "audio", model: "fal-ai/stable-audio-3/small/music/text-to-audio", description: "Generate music from a prompt" },
  { id: "stable-audio-3-sfx", label: "Stable Audio 3 SFX", category: "Audio", kind: "audio", model: "fal-ai/stable-audio-3/small/sfx/text-to-audio", description: "Generate sound effects" },
  { id: "grok-tts", label: "Grok TTS", category: "Audio", kind: "audio", model: "xai/grok-tts", description: "Text-to-speech with Grok" },

  { id: "text-to-3d", label: "Text → 3D", category: "3D", kind: "3d", model: "fal-ai/hunyuan3d-v3/text-to-3d", description: "Generate a 3D model" },
  { id: "image-to-3d", label: "Image → 3D", category: "3D", kind: "3d", model: "fal-ai/hunyuan3d-v3/image-to-3d", description: "Create a 3D model from an image" },
  { id: "3d-texture", label: "3D → Texture", category: "3D", kind: "3d", model: "fal-ai/hunyuan3d-v3/texture-generation", description: "Generate 3D textures" },
  { id: "texture-generator", label: "AI Texture Generator", category: "3D", kind: "3d", model: "fal-ai/playground-v25", description: "Create texture references" },
  { id: "3d-character", label: "AI 3D Character", category: "3D", kind: "3d", model: "tripo3d/h3.1/text-to-3d", description: "Create a character mesh" },
  { id: "3d-upscaler", label: "3D Model Upscaler", category: "3D", kind: "3d", model: "tripo3d/h3.1/text-to-3d", description: "Regenerate a higher-detail mesh" },
  { id: "ai-rigging", label: "AI Rigging", category: "3D", kind: "3d", model: "tripo3d/h3.1/text-to-3d", description: "Prepare a character workflow" },
  { id: "trellis-2", label: "Trellis 2 Image to 3D", category: "3D", kind: "3d", model: "fal-ai/trellis-2", description: "Create a 3D asset from an image" },
  { id: "hi3d-v3", label: "Hi3D v3 Image to 3D", category: "3D", kind: "3d", model: "hitem3d/hi3d/v3.0/image-to-3d", description: "High-quality image-to-3D assets" },
  { id: "hi3d-multiview", label: "Hi3D Multiview to 3D", category: "3D", kind: "3d", model: "hitem3d/hi3d/multi-view-to-3d", description: "Generate 3D from multiple views" },

  { id: "ai-chat", label: "AI Chat", category: "Assistants", kind: "chat", model: "openrouter/router", description: "General AI assistant" },
  { id: "code-assistant", label: "Code Assistant", category: "Assistants", kind: "chat", model: "openrouter/router", description: "Generate and debug code" },
  { id: "ai-research", label: "AI Research", category: "Assistants", kind: "chat", model: "openrouter/router", description: "Research and summarize" },
  { id: "pdf-chat", label: "PDF Chat", category: "Assistants", kind: "vision", model: "openrouter/router/vision", description: "Chat with documents" },
  { id: "ai-writer", label: "AI Writer", category: "Assistants", kind: "chat", model: "openrouter/router", description: "Write content" },
  { id: "ai-translator", label: "AI Translator", category: "Assistants", kind: "chat", model: "openrouter/router", description: "Translate text" },
  { id: "ai-summarizer", label: "AI Summarizer", category: "Assistants", kind: "chat", model: "openrouter/router", description: "Summarize content" },
];

function key() {
  const value = process.env.FAL_KEY?.trim();
  if (!value) throw new Error("FAL_KEY n'est pas configurée sur le serveur.");
  return value;
}

function tool(id: string) {
  const found = FAL_TOOLS.find((item) => item.id === id);
  if (!found) throw new Error("Outil IA inconnu.");
  return found;
}

async function falFetch(path: string, init: RequestInit = {}) {
  return fetch(`${FAL_BASE}/${path}`, {
    ...init,
    headers: {
      Authorization: `Key ${key()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

function buildInput(item: FalTool, prompt: string, imageUrl?: string, audioUrl?: string, videoUrl?: string) {
  const p = prompt.trim() || "Create a high quality result.";
  switch (item.id) {
    case "image-generator":
    case "nano-banana-2":
    case "nano-banana-pro":
    case "gpt-image-2":
    case "gpt-image-25-flare":
    case "gpt-image-25-sunburst":
    case "flux-2-pro":
    case "qwen-image-3":
    case "grok-imagine-image": return { prompt: p };
    case "image-upscaler": return { image_url: imageUrl, scale: 2 };
    case "background-remover": return { image_url: imageUrl };
    case "image-editor": return { image_url: imageUrl, background_prompt: p };
    case "nano-banana-2-edit":
    case "gpt-image-2-edit":
    case "gpt-image-25-flare-edit":
    case "gpt-image-25-sunburst-edit":
    case "flux-kontext":
    case "seedream-v5-pro-edit":
    case "seedream-v5-lite-edit": return { prompt: p, image_urls: imageUrl ? [imageUrl] : [] };
    case "birefnet-v2": return { image_url: imageUrl };
    case "image-to-image": return { prompt: p, image_url: imageUrl };
    case "inpainting": return { prompt: p, image_url: imageUrl };
    case "product-photography": return { image_url: imageUrl, background_prompt: p };
    case "text-to-video":
    case "minimax-h3-max-text":
    case "minimax-h3-max-turbo-text":
    case "seedance-25-text":
    case "pixverse-v6":
    case "happy-horse-11":
    case "wan-v27-text": return { prompt: p, duration: 5 };
    case "image-to-video":
    case "kling-v3-pro":
    case "minimax-h3-max-image":
    case "minimax-h3-max-turbo":
    case "kling-v3-pro-i2v":
    case "grok-imagine-video":
    case "ltx-25-fast":
    case "wan-v30-prime":
    case "flux-3-i2v": return { prompt: p, image_url: imageUrl };
    case "minimax-h3-max-reference":
    case "seedance-25-reference": return { prompt: p, image_urls: imageUrl ? [imageUrl] : [] };
    case "video-upscaler": return { video_url: videoUrl, scale: 2 };
    case "video-to-video": return { prompt: p, image_url: imageUrl };
    case "ai-video-editor": return { video_urls: videoUrl ? [videoUrl] : [], prompt: p, model: "google/gemini-2.5-flash" };
    case "lip-sync":
    case "ai-avatar": return { image_url: imageUrl, audio_url: audioUrl };
    case "video-background-remover": return { video_url: videoUrl, output_container: "webm_vp9" };
    case "speech-to-text": return { audio_url: audioUrl };
    case "voice-changer": return { audio_url: audioUrl, prompt: p, model: "google/gemini-2.5-flash" };
    case "voice-cloning": return { audio_url: audioUrl, voice_name: "AI Studio Voice" };
    case "ai-music":
    case "stable-audio-3-music": return { prompt: p, duration: 15 };
    case "sound-effects":
    case "eleven-sfx-v2":
    case "stable-audio-3-sfx": return { prompt: p, duration: 8 };
    case "eleven-v3-tts":
    case "grok-tts": return { text: p };
    case "audio-enhancer": return { audio_url: audioUrl, prompt: p, model: "google/gemini-2.5-flash" };
    case "text-to-3d":
    case "3d-character":
    case "3d-upscaler":
    case "ai-rigging": return { prompt: p };
    case "image-to-3d":
    case "trellis-2":
    case "hi3d-v3":
    case "hi3d-multiview": return { image_url: imageUrl, prompt: p };
    case "3d-texture": return { image_url: imageUrl, prompt: p };
    case "texture-generator": return { prompt: p };
    case "pdf-chat": return { prompt: p, model: "google/gemini-2.5-flash", pdf_urls: videoUrl ? [videoUrl] : [] };
    case "ai-chat":
    case "code-assistant":
    case "ai-research":
    case "ai-writer":
    case "ai-translator":
    case "ai-summarizer": return { prompt: p, model: "google/gemini-2.5-flash", enable_web_search: item.id === "ai-research" };
    default: return { prompt: p };
  }
}

function findUrl(node: unknown, preferred: string[] = []): string | null {
  const seen = new Set<unknown>();
  let best: string | null = null;
  const walk = (value: unknown, parent = "") => {
    if (typeof value === "string") {
      if (/^https?:\/\//i.test(value)) {
        const score = preferred.reduce((n, x) => n + (value.toLowerCase().includes(x) || parent.toLowerCase().includes(x) ? 2 : 0), 0);
        if (!best || score > 0) best = value;
      }
      return;
    }
    if (!value || typeof value !== "object" || seen.has(value)) return;
    seen.add(value);
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) walk(v, k);
  };
  walk(node);
  return best;
}

export const runFalTool = createServerFn({ method: "POST" })
  .inputValidator((input: { toolId: string; prompt: string; imageUrl?: string; audioUrl?: string; videoUrl?: string }) => input)
  .handler(async ({ data }) => {
    const item = tool(data.toolId);
    const input = buildInput(item, data.prompt, data.imageUrl, data.audioUrl, data.videoUrl);
    const res = await falFetch(item.model, { method: "POST", body: JSON.stringify(input) });
    const body = await res.text();
    let parsed: any = body;
    try { parsed = JSON.parse(body); } catch {}
    if (!res.ok) {
      const message = typeof parsed?.detail === "string" ? parsed.detail : typeof parsed?.message === "string" ? parsed.message : "FAL a refusé la requête.";
      return { status: "error" as const, message };
    }
    const requestId = parsed?.request_id ?? parsed?.requestId;
    if (requestId) return { status: "queued" as const, requestId, model: item.model };
    const url = findUrl(parsed, ["image", "video", "audio", "model", "glb", "mp4", "png", "wav"]);
    return { status: url ? "completed" as const : "completed" as const, url, data: parsed };
  });

export const pollFalTool = createServerFn({ method: "POST" })
  .inputValidator((input: { model: string; requestId: string }) => input)
  .handler(async ({ data }) => {
    const statusRes = await falFetch(`${data.model}/requests/${encodeURIComponent(data.requestId)}/status?logs=false`);
    const statusBody = await statusRes.text();
    let status: any = statusBody;
    try { status = JSON.parse(statusBody); } catch {}
    if (!statusRes.ok) return { status: "error" as const, message: "Impossible de lire le statut FAL." };
    const state = String(status?.status ?? "").toUpperCase();
    if (state === "IN_PROGRESS" || state === "IN_QUEUE" || state === "QUEUED") return { status: "processing" as const };
    if (state === "FAILED" || state === "ERROR") return { status: "error" as const, message: status?.error ?? "La génération FAL a échoué." };

    const resultRes = await falFetch(`${data.model}/requests/${encodeURIComponent(data.requestId)}`);
    const resultBody = await resultRes.text();
    let result: any = resultBody;
    try { result = JSON.parse(resultBody); } catch {}
    if (!resultRes.ok) return { status: "error" as const, message: "Impossible de récupérer le résultat FAL." };
    const url = findUrl(result, ["image", "video", "audio", "model", "glb", "mp4", "png", "wav"]);
    return { status: "completed" as const, url, data: result };
  });
