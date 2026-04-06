import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../styles/index.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sacco.ug';

export const metadata: Metadata = {
  title: "Flits Sacco - Modern SACCO Management Made Simple",
  description: "Empower your SACCO with a complete digital platform. Manage members, track savings, process loans, and provide members with 24/7 access to their accounts—all in one secure system.",
  keywords: ["SACCO", "cooperative", "savings", "loans", "member management", "digital platform", "financial technology"],
  authors: [{ name: "Flits Sacco" }],
  creator: "Nsamba Isaac",
  publisher: "Flits Sacco",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Flits Sacco",
    title: "Flits Sacco - Modern SACCO Management Made Simple",
    description: "Empower your SACCO with a complete digital platform. Manage members, track savings, process loans, and provide members with 24/7 access to their accounts—all in one secure system.",
    images: [
      {
        url: `/logo.png`, // You should create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Flits Sacco - Modern SACCO Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flits Sacco - Modern SACCO Management Made Simple",
    description: "Empower your SACCO with a complete digital platform. Manage members, track savings, process loans, and provide 24/7 member access.",
    // images: [`${baseUrl}/og-image.png`],
    images: [`/logo.png`],
    creator: "@flitssacco", // Replace with your actual Twitter handle
    site: "@flitssacco", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better social sharing */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={` antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
