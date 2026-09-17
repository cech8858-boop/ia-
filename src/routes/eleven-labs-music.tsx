import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eleven-labs-music")({
  head: () => ({
    meta: [
      { title: "Eleven Labs Music — Featured Voices" },
      {
        name: "description",
        content: "Interface de génération musicale inspirée du design ElevenLabs Music.",
      },
    ],
  }),
  component: ElevenLabsMusicPage,
});

const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["←", "Z", "X", "C", "V", "B", "N", "M", "→"];

function ElevenLabsMusicPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8e2dc] p-6 sm:p-10">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="relative w-[300px] rounded-[2.8rem] border-[3px] border-[#262421] bg-[#1d1d1d] p-4 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.55)] sm:w-[360px]">
          <div className="mb-4 flex items-center justify-between text-[#d6d1ce]">
            <span className="text-xl">←</span>
            <div className="flex h-10 items-center justify-center rounded-full bg-[#2c2b2b] px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d7d1ce]">
              Text to Speech
            </div>
            <span className="text-xl">＋</span>
          </div>

          <div className="mb-4 rounded-2xl border border-[#34312f] bg-[#2d2a28] p-3 text-[#eae3dc]">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#a7a09b]">
              Featured Voices
            </div>

            <div className="rounded-2xl border border-[#d8c7b0] bg-[#f0e1d4] p-3 text-[#352f2a] shadow-inner">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9b899] text-[11px] font-semibold text-[#382f2c]">
                  J
                </span>
                <span className="text-[12px] font-medium">James (Sample)</span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3c2e2a] text-xs text-[#f4ece9]">
                  ▶
                </button>
                <div className="flex flex-1 items-end justify-center gap-[2px]">
                  {Array.from({ length: 22 }, (_, index) => (
                    <span
                      key={index}
                      className="block rounded-full bg-[#615650]"
                      style={{ width: "3px", height: `${8 + ((index * 5) % 22)}px` }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[11px] italic leading-relaxed text-[#756a62]">
                “Hello, this is a preview of my voice. I’m James, and I sound husky & engaging.”
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
              {[
                ["James", "Husky & Engaging"],
                ["Sarah", "Clever & Professional"],
                ["Mason", "Deep & Rich"],
              ].map(([name, style]) => (
                <div key={name} className="rounded-xl bg-[#2a2a2a] px-2 py-2 text-[#d9d3d1]">
                  <div className="mb-1 flex items-center justify-center gap-1 text-[10px] text-[#e9d6b6]">
                    <span>◉</span>
                    <span>{name}</span>
                  </div>
                  <p className="text-[8px] text-[#a9a09c]">{style}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#35302e] bg-[#2b2928] p-3 text-[#d6d1ce]">
            <input
              className="w-full border-0 bg-transparent text-[12px] text-[#cfc6c0] placeholder:text-[#857d78] outline-none"
              value="Type or paste your text..."
              readOnly
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-[#131313] px-3 py-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e1d1d] text-base text-[#f8efee]">
              +
            </button>
            <button className="rounded-full border border-[#35302e] bg-[#2a2827] px-3 py-1 text-[11px] text-[#eaebe5]">
              Ae
            </button>
            <div className="flex items-center gap-2 text-[11px] text-[#e8ddd7]">
              <span>14</span>
              <span>16</span>
              <span>18</span>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2827] text-[#f7f0ed]">
              ◌
            </button>
          </div>

          <div className="mt-4 space-y-2 text-[#f4eee9]">
            <div className="flex justify-center gap-1.5">
              {topRow.map((key) => (
                <span key={key} className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2c2c2d] text-[12px] font-medium shadow-inner shadow-black/10">
                  {key}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-1.5 pl-4">
              {middleRow.map((key) => (
                <span key={key} className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2c2c2d] text-[12px] font-medium shadow-inner shadow-black/10">
                  {key}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-1.5">
              {bottomRow.map((key) => (
                <span
                  key={key}
                  className={`flex items-center justify-center rounded-md bg-[#2c2c2d] text-[12px] font-medium shadow-inner shadow-black/10 ${
                    key === "←" || key === "→" ? "h-8 w-10" : key === "123" ? "h-8 w-12" : "h-8 w-8"
                  }`}
                >
                  {key}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2 pt-1 text-[11px] text-[#d9d0ca]">
              <span className="flex h-8 w-12 items-center justify-center rounded-md bg-[#252323]">123</span>
              <span className="flex h-8 w-20 items-center justify-center rounded-md bg-[#252323]">Space</span>
              <span className="flex h-8 w-16 items-center justify-center rounded-md bg-[#252323]">Return</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
