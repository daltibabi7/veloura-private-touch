"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<number>(1);
  const [hasExited, setHasExited] = useState<boolean>(false);

  useEffect(() => {
    // Respect user reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    // Stage 1: Line appears & expands (0ms - 1800ms)
    const t1 = setTimeout(() => {
      setStage(2); // Stage 2: The Brand Reveal (1800ms - 4200ms)
    }, 1800);

    // Stage 3: Architectural 3D expansion (4200ms - 6200ms)
    const t2 = setTimeout(() => {
      setStage(3);
    }, 4200);

    // Stage 4: Transition to experience (6200ms - 7500ms)
    const t3 = setTimeout(() => {
      setStage(4);
    }, 6200);

    // Final finish and exit
    const t4 = setTimeout(() => {
      handleFinish();
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleFinish = () => {
    setHasExited(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0D] transition-opacity duration-1000 select-none ${
        hasExited ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="absolute top-8 right-8 z-50 flex items-center gap-2 px-5 py-2 rounded-full border border-[#C6A66B]/30 text-xs tracking-[0.25em] text-[#DFCA9A] hover:bg-[#C6A66B]/10 hover:border-[#C6A66B] transition-all duration-300 uppercase cursor-pointer"
        aria-label="Skip introduction"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Atmospheric Ambient Glow */}
      <div
        className={`absolute inset-0 bg-radial from-[#C6A66B]/15 via-transparent to-transparent transition-opacity duration-1500 pointer-events-none ${
          stage >= 2 ? "opacity-100 scale-110" : "opacity-0 scale-90"
        }`}
      />

      {/* STAGE 1: Expanding Golden Horizon Line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`h-[1px] bg-gradient-to-r from-transparent via-[#C6A66B] to-transparent transition-all duration-1200 ease-out ${
            stage === 1
              ? "w-48 shadow-[0_0_15px_#C6A66B]"
              : stage >= 2
              ? "w-[90vw] max-w-4xl opacity-30 shadow-[0_0_30px_#C6A66B]"
              : "w-0 opacity-0"
          }`}
        />
      </div>

      {/* Particles effect overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          stage >= 2 ? "opacity-70" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-[#DFCA9A] animate-ping opacity-60" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-[#C6A66B] animate-pulse opacity-80" />
        <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-[#DFCA9A] animate-ping opacity-50" />
      </div>

      {/* STAGE 2: BRAND REVEAL */}
      <div className="relative text-center z-10 px-6 max-w-3xl">
        <div
          className={`transition-all duration-1000 ease-out transform ${
            stage >= 2
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-95"
          }`}
        >
          {/* Subtle Crest / Symbol */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full border border-[#C6A66B]/40 flex items-center justify-center">
              <span className="font-serif text-[#C6A66B] text-lg font-light tracking-widest">
                V
              </span>
            </div>
          </div>

          {/* VELOURA */}
          <h1
            className="text-4xl md:text-7xl font-serif tracking-[0.35em] text-[#F7F3EC] mb-3 uppercase font-light drop-shadow-md"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            VELOURA
          </h1>

          {/* PRIVATE TOUCH */}
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="h-[1px] w-12 bg-[#C6A66B]/50" />
            <h2 className="text-xs md:text-sm tracking-[0.45em] text-[#C6A66B] uppercase font-medium">
              PRIVATE TOUCH
            </h2>
            <span className="h-[1px] w-12 bg-[#C6A66B]/50" />
          </div>

          {/* TAGLINE */}
          <p
            className={`text-xs md:text-sm tracking-[0.25em] text-[#999999] uppercase transition-all duration-1000 delay-300 font-light mt-4 ${
              stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            An Experience Beyond Ordinary Relaxation.
          </p>
        </div>

        {/* STAGE 3 & 4 Architectural cues */}
        <div
          className={`mt-12 transition-all duration-1000 ${
            stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#DFCA9A]/80 py-1.5 px-4 rounded-full border border-[#C6A66B]/20 bg-[#171719]/40 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#C6A66B] animate-spin" style={{ animationDuration: "6s" }} />
            <span>Entering Wellness Sanctuary</span>
          </div>
        </div>
      </div>

      {/* Ambient Floor Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
