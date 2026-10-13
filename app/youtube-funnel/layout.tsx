import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze My YouTube Channel",
  description:
    "Paste your YouTube channel URL and get a free AI strategy — thumbnail, title, hook and audience fixes — delivered to your inbox.",
};

export default function YouTubeFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
