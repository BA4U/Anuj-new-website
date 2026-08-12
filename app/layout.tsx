import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Anuj Mishra | Social Media & Video Growth Specialist",
  description: "Maximize Reach & Revenue with Expert Social Media Strategy, Video Editing (Descript, DaVinci Resolve), YouTube Management & Growth Marketing by Anuj Mishra.",
  keywords: ["Anuj Mishra", "Video Editing", "Social Media Management", "YouTube Management", "Canva Design", "Google Ads", "Growth Marketing"],
  authors: [{ name: "Anuj Mishra" }],
  openGraph: {
    title: "Anuj Mishra | Portfolio",
    description: "I help creators and brands scale through data-driven content, video editing, and conversion-focused ad management.",
    type: "website",
    url: "https://anuj4u.in",
  },
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
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-surface text-on-surface antialiased">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
