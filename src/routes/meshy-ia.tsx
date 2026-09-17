import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/meshy-ia")({
  head: () => ({
    meta: [
      { title: "Meshy IA — Robot Scout" },
      {
        name: "description",
        content: "Prototype d’interface Meshy IA inspiré d’une maquette de génération 3D robotique.",
      },
    ],
  }),
  component: MeshyIA,
});

const toolButtons = ["⌕", "＋", "✎", "▣", "⌂", "▤", "◫", "◰"];

function MeshyIA() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(244,98,56,0.72),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(94,80,128,0.55),transparent_28%),linear-gradient(135deg,#7f1d1d_0%,#1a1b20_36%,#181c24_100%)] px-4 py-8">
      <div className="w-full max-w-[430px] rounded-[3rem] border border-[#49494d] bg-[#0c0d10] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="overflow-hidden rounded-[2.5rem] border border-[#2d2d2d] bg-[#0a0d11] px-3 pb-3 pt-2">
          <div className="mb-3 flex items-center justify-between px-4 pt-2 text-[15px] font-semibold text-[#f2f2f2]">
            <span>10:24</span>
            <div className="flex items-center gap-2 text-[12px] text-[#f2f2f2]">
              <span>◔</span>
              <span>◔</span>
              <span>▣</span>
              <span className="ml-1 text-[#f2f2f2]">78%</span>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111827] shadow-inner shadow-white/80">
              <span className="text-lg">◉</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#f3f3f3]">Robot Scout</p>
              <p className="text-[11px] text-[#a2a8b4]">Project Character</p>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full bg-[#2b3038] px-3 py-2 text-[11px] text-[#e1e5ea]">
              <button className="rounded-full bg-[#1f242b] px-2 py-1 text-[#d5d8dc]">Orthographic</button>
              <button className="rounded-full bg-transparent px-2 py-1 text-[#d5d8dc/80]">Perspective</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#444a52] bg-[#20262d] text-[#f3f4f6]">
                ⌁
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <aside className="flex w-[60px] flex-col items-center gap-3 rounded-[24px] bg-[#101418] px-2 py-3">
              {toolButtons.map((symbol, index) => (
                <button
                  key={index}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition ${
                    index === 2
                      ? "bg-[#f4d54d] text-[#12151a] shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                      : "bg-[#232b33] text-[#e9edf4]"
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </aside>

            <div className="flex-1 overflow-hidden rounded-[28px] border border-[#1d2329] bg-[#0e1218] p-3">
              <div className="relative h-[310px] overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_50%_25%,rgba(255,130,66,0.35),transparent_22%),linear-gradient(180deg,#0c0e12,#101317_40%,#0d1116)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,90,0,0.1),transparent_40%)]" />
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  {[
                    "◫",
                    "◌",
                    "◍",
                    "◈",
                  ].map((icon, idx) => (
                    <button
                      key={idx}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                        idx === 0
                          ? "border-[#f7d33c] bg-[#f4d54d] text-[#12151a]"
                          : "border-[#2c333b] bg-[#171d22] text-[#dfe7ee]"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>

                <div className="absolute left-1/2 top-7 h-44 w-44 -translate-x-1/2 rounded-[42%_42%_38%_38%] border border-[#eff3f8]/10 bg-gradient-to-br from-[#ecf2f9] via-[#d7dfe8] to-[#8a9198] shadow-[0_0_40px_rgba(255,91,0,0.35)]">
                  <div className="absolute inset-x-[18%] top-[18%] h-6 rounded-full bg-[#0b0f14]" />
                  <div className="absolute left-6 top-[22%] h-10 w-10 rounded-full border border-[#1d2329] bg-[#0a0d10]" />
                  <div className="absolute right-6 top-[22%] h-10 w-10 rounded-full border border-[#1d2329] bg-[#0a0d10]" />
                  <div className="absolute left-[30%] top-[26%] h-3 w-3 rounded-full bg-[#49b7ff] shadow-[0_0_15px_rgba(73,183,255,0.8)]" />
                  <div className="absolute right-[30%] top-[26%] h-3 w-3 rounded-full bg-[#ff513d] shadow-[0_0_15px_rgba(255,81,61,0.85)]" />
                  <div className="absolute left-1/2 top-[42%] h-11 w-12 -translate-x-1/2 rounded-[40%] border border-[#c7d0d8] bg-[#dfe7ee] shadow-inner shadow-black/20" />
                  <div className="absolute left-[18%] top-[48%] h-12 w-12 rounded-full border border-[#dfe7ee] bg-[linear-gradient(180deg,#f3f5f7,#d4d9de)] shadow-inner shadow-black/20" />
                  <div className="absolute right-[18%] top-[48%] h-12 w-12 rounded-full border border-[#dfe7ee] bg-[linear-gradient(180deg,#f3f5f7,#d4d9de)] shadow-inner shadow-black/20" />
                </div>

                <div className="absolute left-1/2 top-[28%] h-[160px] w-[180px] -translate-x-1/2 rounded-[38%_38%_30%_30%] bg-gradient-to-br from-[#ee3f35] via-[#d12d2d] to-[#7a1d1d] shadow-[0_0_35px_rgba(255,67,46,0.4)]">
                  <div className="absolute inset-x-2 top-3 h-16 rounded-[30%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
                  <div className="absolute left-[10%] bottom-8 h-12 w-10 rounded-[20%] bg-[#101418]" />
                  <div className="absolute right-[10%] bottom-8 h-12 w-10 rounded-[20%] bg-[#101418]" />
                  <div className="absolute left-[18%] bottom-0 h-20 w-14 rounded-[26%_30%_20%_18%] bg-gradient-to-r from-[#d9dfe4] to-[#7c8791]" />
                  <div className="absolute right-[18%] bottom-0 h-20 w-14 rounded-[30%_26%_18%_20%] bg-gradient-to-l from-[#d9dfe4] to-[#7c8791]" />
                </div>

                <div className="absolute left-1/2 top-[62%] h-20 w-28 -translate-x-1/2 rounded-[32%_32%_24%_24%] bg-[linear-gradient(180deg,#a8afb6,#70797f_45%,#2d3137)] opacity-90" />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-[#10151a] p-3 text-[#edf2f7] shadow-inner shadow-black/20">
            <div className="flex items-center gap-3 border-b border-[#2a3138] pb-3 text-[11px] text-[#dfe4eb]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d272d] text-[#f2f5f7]">◍</span>
              <div className="flex-1">
                <div className="text-[12px] font-medium">AI Model</div>
                <div className="text-[10px] text-[#a8b0bb]">Model Pro</div>
                <div className="text-[10px] text-[#8d96a4]">High-fidelity 3D generation</div>
              </div>
              <span className="text-[#dfe4eb]">⌄</span>
            </div>

            <div className="mt-3 space-y-3 text-[12px] text-[#dfe4eb]">
              <div className="flex items-center justify-between rounded-xl bg-[#1a2128] px-3 py-3">
                <span>Mode</span>
                <span className="text-[#bfc7d1]">Object</span>
              </div>
              <div className="flex overflow-hidden rounded-xl border border-[#2a3138] bg-[#1a2128] text-center text-[12px]">
                <div className="flex-1 bg-[#2a3038] px-3 py-2">Object</div>
                <div className="flex-1 px-3 py-2 text-[#dfe4eb]">Character</div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#1a2128] px-3 py-3">
                <span>Total variations</span>
                <div className="flex items-center gap-3 text-[#eef1f7]">
                  <button className="text-lg">−</button>
                  <span>4</span>
                  <button className="text-lg">＋</button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-[#1a2128] px-3 py-3">
                  <span>Topology</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="rounded-xl border border-[#2a3138] bg-[#1d2329] px-3 py-3 text-[#dfe4eb]">Standard</button>
                  <button className="rounded-xl border border-[#f4d54d] bg-[#1d2329] px-3 py-3 text-[#f4d54d] shadow-[0_0_0_1px_rgba(244,213,77,0.7)]">High detail</button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-[#1a2128] px-3 py-3">
                  <span>Style</span>
                  <span className="text-[#a7afba]">Realistic</span>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#1a2128] p-2">
                    <button className="rounded-xl border border-[#f4d54d] bg-[#11181e] px-2 py-2 text-[#f4d54d] shadow-[0_0_0_1px_rgba(244,213,77,0.7)]">Studio</button>
                    <button className="rounded-xl border border-[#2a3138] bg-[#1d2329] px-2 py-2 text-[#dfe4eb]">Soft</button>
                    <button className="rounded-xl border border-[#2a3138] bg-[#1d2329] px-2 py-2 text-[#dfe4eb]">Natural</button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#1a2128] px-3 py-3">
                <div className="mb-2 flex items-center justify-between text-[12px]">
                  <span>Creativity level</span>
                  <span className="text-[#f4d54d]">70%</span>
                </div>
                <div className="relative h-2 rounded-full bg-[#2c333a]">
                  <div className="absolute left-0 top-0 h-full w-[70%] rounded-full bg-[#f4d54d]" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-[#9aa5b1]">
                  <span>Conservative</span>
                  <span>Experimental</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#1a2128] px-3 py-3">
                <span>Texture</span>
                <span className="text-[#dfe4eb]">4K</span>
              </div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f4d54d] px-4 py-3 text-[16px] font-semibold text-[#131922] shadow-[0_0_0_1px_rgba(255,255,255,0.18)]">
              <span>✦</span>
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
