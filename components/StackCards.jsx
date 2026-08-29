"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* Cards pin to the top and stack over one another as you scroll — the
   signature SharpLink "Stack" interaction. Position:sticky does the pinning;
   the scale/opacity falloff on covered cards is driven here so the stack
   reads as depth rather than a flat pile. */
export default function StackCards({ items, className }) {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(() => items.map(() => 0));

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const cards = Array.from(wrap.querySelectorAll("[data-stack-item]"));
      const next = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const pinTop = parseFloat(getComputedStyle(card).top) || 0;
        /* how far this card has been pushed past its pin point */
        const travelled = pinTop - rect.top;
        if (travelled <= 0) return 0;
        return Math.min(travelled / (rect.height || 1), 1);
      });
      setProgress(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div className={cn("stack", className)} ref={wrapRef}>
      {items.map((item, i) => {
        const p = progress[i] || 0;
        return (
          <div
            className="stackItem"
            data-stack-item=""
            key={item.title}
            style={{ top: `calc(var(--nav-h) + ${24 + i * 14}px)`, zIndex: i + 1 }}
          >
            <div
              className="stackCard relative group overflow-hidden border border-white/20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] transition-transform duration-200"
              style={{
                background: gradientFor(i, items.length),
                transform: `scale(${1 - p * 0.055}) translateY(${p * -8}px)`,
                opacity: 1 - p * 0.35,
              }}
            >
              {/* Specular top light edge */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <span className="sNum font-mono text-[12px] tracking-[0.18em] text-white/70">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <div className="sRule my-5 h-[1px] bg-white/20" />
                <span className="sKick font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 mb-4 block">
                  {item.kicker}
                </span>
                <h3 className="text-[clamp(24px,3.2vw,42px)] font-display font-medium tracking-tight text-white">
                  {item.title}
                </h3>
              </div>
              <p className="relative z-10 text-[clamp(14.5px,1.4vw,16.5px)] leading-[1.65] text-white/85">
                {item.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Walk the palette from electric indigo through violet to orchid
   as the stack deepens. */
function gradientFor(i, total) {
  const stops = [
    ["#4500F9", "#2A0796"],
    ["#5A25F5", "#33108F"],
    ["#8752FA", "#3E1C9E"],
    ["#A566FC", "#5A2BB8"],
    ["#CD82FF", "#6E35C9"],
  ];
  const [a, b] = stops[Math.min(i, stops.length - 1)];
  return `linear-gradient(150deg, ${a} 0%, ${b} 100%)`;
}


