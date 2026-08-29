"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated number counter triggered when scrolled into view.
 */
export default function CountUp({
  to,
  decimals = 0,
  duration = 1500,
  className,
}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const numericTarget = typeof to === "number" ? to : parseFloat(to);
    if (isNaN(numericTarget)) {
      setVal(to);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(numericTarget);
      return;
    }

    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(node);
          let start = null;
          const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setVal(numericTarget * eased);
            if (progress < 1) {
              raf = requestAnimationFrame(step);
            }
          };
          raf = requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );

    obs.observe(node);

    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const numericTarget = typeof to === "number" ? to : parseFloat(to);
  const shown = isNaN(numericTarget)
    ? to
    : decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString("en-US");

  return <span ref={ref} className={cn(className)}>{shown}</span>;
}

