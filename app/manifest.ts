import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anuj Mishra — Video Editor & Growth Marketer",
    short_name: "Anuj 4u",
    description:
      "Video editing, social media management, and growth marketing for creators and brands by Anuj Mishra.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcf8f9",
    theme_color: "#4936e6",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
