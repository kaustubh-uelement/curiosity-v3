"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky stacking cards component with scroll-driven scale and depth falloff.
 * On mobile devices, degrades gracefully to a responsive list with distinct gradient ramps.
 */
export default function StackCards({ items = [] }) {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(() => items.map(() => 0));

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    const compute = () => {
      raf = 0;
      if (window.innerWidth < 1024) {
        setProgress(items.map(() => 0));
        return;
      }

      const cards = Array.from(wrap.querySelectorAll("[data-stack-item]"));
      const next = cards.map((card, i) => {
        let totalCover = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const nextCard = cards[j];
          const nextRect = nextCard.getBoundingClientRect();
          const nextPinTop = parseFloat(getComputedStyle(nextCard).top) || 0;
          const dist = nextRect.top - nextPinTop;
          const range = nextRect.height || 340;
          if (dist <= 0) {
            totalCover += 1;
          } else if (dist < range) {
            totalCover += 1 - dist / range;
            break;
          } else {
            break;
          }
        }
        return totalCover;
      });
      setProgress(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <div className="relative space-y-6 lg:space-y-0 pb-8 lg:pb-20" ref={wrapRef}>
      {items.map((item, i) => {
        const p = progress[i] || 0;
        const scale = 1 - p * 0.035;
        const opacity = Math.max(0.35, 1 - p * 0.15);

        return (
          <div
            className="lg:sticky mb-6 lg:mb-8 will-change-transform"
            data-stack-item=""
            key={item.title}
            style={{
              top: `calc(var(--nav-h, 76px) + ${24 + i * 16}px)`,
              zIndex: i + 1,
            }}
          >
            <div
              className={cn(
                "relative rounded-xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-line-2 overflow-hidden shadow-2xl shadow-black/50 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-center min-h-0 lg:min-h-[340px]"
              )}
              style={{
                background: gradientFor(i, items.length),
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                opacity,
              }}
            >
              {/* Top Specular Edge Glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden="true"
              />

              {/* Subtle ambient lighting inside card */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 88% 20%, rgba(255,255,255,0.25), transparent 60%)",
                }}
              />

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <span className="font-mono text-xs sm:text-sm tracking-[0.18em] text-white/70">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <div className="h-[1px] bg-white/20 w-full" />
                <div>
                  <span className="font-mono text-xs tracking-[0.18em] uppercase text-white/80 block mb-2 font-medium">
                    {item.kicker}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/85">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function gradientFor(i, total) {
  const stops = [
    ["#417EF3", "#1B3B8A"],
    ["#4965E5", "#222D7A"],
    ["#5145D6", "#261E6E"],
    ["#5A2BC7", "#261358"],
    ["#5D17B7", "#1E0842"],
  ];
  const [a, b] = stops[Math.min(i, stops.length - 1)];
  return `linear-gradient(150deg, ${a} 0%, ${b} 100%)`;
}
