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
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold: 0, rootMargin: "0px 0px 50px 0px" }
    );
    obs.observe(node);

    // Fallback timer ensures no section ever stays blank if scroll event is missed
    const timer = setTimeout(() => {
      setShown(true);
    }, 1200);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
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

