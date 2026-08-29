import Link from "next/link";
import Mesh from "@/components/Mesh";
import Dashboard from "@/components/Dashboard";
import Marquee from "@/components/Marquee";
import StackCards from "@/components/StackCards";
import Accordion from "@/components/Accordion";
import Flow from "@/components/Flow";
import Reveal from "@/components/Reveal";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextLink from "@/components/ui/TextLink";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  SITE,
  ANNOUNCEMENT,
  PILLARS,
  STACK,
  OPPORTUNITY,
  ROADMAP,
  NEWS,
  FAQ,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <header className="hero">
        <Mesh />
        <Container className="heroIn">
          <div className="heroTop" />

          <Reveal variant="rev">
            <Badge variant="kicker-active">Curiosity AI</Badge>
          </Reveal>

          <h1 className="dispHero heroH">
            <span className="mask">
              <Reveal variant="revUp" as="span" style={{ display: "block" }}>
                Compute with
              </Reveal>
            </span>
            <span className="mask">
              <Reveal variant="revUp" as="span" delay={120} style={{ display: "block" }}>
                an Edge
              </Reveal>
            </span>
          </h1>

          <div className="heroRow">
            <div>
              <div className="badgeRow">
                <Badge variant="kicker">Deploying across</Badge>
                <Badge variant="default">Mumbai</Badge>
                <Badge variant="default">Chennai</Badge>
                <Badge variant="default">NVIDIA · AMD</Badge>
              </div>
              <div className="btns heroBtns">
                <Button href="/platform" variant="primary">
                  Explore the platform
                </Button>
                <Button href="/contact" variant="glass">
                  Deploy with Curiosity
                </Button>
              </div>
            </div>

            <div className="heroSub">
              <p className="lead">{SITE.intro}</p>
            </div>
          </div>

          <Reveal
            className="annc group relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(205,130,255,0.15)] hover:border-line-2"
            as={Link}
            href={ANNOUNCEMENT.href}
            style={{ marginTop: 40 }}
          >
            {/* Shimmer light-edge reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orchid/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="anncMeta flex flex-col gap-1.5 flex-none">
              <span className="k font-mono text-[10.5px] tracking-[0.16em] uppercase text-orchid font-semibold">
                {ANNOUNCEMENT.kicker}
              </span>
              <span className="d font-mono text-[11px] text-tx-3">
                {ANNOUNCEMENT.date}
              </span>
            </span>
            <span className="t flex-1 min-w-[200px] text-[15px] leading-snug text-white/95 group-hover:text-white transition-colors">
              {ANNOUNCEMENT.title}
            </span>
            <span className="arw flex-none text-tx-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M9.5 4.5 14 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </Reveal>
        </Container>
      </header>

      {/* ============ LIVE DASHBOARD ============ */}
      <section className="secSm">
        <Container>
          <Dashboard />
          <div style={{ marginTop: 28 }}>
            <TextLink href="/infrastructure">
              More in the deployment roadmap
            </TextLink>
          </div>
        </Container>
      </section>

      <Marquee />

      {/* ============ PILLARS 01/02/03 ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Pioneering capacity"
            title={
              <h2 className="dispXl">
                Infrastructure that&apos;s
                <br />
                already moving.
              </h2>
            }
          />

          <Reveal className="pill3">
            {PILLARS.map((pillar, i) => (
              <div className="pCard" key={pillar.n}>
                <div className="pViz">
                  <DotViz index={i} />
                </div>
                <div className="pBody">
                  <span className="pNum">{pillar.n}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ PROPOSITIONS (STICKY STACK) ============ */}
      <section className="py-20 sm:py-28 lg:py-36 relative z-10 bg-ink-2/40 border-y border-line">
        <Container>
          <SectionHeader
            kicker="Propositions"
            title="The Stack for Scaling Compute"
            subtitle="Five layers that turn powered land into contracted, revenue-generating AI compute."
          />
          <StackCards items={STACK} />
        </Container>
      </section>

      {/* ============ STATEMENT ============ */}
      <Statement
        title="Compute AI Infrastructure Platform for"
        highlight="Abundant Intelligence."
        body="Not another GPU cloud — the platform that brings megawatt-scale capacity online in the first place."
        primary={{ href: "/platform", label: "Explore the platform" }}
        secondary={{ href: "/infrastructure", label: "See the roadmap" }}
      />

      {/* ============ FLOW ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="The platform"
            title="Everything in. Contracted compute out."
            lead="Land, power, capital, GPUs and supporting infrastructure flow into the platform. Dedicated compute capacity flows out to neo-clouds and enterprises."
            action={{ href: "/platform", label: "Full platform" }}
            size="lg"
          />
          <Reveal>
            <Flow />
          </Reveal>
        </Container>
      </section>

      {/* ============ OPPORTUNITY ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="The opportunity"
            title={
              <h2 className="dispXl">
                The opportunity of
                <br />a generation.
              </h2>
            }
            lead="Demand for AI compute is running far ahead of deployed supply. Curiosity AI exists to close that gap in India."
          />

          <Reveal className="oppList">
            {OPPORTUNITY.map((opp, i) => (
              <div className="oppRow" key={opp.title}>
                <span className="on">{String(i + 1).padStart(2, "0")}</span>
                <h3>{opp.title}</h3>
                <p>{opp.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ ROADMAP ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Roadmap"
            title="5MW to 100MW+, in phases."
            action={{ href: "/infrastructure", label: "Full roadmap" }}
            size="lg"
          />
          <Reveal className="rail">
            {ROADMAP.map((item) => (
              <div className={`railItem ${item.live ? "live" : ""}`} key={item.mw}>
                <div className="rv">
                  {item.mw}
                  <span className="u">{item.unit}</span>
                </div>
                <div className="rd">{item.date}</div>
                <div className="rdot" />
                <p>{item.short}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ NEWS ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Latest"
            title="From the buildout."
            size="lg"
          />
          <Reveal className="newsGrid">
            {NEWS.map((item) => (
              <Link className="newsCard" href={item.href} key={item.title}>
                <div className="newsViz" />
                <div className="newsBody">
                  <div className="newsMeta">
                    <span className="t">{item.tag}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="FAQ"
            title="Got more questions?"
            action={{ href: "/contact", label: "Reach us" }}
          />
          <Reveal>
            <Accordion items={FAQ} defaultOpen={-1} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

/* Dot-field illustrations for the 01/02/03 cards with gradient glows */
function DotViz({ index }) {
  const cols = 22;
  const rows = 11;
  const dots = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cx = 12 + x * 14;
      const cy = 12 + y * 15;
      let r = 1.6;
      let o = 0.22;

      if (index === 0) {
        // converging band
        const d = Math.abs(y - rows / 2 + Math.sin(x / 3) * 1.6);
        r = Math.max(0.8, 3.4 - d * 0.8);
        o = Math.max(0.1, 0.95 - d * 0.22);
      } else if (index === 1) {
        // radial bloom from the left
        const d = Math.hypot(x - 3, y - rows / 2);
        r = Math.max(0.8, 3.6 - d * 0.22);
        o = Math.max(0.1, 0.95 - d * 0.075);
      } else {
        // ascending ramp
        const t = x / cols;
        const edge = rows - 1 - t * (rows - 1);
        const d = Math.abs(y - edge);
        r = Math.max(0.8, 3.2 - d * 0.7);
        o = Math.max(0.1, 0.9 - d * 0.2);
      }
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="url(#dotGradient)"
          opacity={o}
          className="transition-all duration-300"
        />
      );
    }
  }
  return (
    <svg
      viewBox="0 0 320 175"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="transition-transform duration-500 group-hover:scale-105"
    >
      <defs>
        <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CD82FF" />
          <stop offset="50%" stopColor="#8752FA" />
          <stop offset="100%" stopColor="#4500F9" />
        </linearGradient>
      </defs>
      {dots}
    </svg>
  );
}


