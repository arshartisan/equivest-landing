"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { MarketGlobeProps } from "./MarketGlobe";

function GlobeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative h-[60%] aspect-square max-h-[600px]"
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(47,128,237,0.28) 0%, rgba(47,128,237,0.08) 45%, transparent 70%)",
          }}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-[18%] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-[32%] rounded-full border border-white/[0.06]"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

const MarketGlobeImpl = dynamic(() => import("./MarketGlobe"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

export function MarketGlobeClient(props: MarketGlobeProps) {
  return <MarketGlobeImpl {...props} />;
}

export default MarketGlobeClient;
