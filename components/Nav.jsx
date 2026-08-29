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

  /* Solidify the bar once scrolled past the fold edge */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
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
        <div className="navIn">
          <Link
            className="logo group transition-transform duration-300 hover:scale-[1.02]"
            href="/"
            aria-label="Curiosity AI, Home"
          >
            <Logo className="transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-display font-semibold tracking-tight text-[17px] text-white">
              Curiosity AI
            </span>
          </Link>

          {/* Desktop inline navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-r-pill backdrop-blur-md">
            {desktopNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-1.5 rounded-r-pill text-[13.5px] font-medium transition-all duration-300",
                    isActive
                      ? "bg-white/[0.12] text-white shadow-sm font-semibold text-orchid"
                      : "text-tx-2 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="navRight">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex shadow-sm hover:shadow-[0_0_20px_rgba(205,130,255,0.3)]"
            >
              Deploy with Curiosity
            </Button>
            <button
              className="menuBtn group transition-all duration-300 hover:border-orchid"
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
              <span className="transition-colors group-hover:text-orchid">
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


