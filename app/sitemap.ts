import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog-posts";

const BASE_URL = "https://anuj4u.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/work/long-form", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/work/short-form", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/work/thumbnails", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/work/case-studies", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/linkedin-funnel", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/youtube-funnel", priority: 0.9, changeFrequency: "weekly" as const },
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
