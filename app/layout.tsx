import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://anuj4u.in"),
  title: {
    default: "Anuj Mishra | Social Media & Video Growth Specialist",
    template: "%s | Anuj Mishra",
  },
  description: "Maximize Reach & Revenue with Expert Social Media Strategy, Video Editing (Descript, DaVinci Resolve), YouTube Management & Growth Marketing by Anuj Mishra.",
  keywords: ["Anuj Mishra", "Video Editing", "Social Media Management", "YouTube Management", "Canva Design", "Google Ads", "Growth Marketing"],
  authors: [{ name: "Anuj Mishra" }],
  creator: "Anuj Mishra",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Anuj Mishra",
    locale: "en_US",
    title: "Anuj Mishra | Portfolio",
    description: "I help creators and brands scale through data-driven content, video editing, and conversion-focused ad management.",
    url: "https://anuj4u.in",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Anuj Mishra - Video Editor and Growth Marketer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Mishra | Portfolio",
    description: "I help creators and brands scale through data-driven content, video editing, and conversion-focused ad management.",
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  manifest: "/manifest.webmanifest",
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
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://anuj4u.in/#business",
                  name: "Anuj Mishra — Video Editing & Growth Marketing",
                  url: "https://anuj4u.in",
                  image: "https://anuj4u.in/api/og",
                  email: "contact@anuj4u.in",
                  priceRange: "$$",
                  areaServed: "Worldwide",
                  serviceType: [
                    "Video Editing",
                    "Social Media Management",
                    "YouTube Channel Management",
                    "Google Ads",
                    "LinkedIn Ads",
                    "AI Automation",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "IN",
                  },
                  founder: { "@type": "Person", name: "Anuj Mishra" },
                  sameAs: ["https://linkedin.com"],
                },
                {
                  "@type": "Person",
                  name: "Anuj Mishra",
                  url: "https://anuj4u.in",
                  jobTitle: "Video Editor & Growth Marketing Specialist",
                  email: "contact@anuj4u.in",
                  knowsAbout: [
                    "Video Editing",
                    "Social Media Management",
                    "Google Ads",
                    "YouTube Channel Management",
                    "AI Automation",
                  ],
                  sameAs: ["https://linkedin.com"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://anuj4u.in/#website",
                  url: "https://anuj4u.in",
                  name: "Anuj Mishra",
                  inLanguage: "en",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-surface text-on-surface antialiased">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
