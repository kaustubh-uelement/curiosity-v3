"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SkyAnimation: Rotating starfield galaxy animation
 * Generates 4,500 glowing stars rotating seamlessly around the hero center.
 * Mountain image overlaps the stars with a gradient mask.
 */
export default function SkyAnimation({ className }) {
  const skyRef = useRef(null);

  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;

    let isMounted = true;

    const renderStars = () => {
      sky.innerHTML = "";

      const amountOfStars = 4500;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Diagonal ensures complete starfield coverage throughout full 360-degree rotation
      const diagonal = Math.sqrt(
        viewportWidth * viewportWidth + viewportHeight * viewportHeight
      );
      const radius = Math.ceil(diagonal * 0.9);
      const diameter = radius * 2;

      sky.style.width = `${diameter}px`;
      sky.style.height = `${diameter}px`;
      sky.style.marginLeft = `${-radius}px`;
      sky.style.marginTop = `${-radius}px`;

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < amountOfStars; i++) {
        const star = document.createElement("li");
        star.className = "star";

        const top = Math.random() * diameter;
        const left = Math.random() * diameter;
        const opacity = (Math.floor(Math.random() * 10) + 1) / 10;
        const sizeRandom = Math.random();

        let size = 2;
        if (sizeRandom > 0.92) {
          size = 3; // large luminous stars
        } else if (sizeRandom < 0.4) {
          size = 1.5; // fine distant stars
        }

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}px`;
        star.style.top = `${top}px`;
        star.style.background = `rgba(255, 255, 255, ${opacity})`;

        // Glow for bright stars
        if (opacity >= 0.7) {
          star.style.boxShadow =
            size === 3
              ? "0 0 7px rgba(255, 255, 255, 1), 0 0 14px rgba(168, 129, 252, 0.7)"
              : "0 0 4px rgba(255, 255, 255, 0.85)";
        }

        fragment.appendChild(star);
      }

      if (isMounted) {
        sky.appendChild(fragment);
      }
    };

    renderStars();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderStars, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={cn("skyWrap", className)} aria-hidden="true">
      <ul className="sky" ref={skyRef} />
      <div className="skyFade" />
      {/* Mountain — sits above rotating stars, gradient is behind it via skyWrap background */}
      <div className="heroMountain">
        <Image
          src="/mountain.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="heroMountainImg"
        />
      </div>
    </div>
  );
}
