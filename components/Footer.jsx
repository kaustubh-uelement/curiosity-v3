import Link from "next/link";
import Logo from "./Logo";
import Newsletter from "./Newsletter";
import Container from "@/components/ui/Container";
import { SITE, FOOTER_COLS } from "@/lib/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="foot">
      <Container>
        <Newsletter />

        <div className="footGrid" style={{ paddingTop: 44 }}>
          <div className="footBrand">
            <Link className="logo group transition-opacity hover:opacity-90 inline-flex items-center" href="/" aria-label="Curiosity AI, Home">
              <Logo variant="blue" className="h-6 w-auto" />
            </Link>
            <p>{SITE.tagline}</p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div className="footCol" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((link) => (
                <Link key={link.href + link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="footCol">
            <h4>Get in touch</h4>
            <a href={`mailto:${SITE.email.deploy}`}>{SITE.email.deploy}</a>
            <a href={`mailto:${SITE.email.factories}`}>{SITE.email.factories}</a>
            <span style={{ display: "block", color: "var(--tx-3)", fontSize: 13.5, marginTop: 4 }}>
              {SITE.address}
            </span>
          </div>
        </div>

        <div className="footBtm">
          <span>© {currentYear} Curiosity AI. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--tx-3)" }}>
            Website developed by Uelement Technologies Private Limited
          </span>
        </div>
      </Container>
    </footer>
  );
}

