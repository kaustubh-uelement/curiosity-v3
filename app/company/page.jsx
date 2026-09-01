import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { fetchActiveBlogs } from "@/lib/mainstay";

export const metadata = {
  title: "Company",
  description:
    "Curiosity AI is building the compute AI infrastructure platform for abundant intelligence, founded by Punit Goyal, co-founder of BluSmart Mobility.",
};

const STATS = [
  { v: "2026", label: "Founded" },
  { n: 2, label: "First deployment markets: Mumbai & Chennai" },
  { n: 6, label: "AI Factory & data centre partners" },
  { v: "100", unit: "MW+", label: "Target capacity by 2029" },
];

const PILLARS = [
  {
    n: "01",
    h: "Energy-first thinking",
    p: "AI compute is ultimately an energy and capital problem. Curiosity AI approaches it the way infrastructure developers approach power projects.",
  },
  {
    n: "02",
    h: "Capital discipline",
    p: "$300M raised and deployed across clean energy and mobility infrastructure between 2008 and 2025, at institutional scale.",
  },
  {
    n: "03",
    h: "Execution at scale",
    p: "Experience turning capital and partnerships into operating physical infrastructure: 25.7 million rides, 100MW of solar, nationwide charging.",
  },
];

const CREDS = ["Sydenham", "LSE", "Aston University", "Harvard Business School"];

export const dynamic = "force-dynamic";

export default async function Company() {
  const { news } = await fetchActiveBlogs();
  return (
    <>
      <PageHero
        kicker="Company"
        title="Building the infrastructure backbone for abundant intelligence."
        lead="Curiosity AI exists to close the gap between AI compute demand and AI compute supply by partnering with AI Factories, not competing to become one more GPU reseller."
      />

      <section className="secSm">
        <Container>
          <Reveal className="g4">
            {STATS.map((s) => (
              <Card key={s.label}>
                <div className="statV">
                  {s.n != null ? <CountUp to={s.n} /> : s.v}
                  {s.unit ? <span className="u">{s.unit}</span> : null}
                </div>
                <p className="flex-none">{s.label}</p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <Reveal className="g2" style={{ gap: 48, alignItems: "start" }}>
            <div className="p-6 sm:p-8 rounded-2xl border border-line bg-white/[0.015] backdrop-blur-md">
              <Badge variant="kicker-active" dot>Founder</Badge>
              <h2 className="dispLg" style={{ marginTop: 18 }}>Punit Goyal</h2>
              <p className="cTag font-mono text-orchid mt-3">Founder &amp; CEO, Curiosity AI</p>
              <div className="specs flex flex-wrap gap-2 mt-6">
                {CREDS.map((c) => (
                  <Badge variant="spec" key={c}>
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="lead" style={{ marginBottom: 18 }}>
                Punit is a serial entrepreneur in clean energy and electric mobility infrastructure,
                having raised and invested $300M in solar power plants, electric mobility and solar
                panel manufacturing between 2008 and 2025, building a 100MW portfolio of solar power
                projects along the way.
              </p>
              <p className="lead" style={{ marginBottom: 18 }}>
                In 2018 he co-founded BluSmart Mobility to decarbonise mobility in India. BluSmart
                raised $150M in equity from BP Ventures, Mayfield Fund, Green Frontier Capital and
                Panthera Capital, operated India&apos;s largest integrated EV ride-hailing service and
                charging superhub infrastructure, and achieved $100M ARR ($90M revenue) in FY 2024–25,
                delivering 25.7 million rides at a 4.9/5 customer rating.
              </p>
              <p className="lead">
                For his contributions to clean mobility and clean energy infrastructure, Punit was
                named one of the &quot;India UK 75 at 75 Achievers&quot; by the UK Government, British
                Council and NISAU UK, and awarded an Honorary Doctorate in Business Administration by
                Aston University. He received CNBC-TV18&apos;s Young Turk Startup of the Year 2023 for
                BluSmart, and served as Co-Chair of Mobility-as-a-Service on the CII National
                Committee on the Future of Mobility (2022–23).
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Why Curiosity AI"
            title="Infrastructure expertise, applied to AI compute."
            headerClassName="mb-14"
          />
          <Reveal className="g3">
            {PILLARS.map((pillar) => (
              <Card
                hoverable
                key={pillar.n}
                number={pillar.n}
                title={pillar.h}
                description={pillar.p}
              />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ CMS DEPLOYMENT UPDATES ============ */}
      {news && news.length > 0 && (
        <section className="sec border-t border-line">
          <Container>
            <SectionHeader
              kicker="Deployments"
              title="Platform & Infrastructure Updates"
              subtitle="Latest releases, cluster commissioning milestones, and roadmap announcements directly from Mainstay CMS."
            />
            <div className="space-y-6">
              {news.map((item) => (
                <div
                  id={item.slug}
                  key={item.id || item.slug}
                  className="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all hover:border-orchid/40"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge variant="spec">{item.tag}</Badge>
                    <span className="font-mono text-xs text-white/50">{item.date}</span>
                    {item.isHero && <Badge variant="kicker-active">Featured</Badge>}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Statement
        title="Partner with"
        highlight="Curiosity AI."
        body="Whether you're an AI Factory operator, a neo-cloud, or an enterprise scaling AI, let's talk."
        primary={{ href: "/contact", label: "Deploy with Curiosity" }}
        secondary={{ href: "/platform", label: "Explore the platform" }}
      />
    </>
  );
}

