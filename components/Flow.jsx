"use client";

import { useState } from "react";
import Image from "next/image";
import { INPUTS, OUTPUTS } from "@/lib/content";
import { cn } from "@/lib/utils";

const INPUT_ICONS = [
  // Land & connectivity
  <svg key="land" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>,
  // Power & renewable energy
  <svg key="power" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  // Capital for scale
  <svg key="capital" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M15 9.5a3.5 3.5 0 0 0-7 0v5a3.5 3.5 0 0 0 7 0" />
  </svg>,
  // GPUs from NVIDIA/AMD
  <svg key="gpu" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
  </svg>,
  // CPUs, networking & cooling
  <svg key="infra" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
  </svg>,
  // Deployment & AI Factory
  <svg key="deploy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>,
];

const OUTPUT_ICONS = [
  // Offtakers
  <svg key="offtake" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>,
  // Neo-clouds in US
  <svg key="neocloud" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>,
  // Enterprise customers
  <svg key="enterprise" width="16" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>,
  // GPUaaS aggregate demand
  <svg key="demand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>,
  // Revenue-generating AI Factory
  <svg key="factory" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
];

export default function Flow({ className }) {
  const [hoveredInput, setHoveredInput] = useState(null);
  const [hoveredOutput, setHoveredOutput] = useState(null);
  const [isCoreHovered, setIsCoreHovered] = useState(false);

  return (
    <div className={cn("flow-container relative my-6 overflow-hidden", className)}>
      {/* Visual Ambient Core Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[340px] bg-gradient-to-r from-electric/25 via-violet/30 to-orchid/25 rounded-full blur-[100px] opacity-70"
        aria-hidden="true"
      />

      <div className="flow relative grid grid-cols-1 lg:grid-cols-[1fr_260px_1fr] gap-6 sm:gap-8 items-center">
        {/* Left Column: Inputs */}
        <div className="flowCol flex flex-col gap-3 relative z-10">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-orchid font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orchid animate-ping inline-block" />
              Platform Inputs
            </span>
            <span className="font-mono text-[10.5px] text-tx-3">Phase 1 to 4</span>
          </div>

          {INPUTS.map((item, idx) => {
            const isHovered = hoveredInput === idx;
            return (
              <div
                key={item}
                onMouseEnter={() => setHoveredInput(idx)}
                onMouseLeave={() => setHoveredInput(null)}
                className={cn(
                  "fNode group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                  isHovered
                    ? "border-orchid/80 bg-white/[0.08] shadow-[0_0_24px_rgba(92,174,255,0.25)] -translate-x-1 text-white"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 text-tx-2"
                )}
              >
                {/* Accent indicator bar */}
                <div
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-orchid to-violet transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                />

                <span
                  className={cn(
                    "flex-none flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300",
                    isHovered
                      ? "bg-orchid text-ink shadow-[0_0_12px_rgba(92,174,255,0.6)]"
                      : "bg-white/5 border border-white/10 text-orchid"
                  )}
                >
                  {INPUT_ICONS[idx % INPUT_ICONS.length]}
                </span>

                <span className="text-[13.5px] sm:text-[14px] font-medium tracking-tight flex-1">
                  {item}
                </span>

                <span className="font-mono text-[10px] text-tx-3 group-hover:text-orchid transition-colors">
                  0{idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Column: Curiosity AI Engine */}
        <div
          onMouseEnter={() => setIsCoreHovered(true)}
          onMouseLeave={() => setIsCoreHovered(false)}
          className="fCore relative z-20 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl border border-white/30 bg-gradient-to-b from-electric via-violet to-ink-2 shadow-[0_0_60px_rgba(65,126,243,0.45)] transition-all duration-500 hover:shadow-[0_0_90px_rgba(135,60,230,0.6)] hover:scale-[1.03] overflow-hidden text-center cursor-default"
        >
          {/* Animated Background Rays */}
          <div
            className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(65,126,243,0.25)_0%,transparent_70%)] animate-pulseSlow"
            aria-hidden="true"
          />

          {/* Orbital Core Ring with Official Icon */}
          <div className="fRing relative w-16 h-16 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md mb-3.5 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform duration-500 hover:scale-110 p-3 overflow-hidden">
            <Image
              src="/curiosity-ai-icon-blue.png"
              alt="Curiosity AI Icon"
              width={48}
              height={48}
              className="w-full h-full object-contain drop-shadow"
              priority
            />
          </div>

          {/* Official Blue Brand Logo */}
          <div className="my-1.5 flex items-center justify-center">
            <Image
              src="/curiosity-ai-white-logo.png"
              alt="Curiosity AI"
              width={185}
              height={22}
              className="h-6 sm:h-7 w-auto object-contain drop-shadow"
              priority
            />
          </div>
          <span className="fs font-mono text-[11px] tracking-[0.18em] uppercase text-white/90 font-medium mt-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20">
            Orchestration Core
          </span>

          <div className="mt-4 pt-3 border-t border-white/20 w-full text-center">
            <span className="font-mono text-[10.5px] text-white/80 tracking-wider uppercase block">
              5MW → 100MW+ Deployment
            </span>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="flowCol flex flex-col gap-3 relative z-10">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet animate-pulse inline-block" />
              Compute Outputs
            </span>
            <span className="font-mono text-[10.5px] text-tx-3">Contracted</span>
          </div>

          {OUTPUTS.map((item, idx) => {
            const isHovered = hoveredOutput === idx;
            return (
              <div
                key={item}
                onMouseEnter={() => setHoveredOutput(idx)}
                onMouseLeave={() => setHoveredOutput(null)}
                className={cn(
                  "fNode group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                  isHovered
                    ? "border-violet/80 bg-white/[0.08] shadow-[0_0_24px_rgba(22,98,204,0.25)] translate-x-1 text-white"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 text-tx-2"
                )}
              >
                {/* Accent indicator bar */}
                <div
                  className={cn(
                    "absolute right-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-violet to-orchid transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                />

                <span
                  className={cn(
                    "flex-none flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300",
                    isHovered
                      ? "bg-violet text-white shadow-[0_0_12px_rgba(22,98,204,0.6)]"
                      : "bg-white/5 border border-white/10 text-violet"
                  )}
                >
                  {OUTPUT_ICONS[idx % OUTPUT_ICONS.length]}
                </span>

                <span className="text-[13.5px] sm:text-[14px] font-medium tracking-tight flex-1">
                  {item}
                </span>

                <span className="font-mono text-[10px] text-tx-3 group-hover:text-violet transition-colors">
                  0{idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



