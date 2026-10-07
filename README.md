# Video Weaver

Intègre l’API 8Scale dans mon application pour générer des vidéos avec Wan 2.2.

API Models : GET https://api.8scale.com/v1/models

Modèles disponibles :

wan-2.2/14b/text-to-video

wan-2.2/14b/image-to-video

wan-2.2/14b/multi-scene

Pour le Text-to-Video, utilise l'endpoint officiel 8Scale : POST https://8scale.run/wan-2.2/14b/text-to-video

Headers : Authorization: Bearer ${EIGHTSCALE_API_KEY} Content-Type: application/json

Exemple de requête : { "prompt": "A cinematic mountain range at golden hour", "resolution": "480p", "aspect_ratio": "16:9" }

Dans mon application :

Créer un champ pour le prompt.

Ajouter le choix de résolution : 480p, 580p, 720p.

Ajouter le choix de durée disponible.

Envoyer la génération depuis le backend.

Afficher "Génération en cours".

Récupérer le résultat vidéo.

Afficher la vidéo dans un lecteur.

Permettre à l'utilisateur de télécharger la vidéo.

Afficher les erreurs de l'API.

Afficher le coût estimé avant la génération.

IMPORTANT :

Ne jamais mettre EIGHTSCALE_API_KEY dans le frontend.

Stocker la clé dans les variables d'environnement/secrets du backend.

Ne jamais inventer d'endpoint ou de paramètre.

Utiliser les paramètres réellement retournés par https://api.8scale.com/v1/models.

Prévoir une architecture backend/serverless compatible avec Lovable + Vercel.

Pour les prix, utiliser les données de l'API : 480p 3s = $0.010 480p 5s = $0.015 580p 3s = $0.014 580p 5s = $0.024 720p 3s = $0.024 720p 5s = $0.044

Commence par intégrer Wan 2.2 Text-to-Video. Ensuite prépare la structure pour Image-to-Video et Multi-Scene.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fde4508a-e429-4d1d-bfb0-d622f9ae5ea0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## AI Workspace / FAL

The `/ai-workspace` page exposes the AI tools for image, video, audio, 3D and assistants. FAL calls are server-side and use the `FAL_KEY` environment variable; do not expose this key in client code.
Reference files selected in this Workspace are sent through `/api/fal/upload` directly to fal.ai's CDN; they are not uploaded to this project's Supabase bucket. fal.ai stores the uploaded file on its CDN so model endpoints can fetch it by URL. Uploads are limited to 4 MiB to fit the request-size limit of the Vercel deployment.

### Unified generation interface
The AI Workspace now uses a shared, mobile-first dark generation canvas inspired by modern AI video/image generators. Every model in the Image, Video, Audio and 3D catalogs uses the same interaction pattern: model selector, prompt, aspect ratio, optional upload, variants, credits display and gradient Generate action.

## ChatGPT App / MCP

The project now includes a `mcp-server/` starter that exposes IA-67 tools to ChatGPT and Codex through MCP. It includes `list_models`, `enhance_prompt`, `generate_image`, and `open_workspace`.

Deploy `mcp-server/` as a separate Node 20+ HTTPS service, keep `FAL_KEY` server-side, then connect the public `/mcp` endpoint in ChatGPT Developer Mode / Plugins. See `mcp-server/README.md` and the in-app page `/chatgpt-plugin`.

## ChatGPT / MCP — 35 AI Workspace tools

The `mcp-server/` connector now exposes all 35 tools currently defined in `src/lib/fal.functions.ts` / AI Workspace, including Image, Video, Audio, 3D and Assistant workflows. The server registers each capability as a dedicated MCP tool and keeps `FAL_KEY` server-side.

## Higgsfield API (server-side)

IA-67 includes a server-side Higgsfield adapter. It uses the official REST API at `https://api.higgsfield.ai` and reads credentials only from the server environment.

Configure this variable in Vercel (Production/Preview/Development as needed):

```env
HF_CREDENTIALS=YOUR_KEY_ID:YOUR_KEY_SECRET
```

Do not put the credential in `VITE_*`, React components, browser storage, or GitHub. The Higgsfield Studio is available at `/higgsfield-studio` and can be opened from `/blank`.

The adapter uses asynchronous request IDs and server-side polling. Current verified model integrations include Soul Standard, Soul 2, Wan 2.7, HappyHorse 1.1, Wan 2.6 Reference, Kling O3 image/video reference, and Happy Horse Reference.

## Vercel / TanStack Start security fix (2026-10-02)

Updated `@tanstack/react-start` to the patched `1.168.60` release. TanStack's security advisory GHSA-qx66-fv34-fjm lists versions below 1.168.60 as affected by an unauthenticated reflected XSS in server-function responses.

After pushing this version, Vercel should install the patched package. Do not set `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS`; that bypass is not needed with the patched release.


## Higgsfield API — modèles supplémentaires (4 octobre 2026)

La page `/higgsfield-studio` inclut maintenant les routes de modèles vérifiées dans la documentation publique Higgsfield : Seedance 2.5 (text-to-video, image-to-video, reference-to-video, video edit, video extend), Kling 3.0 Standard et 4K, Soul 2 image-to-image, Genjutsu Restyle et les variantes Marketing Studio Image 2.5 Flare/Sunburst. Les modèles Higgsfield déjà présents ont été conservés.

Configurez `HF_CREDENTIALS` côté serveur Vercel. La liste reflète les modèles et opérations documentés et ajoutés à l'interface ; l'accès réel peut dépendre des autorisations et du compte API Higgsfield. Les appels doivent être testés avec un compte autorisé avant mise en production.

## FAL model catalog additions

The workspace includes additional FAL catalog entries for Nano Banana 2/Pro, GPT Image 2 and 2.5 variants, FLUX.2 Pro, Qwen Image 3, Seedream 5 editing, Kling 3.0 Pro, MiniMax H3/H3 Max, Seedance 2.5, Wan 2.7/3.0 Prime, Grok Imagine Video, LTX 2.5 Fast, ElevenLabs TTS/SFX, Stable Audio 3, Trellis 2, and Hi3D. The FAL catalog changes frequently; model availability, endpoint schemas, account access, and pricing must be checked against https://fal.ai/explore/search before production use. These additions do not imply that every endpoint has been live-tested with your API key.


## Catalogue FAL + Higgsfield étendu (2026-10-04)

Ajouts au catalogue IA-67 : GPT Image 2.5 Flare Edit, GPT Image 2.5 Sunburst Edit, FLUX Kontext Pro, MiniMax H3 Max Turbo Text-to-Video, Seedance 2.5 Text-to-Video et Reference-to-Video, Kling 3.0 Pro Image-to-Video, Seedance 2.0 Text-to-Video, Wan 2.7 Image-to-Video et Wan 3.0 Prime Image-to-Video.

Les identifiants sont basés sur les catalogues/références publiques consultés le 4 octobre 2026. La disponibilité, les quotas et les paramètres peuvent dépendre du compte fournisseur. Les appels doivent être testés avec les clés serveur `FAL_KEY` et `HF_CREDENTIALS`; aucune clé n'est incluse dans ce ZIP. Le catalogue public FAL contient de nombreux autres modèles et change fréquemment : ce paquet ajoute une sélection vérifiée de modèles manquants, et ne prétend pas embarquer les ~1 500 entrées du catalogue FAL.
