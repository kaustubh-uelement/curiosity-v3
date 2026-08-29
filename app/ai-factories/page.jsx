import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { PARTNERS } from "@/lib/content";

export const metadata = {
  title: "AI Factories",
  description:
    "Curiosity AI partners with India's largest AI-ready data centres and AI Factories to deploy megawatt-scale AI compute infrastructure in Mumbai and Chennai.",
};

const MODEL = [
  {
    kicker: "Capital",
    title: "Investment and co-investment",
    body: "Curiosity AI builds, invests and co-invests in GPU and supporting AI compute infrastructure — so partners never carry the full capital load of a megawatt-scale buildout alone.",
  },
  {
    kicker: "Hardware",
    title: "Access to GPUs and reference architecture",
    body: "Access to NVIDIA and AMD GPUs and reference architecture, plus the supporting CPUs, networking, advanced cooling and storage every cluster requires.",
  },
  {
    kicker: "Execution",
    title: "Deployment leadership",
    body: "Curiosity AI leads and coordinates the deployment of institutional-scale GPU infrastructure inside the partner facility, on a colocation model.",
  },
  {
    kicker: "Demand",
    title: "Contracted offtake",
    body: "Long-term offtakers in the U.S. and India — institutionally backed neo-clouds and enterprises — convert deployed capacity into contracted revenue.",
  },
];

export default function AiFactories() {
  return (
    <>
      <PageHero
        kicker="AI Factories"
        title="Partnering with India's largest AI-ready data centres."
        lead="Curiosity AI partners with AI Factories and AI Data Centres that hold the power, land, capital and institutional capability to deploy 5MW to 100MW+ facilities — then brings the GPUs, capital and deployment expertise."
      />

      <section className="secSm">
        <Container>
          <Reveal className="partners">
            {PARTNERS.map((partner) => (
              <div className="partner" key={partner.name}>
                <div className="pn">{partner.name}</div>
                <div className="pr">{partner.role}</div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Deployment markets"
            title="Mumbai and Chennai first."
            lead="Curiosity AI is deploying NVIDIA Blackwell and next-generation compute infrastructure across AI Factories in Mumbai and Chennai, scaling to additional sites through 2029."
            headerClassName="mb-12"
          />
          <Reveal className="g2">
            <Card hoverable tag="Market 01" title="Mumbai">
              <p>
                India&apos;s densest connectivity and financial hub, and the anchor market for
                Curiosity AI&apos;s first phase of deployment.
              </p>
            </Card>
            <Card hoverable tag="Market 02" title="Chennai">
              <p>
                A major landing point for international subsea capacity and a growing centre of
                AI-ready data centre development on India&apos;s east coast.
              </p>
            </Card>
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="The partnership model"
            title="What Curiosity AI brings to an AI Factory."
            size="lg"
            headerClassName="mb-12"
          />
          <Reveal>
            <Accordion items={MODEL} defaultOpen={0} />
          </Reveal>
        </Container>
      </section>

      <Statement
        title="Have power, land or an"
        highlight="AI-ready facility?"
        body="Let's talk about turning available capacity into a revenue-generating AI Factory."
        primary={{ href: "/contact", label: "Become a partner" }}
        secondary={{ href: "/infrastructure", label: "See the roadmap" }}
      />
    </>
  );
}

