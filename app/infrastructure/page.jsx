import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ROADMAP } from "@/lib/content";
import { fetchActiveShowcases } from "@/lib/mainstay";

export const metadata = {
  title: "AI Compute Infrastructure",
  description:
    "The 5MW to 100MW+ phased deployment roadmap for Curiosity AI compute infrastructure across AI Factories in India.",
};

export const dynamic = "force-dynamic";

const WHY = [
  {
    n: "01",
    h: "Speed to market",
    p: "Partner sites are already under development, removing the multi-year lead time of greenfield AI Factory construction.",
  },
  {
    n: "02",
    h: "Co-investment",
    p: "Curiosity AI invests and co-invests in the GPU and supporting compute infrastructure; partners don't finance the buildout alone.",
  },
  {
    n: "03",
    h: "Built for scale",
    p: "Every site is designed to scale from an initial 5MW deployment toward 100MW+ over the following three years.",
  },
];

export default async function Infrastructure() {
  const showcases = await fetchActiveShowcases();

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
        lead="Capacity scales in step with contracted demand, with each phase deploying on AI Factory partner sites already under development across Mumbai and Chennai."
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
            lead="Curiosity AI has partnered with leading AI Factories and AI Data Centres in India that are building large-scale facilities, giving the platform the ability to move quickly from demand to deployment."
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

      {/* ============ CMS DEPLOYMENT SHOWCASES ============ */}
      {showcases && showcases.length > 0 && (
        <section className="sec border-t border-line">
          <Container>
            <SectionHeader
              kicker="Execution Proof"
              title="Deployment Case Studies & Milestones"
              subtitle="Real-world commissioning data, thermal engineering breakthroughs, and cluster handoffs."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {showcases.map((s) => (
                <div
                  key={s.id || s.tabTitle}
                  className="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all hover:border-orchid/40 flex flex-col justify-between"
                >
                  <div>
                    <Badge variant="spec" className="mb-3">{s.tabTitle}</Badge>
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-4">{s.contentTitle}</h3>
                    {s.points && s.points.length > 0 && (
                      <ul className="space-y-2 text-xs sm:text-sm text-white/70 list-disc list-inside mb-6">
                        {s.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {s.ctaText && s.ctaUrl && (
                    <Button href={s.ctaUrl} variant="glass" className="!px-4 !py-2 text-xs self-start">
                      {s.ctaText}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

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

