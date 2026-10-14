import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit My YouTube Channel",
  description:
    "Paste your YouTube channel link and get a free 30-day plan with hooks, titles, thumbnail ideas and your top fix, delivered to your inbox.",
};

export default function YouTubeFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
