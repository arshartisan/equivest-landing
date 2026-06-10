"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import GlobeMesh from "./GlobeMesh";
import InfoPanel from "./InfoPanel";
import Legend from "./Legend";
import MOCK_STOCKS from "@/data/stocks";
import type { Stock } from "./types";

export type MarketGlobeProps = {
  stocks?: Stock[];
  mode?: "interactive" | "decorative";
  className?: string;
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function MarketGlobe({
  stocks = MOCK_STOCKS,
  mode = "interactive",
  className,
}: MarketGlobeProps) {
  const interactive = mode === "interactive";
  const reducedMotion = usePrefersReducedMotion();

  const [active, setActive] = useState<Stock | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<Stock | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const resumeTimer = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    if (!interactive) return;
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setPaused(true);
  }, [interactive]);

  const handleEnd = useCallback(() => {
    if (!interactive) return;
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, 2000);
  }, [interactive]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const handleHover = useCallback(
    (stock: Stock | null, pos: { x: number; y: number } | null) => {
      setHovered(stock);
      setHoverPos(pos);
    },
    [],
  );

  const handleSelect = useCallback((stock: Stock) => {
    setActive(stock);
  }, []);

  const handleCanvasPointerMissed = useCallback(() => {
    if (!interactive) return;
    setActive(null);
  }, [interactive]);

  // ── WebGL context-loss recovery ──────────────────────────────────────────
  // A lost GL context (hybrid-GPU power switch, GPU TDR/reset, tab backgrounded,
  // or browser evicting an old context when too many exist) permanently blanks
  // the canvas: three.js stops drawing and nothing rebuilds the GL resources.
  // The cleared, alpha:true canvas then shows through to the page's black bg -
  // the "globe vanishes after some time" symptom.
  //
  // We recover by remounting the whole Canvas (bumping `contextKey`) for a fresh
  // renderer + scene. Crucially we trigger this on `webglcontextlost` itself -
  // NOT on `webglcontextrestored`, which the browser may never fire if the
  // context was evicted rather than reset. A retry cap stops a tight remount
  // loop if the GPU is genuinely unavailable.
  const [contextKey, setContextKey] = useState(0);
  const recoveryAttempts = useRef(0);
  const MAX_RECOVERY_ATTEMPTS = 5;

  const dprMax = interactive ? 2 : 1.5;
  const starsCount = interactive ? 3000 : 1200;
  const bloomIntensity = interactive ? 0.7 : 0.45;

  return (
    <div
      className={
        "relative h-full w-full" +
        (interactive ? "" : " pointer-events-none") +
        (className ? ` ${className}` : "")
      }
    >
      <Canvas
        key={contextKey}
        dpr={[1, dprMax]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          // Pin the discrete GPU. On Windows hybrid-graphics laptops the OS can
          // switch the browser from the integrated to the discrete GPU
          // mid-session, silently killing the WebGL context. Requesting
          // high-performance up front avoids that switch; failIfMajor… keeps us
          // rendering on weaker GPUs instead of refusing a context.
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          // If this context survives a while, the recovery worked - reset the
          // budget so rare losses over a long session don't exhaust it.
          const stableTimer = window.setTimeout(() => {
            recoveryAttempts.current = 0;
          }, 15000);
          canvas.addEventListener(
            "webglcontextlost",
            (e) => {
              // Ignore losses fired by R3F's own teardown (StrictMode double-
              // mount, Fast Refresh, our own remount): in those cases R3F has
              // already detached the canvas from the DOM before calling
              // forceContextLoss(), so `isConnected` is false. Recovering from
              // those would fight the lifecycle and churn through the budget.
              // Only a real GPU loss happens while the canvas is still live.
              if (!canvas.isConnected) return;
              // Allow the browser to (try to) restore, but don't depend on it.
              e.preventDefault();
              window.clearTimeout(stableTimer);
              if (recoveryAttempts.current >= MAX_RECOVERY_ATTEMPTS) return;
              recoveryAttempts.current += 1;
              // Remount with a fresh context on the next tick.
              setContextKey((k) => k + 1);
            },
            false,
          );
        }}
        onPointerMissed={handleCanvasPointerMissed}
      >
        {interactive && <color attach="background" args={["#05080C"]} />}
        <ambientLight intensity={0.45} />
        <pointLight position={[0, 0, 0]} intensity={1.4} color="#2F80ED" distance={6} decay={1.6} />
        <pointLight position={[5, 4, 5]} intensity={0.5} color="#C8A96A" />

        {/* Stars + post-processing only in interactive mode.
            Decorative (hero) mode skips them: the hero already has its own
            ambient radial wash, and EffectComposer + Bloom on a transparent
            (alpha:true) canvas can fail to composite, blanking the scene. */}
        {interactive && (
          <Stars
            radius={50}
            depth={30}
            count={starsCount}
            factor={2}
            fade
            speed={reducedMotion ? 0 : 0.4}
          />
        )}

        <GlobeMesh
          stocks={stocks}
          interactive={interactive}
          paused={paused}
          reducedMotion={reducedMotion}
          hoveredTicker={hovered?.ticker ?? null}
          selectedTicker={active?.ticker ?? null}
          onHover={handleHover}
          onSelect={handleSelect}
        />

        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.6}
            zoomSpeed={0.5}
            minDistance={4}
            maxDistance={9}
            onStart={handleStart}
            onEnd={handleEnd}
          />
        )}

        {interactive && (
          <EffectComposer>
            <Bloom intensity={bloomIntensity} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
            <Vignette eskil={false} offset={0.2} darkness={0.7} />
          </EffectComposer>
        )}
      </Canvas>

      {/* Hover tooltip - Framer Motion, screen-anchored */}
      <AnimatePresence>
        {interactive && hovered && hoverPos && (
          <motion.div
            key={`tip-${hovered.ticker}`}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              left: hoverPos.x + 14,
              top: hoverPos.y + 14,
              pointerEvents: "none",
            }}
            className="z-30 rounded-lg border border-white/10 bg-[rgba(11,15,20,0.88)] px-3 py-2 text-xs text-white shadow-[0_6px_24px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <div className="font-mono text-[10px] tracking-[0.16em] text-white/55">
              {hovered.ticker}
            </div>
            <div className="mt-0.5 text-[13px] font-semibold leading-tight">{hovered.name}</div>
            <div className="mt-1 flex items-baseline gap-2 tabular-nums">
              <span className="font-medium">{hovered.price.toFixed(2)}</span>
              <span
                style={{
                  color:
                    hovered.change > 0 ? "#3ddc84" : hovered.change < 0 ? "#ff4d4d" : "#A0AEC0",
                }}
              >
                {hovered.change > 0 ? "+" : ""}
                {hovered.changePct.toFixed(2)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info panel - slide-in from right */}
      <AnimatePresence>
        {interactive && active && (
          <InfoPanel key={active.ticker} stock={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>

      {/* Legend */}
      {interactive && <Legend />}
    </div>
  );
}
