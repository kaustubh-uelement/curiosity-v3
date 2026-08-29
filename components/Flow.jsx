"use client";

import { useState } from "react";
import { INPUTS, OUTPUTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Flow({ className }) {
  const [hoveredInput, setHoveredInput] = useState(null);
  const [hoveredOutput, setHoveredOutput] = useState(null);

  return (
    <div className={cn("flow relative select-none", className)}>
      {/* Left Input Nodes */}
      <div className="flowCol z-10">
        {INPUTS.map((item, idx) => (
          <div
            className={cn(
              "fNode group transition-all duration-300 cursor-default",
              hoveredInput === idx && "border-orchid/60 bg-glass-2 text-white shadow-[0_0_20px_rgba(205,130,255,0.15)] -translate-x-1"
            )}
            key={item}
            onMouseEnter={() => setHoveredInput(idx)}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orchid/60 transition-colors group-hover:bg-orchid flex-none" />
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Center Core Engine */}
      <div className="fCore relative group overflow-hidden shadow-[0_0_50px_rgba(69,0,249,0.35)] transition-all duration-500 hover:shadow-[0_0_70px_rgba(135,82,250,0.5)]">
        {/* Core animated background glow */}
        <div
          className="absolute -inset-2 bg-gradient-to-r from-orchid/30 via-violet/30 to-electric/30 rounded-r-xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulseSlow"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="fRing transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M16 1.5 L19.8 12.2 L30.5 16 L19.8 19.8 L16 30.5 L12.2 19.8 L1.5 16 L12.2 12.2 Z"
                fill="#fff"
                opacity=".96"
              />
            </svg>
          </div>
          <span className="fn font-display tracking-tight text-[22px] font-semibold text-white">
            Curiosity AI
          </span>
          <span className="fs font-mono text-[11px] tracking-[0.16em] uppercase text-white/80 mt-2 block">
            Full-Stack Platform
          </span>
        </div>
      </div>

      {/* Right Output Nodes */}
      <div className="flowCol z-10">
        {OUTPUTS.map((item, idx) => (
          <div
            className={cn(
              "fNode group transition-all duration-300 cursor-default",
              hoveredOutput === idx && "border-orchid/60 bg-glass-2 text-white shadow-[0_0_20px_rgba(205,130,255,0.15)] translate-x-1"
            )}
            key={item}
            onMouseEnter={() => setHoveredOutput(idx)}
            onMouseLeave={() => setHoveredOutput(null)}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet/60 transition-colors group-hover:bg-violet flex-none" />
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


