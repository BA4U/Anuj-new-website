import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Anuj Mishra | Get In Touch",
  description: "Contact Anuj Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
