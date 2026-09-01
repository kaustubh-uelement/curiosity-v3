const API_URL = "https://dunytgqgpv9fu.cloudfront.net/api/v1";
const EMAIL = "admin@curiosityai.co";
const PASSWORD = "CuriosityAdmin@123";

async function login() {
  console.log(`[Cloud Seed] Authenticating with ${API_URL}/auth/login...`);
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
  console.log(`[Cloud Seed] Authenticated as ${data.user.email} (Tenant: ${data.user.tenantId})`);
  return data.accessToken;
}

async function seedCareers(token) {
  console.log("\n[Cloud Seed] Seeding Careers & Job Openings...");
  const jobs = [
    {
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
      order: 1,
    },
    {
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
      order: 2,
    },
    {
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
      order: 3,
    },
    {
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
      order: 4,
    },
  ];

  for (const job of jobs) {
    try {
      const res = await fetch(`${API_URL}/careers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: job.title,
          department: job.department,
          location: job.location,
          employmentType: "full-time",
          description: job.description,
          order: job.order,
          extra_field: {
            experience: job.experience,
            responsibilities: job.responsibilities,
            requiredSkills: job.requiredSkills,
            requisitionStatus: "live",
          },
          isActive: true,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        // Ensure job is activated
        await fetch(`${API_URL}/careers/${created.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive: true, requisitionStatus: "live" }),
        });
        console.log(`  ✓ Job created & activated: ${job.title}`);
      } else {
        const txt = await res.text();
        console.log(`  - Job response (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating job "${job.title}":`, e.message);
    }
  }
}

async function seedProductHighlights(token) {
  console.log("\n[Cloud Seed] Seeding Product Highlights (GPU Configurations)...");
  const products = [
    {
      label: "Flagship Training",
      title: "NVIDIA Blackwell B300 SuperPOD",
      description:
        "5MW air-cooled cluster architecture featuring fifth-generation Tensor Cores and 3.2 Tbps Quantum-2 InfiniBand for trillion-parameter frontier training.",
      highlights: [
        { label: "Architecture", value: "NVIDIA Blackwell" },
        { label: "Memory", value: "288GB HBM3e / GPU" },
        { label: "Interconnect", value: "3.2 Tbps NVLink 5 + InfiniBand" },
        { label: "Cooling Model", value: "Air-Cooled Tier-IV Ready" },
      ],
      ctas: [{ label: "Reserve 5MW Capacity", url: "/contact" }],
      order: 1,
    },
    {
      label: "Ultra-Density Inference & Training",
      title: "NVIDIA GB300 NVL72 Liquid-Cooled",
      description:
        "10MW liquid-cooled compute pods with direct-to-chip CDU loops, delivering maximum computational density per square foot with ultra-low PUE.",
      highlights: [
        { label: "Architecture", value: "Grace Blackwell GB300" },
        { label: "Pod Density", value: "72 GPUs / Liquid-Cooled Rack" },
        { label: "PUE Efficiency", value: "< 1.22 PUE" },
        { label: "Cooling Model", value: "Direct-to-Chip Liquid Cooling" },
      ],
      ctas: [{ label: "Reserve 10MW Capacity", url: "/contact" }],
      order: 2,
    },
    {
      label: "Open Sovereign Compute",
      title: "AMD Instinct MI325X Cluster",
      description:
        "High-bandwidth open compute platform engineered for massive memory capacity, large context windows, and cost-effective enterprise inference.",
      highlights: [
        { label: "Architecture", value: "AMD CDNA 3" },
        { label: "Memory", value: "256GB HBM3e (6 TB/s)" },
        { label: "Fabric", value: "UltraScale Spectrum-X RoCE" },
        { label: "Software Stack", value: "ROCm 6.0 Open Ecosystem" },
      ],
      ctas: [{ label: "Explore AMD Fleet", url: "/contact" }],
      order: 3,
    },
  ];

  for (const prod of products) {
    try {
      const res = await fetch(`${API_URL}/product-highlights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label: prod.label,
          title: prod.title,
          description: prod.description,
          highlights: prod.highlights,
          ctas: prod.ctas,
          display_order: prod.order,
          is_active: true,
        }),
      });
      if (res.ok) {
        console.log(`  ✓ Product highlight created: ${prod.title}`);
      } else {
        const txt = await res.text();
        console.log(`  - Product highlight response (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating product "${prod.title}":`, e.message);
    }
  }
}

async function seedShowcases(token) {
  console.log("\n[Cloud Seed] Seeding Showcases (Deployment Case Studies)...");
  const showcases = [
    {
      section: "infrastructure",
      tab_title: "Mumbai 5MW Phase 1",
      content_title: "Mumbai Phase 1: 5MW Fast-Track Turnkey Commissioning",
      content_points: [
        "Commissioned across Tier-IV campus with carrier-neutral dual 33kV substations.",
        "Deployed 4 SuperPOD clusters of NVIDIA Blackwell B300 in under 12 weeks.",
        "Full 5-year colocation offtake underwritten from Day 1.",
      ],
      cta_text: "View Infrastructure Details",
      cta_url: "/infrastructure",
      order: 1,
    },
    {
      section: "infrastructure",
      tab_title: "Liquid Cooling Retrofit",
      content_title: "Tier-IV Direct-to-Chip Liquid Cooling System (PUE 1.22)",
      content_points: [
        "Engineered closed-loop secondary CDU manifolds supporting 100kW+ per rack.",
        "Zero potable water consumption utilizing advanced dry-coolers.",
        "Reduces cooling energy overhead by 38% compared to traditional air cooling.",
      ],
      cta_text: "Explore Liquid Cooling",
      cta_url: "/ai-factories",
      order: 2,
    },
    {
      section: "customers",
      tab_title: "Neo-Cloud Offtake",
      content_title: "Global Demand Translation: 100% Contracted Sovereign Capacity",
      content_points: [
        "Aggregates long-term US and global neo-cloud GPU reservations.",
        "Delivers dedicated bare-metal clusters with SLA guarantees over 99.95%.",
        "Enables domestic data residency for sovereign AI and defense workloads.",
      ],
      cta_text: "Reserve Neo-Cloud Capacity",
      cta_url: "/contact",
      order: 3,
    },
  ];

  for (const s of showcases) {
    try {
      const res = await fetch(`${API_URL}/showcases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section: s.section,
          tab_title: s.tab_title,
          content_title: s.content_title,
          content_points: s.content_points,
          cta_text: s.cta_text,
          cta_url: s.cta_url,
          order: s.order,
          is_active: true,
        }),
      });
      if (res.ok) {
        console.log(`  ✓ Showcase created: ${s.tab_title}`);
      } else {
        const txt = await res.text();
        console.log(`  - Showcase response (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating showcase "${s.tab_title}":`, e.message);
    }
  }
}

async function seedTestimonials(token) {
  console.log("\n[Cloud Seed] Seeding Testimonials...");
  const testimonials = [
    {
      name: "Sanjay Kaushik",
      designation: "Executive Director, Infrastructure",
      company: "Sify Technologies",
      testimonial:
        "Curiosity AI brings an institutional capital and execution engine that enables us to convert power and land into revenue-producing GPU clusters in record time.",
      order: 1,
    },
    {
      name: "David Chen",
      designation: "VP of Compute Operations",
      company: "Frontier Neo-Cloud Inc.",
      testimonial:
        "Reserving megawatt-scale Blackwell capacity with Curiosity AI gave us guaranteed sovereign infrastructure in India with tier-1 reliability and latency.",
      order: 2,
    },
    {
      name: "Rohan Varma",
      designation: "Managing Partner",
      company: "Green Frontier Capital",
      testimonial:
        "Punit Goyal's track record in scaling physical clean mobility infrastructure translates seamlessly into the massive capital and power requirements of AI factories.",
      order: 3,
    },
  ];

  for (const t of testimonials) {
    try {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: t.name,
          designation: t.designation,
          company: t.company,
          testimonial: t.testimonial,
          display_order: t.order,
          is_active: true,
        }),
      });
      if (res.ok) {
        console.log(`  ✓ Testimonial created: ${t.name} (${t.company})`);
      } else {
        const txt = await res.text();
        console.log(`  - Testimonial response (${res.status}): ${txt}`);
      }
    } catch (e) {
      console.error(`  ✗ Error creating testimonial "${t.name}":`, e.message);
    }
  }
}

async function run() {
  try {
    const token = await login();
    await seedCareers(token);
    await seedProductHighlights(token);
    await seedShowcases(token);
    await seedTestimonials(token);
    console.log("\n🎉 All 4 new services successfully seeded on Cloud Mainstay CMS!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

run();
