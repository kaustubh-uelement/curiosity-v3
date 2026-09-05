import Reveal from "@/components/Reveal";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { MARKET, SEGMENTS } from "@/lib/content";
import { fetchActiveTestimonials } from "@/lib/mainstay";

export const metadata = {
  title: "For Neo-Clouds & Enterprise",
  description:
    "Long-term GPU capacity for neo-clouds and enterprise AI: GPUaaS and bare metal, 3-5 year reservations, access to 5MW-100MW+ AI Factory infrastructure.",
};

export const dynamic = "force-dynamic";

const BENEFITS = [
  {
    n: "01",
    h: "Reserve long-term",
    p: "Reserve GPU-as-a-Service capacity for 3 to 5 year periods: predictable access, not spot availability.",
  },
  {
    n: "02",
    h: "Next-gen GPUs",
    p: "Access NVIDIA and AMD's newest generation for training, inference, generative AI and high-performance computing.",
  },
  {
    n: "03",
    h: "World-class factories",
    p: "Scalable capacity from 5MW to 100MW+ across AI-ready data centres and AI Factories in India.",
  },
  {
    n: "04",
    h: "Focus on AI",
    p: "Scale your compute requirements instead of building AI Factories and investing in energy infrastructure yourself.",
  },
];

export default async function Customers() {
  const testimonials = await fetchActiveTestimonials();
  return (
    <>
      <PageHero
        kicker="For Neo-Clouds & Enterprise"
        title="Build and scale faster, on dedicated capacity."
        lead="Reserve long-term GPU capacity without financing an AI Factory yourself. Curiosity AI converts contracted demand into dedicated compute capacity in India."
      />

      <section className="secSm">
        <Container>
          <Reveal className="g4">
            {BENEFITS.map((benefit) => (
              <Card
                hoverable
                key={benefit.n}
                number={benefit.n}
                title={benefit.h}
                description={benefit.p}
              />
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Delivery model"
            title="GPU-as-a-Service, or dedicated bare metal."
            size="lg"
            headerClassName="mb-12"
          />
          <Reveal className="g2">
            <Card
              hoverable
              tag="Managed"
              title="GPU-as-a-Service"
              description="Reserved, sovereign GPU capacity delivered as a managed service, sized to training and inference workloads without operating the hardware directly."
              specs={["3–5yr terms", "Training", "Inference", "Managed"]}
            />
            <Card
              hoverable
              tag="Dedicated"
              title="Bare metal"
              description="Dedicated, single-tenant GPU clusters for customers who need direct control of the stack, from firmware through orchestration."
              specs={["3–5yr terms", "Single-tenant", "Frontier AI", "Sovereign AI"]}
            />
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Built for"
            title="Whoever is scaling AI compute demand."
            size="lg"
            headerClassName="mb-10"
          />
          <Reveal className="pills">
            {SEGMENTS.map((segment) => (
              <Badge variant="pill" key={segment}>
                {segment}
              </Badge>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Market context"
            title="Large-scale customers need gigawatts to come online."
            lead="Global neo-clouds are scaling contracted backlog far faster than deployed capacity, the gap Curiosity AI is built to help close in India."
            headerClassName="mb-12"
          />
          <Reveal className="g4">
            {MARKET.map((m) => (
              <Card key={m.label}>
                <div className="statV">
                  {m.value}
                  {m.unit ? <span className="u">{m.unit}</span> : null}
                </div>
                <p className="flex-none">{m.label}</p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ CMS TESTIMONIALS & PERSPECTIVES ============ */}
      {/* {testimonials && testimonials.length > 0 && (
        <section className="sec border-t border-line">
          <Container>
            <SectionHeader
              kicker="Perspectives"
              title="What Partners & Customers Say"
              subtitle="Endorsements from Tier-IV data centre operators, neo-cloud compute buyers, and infrastructure investors."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id || t.name}
                  className="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all hover:border-orchid/40 flex flex-col justify-between"
                >
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-base font-medium text-white">{t.name}</h4>
                    <p className="text-xs text-orchid font-mono mt-0.5">{t.designation}</p>
                    <p className="text-xs text-white/50">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )} */}

      <Statement
        title="Reserve dedicated"
        highlight="compute capacity."
        body="Tell us your workload and timeline (training, inference or sovereign AI), and we'll size the right capacity."
        primary={{ href: "/contact", label: "Talk to us" }}
        secondary={{ href: "/gpu", label: "See GPU specifications" }}
      />
    </>
  );
}

