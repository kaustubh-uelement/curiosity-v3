"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { INPUTS, OUTPUTS } from "@/lib/content";
import { cn } from "@/lib/utils";

const INPUT_ICONS = [
  <svg key="land" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  <svg key="power" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg key="capital" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9.5a3.5 3.5 0 0 0-7 0v5a3.5 3.5 0 0 0 7 0" /></svg>,
  <svg key="gpu" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" /></svg>,
  <svg key="infra" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>,
  <svg key="deploy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
];

const OUTPUT_ICONS = [
  <svg key="offtake" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>,
  <svg key="neocloud" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
  <svg key="enterprise" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg>,
  <svg key="demand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  <svg key="factory" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
];

/* ── PCB trace SVG overlay ─────────────────────────────────────────────── */
function PcbTraces({ containerRef, inputRefs, outputRefs, coreRef }) {
  const [paths, setPaths] = useState([]);

  const compute = useCallback(() => {
    if (!containerRef.current || !coreRef.current) return;
    const base = containerRef.current.getBoundingClientRect();

    const rel = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        top:    r.top    - base.top,
        bottom: r.bottom - base.top,
        left:   r.left   - base.left,
        right:  r.right  - base.left,
        midY:   r.top    - base.top + r.height / 2,
        midX:   r.left   - base.left + r.width / 2,
      };
    };

    const core = rel(coreRef.current);
    if (!core) return;

    const newPaths = [];
    const cornerR  = 6;

    /* ── H→V→H path builder ────────────────────────────────────────────
       t ∈ [0,1] controls the elbow X position: 0=near x1, 1=near x2   */
    const zPath = (x1, y1, x2, y2, t) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      if (Math.abs(dy) < 2) return `M ${x1} ${y1} L ${x2} ${y2}`;
      const ex = x1 + dx * t;
      const cr = Math.min(cornerR, Math.abs(dx * t) / 2, Math.abs(dx * (1 - t)) / 2, Math.abs(dy) / 2);
      const sx = dx > 0 ? 1 : -1;
      const sy = dy > 0 ? 1 : -1;
      return `M ${x1} ${y1} L ${ex - sx*cr} ${y1} Q ${ex} ${y1} ${ex} ${y1+sy*cr} L ${ex} ${y2-sy*cr} Q ${ex} ${y2} ${ex+sx*cr} ${y2} L ${x2} ${y2}`;
    };

    /* ── t interpolation within a zone ─────────────────────────────────
       rank=0 → zone[0], rank=count-1 → zone[1]                        */
    const tVal = (rank, count, zone) => {
      if (count <= 1) return (zone[0] + zone[1]) / 2;
      return zone[0] + (rank / (count - 1)) * (zone[1] - zone[0]);
    };

    /* ══ INPUT SIDE (left cards → core left edge) ═══════════════════════
       Split wires by travel direction:
         • DOWN wires (card above core connection): use RIGHT zone [0.55, 0.93]
           elbow t DECREASES top→bottom so H1 of lower wires never reaches
           the vertical column of upper wires.
         • UP wires (card below core connection):   use LEFT zone [0.07, 0.45]
           elbow t INCREASES top→bottom for the same reason.
       The 10% gap between zones (0.45–0.55) prevents cross-group crossings. */
    const nIn = inputRefs.current.filter(Boolean).length;

    const inInfos = inputRefs.current.map((el, i) => {
      const card = rel(el);
      if (!card) return null;
      const y2 = core.top + (core.bottom - core.top) * ((i + 1) / (nIn + 1));
      return { i, card, y2, down: card.midY <= y2 };
    }).filter(Boolean);

    const downIn = inInfos.filter(w => w.down);
    const upIn   = inInfos.filter(w => !w.down);

    // Down inputs: t descending so top card gets largest t (elbow closest to core)
    downIn.forEach(({ i, card, y2 }, rank) => {
      const t = tVal(downIn.length - 1 - rank, downIn.length, [0.55, 0.93]);
      newPaths.push({ d: zPath(card.right, card.midY, core.left, y2, t), side: "input", idx: i });
    });

    // Up inputs: t ascending so top-of-group gets smallest t (elbow closest to card)
    upIn.forEach(({ i, card, y2 }, rank) => {
      const t = tVal(rank, upIn.length, [0.07, 0.45]);
      newPaths.push({ d: zPath(card.right, card.midY, core.left, y2, t), side: "input", idx: i });
    });

    /* ══ OUTPUT SIDE (core right edge → right cards) ════════════════════
         • UP outputs   (card above core connection): LEFT zone [0.07, 0.45]
           t INCREASES top→bottom — mirrors below-core inputs.
         • DOWN outputs (card below core connection): RIGHT zone [0.55, 0.93]
           t DECREASES top→bottom — mirrors above-core inputs.            */
    const nOut = outputRefs.current.filter(Boolean).length;

    const outInfos = outputRefs.current.map((el, i) => {
      const card = rel(el);
      if (!card) return null;
      const y1 = core.top + (core.bottom - core.top) * ((i + 1) / (nOut + 1));
      return { i, card, y1, up: card.midY <= y1 };
    }).filter(Boolean);

    const upOut   = outInfos.filter(w => w.up);
    const downOut = outInfos.filter(w => !w.up);

    // Up outputs: t ascending (top gets smallest t → elbow closest to core.right)
    upOut.forEach(({ i, card, y1 }, rank) => {
      const t = tVal(rank, upOut.length, [0.07, 0.45]);
      newPaths.push({ d: zPath(core.right, y1, card.left, card.midY, t), side: "output", idx: i });
    });

    // Down outputs: t descending (top-of-group gets largest t → elbow closest to card)
    downOut.forEach(({ i, card, y1 }, rank) => {
      const t = tVal(downOut.length - 1 - rank, downOut.length, [0.55, 0.93]);
      newPaths.push({ d: zPath(core.right, y1, card.left, card.midY, t), side: "output", idx: i });
    });

    setPaths(newPaths);
  }, [containerRef, inputRefs, outputRefs, coreRef]);

  useEffect(() => {
    compute();
    const ro = new ResizeObserver(compute);
    const el = containerRef.current;
    if (el) ro.observe(el);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, [compute, containerRef]);

  if (!paths.length) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ zIndex: 5 }}
    >
      <defs>
        {/* Input (orchid) pulse gradient */}
        <linearGradient id="pulseIn" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
          <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </linearGradient>
        {/* Output (violet/blue) pulse gradient */}
        <linearGradient id="pulseOut" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#417ef3" stopOpacity="0" />
          <stop offset="50%" stopColor="#417ef3" stopOpacity="1" />
          <stop offset="100%" stopColor="#417ef3" stopOpacity="0" />
        </linearGradient>
      </defs>

      {paths.map(({ d, side, idx }) => {
        const isInput = side === "input";
        const traceColor = isInput ? "rgba(192,132,252,0.18)" : "rgba(65,126,243,0.18)";
        const dotColor   = isInput ? "#c084fc" : "#417ef3";
        const glowColor  = isInput ? "rgba(192,132,252,0.55)" : "rgba(65,126,243,0.55)";
        const delay      = `${idx * 0.38}s`;
        const dur        = `${2.4 + idx * 0.15}s`;
        const uid        = `${side}-${idx}`;

        return (
          <g key={uid}>
            {/* Base trace */}
            <path
              d={d}
              fill="none"
              stroke={traceColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Glow trace */}
            <path
              d={d}
              fill="none"
              stroke={glowColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "blur(3px)", opacity: 0.35 }}
            />
            {/* Animated signal dot */}
            <circle r="3" fill={dotColor} style={{ filter: `drop-shadow(0 0 4px ${dotColor})` }}>
              <animateMotion
                dur={dur}
                begin={delay}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#trace-${uid}`} />
              </animateMotion>
            </circle>
            {/* Named path for animateMotion */}
            <path id={`trace-${uid}`} d={d} fill="none" stroke="none" />
            {/* Connector dot at card end */}
            <circle
              cx={isInput
                ? parseFloat(d.match(/M\s*([\d.]+)/)?.[1] ?? 0)
                : parseFloat(d.match(/L\s*([\d.]+)\s*([\d.]+)\s*$/)?.[1] ?? 0)}
              cy={isInput
                ? parseFloat(d.match(/M\s*[\d.]+\s*([\d.]+)/)?.[1] ?? 0)
                : parseFloat(d.match(/L\s*[\d.]+\s*([\d.]+)\s*$/)?.[1] ?? 0)}
              r="2.5"
              fill={dotColor}
              opacity="0.7"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function Flow({ className }) {
  const [hoveredInput,  setHoveredInput]  = useState(null);
  const [hoveredOutput, setHoveredOutput] = useState(null);
  const [isCoreHovered, setIsCoreHovered] = useState(false);

  const containerRef = useRef(null);
  const coreRef      = useRef(null);
  const inputRefs    = useRef([]);
  const outputRefs   = useRef([]);

  return (
    <div
      ref={containerRef}
      className={cn("flow-container relative my-6 overflow-hidden", className)}
    >
      {/* Ambient Core Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[340px] bg-gradient-to-r from-electric/25 via-violet/30 to-orchid/25 rounded-full blur-[100px] opacity-70"
        aria-hidden="true"
      />

      {/* PCB Wiring SVG — rendered behind cards */}
      <PcbTraces
        containerRef={containerRef}
        inputRefs={inputRefs}
        outputRefs={outputRefs}
        coreRef={coreRef}
      />

      <div className="flow relative grid grid-cols-1 lg:grid-cols-[1fr_180px_1fr] gap-8 sm:gap-12 items-center">

        {/* ── Left Column: Inputs ── */}
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
                ref={(el) => { inputRefs.current[idx] = el; }}
                onMouseEnter={() => setHoveredInput(idx)}
                onMouseLeave={() => setHoveredInput(null)}
                className={cn(
                  "fNode group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                  isHovered
                    ? "border-orchid/80 bg-white/[0.08] shadow-[0_0_24px_rgba(92,174,255,0.25)] -translate-x-1 text-white"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 text-tx-2"
                )}
              >
                <div className={cn("absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-orchid to-violet transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")} />
                <span className={cn("flex-none flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300", isHovered ? "bg-orchid text-ink shadow-[0_0_12px_rgba(92,174,255,0.6)]" : "bg-white/5 border border-white/10 text-orchid")}>
                  {INPUT_ICONS[idx % INPUT_ICONS.length]}
                </span>
                <span className="text-[13.5px] sm:text-[14px] font-medium tracking-tight flex-1">{item}</span>
                <span className="font-mono text-[10px] text-tx-3 group-hover:text-orchid transition-colors">0{idx + 1}</span>
              </div>
            );
          })}
        </div>

        {/* ── Center Column: Core ── */}
        <div
          ref={coreRef}
          onMouseEnter={() => setIsCoreHovered(true)}
          onMouseLeave={() => setIsCoreHovered(false)}
          className="fCore relative z-20 flex flex-col items-center justify-center p-4 rounded-2xl border border-white/30 bg-gradient-to-b from-electric via-violet to-ink-2 shadow-[0_0_60px_rgba(65,126,243,0.45)] transition-all duration-500 hover:shadow-[0_0_90px_rgba(135,60,230,0.6)] hover:scale-[1.03] overflow-hidden text-center cursor-default"
        >
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(65,126,243,0.25)_0%,transparent_70%)] animate-pulseSlow" aria-hidden="true" />
          <div className="fRing relative w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md mb-2.5 shadow-[0_0_20px_rgba(255,255,255,0.25)] p-2 overflow-hidden">
            <Image src="/curiosity-ai-icon-blue.png" alt="Curiosity AI Icon" width={32} height={32} className="w-full h-full object-contain drop-shadow" priority />
          </div>
          <div className="my-1 flex items-center justify-center">
            <Image src="/curiosity-ai-white-logo.png" alt="Curiosity AI" width={140} height={18} className="h-5 w-auto object-contain drop-shadow" priority />
          </div>
          <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-white/90 font-medium mt-1.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20">
            Orchestration Core
          </span>
          <div className="mt-3 pt-2.5 border-t border-white/20 w-full text-center">
            <span className="font-mono text-[9px] text-white/75 tracking-wider uppercase block">5MW → 100MW+</span>
          </div>
        </div>

        {/* ── Right Column: Outputs ── */}
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
                ref={(el) => { outputRefs.current[idx] = el; }}
                onMouseEnter={() => setHoveredOutput(idx)}
                onMouseLeave={() => setHoveredOutput(null)}
                className={cn(
                  "fNode group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                  isHovered
                    ? "border-violet/80 bg-white/[0.08] shadow-[0_0_24px_rgba(22,98,204,0.25)] translate-x-1 text-white"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 text-tx-2"
                )}
              >
                <div className={cn("absolute right-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-violet to-orchid transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")} />
                <span className={cn("flex-none flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300", isHovered ? "bg-violet text-white shadow-[0_0_12px_rgba(22,98,204,0.6)]" : "bg-white/5 border border-white/10 text-violet")}>
                  {OUTPUT_ICONS[idx % OUTPUT_ICONS.length]}
                </span>
                <span className="text-[13.5px] sm:text-[14px] font-medium tracking-tight flex-1">{item}</span>
                <span className="font-mono text-[10px] text-tx-3 group-hover:text-violet transition-colors">0{idx + 1}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
