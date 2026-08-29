"use client";

import { useEffect, useLayoutEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Item({ index, kicker, title, body, isOpen, onToggle }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const uniqueId = useId();
  const buttonId = `acc-btn-${uniqueId}`;
  const panelId = `acc-panel-${uniqueId}`;

  useIso(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setHeight(isOpen ? el.scrollHeight : 0);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  return (
    <div
      className={cn(
        "accItem relative transition-colors duration-300",
        isOpen && "open bg-white/[0.015]"
      )}
    >
      {/* Glowing active indicator bar on the left edge */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orchid via-violet to-electric transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      <button
        id={buttonId}
        className="accBtn group px-2 sm:px-4 cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span
          className={cn(
            "accNum font-mono text-[11.5px] tracking-[0.16em] transition-colors duration-300",
            isOpen ? "text-orchid font-medium" : "text-tx-3 group-hover:text-tx-2"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-left">
          {kicker ? <span className="cTag block mb-1.5">{kicker}</span> : null}
          <span
            className={cn(
              "accTitle font-display font-medium text-[clamp(17px,1.9vw,23px)] transition-colors duration-300",
              isOpen ? "text-white" : "text-tx group-hover:text-orchid"
            )}
          >
            {title}
          </span>
        </span>
        <span
          className={cn(
            "accIcon transition-transform duration-300",
            isOpen && "rotate-45 text-orchid"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="accPanel overflow-hidden transition-[height] duration-500 ease-custom-out"
        style={{ height }}
        aria-hidden={!isOpen}
      >
        <div className="accInner px-2 sm:px-4 pb-7 pt-1" ref={innerRef}>
          <p className="text-tx-2 text-[15px] leading-[1.68] max-w-[760px]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, defaultOpen = 0, className }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("acc border-t border-line", className)}>
      {items.map((item, i) => (
        <Item
          key={item.title || item.q || i}
          index={i}
          kicker={item.kicker}
          title={item.title || item.q}
          body={item.body || item.a}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}


