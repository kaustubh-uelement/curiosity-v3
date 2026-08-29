import Reveal from "@/components/Reveal";
import Flow from "@/components/Flow";
import StackCards from "@/components/StackCards";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { STACK } from "@/lib/content";

export const metadata = {
  title: "The Platform",
  description:
    "The full-stack Curiosity AI compute infrastructure platform: land, power, capital, GPUs, networking, cooling, storage and deployment.",
};

const AUDIENCES = [
  {
    n: "01",
    h: "For AI Factory partners",
    p: "Access to capital, GPUs and deployment expertise — turning available power, land and capacity into a revenue-generating AI Factory designed for scale.",
  },
  {
    n: "02",
    h: "For neo-clouds & enterprises",
    p: "Reserve long-term GPUaaS capacity with access to world-class AI Factories from 5MW to 100MW+ — without building or financing infrastructure yourself.",
  },
  {
    n: "03",
    h: "For the platform",
    p: "One coordinated view across power, compute and delivery — so capacity moves from contract to production without hand-offs between disconnected vendors.",
  },
];

export default function Platform() {
  return (
    <>
      <PageHero
        kicker="The Platform"
        title="A full-stack AI compute infrastructure platform."
        lead="Curiosity AI brings together everything an AI Factory needs — land, power, capital, GPUs and the infrastructure around them — and converts it into contracted compute capacity."
      />

      <section className="secSm">
        <Container>
          <Reveal>
            <Flow />
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Business model"
            title="From demand to deployment."
            lead="Curiosity AI sits between AI Factory partners and large-scale compute demand — investing in the infrastructure and coordinating its delivery."
            headerClassName="mb-14"
          />
          <StackCards items={STACK} />
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Why full-stack"
            title="Customers focus on AI. We handle the infrastructure."
            size="lg"
            headerClassName="mb-14"
          />
          <Reveal className="g3">
            {AUDIENCES.map((audience) => (
              <Card
                hoverable
                key={audience.n}
                number={audience.n}
                title={audience.h}
                description={audience.p}
              />
            ))}
          </Reveal>
        </Container>
      </section>

      <Statement
        title="See the 5MW to 100MW+"
        highlight="roadmap."
        body="How Curiosity AI scales AI Factory capacity in phases, and the partners already deploying it."
        primary={{ href: "/infrastructure", label: "AI Compute Infrastructure" }}
        secondary={{ href: "/gpu", label: "GPU specifications" }}
      />
    </>
  );
}

