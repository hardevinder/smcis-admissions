import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://smcis-admissions.edubridgeerp.in"),
  title: "SMCIS Admission Form 2026-27 | Seth Malook Chand International School",
  description:
    "Admission Form 2026-27 for Seth Malook Chand International School. Submit parent and student details for admission guidance.",
  icons: {
    icon: "/images/smcis/logo.png",
    apple: "/images/smcis/logo.png",
  },
  openGraph: {
    title: "SMCIS Admission Form 2026-27",
    description:
      "Fill the admission form for Seth Malook Chand International School.",
    url: "https://smcis-admissions.edubridgeerp.in",
    siteName: "Seth Malook Chand International School",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/smcis/logo.png",
        width: 1536,
        height: 1024,
        alt: "SMCIS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMCIS Admission Form 2026-27",
    description:
      "Submit parent and student details for admission guidance at SMCIS.",
    images: ["/images/smcis/logo.png"],
  },
  keywords: [
    "SMCIS",
    "Seth Malook Chand International School",
    "SMCIS Admissions",
    "School Admissions 2026",
    "CBSE School Sasni",
    "CBSE School Aligarh",
    "Best CBSE School near Aligarh",
    "Nursery admission",
    "Play Group admission",
  ],
  authors: [{ name: "Seth Malook Chand International School" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#172554" />
      </head>
      <body>{children}</body>
    </html>
  );
}
