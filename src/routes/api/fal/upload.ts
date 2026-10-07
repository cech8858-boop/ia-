import { fal } from "@fal-ai/client";
import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/webm",
]);

export const Route = createFileRoute("/api/fal/upload")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const origin = request.headers.get("origin");
        if (origin !== new URL(request.url).origin) {
          return Response.json({ error: "Origine de requête non autorisée." }, { status: 403 });
        }

        const contentLength = Number(request.headers.get("content-length"));
        if (Number.isFinite(contentLength) && contentLength > MAX_FILE_SIZE + 16 * 1024) {
          return Response.json({ error: "Le fichier doit faire 4 Mo maximum." }, { status: 413 });
        }

        const contentType = request.headers.get("content-type") ?? "";
        if (!contentType.toLowerCase().startsWith("multipart/form-data;")) {
          return Response.json({ error: "Format d'envoi invalide." }, { status: 415 });
        }

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return Response.json({ error: "Impossible de lire le fichier envoyé." }, { status: 400 });
        }

        const file = form.get("file");
        if (!(file instanceof File)) {
          return Response.json({ error: "Aucun fichier reçu." }, { status: 400 });
        }
        if (!ALLOWED_TYPES.has(file.type)) {
          return Response.json({ error: "Format non pris en charge." }, { status: 415 });
        }
        if (file.size === 0 || file.size > MAX_FILE_SIZE) {
          return Response.json(
            { error: "Le fichier doit faire entre 1 octet et 4 Mo." },
            { status: 413 },
          );
        }

        const accessToken = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
        if (!accessToken) {
          return Response.json(
            { error: "Connecte-toi pour envoyer un fichier de référence." },
            { status: 401 },
          );
        }

        const supabaseUrl = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
        const supabaseKey =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
        if (!supabaseUrl || !supabaseKey) {
          return Response.json(
            { error: "L'authentification Supabase n'est pas configurée." },
            { status: 503 },
          );
        }

        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: userData, error: authError } = await supabase.auth.getUser(accessToken);
        if (authError || !userData.user) {
          return Response.json(
            { error: "Session invalide. Reconnecte-toi puis réessaie." },
            { status: 401 },
          );
        }

        const credentials = process.env["FAL_KEY"]?.trim();
        if (!credentials) {
          return Response.json(
            { error: "Le service fal.ai n'est pas configuré sur le serveur." },
            { status: 503 },
          );
        }

        try {
          fal.config({ credentials });
          const extension = file.type.split("/")[1]?.replace("quicktime", "mov") ?? "bin";
          const uploadFile = new File([file], `reference-${crypto.randomUUID()}.${extension}`, {
            type: file.type,
          });
          const url = await fal.storage.upload(uploadFile);
          return Response.json({ url }, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          console.error(
            "fal.ai reference upload failed",
            error instanceof Error ? error.name : "UnknownError",
          );
          return Response.json(
            { error: "Échec de l'envoi vers fal.ai. Réessaie avec un fichier plus petit." },
            { status: 502 },
          );
        }
      },
    },
  },
});
