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
    <div className={cn("accItem", isOpen && "open")}>
      <button
        id={buttonId}
        className="accBtn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="accNum">{String(index + 1).padStart(2, "0")}</span>
        <span>
          {kicker ? <span className="cTag block mb-1.5">{kicker}</span> : null}
          <span className="accTitle">{title}</span>
        </span>
        <span className="accIcon" aria-hidden="true" />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="accPanel"
        style={{ height }}
        aria-hidden={!isOpen}
      >
        <div className="accInner" ref={innerRef}>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, defaultOpen = 0, className }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("acc", className)}>
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

