const API_URL = process.env.NEXT_PUBLIC_MAINSTAY_API_URL || "http://localhost:8000/api/v1";
const EMAIL = "admin@curiosityai.in";
const PASSWORD = "Curiosity@123";

async function login() {
  console.log(`[Seed] Authenticating with ${API_URL}/auth/login...`);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Login failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  console.log(`[Seed] Authenticated successfully as ${data.user.email} (Tenant: ${data.user.tenantId})`);
  return data.accessToken;
}

async function seedBlogs(token) {
  console.log("[Seed] Seeding Blog posts / Deployment updates...");
  const blogs = [
    {
      title: "Phase 1 begins: 5MW of NVIDIA Blackwell B300 capacity",
      slug: "phase-1-begins-5mw-nvidia-blackwell",
      excerpt: "Four SuperPOD clusters enter deployment with a partner AI Factory on a five-year colocation model.",
      content: "Curiosity AI has officially initiated Phase 1 deployment of 5MW NVIDIA Blackwell B300 compute capacity across Tier-IV data centers in Mumbai and Chennai.",
      tags: ["Deployment", "NVIDIA", "Blackwell"],
      status: "published",
      is_hero: true,
      is_top_blog: true,
      published_at: "2026-09-01T00:00:00.000Z",
      display_order: 1,
    },
    {
      title: "Phase 2 expansion: 10MW liquid-cooled NVIDIA GB300 roadmap",
      slug: "phase-2-expansion-10mw-liquid-cooled-gb300",
      excerpt: "Four additional SuperPOD clusters of liquid-cooled NVIDIA GB300 GPUs join the air-cooled B300 fleet.",
      content: "Phase 2 introduces liquid-cooled NVIDIA GB300 clusters engineered for high-density training and frontier model inference.",
      tags: ["Roadmap", "Liquid Cooling", "GB300"],
      status: "published",
      is_hero: false,
      is_top_blog: false,
      published_at: "2026-10-15T00:00:00.000Z",
      display_order: 2,
    },
    {
      title: "Scaling AI Compute Across Mumbai and Chennai",
      slug: "scaling-ai-compute-mumbai-chennai",
      excerpt: "Curiosity AI partners with top Indian data centres to deliver institutional-scale GPU clusters.",
      content: "Strategic multi-site expansion across Mumbai and Chennai ensures carrier neutrality, multi-gigawatt energy scaling, and sovereign AI readiness.",
      tags: ["Infrastructure", "AI Factories", "India"],
      status: "published",
      is_hero: false,
      is_top_blog: false,
      published_at: "2026-08-20T00:00:00.000Z",
      display_order: 3,
    },
  ];

  for (const blog of blogs) {
    try {
      const res = await fetch(`${API_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });
      if (res.ok) {
        console.log(`  ✓ Blog created: ${blog.title}`);
      } else {
        const txt = await res.text();
        console.log(`  - Blog skipped or exists (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating blog "${blog.title}":`, e.message);
    }
  }
}

async function seedPartnerships(token) {
  console.log("[Seed] Seeding AI Factory & Data Centre Partnerships...");
  const partners = [
    { name: "Sify", role: "AI Data Centre", url: "https://sify.com", order: 1 },
    { name: "L&T Vyoma", role: "AI Data Centre", url: "https://larsentoubro.com", order: 2 },
    { name: "Techno Digital", role: "AI Data Centre", url: "https://techno.in", order: 3 },
    { name: "CtrlS", role: "Asia's largest Rated 4 datacentre", url: "https://ctrls.in", order: 4 },
    { name: "Yotta", role: "AI Data Centre", url: "https://yotta.com", order: 5 },
    { name: "Iron Mountain", role: "Data Centers", url: "https://ironmountain.com", order: 6 },
  ];

  for (const partner of partners) {
    try {
      const res = await fetch(`${API_URL}/partnerships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          logo: `/partners/${partner.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.svg`,
          logo_url: `/partners/${partner.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.svg`,
          website_url: partner.url,
          display_order: partner.order,
          is_active: true,
          extra_field: {
            name: partner.name,
            role: partner.role,
          },
        }),
      });
      if (res.ok) {
        console.log(`  ✓ Partnership created: ${partner.name}`);
      } else {
        const txt = await res.text();
        console.log(`  - Partnership status (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating partnership "${partner.name}":`, e.message);
    }
  }
}

async function seedSolutionHighlights(token) {
  console.log("[Seed] Seeding Propositions / Stack Cards...");
  const stack = [
    {
      badge: "Sourcing",
      title: "Built on Proven Sites",
      description:
        "Curiosity AI partners with AI Factories and AI Data Centres across India that already hold the power, land, capital and institutional capability to deploy 5MW to 100MW+ facilities in a phased manner, removing years of greenfield lead time.",
      features: ["Power & Land Ready", "Tier-IV Data Centres", "Zero Greenfield Delay"],
      primary_cta_label: "Explore Sourcing",
      primary_cta_url: "/ai-factories",
      order: 1,
    },
    {
      badge: "Capital",
      title: "Infrastructure as an Investment",
      description:
        "The platform builds, invests and co-invests in GPU compute infrastructure and everything supporting it (CPUs, networking, advanced cooling, and storage) so partners never carry the full capital load alone.",
      features: ["Co-Investment Model", "Full Stack Coverage", "CapEx Optimization"],
      primary_cta_label: "Investment Model",
      primary_cta_url: "/company",
      order: 2,
    },
    {
      badge: "Operations",
      title: "Deployment as an Operating System",
      description:
        "Curiosity AI leads and coordinates institutional-scale GPU deployment end to end, moving from a signed offtake agreement to a running, revenue-generating cluster without hand-offs between disconnected vendors.",
      features: ["End-to-End Coordination", "Zero Vendor Disconnect", "Turnkey Deployment"],
      primary_cta_label: "Operations OS",
      primary_cta_url: "/infrastructure",
      order: 3,
    },
    {
      badge: "Demand",
      title: "Global Demand, Indian Capacity",
      description:
        "The platform partners with large-scale neo-clouds to translate contracted U.S. demand into dedicated AI compute capacity located in India, aggregating demand centred on NVIDIA and AMD GPUs.",
      features: ["US Contracted Offtake", "NVIDIA & AMD Fleets", "Demand Aggregation"],
      primary_cta_label: "Demand Aggregation",
      primary_cta_url: "/customers",
      order: 4,
    },
    {
      badge: "Delivery",
      title: "Sovereign Compute, Delivered",
      description:
        "Scalable, reliable, sovereign GPU-as-a-Service and bare-metal compute is delivered to neo-cloud and enterprise customers for large-scale training workloads, inference and frontier AI.",
      features: ["GPU-as-a-Service", "Dedicated Bare Metal", "3 to 5 Year Reservations"],
      primary_cta_label: "Explore Delivery",
      primary_cta_url: "/platform",
      order: 5,
    },
  ];

  for (const item of stack) {
    try {
      const res = await fetch(`${API_URL}/solution-highlights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          badge: item.badge,
          title: item.title,
          description: item.description,
          features: item.features,
          primary_cta_label: item.primary_cta_label,
          primary_cta_url: item.primary_cta_url,
          display_order: item.order,
          is_active: true,
        }),
      });
      if (res.ok) {
        console.log(`  ✓ Solution highlight created: ${item.badge} - ${item.title}`);
      } else {
        const txt = await res.text();
        console.log(`  - Solution highlight status (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating highlight "${item.title}":`, e.message);
    }
  }
}

async function run() {
  try {
    const token = await login();
    await seedBlogs(token);
    await seedPartnerships(token);
    await seedSolutionHighlights(token);
    console.log("\n✅ Mainstay CMS Seeding Complete for tenant 'curiosity-ai'!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

run();
