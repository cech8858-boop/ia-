import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — Studio vidéo IA" },
      {
        name: "description",
        content:
          "Connectez-vous ou créez un compte pour générer des vidéos IA avec Kling, Veo et Sora et suivre vos crédits.",
      },
      { property: "og:title", content: "Connexion — Studio vidéo IA" },
      {
        property: "og:description",
        content: "Accédez au générateur vidéo IA et à votre solde de crédits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/ai-video-generator" });
    });
  }, [navigate]);

  async function handleGoogleLogin() {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/ai-video-generator`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-5 py-16 text-foreground"
      style={{ backgroundImage: "var(--gradient-studio)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card/80 p-7 backdrop-blur"
        style={{ boxShadow: "var(--shadow-panel)" }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connectez-vous avec Google pour accéder au générateur vidéo IA.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-50"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <span aria-hidden="true">G</span>
          {loading ? "Redirection vers Google…" : "Se connecter avec Google"}
        </button>
      </div>
    </main>
  );
}
