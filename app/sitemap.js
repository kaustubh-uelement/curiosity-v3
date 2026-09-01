export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.curiosityai.co";
  const routes = [
    "",
    "/platform",
    "/infrastructure",
    "/gpu",
    "/ai-factories",
    "/customers",
    "/company",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
