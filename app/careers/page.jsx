import Reveal from "@/components/Reveal";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Statement from "@/components/Statement";
import CareerList from "./CareerList";
import { fetchActiveCareers } from "@/lib/mainstay";

export const metadata = {
  title: "Careers",
  description:
    "Build the physical AI infrastructure backbone for abundant intelligence. Explore engineering and operations careers at Curiosity AI in Mumbai and Chennai.",
};

export const dynamic = "force-dynamic";

const STATS = [
  { v: "Mumbai & Chennai", label: "Primary Deployment Hubs" },
  { v: "5MW – 100MW+", label: "Cluster Power Scale" },
  { v: "Blackwell B300", label: "Frontier Hardware Fleet" },
  { v: "Day 1 Offtake", label: "Institutional Backing" },
];

export default async function Careers() {
  const careers = await fetchActiveCareers();

  return (
    <>
      <PageHero
        kicker="Careers"
        title="Engineer the Infrastructure for Abundant Intelligence."
        lead="We are assembling the physical, electrical, and systems engineering teams building India's largest sovereign AI compute factory network."
      />

      {/* ============ STATS ============ */}
      <section className="secSm">
        <Container>
          <Reveal className="g4">
            {STATS.map((s) => (
              <Card key={s.label}>
                <div className="text-xl sm:text-2xl font-mono text-white mb-1">{s.v}</div>
                <p className="text-xs sm:text-sm text-white/60">{s.label}</p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ LIVE CAREER OPENINGS ============ */}
      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Open Roles"
            title="Join the Buildout"
            subtitle="Positions open across physical data centre architecture, high-voltage power, AI networking, and GPU systems operations."
          />
          <Reveal>
            <CareerList initialCareers={careers} />
          </Reveal>
        </Container>
      </section>

      {/* ============ CULTURE & MISSION ============ */}
      <section className="sec border-t border-line">
        <Container>
          <SectionHeader
            kicker="Our Approach"
            title="Physical Execution at Institutional Scale"
          />
          <Reveal className="g3">
            <Card
              number="01"
              title="Real-World Infrastructure"
              description="We don't build software dashboards for imaginary clouds. We deploy steel, transformers, chillers, and liquid-cooled SuperPODs that power real frontier intelligence."
            />
            <Card
              number="02"
              title="Extreme Ownership"
              description="From substation grid interconnections to optical transceiver telemetry, our engineers own full execution without corporate bureaucracy."
            />
            <Card
              number="03"
              title="Foundational Impact"
              description="India's AI future depends on sovereign compute availability. Your work directly establishes the computing baseline for the next generation of LLMs."
            />
          </Reveal>
        </Container>
      </section>

      <Statement
        title="Ready to build"
        highlight="at megawatt scale?"
        body="If you don't see an exact opening that matches your background but have deep experience in data centres or GPU clusters, send us your profile."
        primary={{ href: "mailto:careers@curiosityai.in", label: "Email Recruiting" }}
        secondary={{ href: "/contact", label: "Contact Deployment Team" }}
      />
    </>
  );
}
