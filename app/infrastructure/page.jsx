import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { ROADMAP } from "@/lib/content";

export const metadata = {
  title: "AI Compute Infrastructure",
  description:
    "The 5MW to 100MW+ phased deployment roadmap for Curiosity AI compute infrastructure across AI Factories in India.",
};

const WHY = [
  {
    n: "01",
    h: "Speed to market",
    p: "Partner sites are already under development, removing the multi-year lead time of greenfield AI Factory construction.",
  },
  {
    n: "02",
    h: "Co-investment",
    p: "Curiosity AI invests and co-invests in the GPU and supporting compute infrastructure — partners don't finance the buildout alone.",
  },
  {
    n: "03",
    h: "Built for scale",
    p: "Every site is designed to scale from an initial 5MW deployment toward 100MW+ over the following three years.",
  },
];

export default function Infrastructure() {
  const phases = ROADMAP.map((r) => ({
    kicker: `${r.date} · ${r.mw}${r.unit}`,
    title: r.title,
    body: r.body,
  }));

  return (
    <>
      <PageHero
        kicker="AI Compute Infrastructure"
        title="5MW to 100MW+, brought online in phases."
        lead="Capacity scales in step with contracted demand — each phase deploying on AI Factory partner sites already under development across Mumbai and Chennai."
      />

      <section className="secSm">
        <Container>
          <Reveal className="rail">
            {ROADMAP.map((r) => (
              <div className={`railItem ${r.live ? "live" : ""}`} key={r.mw}>
                <div className="rv">
                  {r.mw}
                  <span className="u">{r.unit}</span>
                </div>
                <div className="rd">{r.date}</div>
                <div className="rdot" />
                <p>{r.short}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Phase detail"
            title="Four phases, from first cluster to national network."
            size="lg"
            headerClassName="mb-12"
          />
          <Reveal>
            <Accordion items={phases} defaultOpen={0} />
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Speed to market"
            title="Already partnered. Ready to deploy."
            lead="Curiosity AI has partnered with leading AI Factories and AI Data Centres in India that are building large-scale facilities — giving the platform the ability to move quickly from demand to deployment."
            size="lg"
            headerClassName="mb-14"
          />
          <Reveal className="g3">
            {WHY.map((w) => (
              <Card
                hoverable
                key={w.n}
                number={w.n}
                title={w.h}
                description={w.p}
              />
            ))}
          </Reveal>
        </Container>
      </section>

      <Statement
        title="The GPU infrastructure behind"
        highlight="every phase."
        body="NVIDIA Blackwell, AMD Instinct, and the workloads they're built for."
        primary={{ href: "/gpu", label: "GPU Infrastructure" }}
        secondary={{ href: "/ai-factories", label: "AI Factory network" }}
      />
    </>
  );
}

