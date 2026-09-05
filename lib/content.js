// ---------------------------------------------------------------------------
// Curiosity AI: content layer
// Source of truth. Derived from the Curiosity AI Intro Deck (Aug 2026).
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Curiosity AI",
  tagline: "Compute AI Infrastructure for Abundant Intelligence.",
  hero: "Compute with an Edge",
  intro:
    "Curiosity AI is the full-stack compute infrastructure platform bringing megawatt-scale AI capacity online by partnering with AI Factories to serve large-scale neo-clouds and enterprise AI.",
  company: "Curiosity AI Private Limited",
  address:
    "Curiosity AI Private Limited, Floor 2, Plot 264/265, Vaswani Chambers, Worli Colony, Mumbai 400030, Maharashtra, India",
  email: {
    primary: "punit@curiosityai.co",
    deploy: "punit@curiosityai.co",
    factories: "punit@curiosityai.co",
    hello: "punit@curiosityai.co",
    careers: "punit@curiosityai.co",
  },
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/gpu", label: "GPU" },
  { href: "/ai-factories", label: "AI Factories" },
  { href: "/customers", label: "Customers" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

/* Hero announcement */
export const ANNOUNCEMENT = {
  kicker: "Deployment update",
  date: "Sept 2026",
  title: "Curiosity AI begins Phase 1: 5MW of NVIDIA Blackwell B300 capacity",
  href: "/infrastructure",
};

/* Live capacity strip */
export const DASHBOARD = [
  {
    label: "Live capacity",
    value: 5,
    unit: "MW",
    note: "Phase 1 · Sept 2026 – Mar 2027",
    live: true,
  },
  { label: "GPUs deployed", value: 2304, note: "4 × SuperPOD clusters" },
  {
    label: "Target capacity",
    value: 100,
    unit: "MW+",
    note: "Phased through 2029",
  },
  { label: "AI Factory partners", value: 6, note: "Mumbai & Chennai" },
];

/* Pioneering capacity: 01/02/03 */
export const PILLARS = [
  {
    n: "01",
    title: "Partnered from\nday one",
    body: "We work with AI Factories and AI Data Centres that already hold the power, land and institutional capability to scale.",
  },
  {
    n: "02",
    title: "Capital that\ndeploys",
    body: "Curiosity AI invests and co-invests directly in GPU and supporting compute infrastructure inside partner facilities.",
  },
  {
    n: "03",
    title: "Contracted\nfrom the start",
    body: "Capacity is underwritten by long-term offtake: 3 to 5 year reservations from neo-clouds and enterprises.",
  },
];

/* Sticky stacking cards: Propositions */
export const STACK = [
  {
    kicker: "Sourcing",
    title: "Built on Proven Sites",
    body: "Curiosity AI partners with AI Factories and AI Data Centres across India that already hold the power, land, capital and institutional capability to deploy 5MW to 100MW+ facilities in a phased manner, removing years of greenfield lead time.",
  },
  {
    kicker: "Capital",
    title: "Infrastructure as an Investment",
    body: "The platform builds, invests and co-invests in GPU compute infrastructure and everything supporting it (CPUs, networking, advanced cooling, and storage) so partners never carry the full capital load alone.",
  },
  {
    kicker: "Operations",
    title: "Deployment as an Operating System",
    body: "Curiosity AI leads and coordinates institutional-scale GPU deployment end to end, moving from a signed offtake agreement to a running, revenue-generating cluster without hand-offs between disconnected vendors.",
  },
  {
    kicker: "Demand",
    title: "Global Demand, Indian Capacity",
    body: "The platform partners with large-scale neo-clouds to translate contracted U.S. demand into dedicated AI compute capacity located in India, aggregating demand centred on NVIDIA and AMD GPUs.",
  },
  {
    kicker: "Delivery",
    title: "Sovereign Compute, Delivered",
    body: "Scalable, reliable, sovereign GPU-as-a-Service and bare-metal compute is delivered to neo-cloud and enterprise customers for large-scale training workloads, inference and frontier AI.",
  },
];

/* "The Opportunity of a Generation" */
export const OPPORTUNITY = [
  {
    title: "Compute is the constraint, not demand",
    body: "Contracted backlog across leading global neo-clouds runs tens to hundreds of times ahead of current quarterly revenue. The bottleneck is deployed capacity.",
  },
  {
    title: "AI infrastructure is an energy problem",
    body: "Megawatt-scale compute needs power, land and connectivity before it needs GPUs. Curiosity AI is built around that sequence, not against it.",
  },
  {
    title: "India is the next deployment frontier",
    body: "AI-ready data centres in Mumbai and Chennai now have the power and institutional capability to host frontier-scale compute, along with the capital to scale it.",
  },
  {
    title: "Long-term contracts underwrite the build",
    body: "Investors value neo-clouds on multi-year infrastructure contracts. Curiosity AI converts that same contracted demand into physical capacity.",
  },
];

export const ROADMAP = [
  {
    mw: "5",
    unit: "MW",
    date: "Sept 2026 – Mar 2027",
    phase: "Phase 01",
    title: "First cluster online",
    short: "First capacity online.",
    body: "4 × SuperPOD clusters of NVIDIA Blackwell B300 GPUs (air-cooled), 576 GPUs per cluster across 72 nodes, hosted on a colocation model with a partner AI Factory for a five-year period.",
    live: true,
  },
  {
    mw: "10",
    unit: "MW",
    date: "2027",
    phase: "Phase 02",
    title: "B300 + GB300",
    short: "Air and liquid cooled fleet.",
    body: "4 × additional SuperPOD clusters of liquid-cooled NVIDIA GB300 GPUs join the air-cooled B300 fleet (B300 delivery in Q1 CY2027, GB300 in Q2 CY2027).",
  },
  {
    mw: "30",
    unit: "MW",
    date: "2028",
    phase: "Phase 03",
    title: "Multi-site scale-out",
    short: "Additional partner sites.",
    body: "Capacity scales across additional AI Factory partner sites, adding AMD Instinct MI400 Series infrastructure for frontier and sovereign AI workloads.",
  },
  {
    mw: "100",
    unit: "MW+",
    date: "2028 – 2029",
    phase: "Phase 04",
    title: "Full factory network",
    short: "National compute network.",
    body: "A revenue-generating AI Factory network designed for scale, delivering GPU-as-a-Service and bare-metal compute to neo-clouds and enterprises across India.",
  },
];

export const PARTNERS = [
  { name: "Sify", role: "AI Data Centre" },
  { name: "L&T Vyoma", role: "AI Data Centre" },
  { name: "Techno Digital", role: "AI Data Centre" },
  { name: "CtrlS", role: "Asia's largest Rated 4 datacentre" },
  { name: "Yotta", role: "AI Data Centre" },
  { name: "Iron Mountain", role: "Data Centers" },
];

export const GPUS = [
  {
    tag: "FLAGSHIP TRAINING",
    name: "NVIDIA Blackwell B300 SuperPOD",
    body: "Phase 1 anchor infrastructure delivering world-class FP4 precision dense compute for frontier LLM pre-training and massive cluster scaling.",
    image: "/products/nvidia-blackwell-b300.png",
    specs: [
      "Architecture: NVIDIA Blackwell",
      "Memory: 288GB HBM3e / GPU",
      "Interconnect: 3.2 Tbps Quantum-X800 InfiniBand",
      "Availability: Q1 CY2027",
    ],
  },
  {
    tag: "ULTRA-DENSITY INFERENCE & TRAINING",
    name: "NVIDIA GB300 NVL72 Liquid-Cooled",
    body: "Rack-scale liquid-cooled powerhouse uniting 72 GPUs into a single unified NVLink domain for trillion-parameter inference and reasoning models.",
    image: "/products/nvidia-gb300-nvl72.png",
    specs: [
      "Architecture: Grace Blackwell GB300",
      "Density: 72 GPUs / Liquid-Cooled Rack",
      "Fabric: 130 TB/s NVLink 5 (< 1.22 PUE)",
      "Availability: Q2 CY2027",
    ],
  },
  {
    tag: "OPEN SOVEREIGN COMPUTE",
    name: "AMD Instinct MI400 Series",
    body: "Open ecosystem high-memory compute clusters powered by ROCm software stack, engineered for generative AI fine-tuning and sovereign deployments.",
    image: "/products/amd-instinct-mi400.png",
    specs: [
      "Architecture: AMD CDNA 4",
      "Memory: Next-Gen High-Bandwidth HBM",
      "Fabric: Ultra Ethernet Consortium (UEC)",
      "Availability: Phase 3 Roadmap",
    ],
  },
];

export const INPUTS = [
  "Land & connectivity",
  "Power & renewable energy access",
  "Capital for scale",
  "GPUs from NVIDIA, AMD & reference architecture",
  "Supporting CPUs, networking, cooling, storage",
  "Deployment of GPUs & compute infra in AI Factory",
];

export const OUTPUTS = [
  "Long-term offtakers in U.S. & India",
  "Institutionally backed neo-clouds in the U.S.",
  "Institutionally backed enterprise customers",
  "Aggregate demand from global neo-clouds: GPUaaS",
  "Revenue-generating AI Factory, designed for scale",
];

export const MARKET = [
  {
    value: "$200",
    unit: "B+",
    label: "Cumulative contracted backlog across leading global neo-clouds.",
  },
  {
    value: "$104",
    unit: "B",
    label: "CoreWeave's contracted AI compute backlog.",
  },
  { value: "40×", label: "CoreWeave backlog relative to quarterly revenue." },
  {
    value: "1",
    unit: "GW+",
    label: "Near-term capacity pipelines among global peers.",
  },
];

export const SEGMENTS = [
  "Enterprises",
  "Model developers",
  "Sovereign AI",
  "Research institutions",
  "Global neo-clouds",
  "Cloud providers",
];

export const WORKLOADS = [
  "Training",
  "Inference",
  "Frontier AI modelling",
  "Generative AI",
  "High performance computing",
];

export const NEWS = [
  {
    tag: "Deployment",
    date: "Sept 2026",
    title: "Phase 1 begins: 5MW of NVIDIA Blackwell B300 capacity",
    body: "Four SuperPOD clusters enter deployment with a partner AI Factory on a five-year colocation model.",
    href: "/infrastructure",
  },
  {
    tag: "Partnerships",
    date: "Aug 2026",
    title: "Six AI Factory partners across Mumbai and Chennai",
    body: "Curiosity AI partners with India's largest AI-ready data centres to deploy megawatt-scale compute.",
    href: "/ai-factories",
  },
  {
    tag: "Platform",
    date: "Aug 2026",
    title: "The full-stack compute infrastructure platform",
    body: "How land, power, capital and GPUs combine into contracted compute capacity for neo-clouds.",
    href: "/platform",
  },
];

export const FAQ = [
  {
    q: "Is Curiosity AI a GPU cloud?",
    a: "No. A GPU cloud rents access to hardware someone else deployed. Curiosity AI is a full-stack compute infrastructure platform: we identify and partner with AI Factories, invest and co-invest in the GPU and supporting infrastructure, coordinate deployment, and then deliver that capacity as GPU-as-a-Service or bare metal.",
  },
  {
    q: "Does Curiosity AI build its own data centres?",
    a: "We partner with AI Factories and AI Data Centres that already have the power, land, capital and institutional capability to deploy 5MW to 100MW+ facilities. That partnership model removes the multi-year lead time of greenfield construction and lets us move quickly from contracted demand to deployment.",
  },
  {
    q: "How much capacity can Curiosity AI bring online?",
    a: "The roadmap scales in phases: 5MW between September 2026 and March 2027, 10MW through 2027, 30MW in 2028, and 100MW+ across 2028–2029. Each phase deploys on partner sites already under development.",
  },
  {
    q: "Which GPUs are deployed?",
    a: "Phase 1 deploys four SuperPOD clusters of air-cooled NVIDIA Blackwell B300 GPUs (576 GPUs per cluster across 72 nodes, 2,304 GPUs in total). Liquid-cooled NVIDIA GB300 SuperPODs follow in Phase 2, with AMD Instinct MI400 Series infrastructure added for frontier and sovereign AI.",
  },
  {
    q: "How is capacity contracted?",
    a: "Customers reserve long-term GPU capacity for 3 to 5 year periods, delivered as managed GPU-as-a-Service or as dedicated single-tenant bare metal, depending on how much control of the stack they need.",
  },
  {
    q: "Where is the infrastructure located?",
    a: "Deployment begins across AI Factories and AI Data Centres in Mumbai and Chennai, scaling to additional partner sites through 2029.",
  },
  {
    q: "Who does Curiosity AI serve?",
    a: "Large-scale neo-clouds and institutionally backed enterprise customers, along with model developers, sovereign AI programmes and research institutions that need long-term training and inference capacity.",
  },
];

export const FOOTER_COLS = [
  {
    title: "Platform",
    links: [
      { href: "/platform", label: "The Platform" },
      { href: "/infrastructure", label: "Infrastructure" },
      { href: "/gpu", label: "GPU Infrastructure" },
    ],
  },
  {
    title: "Network",
    links: [
      { href: "/ai-factories", label: "AI Factories" },
      { href: "/customers", label: "Neo-Clouds" },
      { href: "/customers", label: "Enterprise AI" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "About" },
      { href: "/company", label: "Founder" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export const CAREERS = [
  {
    id: "dc-infra-architect",
    title: "Data Center Infrastructure Architect",
    department: "Infrastructure Engineering",
    location: "Mumbai, India",
    type: "Full-Time",
    experience: "5-8 Years",
    description:
      "Lead the electrical, thermal, and spatial architecture for 5MW to 100MW+ GPU data centre sites across Mumbai and Chennai.",
    responsibilities: [
      "Lead physical data centre engineering and capacity expansion.",
      "Coordinate with power utilities and Tier-IV data centre operators.",
      "Design liquid-cooling topologies and high-density rack power distribution.",
    ],
    requiredSkills: ["High-Density Power", "PUE Optimization", "Tier-IV Topology", "HVAC / CDU"],
  },
  {
    id: "power-systems-specialist",
    title: "High-Density Power Systems Specialist",
    department: "Power & Thermal",
    location: "Mumbai / Chennai, India",
    type: "Full-Time",
    experience: "4-7 Years",
    description:
      "Design and oversee multi-megawatt substation interconnects, UPS systems, and generator backup systems tailored for continuous Blackwell B300 and GB300 loads.",
    responsibilities: [
      "Architect MW-scale power incoming feeds and redundant electrical buses.",
      "Manage substation approvals and grid compliance.",
      "Optimize energy efficiency and power factor for sustained AI training loads.",
    ],
    requiredSkills: ["Medium Voltage Substations", "UPS Architecture", "Grid Interconnection"],
  },
  {
    id: "infiniband-roce-architect",
    title: "InfiniBand / RoCE AI Network Architect",
    department: "Network Engineering",
    location: "Mumbai, India",
    type: "Full-Time",
    experience: "5-9 Years",
    description:
      "Engineer ultra-low-latency 3.2 Tbps Quantum-2 InfiniBand and Spectrum-X RoCE fabrics interconnecting multi-thousand GPU SuperPOD clusters.",
    responsibilities: [
      "Design non-blocking rail-optimized cluster topologies.",
      "Tune congestion control (PFC, ECN) for distributed LLM training.",
      "Monitor optical transceivers, link error rates, and fabric telemetry.",
    ],
    requiredSkills: ["InfiniBand Quantum-2", "RoCEv2 / Spectrum-X", "Rail-Optimized Topologies"],
  },
  {
    id: "gpu-deployment-lead",
    title: "GPU Systems Deployment Lead",
    department: "Operations & Systems",
    location: "Mumbai, India",
    type: "Full-Time",
    experience: "3-6 Years",
    description:
      "Drive turnkey deployment of NVIDIA Blackwell and AMD Instinct server racks from unboxing and cabling to burn-in testing and offtake handoff.",
    responsibilities: [
      "Manage rack installation, cabling, and BMC/IPMI configuration.",
      "Execute NCCL all-reduce and GPU burn-in benchmark suites.",
      "Coordinate fast-track handover to neo-cloud customer workloads.",
    ],
    requiredSkills: ["NVIDIA NCCL Benchmarking", "Linux Kernel / CUDA", "Hardware Burn-in"],
  },
];

export const TESTIMONIALS = [
  {
    id: "sify",
    name: "Sanjay Kaushik",
    designation: "Executive Director, Infrastructure",
    company: "Sify Technologies",
    quote:
      "Curiosity AI brings an institutional capital and execution engine that enables us to convert power and land into revenue-producing GPU clusters in record time.",
  },
  {
    id: "frontier-neo-cloud",
    name: "David Chen",
    designation: "VP of Compute Operations",
    company: "Frontier Neo-Cloud Inc.",
    quote:
      "Reserving megawatt-scale Blackwell capacity with Curiosity AI gave us guaranteed sovereign infrastructure in India with tier-1 reliability and latency.",
  },
  {
    id: "green-frontier",
    name: "Rohan Varma",
    designation: "Managing Partner",
    company: "Green Frontier Capital",
    quote:
      "Punit Goyal's track record in scaling physical clean mobility infrastructure translates seamlessly into the massive capital and power requirements of AI factories.",
  },
];

export const SHOWCASES = [
  {
    id: "mumbai-phase-1",
    tabTitle: "Mumbai 5MW Phase 1",
    contentTitle: "Mumbai Phase 1: 5MW Fast-Track Turnkey Commissioning",
    points: [
      "Commissioned across Tier-IV campus with carrier-neutral dual 33kV substations.",
      "Deployed 4 SuperPOD clusters of NVIDIA Blackwell B300 in under 12 weeks.",
      "Full 5-year colocation offtake underwritten from Day 1.",
    ],
    ctaText: "View Infrastructure Details",
    ctaUrl: "/infrastructure",
  },
  {
    id: "liquid-cooling",
    tabTitle: "Liquid Cooling Retrofit",
    contentTitle: "Tier-IV Direct-to-Chip Liquid Cooling System (PUE 1.22)",
    points: [
      "Engineered closed-loop secondary CDU manifolds supporting 100kW+ per rack.",
      "Zero potable water consumption utilizing advanced dry-coolers.",
      "Reduces cooling energy overhead by 38% compared to traditional air cooling.",
    ],
    ctaText: "Explore Liquid Cooling",
    ctaUrl: "/ai-factories",
  },
  {
    id: "neo-cloud-offtake",
    tabTitle: "Neo-Cloud Offtake",
    contentTitle: "Global Demand Translation: 100% Contracted Sovereign Capacity",
    points: [
      "Aggregates long-term US and global neo-cloud GPU reservations.",
      "Delivers dedicated bare-metal clusters with SLA guarantees over 99.95%.",
      "Enables domestic data residency for sovereign AI and defense workloads.",
    ],
    ctaText: "Reserve Neo-Cloud Capacity",
    ctaUrl: "/contact",
  },
];

