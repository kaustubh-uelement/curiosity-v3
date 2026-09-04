import Link from "next/link";
import Image from "next/image";
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
            <a href={`mailto:${SITE.email.factories}`}>
              {SITE.email.factories}
            </a>
            <span
              style={{
                display: "block",
                color: "var(--tx-3)",
                fontSize: 13.5,
                marginTop: 4,
              }}
            >
              {SITE.address}
            </span>
          </div>
        </div>

        <div className="footBtm">
          <span>© {currentYear} Curiosity AI. All rights reserved.</span>
          <span className="footCredit">
            Built on{" "}
            <a
              href="https://uelement.in/stambh/"
              target="_blank"
              rel="noopener noreferrer"
              className="footCreditLink"
            >
              UElement STamBH
            </a>
          </span>
        </div>

        {/* Brand Watermark Backdrop */}
        <div className="footWatermark" aria-hidden="true">
          <div className="footWatermarkGlow" />
          <Image
            src="/curiosity-ai-white-logo.png"
            alt=""
            width={3400}
            height={400}
            className="footWatermarkImg"
          />
        </div>
      </Container>
    </footer>
  );
}
