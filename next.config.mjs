/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'anuj4u.in',
      },
    ],
  },
  async redirects() {
    return [
      { source: "/linkedin-growth-guide-2025-free-templates", destination: "/blog/linkedin-growth-guide-2025", permanent: true },
      { source: "/from-7-to-2000-subscribers-in-4-months-my-2025-youtube-growth-playbook-including-how-we-got-monetized", destination: "/blog/youtube-growth-playbook-2025", permanent: true },
      { source: "/introduction-my-linkedin-wake-up-call", destination: "/blog/linkedin-growth-blueprint", permanent: true },
      { source: "/portfolio/video-editing", destination: "/work/long-form", permanent: true },
      { source: "/portfolio/shorts-editing-portfolio", destination: "/work/short-form", permanent: true },
      { source: "/portfolio/graphic-design-portfolio", destination: "/work/thumbnails", permanent: true },
      { source: "/portfolio/youtube-management-portfolio", destination: "/work/case-studies", permanent: true },
      { source: "/portfolio/:path*", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
