// ---------------------------------------------------------------------------
// Mainstay Multi-Tenant CMS Client Layer
// Bridges curiosity-ai-sharp with Mainstay microservices via Kong API Gateway
// ---------------------------------------------------------------------------

import {
  NEWS as DEFAULT_NEWS,
  ANNOUNCEMENT as DEFAULT_ANNOUNCEMENT,
  PARTNERS as DEFAULT_PARTNERS,
  STACK as DEFAULT_STACK,
} from "./content.js";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_MAINSTAY_API_URL ||
  "https://dunytgqgpv9fu.cloudfront.net/api/v1";
const TENANT_SLUG =
  process.env.NEXT_PUBLIC_MAINSTAY_TENANT_SLUG || "curiosity-ai-nexus";

const defaultHeaders = {
  "Content-Type": "application/json",
  "x-tenant-slug": TENANT_SLUG,
};

/**
 * Format a Date string or timestamp into short human-readable month/year
 */
function formatDate(dateStr) {
  if (!dateStr) return "Sept 2026";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

/**
 * 1. BLOG SERVICE
 * Fetches active published blogs and maps them to News items + Hero Announcement
 */
export async function fetchActiveBlogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/active`, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch blogs (${res.status}). Using fallback content.`);
      return { news: DEFAULT_NEWS, announcement: DEFAULT_ANNOUNCEMENT };
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { news: DEFAULT_NEWS, announcement: DEFAULT_ANNOUNCEMENT };
    }

    // Format blogs into News items
    const news = data.map((item) => ({
      id: item.id,
      slug: item.slug,
      tag: (item.tags && item.tags[0]) || "Deployment",
      date: formatDate(item.published_at || item.createdAt),
      title: item.title,
      body: item.excerpt || item.content?.slice(0, 140) || "",
      href: `/company#${item.slug}`,
      isHero: Boolean(item.is_hero),
    }));

    // Find hero announcement or fallback to first blog
    const heroBlog = data.find((b) => b.is_hero) || data[0];
    const announcement = heroBlog
      ? {
          kicker: (heroBlog.tags && heroBlog.tags[0]) ? `${heroBlog.tags[0]} update` : "Deployment update",
          date: formatDate(heroBlog.published_at || heroBlog.createdAt),
          title: heroBlog.title,
          href: `/company#${heroBlog.slug}`,
        }
      : DEFAULT_ANNOUNCEMENT;

    return { news, announcement };
  } catch (err) {
    console.warn("[Mainstay API] Error fetching blogs:", err.message);
    return { news: DEFAULT_NEWS, announcement: DEFAULT_ANNOUNCEMENT };
  }
}

/**
 * Fetch a single blog by its slug
 */
export async function fetchBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/slug/${slug}`, {
      headers: defaultHeaders,
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[Mainstay API] Error fetching blog slug "${slug}":`, err.message);
    return null;
  }
}

/**
 * 2. PARTNERSHIPS SERVICE
 * Fetches active data centre and AI Factory partner logos & details
 */
export async function fetchActivePartnerships() {
  try {
    const res = await fetch(`${API_BASE_URL}/partnerships/active`, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch partnerships (${res.status}). Using fallback.`);
      return DEFAULT_PARTNERS;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return DEFAULT_PARTNERS;
    }

    // Format partners
    const PARTNER_NAME_MAP = {
      sify: { name: "Sify", role: "AI Data Centre" },
      ltvyoma: { name: "L&T Vyoma", role: "AI Data Centre" },
      technodigital: { name: "Techno Digital", role: "AI Data Centre" },
      ctrls: { name: "CtrlS", role: "Asia's largest Rated 4 datacentre" },
      yotta: { name: "Yotta", role: "AI Data Centre" },
      ironmountain: { name: "Iron Mountain", role: "Data Centers" },
    };

    return data.map((item) => {
      let name = item.extra_field?.name || item.name || item.title;
      let role = item.extra_field?.role || item.role;

      if (!name && item.logo) {
        const match = item.logo.match(/\/([a-z0-9]+)\.(svg|png|jpg|webp)/i);
        if (match && PARTNER_NAME_MAP[match[1].toLowerCase()]) {
          name = PARTNER_NAME_MAP[match[1].toLowerCase()].name;
          if (!role) role = PARTNER_NAME_MAP[match[1].toLowerCase()].role;
        }
      }

      return {
        id: item.id,
        name: name || "Partner",
        role: role || "AI Data Centre",
        url: item.website_url || "#",
        logoUrl: item.logo_url || item.logo || null,
      };
    });
  } catch (err) {
    console.warn("[Mainstay API] Error fetching partnerships:", err.message);
    return DEFAULT_PARTNERS;
  }
}

/**
 * 3. SOLUTION HIGHLIGHTS SERVICE
 * Fetches landing page propositions & infrastructure scaling stack layers
 */
export async function fetchActiveSolutionHighlights() {
  try {
    const res = await fetch(`${API_BASE_URL}/solution-highlights/active`, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch solution highlights (${res.status}). Using fallback.`);
      return DEFAULT_STACK;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return DEFAULT_STACK;
    }

    // Format solution highlights to match STACK propositions
    return data.map((item) => ({
      id: item.id,
      kicker: item.badge || "Proposition",
      title: item.title,
      body: item.description,
      features: item.features || [],
      primaryCta: item.primary_cta_label
        ? { label: item.primary_cta_label, href: item.primary_cta_url || "/platform" }
        : null,
    }));
  } catch (err) {
    console.warn("[Mainstay API] Error fetching solution highlights:", err.message);
    return DEFAULT_STACK;
  }
}

/**
 * 4. CONTACT SERVICE
 * Submits lead capture and compute reservation inquiries into Mainstay CMS
 */
export async function submitContactInquiry(payload) {
  const { name, email, phone, company, inquiryType, message } = payload;

  const names = (name || "").trim().split(" ");
  const firstName = names[0] || "Inquirer";
  const lastName = names.slice(1).join(" ") || "";

  const body = {
    firstName,
    lastName,
    email,
    phone: phone || "",
    company: company || "N/A",
    status: "lead",
    notes: `[Inquiry Type: ${inquiryType || "General"}] ${message || ""}`,
    extra_field: {
      inquiryType: inquiryType || "General",
      fullMessage: message || "",
      submittedFrom: "curiosity-ai-landing-contact",
      submittedAt: new Date().toISOString(),
    },
  };

  const res = await fetch(`${API_BASE_URL}/contacts`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Submission failed with status ${res.status}`);
  }

  return await res.json();
}

/**
 * 5. CAREERS & APPLICATIONS SERVICE
 * Fetches active job openings and submits candidate applications
 */
export async function fetchActiveCareers() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/careers`, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch careers (${res.status}).`);
      return [];
    }

    const data = await res.json();
    const items = Array.isArray(data) ? data : data.data || [];
    return items.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.Department || job.department || "Engineering",
      location: job.location || "Mumbai, India",
      type: job.jobType || job.employmentType || "Full-Time",
      experience: job.experience || job.extra_field?.experience || "3+ Years",
      description: job.summary || job.description || "",
      responsibilities: job.responsibilities || job.extra_field?.responsibilities || [],
      requiredSkills: job.requiredSkills || job.extra_field?.requiredSkills || [],
      order: job.order || 0,
    }));
  } catch (err) {
    console.warn("[Mainstay API] Error fetching careers:", err.message);
    return [];
  }
}

export async function submitCareerApplication(careerId, payload) {
  const { fullName, email, phone, linkedin, currentLocation, coverLetter, resumeUrl } = payload;

  const body = {
    fullName,
    email,
    phone: phone || "",
    currentLocation: currentLocation || "India",
    linkedinUrl: linkedin || "",
    coverLetter: coverLetter || "",
    resumeUrl: resumeUrl || "",
    consentToDataProcessing: true,
    extra_field: {
      appliedFrom: "curiosity-ai-careers",
      appliedAt: new Date().toISOString(),
    },
  };

  const res = await fetch(`${API_BASE_URL}/public/careers/${careerId}/applications`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Application failed with status ${res.status}`);
  }

  return await res.json();
}

/**
 * 6. PRODUCT HIGHLIGHTS SERVICE (GPU Configurations)
 * Fetches dynamic compute cluster offerings
 */
export async function fetchActiveProductHighlights() {
  try {
    const res = await fetch(`${API_BASE_URL}/product-highlights/active`, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch product highlights (${res.status}).`);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      label: item.label || "GPU Compute",
      title: item.title,
      description: item.description,
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
      ctas: Array.isArray(item.ctas) ? item.ctas : [],
      order: item.display_order || 0,
    }));
  } catch (err) {
    console.warn("[Mainstay API] Error fetching product highlights:", err.message);
    return [];
  }
}

/**
 * 7. SHOWCASE SERVICE (Deployment Case Studies)
 * Fetches multi-milestone deployment case studies
 */
export async function fetchActiveShowcases(section) {
  try {
    const url = section
      ? `${API_BASE_URL}/showcases/active?section=${encodeURIComponent(section)}`
      : `${API_BASE_URL}/showcases/active`;

    const res = await fetch(url, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch showcases (${res.status}).`);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      section: item.section,
      tabTitle: item.tab_title,
      contentTitle: item.content_title,
      points: Array.isArray(item.content_points) ? item.content_points : [],
      ctaText: item.cta_text,
      ctaUrl: item.cta_url,
      order: item.order || 0,
    }));
  } catch (err) {
    console.warn("[Mainstay API] Error fetching showcases:", err.message);
    return [];
  }
}

/**
 * 8. TESTIMONIALS SERVICE (Partner & Customer Quotes)
 * Fetches verified partner endorsements
 */
export async function fetchActiveTestimonials() {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials/active`, {
      headers: defaultHeaders,
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[Mainstay API] Failed to fetch testimonials (${res.status}).`);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      designation: item.designation,
      company: item.company,
      quote: item.testimonial,
      logoUrl: item.company_logo || null,
      order: item.display_order || 0,
    }));
  } catch (err) {
    console.warn("[Mainstay API] Error fetching testimonials:", err.message);
    return [];
  }
}
