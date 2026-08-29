export default function sitemap() {
  const baseUrl = "https://curiosityai.in";
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
