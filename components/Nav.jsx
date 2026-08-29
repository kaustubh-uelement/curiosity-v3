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
    const onScroll = () => setStuck(window.scrollY > 24);
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

  return (
    <>
      <header
        className={cn(
          "nav",
          (stuck || open) && "stuck",
          open && "menuOpen"
        )}
      >
        <div className="navIn">
          <Link className="logo" href="/" aria-label="Curiosity AI — Home">
            <Logo />
            <span>Curiosity AI</span>
          </Link>

          <div className="navRight">
            <Button href="/contact" variant="primary" size="sm">
              Deploy with Curiosity
            </Button>
            <button
              className="menuBtn"
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
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className={cn("overlay", open && "show")}
        aria-hidden={!open}
      >
        <div className="ovIn">
          <nav aria-label="Primary navigation">
            <ul className="ovList">
              {NAV.map((item, i) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                    tabIndex={open ? 0 : -1}
                  >
                    <span className="ovNum">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ovFoot">
            <a href={`mailto:${SITE.email.deploy}`}>{SITE.email.deploy}</a>
            <span>{SITE.address}</span>
          </div>
        </div>
      </div>
    </>
  );
}

