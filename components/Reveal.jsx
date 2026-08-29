"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal component with IntersectionObserver and reduced motion support.
 */
export default function Reveal({
  children,
  className = "",
  as: Component = "div",
  variant = "rev",
  delay = 0,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            obs.unobserve(node);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const mergedStyle = delay
    ? { transitionDelay: `${delay}ms`, ...style }
    : style;

  return (
    <Component
      ref={ref}
      className={cn(variant, shown && "in", className)}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

