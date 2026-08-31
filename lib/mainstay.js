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
  process.env.NEXT_PUBLIC_MAINSTAY_API_URL || "http://localhost:8000/api/v1";
const TENANT_SLUG =
  process.env.NEXT_PUBLIC_MAINSTAY_TENANT_SLUG || "curiosity-ai";

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
    return data.map((item) => ({
      id: item.id,
      name: item.extra_field?.name || item.name || "Partner",
      role: item.extra_field?.role || item.role || "AI Data Centre",
      url: item.website_url || "#",
      logoUrl: item.logo_url || item.logo || null,
    }));
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
