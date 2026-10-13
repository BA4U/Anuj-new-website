import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze My YouTube Channel",
  description:
    "Paste your YouTube channel link and get a free 30-day plan — hooks, titles, thumbnail direction and the one fix that matters — delivered to your inbox.",
};

export default function YouTubeFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
