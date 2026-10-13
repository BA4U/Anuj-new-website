import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://anuj-portfolio-website-rho.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anuj Mishra — Video Editing & YouTube Growth for Creators",
    template: "%s | Anuj Mishra",
  },
  description:
    "High-retention video editing, YouTube channel management and paid media for creators and brands. Real edits, real numbers, reply within 24 hours.",
  keywords: [
    "Anuj Mishra",
    "Video Editing",
    "YouTube Management",
    "Social Media Management",
    "Descript Editor",
    "DaVinci Resolve",
    "Google Ads",
    "Growth Marketing",
  ],
  authors: [{ name: "Anuj Mishra" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anuj Mishra — Video Editing & YouTube Growth for Creators",
    description:
      "High-retention video editing, YouTube management and paid ads. Real edits, real numbers, reply within 24 hours.",
    type: "website",
    url: "/",
    siteName: "Anuj Mishra",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Mishra — Video Editing & YouTube Growth",
    description:
      "High-retention video editing, YouTube management and paid ads for creators and brands.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Anuj Mishra",
              url: SITE_URL,
              email: "contact@anuj4u.in",
              slogan: "Videos that hook. Strategy that scales.",
              description:
                "Video editing, YouTube channel management, thumbnail design and performance paid ads for creators and brands.",
              founder: { "@type": "Person", name: "Anuj Mishra", jobTitle: "Video Editor & Growth Marketing Specialist" },
              areaServed: "Worldwide",
              knowsAbout: [
                "Video Editing",
                "Social Media Management",
                "Google Ads",
                "YouTube Channel Management",
                "AI Automation",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
        <Navbar />
        <main className="flex-grow pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
