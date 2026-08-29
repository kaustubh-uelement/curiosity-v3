import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { GPUS, WORKLOADS } from "@/lib/content";

export const metadata = {
  title: "GPU Infrastructure",
  description:
    "NVIDIA Blackwell B300 and GB300 SuperPOD clusters and AMD Instinct MI400 infrastructure for training, inference, frontier AI, generative AI and HPC.",
};

const PHASE1 = [
  { n: 4, label: "SuperPOD clusters in Phase 1" },
  { n: 576, label: "GPUs per cluster" },
  { n: 2304, label: "Total GPUs, Phase 1" },
  { n: 72, label: "Nodes per cluster · 8 GPU/node" },
];

export default function Gpu() {
  return (
    <>
      <PageHero
        kicker="GPU Infrastructure"
        title="Engines of abundant intelligence."
        lead="Curiosity AI deploys the latest generation of NVIDIA and AMD GPUs across AI Factories — for training workloads, inference, frontier AI modelling, generative AI and high-performance computing."
      />

      <section className="secSm">
        <Container>
          <Reveal className="g3">
            {GPUS.map((gpu) => (
              <Card
                hoverable
                key={gpu.name}
                tag={gpu.tag}
                title={gpu.name}
                description={gpu.body}
                specs={gpu.specs}
              />
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Workloads"
            title="Built for every stage of the AI lifecycle."
            size="lg"
            headerClassName="mb-10"
          />
          <Reveal className="pills">
            {WORKLOADS.map((workload) => (
              <Badge variant="pill" key={workload}>
                {workload}
              </Badge>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeader
            kicker="Phase 1 configuration"
            title="5MW. Four clusters. One deployment."
            lead="The opening deployment is four SuperPOD clusters of NVIDIA Blackwell B300 GPUs — 2,304 GPUs in total — installed in a partner AI Factory on a five-year colocation model."
            size="lg"
            headerClassName="mb-12"
          />
          <Reveal className="g4">
            {PHASE1.map((stat) => (
              <Card key={stat.label}>
                <div className="statV">
                  <CountUp to={stat.n} />
                </div>
                <p className="flex-none">{stat.label}</p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      <Statement
        title="Reserve long-term"
        highlight="GPU capacity."
        body="3–5 year GPU-as-a-Service and bare-metal reservations for neo-clouds and enterprise AI."
        primary={{ href: "/customers", label: "For customers" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </>
  );
}

