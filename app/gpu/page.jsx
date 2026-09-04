import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Statement from "@/components/Statement";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { GPUS as FALLBACK_GPUS, WORKLOADS } from "@/lib/content";
import { fetchActiveProductHighlights } from "@/lib/mainstay";

export const metadata = {
  title: "GPU Infrastructure",
  description:
    "NVIDIA Blackwell B300 and GB300 SuperPOD clusters and AMD Instinct MI400 infrastructure for training, inference, frontier AI, generative AI and HPC.",
};

export const dynamic = "force-dynamic";

const PHASE1 = [
  { n: 4, label: "SuperPOD clusters in Phase 1" },
  { n: 576, label: "GPUs per cluster" },
  { n: 2304, label: "Total GPUs, Phase 1" },
  { n: 72, label: "Nodes per cluster · 8 GPU/node" },
];

// Helper function to resolve product image based on product title or index
function getProductImage(title = "", index = 0) {
  const t = (title || "").toLowerCase();
  if (t.includes("b300") && !t.includes("gb300")) {
    return "/products/nvidia-blackwell-b300.png";
  }
  if (t.includes("gb300") || t.includes("nvl72")) {
    return "/products/nvidia-gb300-nvl72.png";
  }
  if (t.includes("amd") || t.includes("mi325") || t.includes("mi400") || t.includes("instinct")) {
    return "/products/amd-instinct-mi325x.png";
  }
  const fallbackImages = [
    "/products/nvidia-blackwell-b300.png",
    "/products/nvidia-gb300-nvl72.png",
    "/products/amd-instinct-mi325x.png",
  ];
  return fallbackImages[index % fallbackImages.length];
}

export default async function Gpu() {
  const products = await fetchActiveProductHighlights();

  // If dynamic products exist in Mainstay, use them; otherwise fallback to default GPUS
  const gpuCards =
    products.length > 0
      ? products.map((p, idx) => ({
          tag: p.label,
          name: p.title,
          body: p.description,
          image: p.image || getProductImage(p.title, idx),
          specs: p.highlights.map((h) => `${h.label}: ${h.value}`),
        }))
      : FALLBACK_GPUS;

  return (
    <>
      <PageHero
        kicker="GPU Infrastructure"
        title="Engines of abundant intelligence."
        lead="Curiosity AI deploys the latest generation of NVIDIA and AMD GPUs across AI Factories for training workloads, inference, frontier AI modelling, generative AI and high-performance computing."
      />

      <section className="secSm">
        <Container>
          <Reveal className="g3">
            {gpuCards.map((gpu) => (
              <Card
                hoverable
                key={gpu.name}
                image={gpu.image}
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
            lead="The opening deployment is four SuperPOD clusters of NVIDIA Blackwell B300 GPUs (2,304 GPUs in total), installed in a partner AI Factory on a five-year colocation model."
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

