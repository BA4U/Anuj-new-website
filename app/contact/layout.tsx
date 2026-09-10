import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Anuj Mishra | Get In Touch",
  description: "Contact Anuj Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Anuj Mishra | Get In Touch",
    description: "Contact Anuj Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
    url: "https://anuj4u.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Anuj Mishra | Get In Touch",
    description: "Contact Anuj Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
