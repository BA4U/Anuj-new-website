import type { MetadataRoute } from "next";

const SITE_URL = "https://anuj-portfolio-website-rho.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/portfolio",
    "/portfolio/video-editing",
    "/portfolio/shorts-editing-portfolio",
    "/portfolio/graphic-design-portfolio",
    "/portfolio/youtube-management-portfolio",
    "/about",
    "/testimonials",
    "/contact",
    "/linkedin-funnel",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
