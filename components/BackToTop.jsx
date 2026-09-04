"use client";
import { useEffect, useState, useRef } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [lift, setLift] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 400);

      const targetEl = document.querySelector(".footCredit") || document.querySelector(".footBtm");
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const isMobile = window.innerWidth <= 600;
        const defaultBottom = isMobile ? 20 : 28;
        const clearance = 16; // safe gap above text
        const neededLift = window.innerHeight - rect.top + clearance - defaultBottom;
        setLift(neededLift > 0 ? Math.round(neededLift) : 0);
      } else {
        setLift(0);
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        transform: visible
          ? `translateY(-${lift}px)`
          : "translateY(10px)",
      }}
      className={`backToTop${visible ? " backToTop--visible" : ""}`}
    >
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
