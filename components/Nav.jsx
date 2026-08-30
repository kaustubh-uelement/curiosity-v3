"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const pathname = usePathname();

  /* Solidify the bar once scrolled past the hero top */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock body scroll and handle Escape key while the overlay is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Primary desktop navigation items (excluding Home and Contact to keep the header uncluttered)
  const desktopNavItems = NAV.filter(
    (item) => item.href !== "/" && item.href !== "/contact"
  );

  return (
    <>
      <header
        className={cn(
          "nav transition-all duration-400",
          (stuck || open) && "stuck shadow-[0_4px_30px_rgba(0,0,0,0.5)]",
          open && "menuOpen"
        )}
      >
        <div className="navIn flex items-center justify-between gap-4 flex-nowrap w-full">
          <Link
            className="logo group transition-transform duration-300 hover:scale-[1.02] flex items-center flex-shrink-0 whitespace-nowrap"
            href="/"
            aria-label="Curiosity AI, Home"
          >
            <Logo variant="white" priority className="h-6 sm:h-7 w-auto" />
          </Link>

          {/* Desktop inline navigation over frosted glass - visible on large/xl screens only where there is ample room */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/[0.08] border border-white/[0.16] p-1.5 rounded-r-pill backdrop-blur-md flex-shrink-0 flex-nowrap whitespace-nowrap">
            {desktopNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-r-pill text-[14px] font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0",
                    isActive
                      ? "bg-white/[0.18] text-white shadow-sm font-semibold"
                      : "text-white/90 hover:text-white hover:bg-white/[0.12] font-semibold"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="navRight flex items-center gap-3 flex-shrink-0 flex-nowrap whitespace-nowrap">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex shadow-sm hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] whitespace-nowrap flex-shrink-0"
            >
              Deploy with Curiosity
            </Button>
            {/* Hamburger menu button - only appears when middle menu is hidden on smaller/medium screens */}
            <button
              className="menuBtn xl:hidden group transition-all duration-300 hover:border-white text-white border-white/20 bg-white/[0.08] backdrop-blur-md whitespace-nowrap flex-shrink-0"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="menuBars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="text-white font-medium transition-colors">
                {open ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </header>



      {/* Fullscreen interactive overlay */}
      <div
        id="site-menu"
        className={cn("overlay", open && "show")}
        aria-hidden={!open}
      >
        <div className="ovIn">
          <nav aria-label="Primary navigation">
            <ul className="ovList">
              {NAV.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      style={{ transitionDelay: open ? `${100 + i * 45}ms` : "0ms" }}
                      tabIndex={open ? 0 : -1}
                      className={cn(
                        "group transition-all duration-300",
                        isActive && "text-orchid font-semibold"
                      )}
                    >
                      <span className="ovNum group-hover:text-orchid transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-3">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="ovFoot">
            <a
              className="hover:text-orchid transition-colors"
              href={`mailto:${SITE.email.deploy}`}
            >
              {SITE.email.deploy}
            </a>
            <span>{SITE.address}</span>
          </div>
        </div>
      </div>
    </>
  );
}


