import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, AudioLines, Box, Check, Download, FolderPlus, GalleryHorizontal, Heart, History, Image as ImageIcon, LoaderCircle, MessageSquare, Play, Save, Sparkles, Star, Upload, Video, WandSparkles, X, Zap } from "lucide-react";
import { FAL_TOOLS, pollFalTool, runFalTool } from "@/lib/fal.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ai-workspace")({
  head: () => ({ meta: [{ title: "AI Workspace — Creative AI" }, { name: "description", content: "AI creation workspace powered by FAL." }] }),
  component: AiWorkspacePage,
});

const categories = ["All", "Image", "Video", "Audio", "3D", "Assistants"] as const;
type Category = typeof categories[number];
type Creation = { id: string; toolId: string; tool: string; category: string; prompt: string; url?: string | null; createdAt: number; favorite?: boolean; public?: boolean; folder?: string };
type Template = { id: string; name: string; prompt: string; toolId: string };

const iconFor = (category: string) => category === "Image" ? ImageIcon : category === "Video" ? Video : category === "Audio" ? AudioLines : category === "3D" ? Box : category === "Assistants" ? MessageSquare : Sparkles;
const read = <T,>(key: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; } };
const write = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));

function AiWorkspacePage() {
  const [category, setCategory] = useState<Category>("All");
  const [active, setActive] = useState(FAL_TOOLS[0].id);
  const [prompt, setPrompt] = useState("");
  const [fileUrl, setFileUrl] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [variants, setVariants] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [results, setResults] = useState<{ url?: string | null; id: string }[]>([]);
  const [view, setView] = useState<"create" | "history" | "creations" | "favorites" | "gallery" | "templates">("create");
  const [history, setHistory] = useState<Creation[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [enhancing, setEnhancing] = useState(false);
  const [selectorNote, setSelectorNote] = useState("");
  const [beforeUrl, setBeforeUrl] = useState<string>();
  const [afterUrl, setAfterUrl] = useState<string>();
  const [folderName, setFolderName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const run = useServerFn(runFalTool);
  const poll = useServerFn(pollFalTool);
  const selected = FAL_TOOLS.find((x) => x.id === active)!;
  const filtered = useMemo(() => category === "All" ? FAL_TOOLS : FAL_TOOLS.filter((x) => x.category === category), [category]);

  useEffect(() => { setHistory(read<Creation[]>("ai-history", [])); setFolders(read<string[]>("ai-folders", ["General", "Projects"])); setTemplates(read<Template[]>("ai-templates", [])); }, []);
  useEffect(() => {
    const image = category === "Image" || selected.category === "Image";
    const p = prompt.toLowerCase();
    const recommended = image ? (p.includes("photo") || p.includes("realistic") ? "Image Generator · photoreal" : "Nano Banana / Image Generator") : selected.category === "Video" ? "WAN 2.2 / Image-to-Video" : selected.category === "Audio" ? "ElevenLabs / Audio" : selected.category === "3D" ? "Hunyuan 3D / Tripo" : "AI Assistant";
    setSelectorNote(`AI Model Selector · ${recommended}`);
  }, [prompt, category, selected.category]);

  const upload = async (file?: File) => {
    if (!file) return;
    setError(null);
    const path = `uploads/workspace-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const up = await supabase.storage.from("character-swap").upload(path, file, { contentType: file.type, upsert: true });
    if (up.error) { setError("Impossible d'envoyer le fichier."); return; }
    const signed = await supabase.storage.from("character-swap").createSignedUrl(path, 3600);
    if (signed.error || !signed.data?.signedUrl) { setError("Impossible de préparer le fichier."); return; }
    setFileUrl(signed.data.signedUrl); setFileName(file.name);
  };

  const enhancePrompt = () => {
    if (!prompt.trim()) return;
    setEnhancing(true);
    setTimeout(() => {
      const suffix = selected.category === "Image" ? ", cinematic composition, detailed textures, realistic lighting, high quality, professional photography" : selected.category === "Video" ? ", cinematic camera movement, coherent motion, detailed lighting, smooth transitions" : selected.category === "3D" ? ", clean topology, detailed materials, studio lighting, production-ready 3D asset" : ", clear structure, precise details, professional quality";
      setPrompt(prompt.trim().replace(/[.!?]+$/, "") + suffix);
      setEnhancing(false);
    }, 450);
  };

  const savePrompt = () => {
    if (!prompt.trim()) return;
    const next = [...read<Template[]>("ai-templates", []), { id: crypto.randomUUID(), name: `${selected.label} prompt`, prompt, toolId: selected.id }];
    setTemplates(next); write("ai-templates", next); setView("templates");
  };

  const pollOne = async (requestId: string, model: string) => {
    for (let i = 0; i < 120; i++) {
      const r = await poll({ data: { requestId, model } });
      if (r.status === "completed") return r.url;
      if (r.status === "error") throw new Error(r.message || "La génération a échoué.");
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
    throw new Error("La génération prend trop de temps.");
  };

  const generate = async () => {
    setError(null);
    if (!prompt.trim() && !fileUrl) { setError("Ajoute un prompt ou un fichier de référence."); return; }
    setBusy(true); setResults([]);
    try {
      const payload = { toolId: selected.id, prompt, imageUrl: selected.category === "Image" || selected.category === "3D" || selected.category === "Video" ? fileUrl : undefined, audioUrl: selected.category === "Audio" || selected.id === "lip-sync" || selected.id === "ai-avatar" ? fileUrl : undefined, videoUrl: selected.category === "Video" ? fileUrl : undefined };
      const jobs = await Promise.all(Array.from({ length: variants }, () => run({ data: payload })));
      const completed = await Promise.all(jobs.map(async (job) => job.status === "completed" ? job.url : job.status === "queued" ? pollOne(job.requestId, job.model) : Promise.reject(new Error(job.message))));
      const created = completed.map((url) => ({ id: crypto.randomUUID(), url }));
      setResults(created);
      const now = Date.now();
      const entries: Creation[] = created.map((r) => ({ id: r.id, toolId: selected.id, tool: selected.label, category: selected.category, prompt, url: r.url, createdAt: now }));
      const next = [...entries, ...read<Creation[]>("ai-history", [])].slice(0, 200);
      setHistory(next); write("ai-history", next);
      if (selected.category === "Image" && created[0]?.url) { setAfterUrl(created[0].url || undefined); if (fileUrl) setBeforeUrl(fileUrl); }
    } catch (e) { setError(e instanceof Error ? e.message : "La génération a échoué."); }
    finally { setBusy(false); }
  };

  const toggleFavorite = (id: string) => { const next = history.map((x) => x.id === id ? { ...x, favorite: !x.favorite } : x); setHistory(next); write("ai-history", next); };
  const togglePublic = (id: string) => { const next = history.map((x) => x.id === id ? { ...x, public: !x.public } : x); setHistory(next); write("ai-history", next); };
  const addFolder = () => { if (!folderName.trim()) return; const next = [...new Set([...folders, folderName.trim()])]; setFolders(next); write("ai-folders", next); setFolderName(""); };

  const nav = [
    ["create", "Create", Sparkles], ["history", "History", History], ["creations", "My Creations", GalleryHorizontal], ["favorites", "Favorites", Heart], ["gallery", "Public Gallery", Star], ["templates", "Templates", WandSparkles],
  ] as const;
  const visibleItems = view === "favorites" ? history.filter((x) => x.favorite) : view === "gallery" ? history.filter((x) => x.public) : view === "creations" ? history : history;

  return <main className="min-h-screen bg-[#09090b] text-white">
    <div className="mx-auto max-w-[1550px] px-4 pb-20 pt-5 sm:px-7">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3"><a href="/" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.04]"><ArrowLeft className="size-4" /></a><div className="grid size-10 place-items-center rounded-xl bg-white text-black"><Sparkles className="size-5" /></div><div><h1 className="text-lg font-semibold">AI Workspace</h1><p className="text-xs text-white/40">Création · historique · projets · templates · IA automatique</p></div></div>
        <div className="flex items-center gap-2"><a href="/ai-hub" className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[11px] text-violet-200">AI Creative Hub</a><div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] text-emerald-200">FAL server-side</div><div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[11px] text-violet-200"><Zap className="mr-1 inline size-3" />AI Model Selector</div></div>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/[.03] p-3">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">Workspace</p>
          <div className="space-y-1">{nav.map(([id, label, Icon]) => <button key={id} onClick={() => setView(id as typeof view)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs ${view === id ? "bg-white text-black" : "text-white/55 hover:bg-white/[.05]"}`}><Icon className="size-4" />{label}{id === "history" && <span className="ml-auto text-[9px] opacity-50">{history.length}</span>}</button>)}</div>
          <div className="mt-5 border-t border-white/10 pt-4"><p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">Projects</p><div className="space-y-1">{folders.map((f) => <div key={f} className="flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] text-white/50"><FolderPlus className="size-3.5" />{f}</div>)}</div><div className="mt-2 flex gap-1"><input value={folderName} onChange={e => setFolderName(e.target.value)} placeholder="Nouveau dossier" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/20 px-2 py-1.5 text-[10px] outline-none" /><button onClick={addFolder} className="rounded-lg bg-white px-2 text-black"><Check className="size-3" /></button></div></div>
        </aside>

        <section>
          {view === "create" ? <>
            <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[.03] p-1.5">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-xl px-4 py-2 text-xs font-semibold ${category === item ? "bg-white text-black" : "text-white/50 hover:text-white"}`}>{item}</button>)}</div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
              <aside className="rounded-3xl border border-white/10 bg-white/[.03] p-3"><div className="mb-3 flex items-center justify-between px-2"><span className="text-xs font-semibold">Modèles</span><span className="text-[10px] text-white/30">{filtered.length}</span></div><div className="max-h-[68vh] space-y-1 overflow-y-auto">{filtered.map((item) => { const Icon = iconFor(item.category); return <button key={item.id} onClick={() => { setActive(item.id); setError(null); }} className={`w-full rounded-2xl p-3 text-left transition ${active === item.id ? "bg-white text-black" : "hover:bg-white/[.05]"}`}><div className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-xl ${active === item.id ? "bg-black/10" : "bg-white/[.06]"}`}><Icon className="size-4" /></span><span className="min-w-0"><span className="block truncate text-xs font-semibold">{item.label}</span><span className={`block truncate text-[10px] ${active === item.id ? "text-black/50" : "text-white/30"}`}>{item.description}</span></span></div></button>; })}</div></aside>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] shadow-2xl">
                <div className="border-b border-white/[.06] bg-[#1c1c1c] px-5 py-4 sm:px-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-white text-black"><Sparkles className="size-4" /></div><div><p className="text-sm font-semibold">AI Studio</p><p className="text-[10px] text-white/35">Tous les modèles utilisent la même interface de génération</p></div></div>
                    <button onClick={() => setSelectorNote(`${selected.label} · ${selected.model}`)} className="hidden rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold sm:block">Upgrade</button>
                  </div>
                </div>

                <div className="px-4 pb-5 pt-4 sm:px-7 sm:pb-7">
                  <button onClick={() => setView("create")} className="mb-7 flex items-center gap-2 text-sm text-white/45 hover:text-white"><ArrowLeft className="size-4" /> Modèles</button>
                  <div className="min-h-[250px] rounded-[1.6rem] bg-[#0b0b0b] px-5 py-10 text-center sm:min-h-[310px]">
                    {busy ? <div className="flex h-[250px] flex-col items-center justify-center"><LoaderCircle className="size-12 animate-spin text-violet-400" /><p className="mt-5 text-sm text-white/70">Génération en cours…</p><p className="mt-1 text-xs text-white/30">{selected.label}</p></div> : results.length ? <div className="grid gap-3 sm:grid-cols-2">{results.map((r) => <div key={r.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#161616] text-left">{r.url && selected.category === "Image" ? <img src={r.url} className="aspect-video w-full object-cover" /> : r.url && selected.category === "Video" ? <video src={r.url} controls className="aspect-video w-full object-cover" /> : r.url ? <a href={r.url} target="_blank" rel="noreferrer" className="flex aspect-video items-center justify-center text-xs text-white/50">Ouvrir le résultat</a> : <div className="grid aspect-video place-items-center text-xs text-white/40">Résultat prêt</div>}<div className="flex items-center justify-between gap-2 p-3"><span className="text-[10px] text-white/40">{selected.label}</span>{r.url && <a href={r.url} download className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-semibold text-black">Télécharger</a>}</div></div>)}</div> : <div className="flex min-h-[250px] flex-col items-center justify-center"><div className="grid size-16 place-items-center rounded-2xl bg-white/[.04]"><Play className="size-7 text-white/20" /></div><p className="mt-5 text-sm text-white/35">Aucun résultat, commence à générer !</p><p className="mt-1 text-[10px] text-white/20">{selected.description}</p></div>}
                  </div>

                  <div className="mt-5 rounded-[1.8rem] border border-white/10 bg-[#242424] p-4 shadow-xl sm:p-5">
                    <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} placeholder={`Décrivez le résultat que vous souhaitez créer avec ${selected.label}…`} className="w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-white/25" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button onClick={enhancePrompt} disabled={enhancing} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[10px] text-white/55"><WandSparkles className="mr-1 inline size-3" />{enhancing ? "Optimisation…" : "Prompt Enhancer"}</button>
                      <button onClick={savePrompt} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[10px] text-white/55"><Save className="mr-1 inline size-3" />Sauvegarder</button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                      <div className="flex flex-wrap gap-2">
                        <label className="flex min-w-[210px] items-center gap-2 rounded-full bg-[#303030] px-4 py-2.5"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10"><WandSparkles className="size-3.5" /></span><select value={selected.id} onChange={e => { setActive(e.target.value); setError(null); }} className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-white outline-none"><option className="bg-[#222]" value={selected.id}>{selected.label}</option>{filtered.filter(x => x.id !== selected.id).map(x => <option className="bg-[#222]" key={x.id} value={x.id}>{x.label}</option>)}</select></label>
                        <div className="flex items-center rounded-full bg-[#303030] p-1"><button onClick={() => setAspectRatio("16:9")} className={`rounded-full px-3 py-2 text-[10px] ${aspectRatio === "16:9" ? "bg-[#4a4a4a] text-white" : "text-white/40"}`}>▭ 16:9</button><button onClick={() => setAspectRatio("9:16")} className={`rounded-full px-3 py-2 text-[10px] ${aspectRatio === "9:16" ? "bg-[#4a4a4a] text-white" : "text-white/40"}`}>▯ 9:16</button></div>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-[#303030] p-1 sm:justify-end">
                        <span className="px-2 text-[9px] text-white/30">Variantes</span>{[1,4,8].map(n => <button key={n} onClick={() => setVariants(n)} className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${variants === n ? "bg-white text-black" : "text-white/45"}`}>{n}</button>)}
                      </div>
                    </div>

                    <button onClick={() => fileRef.current?.click()} className="mt-3 flex min-h-[115px] w-full flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-white/20 bg-[#1b1b1b] text-center hover:border-white/35">
                      <Upload className="size-7 text-white/35" />
                      <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/80">{selected.category === "Video" ? "Télécharger une vidéo ou image" : selected.category === "Audio" ? "Télécharger un audio" : selected.category === "3D" ? "Télécharger une image de référence" : "Télécharger une image"}</span>
                      <span className="mt-1 text-[10px] text-white/30">Optionnel · fichier de référence</span>
                      {fileName && <button onClick={(e) => { e.stopPropagation(); setFileUrl(undefined); setFileName(undefined); }} className="mt-2 rounded-full bg-white/10 px-3 py-1 text-[9px] text-white/60">{fileName.slice(0, 38)} <X className="ml-1 inline size-3" /></button>}
                    </button>
                    <input ref={fileRef} type="file" className="hidden" onChange={e => upload(e.target.files?.[0])} />

                    <div className="mt-4 flex items-center gap-4">
                      <div className="min-w-[75px]"><p className="text-2xl font-semibold leading-none">25</p><p className="text-xs text-white/35">crédits</p></div>
                      <button disabled={busy} onClick={generate} className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 text-base font-semibold text-white shadow-lg shadow-violet-950/30 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg">{busy ? <LoaderCircle className="size-5 animate-spin" /> : <Zap className="size-5 fill-current" />}{busy ? "Génération…" : `Générer${variants > 1 ? ` ×${variants}` : ""}`}</button>
                    </div>
                  </div>

                  {error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-xs text-red-200">{error}</p>}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-white/25"><span>{selectorNote}</span><span>•</span><span>{selected.model}</span><span>•</span><span>Format {aspectRatio}</span></div>
                  {beforeUrl && afterUrl && <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-4"><div className="mb-3 flex items-center gap-2"><GalleryHorizontal className="size-4" /><span className="text-xs font-semibold">Comparaison avant / après</span></div><div className="grid gap-3 md:grid-cols-2"><div><p className="mb-2 text-[10px] text-white/40">AVANT</p><img src={beforeUrl} className="max-h-72 w-full rounded-2xl object-contain" /></div><div><p className="mb-2 text-[10px] text-white/40">APRÈS</p><img src={afterUrl} className="max-h-72 w-full rounded-2xl object-contain" /></div></div></div>}
                </div>

              </div>
            </div>
          </> : <>
            <div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-semibold">{view === "history" ? "History" : view === "creations" ? "My Creations" : view === "favorites" ? "Favorites" : view === "gallery" ? "Public Gallery" : "Templates"}</h2><p className="mt-1 text-xs text-white/35">{view === "gallery" ? "Les créations marquées publiques dans ce navigateur." : "Tes créations et ressources enregistrées."}</p></div><button onClick={() => setView("create")} className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black">Create</button></div>
            {view === "templates" ? <div className="grid gap-3 md:grid-cols-2">{templates.map(t => <button key={t.id} onClick={() => { setActive(t.toolId); setPrompt(t.prompt); setView("create"); }} className="rounded-2xl border border-white/10 bg-white/[.03] p-4 text-left hover:bg-white/[.06]"><div className="flex items-center justify-between"><span className="text-xs font-semibold">{t.name}</span><WandSparkles className="size-4 text-violet-300" /></div><p className="mt-2 line-clamp-3 text-[11px] text-white/45">{t.prompt}</p></button>)}{!templates.length && <Empty label="Aucun template sauvegardé." />}</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{visibleItems.map(item => <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">{item.url && item.category === "Image" ? <img src={item.url} className="aspect-square w-full object-cover" /> : item.url && item.category === "Video" ? <video src={item.url} controls className="aspect-video w-full object-cover" /> : <div className="grid aspect-square place-items-center bg-black/20 text-xs text-white/35">{item.tool}</div>}<div className="p-3"><p className="text-xs font-semibold">{item.tool}</p><p className="mt-1 line-clamp-2 text-[10px] text-white/35">{item.prompt}</p><div className="mt-3 flex items-center gap-1"><button onClick={() => toggleFavorite(item.id)} className={`grid size-8 place-items-center rounded-lg ${item.favorite ? "bg-pink-500/20 text-pink-300" : "bg-white/[.05] text-white/45"}`}><Heart className="size-3.5" /></button><button onClick={() => togglePublic(item.id)} className={`grid size-8 place-items-center rounded-lg ${item.public ? "bg-emerald-500/20 text-emerald-300" : "bg-white/[.05] text-white/45"}`}><GalleryHorizontal className="size-3.5" /></button>{item.url && <a href={item.url} download className="ml-auto grid size-8 place-items-center rounded-lg bg-white text-black"><Download className="size-3.5" /></a>}</div></div></article>)}{!visibleItems.length && <Empty label={view === "gallery" ? "Aucune création publiée." : "Aucune création pour le moment."} />}</div>}
          </>}
        </section>
      </div>
    </div>
  </main>;
}

function Empty({ label }: { label: string }) { return <div className="col-span-full flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-white/10 text-xs text-white/30">{label}</div>; }
