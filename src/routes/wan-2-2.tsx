import { createFileRoute } from "@tanstack/react-router";

import { Studio } from "./index";

export const Route = createFileRoute("/wan-2-2")({
  head: () => ({
    meta: [
      { title: "Studio Wan 2.2 — Génération vidéo par IA" },
      {
        name: "description",
        content:
          "Générez des vidéos MP4 à partir d'un prompt avec Wan 2.2 14B via l'API 8Scale : résolution, durée, coût estimé et téléchargement.",
      },
    ],
  }),
  component: Studio,
});
