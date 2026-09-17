import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eleven-labs")({
  head: () => ({
    meta: [
      { title: "Eleven Labs — Text to Speech" },
      {
        name: "description",
        content: "Interface de synthèse vocale inspirée du design ElevenLabs.",
      },
    ],
  }),
  component: ElevenLabsPage,
});

const bars = Array.from({ length: 24 }, (_, index) => index + 1);

function ElevenLabsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8e2dc] p-6 sm:p-10">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="relative w-[300px] rounded-[2.8rem] border-[3px] border-[#d48d55] bg-[#f6f0ea] p-4 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)] sm:w-[360px]">
          <div className="mb-4 flex items-center justify-between text-[#4f4a46]">
            <span className="text-xl">←</span>
            <div className="flex h-10 items-center justify-center rounded-full bg-[#f1ece8] px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7b7068]">
              Text to Speech
            </div>
            <span className="text-xl">＋</span>
          </div>

          <div className="mb-4 rounded-full border border-[#d9c9ba] bg-[#f0ece8] p-2">
            <div className="flex items-center justify-between gap-2">
              <div className="h-7 w-7 rounded-full bg-[#e7d7c7]" />
              <div className="flex flex-1 items-end justify-center gap-[2px]">
                {bars.map((bar) => (
                  <span
                    key={bar}
                    className="block rounded-full bg-[#c3b4a5]"
                    style={{
                      width: "3px",
                      height: `${10 + ((bar * 7) % 18)}px`,
                      opacity: 0.75,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0d2c4] bg-[#f8f3ef] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="mb-3 flex items-center gap-2 text-[#5d524a]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d9b18c] bg-[#f3e3d2] text-[11px] font-semibold text-[#554b45]">
                J
              </span>
              <span className="text-[11px] font-medium">James</span>
              <span className="text-[10px] text-[#8b8179]">Creativity 75%</span>
              <span className="text-[10px] text-[#8b8179]">Stability 60%</span>
              <span className="ml-auto text-base text-[#5b514a]">×</span>
            </div>

            <div className="space-y-4 text-[14px] leading-[1.6] text-[#463d38]">
              <p>
                From an early age, we were taught to believe that life must be constantly
                controlled, that everything has to be carefully managed, thoroughly thought through,
                strategically planned and correctly decided. We were taught that if we fail to
                monitor every detail, things will easily fall apart. But what if we discovered that
                this idea of controlling life is nothing more than a cruel illusion, rooted in
                evolutionary remnants of the human mind? <span className="text-[#d08449]">(breek)</span>
              </p>

              <p>
                Many people still believe that if they had enough information and planned well enough,
                they could predict and control the course of their lives, or even the world around
                them. Of course, this is not possible.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f0e7e0] px-3 py-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-sm text-white">
              ▶
            </button>
            <div className="flex flex-1 items-end justify-center gap-[3px]">
              {Array.from({ length: 18 }, (_, index) => (
                <span
                  key={index}
                  className="block rounded-full bg-[#4a433f]"
                  style={{
                    width: "4px",
                    height: `${8 + ((index * 9) % 26)}px`,
                  }}
                />
              ))}
            </div>
            <button className="text-lg text-[#6b625d]">⌁</button>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded-lg border border-[#e7c19a] bg-[#f5e8dc] px-2 py-2 text-[11px] font-medium text-[#8a6242]">
              Enhance
            </button>
            <button className="flex-1 rounded-lg border border-[#dcc8b8] bg-[#f8f3ef] px-2 py-2 text-[11px] font-medium text-[#5b514a]">
              Regenerate
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dcc8b8] bg-[#f8f3ef] text-base text-[#5b514a]">
              ✎
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-[#e9d8c9] bg-[#f8f3ef] p-3 text-[14px] leading-[1.6] text-[#453f3b]">
            Even if we were to hypothetically know the position and state of every atom in the
            universe <span className="text-[#d08449]">(which is both practically and theoretically
            impossible)</span>, we still would not be able to predict the future or control the flow
            of life. Life is not caused then e <span className="text-[#d08449]">tra...</span>
          </div>
        </div>
      </div>
    </main>
  );
}
