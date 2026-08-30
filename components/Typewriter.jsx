"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * High-performance, accessible Typewriter text component.
 * Renders letter-by-letter with a glowing blinking cursor.
 */
export default function Typewriter({
  lines = ["Compute with", "an Edge"],
  speed = 110,
  delay = 350,
  pauseBetweenLines = 350,
  cursor = false,
  cursorChar = "",
  cursorClassName = "text-orchid font-light ml-1",
  className = "",
  lineClassName = "block text-right",
  as: Component = "div",
  ...rest
}) {
  const linesKey = typeof lines === "string" ? lines : JSON.stringify(lines);
  const normalizedLines = useMemo(
    () => (Array.isArray(lines) ? lines : [lines]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [linesKey]
  );
  const fullText = normalizedLines.join(" ");

  const [mounted, setMounted] = useState(false);
  const [displayedLines, setDisplayedLines] = useState(() =>
    normalizedLines.map(() => "")
  );
  const [activeLine, setActiveLine] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDisplayedLines(normalizedLines.map(() => ""));
    setActiveLine(0);
    setIsFinished(false);

    let lineIdx = 0;
    let charIdx = 0;
    let timeoutId = null;

    const typeNextChar = () => {
      if (lineIdx >= normalizedLines.length) {
        setIsFinished(true);
        return;
      }

      const currentTarget = normalizedLines[lineIdx];

      if (charIdx < currentTarget.length) {
        charIdx++;
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIdx] = currentTarget.slice(0, charIdx);
          return next;
        });
        setActiveLine(lineIdx);
        timeoutId = setTimeout(typeNextChar, speed);
      } else {
        // Current line finished, transition to next line if present
        lineIdx++;
        charIdx = 0;
        if (lineIdx < normalizedLines.length) {
          setActiveLine(lineIdx);
          timeoutId = setTimeout(typeNextChar, pauseBetweenLines);
        } else {
          setIsFinished(true);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, normalizedLines, pauseBetweenLines, speed]);

  return (
    <Component
      className={cn("typewriterContainer", className)}
      aria-label={fullText}
      {...rest}
    >
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true" className="block">
        {normalizedLines.map((line, idx) => {
          const text = mounted ? displayedLines[idx] : "";
          const isCurrentActive = mounted
            ? isFinished
              ? idx === normalizedLines.length - 1
              : activeLine === idx
            : idx === 0;
          const showCursorHere = cursor && isCurrentActive;

          return (
            <span
              key={idx}
              className={cn(lineClassName, "min-h-[1.05em]")}
              style={{ display: "block", textAlign: "right" }}
            >
              {text || "\u00A0"}
              {showCursorHere && (
                <span
                  className={cn(
                    "typewriterCursor select-none",
                    cursorClassName
                  )}
                  aria-hidden="true"
                >
                  {cursorChar}
                </span>
              )}
            </span>
          );
        })}
      </span>
    </Component>
  );
}
