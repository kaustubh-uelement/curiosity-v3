"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive Card component with dynamic mouse spotlight,
 * subtle border reflections, and smooth elevation physics.
 */
export default function Card({
  children,
  hoverable = false,
  tag,
  number,
  title,
  description,
  specs,
  className,
  as: Component = "div",
  spotlight = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (!spotlight) return;
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "card group relative overflow-hidden transition-all duration-300",
        hoverable && "cardH hover:-translate-y-1.5 hover:border-line-2 hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    >
      {/* Top subtle light-edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Mouse spotlight glow */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(205, 130, 255, 0.09), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card contents */}
      <div className="relative z-10 flex flex-col gap-3.5 h-full">
        {number != null && (
          <div className="cNum select-none font-display font-medium text-white/15 transition-colors duration-300 group-hover:text-white/25">
            {number}
          </div>
        )}
        {tag && (
          <span className="cTag font-mono text-[11px] uppercase tracking-[0.16em] text-orchid font-medium">
            {tag}
          </span>
        )}
        {title && (
          <h3 className="text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-[14.5px] leading-[1.62] text-tx-2 flex-1">
            {description}
          </p>
        )}
        {specs && specs.length > 0 && (
          <div className="specs flex flex-wrap gap-2 mt-auto pt-2">
            {specs.map((spec) => (
              <span
                key={spec}
                className="font-mono text-[11px] text-tx-3 border border-line py-1 px-2.5 rounded-lg transition-colors duration-200 group-hover:border-line-2 group-hover:text-tx-2"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </Component>
  );
}
