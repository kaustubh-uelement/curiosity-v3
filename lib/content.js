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
    tag: "NVIDIA · air-cooled",
    name: "Blackwell B300",
    body: "SuperPOD clusters of NVIDIA B300 GPUs form the base unit of Phase 1: air-cooled, and the fastest path to first capacity online.",
    specs: ["576 GPU / cluster", "72 nodes", "8 GPU / node", "Q1 CY2027"],
  },
  {
    tag: "NVIDIA · liquid-cooled",
    name: "Blackwell GB300",
    body: "Liquid-cooled SuperPOD clusters for extreme-density deployments, entering service alongside the air-cooled B300 fleet in Phase 2.",
    specs: ["576 GPU / cluster", "72 nodes", "8 GPU / node", "Q2 CY2027"],
  },
  {
    tag: "AMD",
    name: "Instinct MI400 Series",
    body: "Next-generation AMD Instinct GPUs deployed across AI Factories and AI data centres, built for frontier and sovereign AI workloads.",
    specs: ["Frontier AI", "Sovereign AI", "Phase 3+"],
  },
  {
    tag: "NVIDIA · roadmap",
    name: "Vera Rubin generation",
    body: "The compute roadmap tracks NVIDIA's newest architecture generations as they reach availability across partner AI Factories.",
    specs: ["Rack-scale", "Roadmap"],
  },
  {
    tag: "Reference architecture",
    name: "CPUs, networking & storage",
    body: "Every cluster deploys with the supporting CPUs, high-throughput networking, advanced cooling and storage it needs to run at full utilization.",
    specs: ["Networking", "Cooling", "Storage"],
  },
  {
    tag: "Delivery",
    name: "GPUaaS & bare metal",
    body: "Capacity is delivered however customers need it: reserved GPU-as-a-Service or dedicated bare metal on 3 to 5 year terms.",
    specs: ["GPUaaS", "Bare metal", "3–5yr terms"],
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
