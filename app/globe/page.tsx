import type { Metadata } from "next";
import MarketGlobeClient from "@/components/MarketGlobe/MarketGlobeClient";

export const metadata: Metadata = {
  title: "Market Globe · Equivest",
  description:
    "Interactive geodesic view of LSE-listed securities - gainers, losers, and live sentiment across the index.",
};

export default function GlobePage() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-[#05080C]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_at_bottom,rgba(47,128,237,0.15),transparent_70%)]" />
      </div>

      <header className="pointer-events-none absolute top-0 left-0 z-10 px-8 pt-28 md:px-12">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(47,128,237,0.7)]" />
          LSE · Live Snapshot
        </div>
        <h1 className="mt-5 max-w-xl text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl">
          Market Globe
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
          Click a ticker to inspect price action. Drag to rotate; scroll to zoom.
        </p>
      </header>

      <div className="absolute inset-0 z-0">
        <MarketGlobeClient mode="interactive" />
      </div>
    </section>
  );
}
