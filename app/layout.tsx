import type { Metadata } from "next";
import "./globals.css";

const shareTitle = "Admissions Open 2027–28 | Seth Malook Chand International School";
const shareDescription =
  "Begin your child’s SMCIS journey in Sasni. Enquire for 2027–28 admissions, class availability and fee details. Call 7055000524 or 7055000525.";
const shareImage = "/images/smcis/admissions-2027-28-og.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://smcis-admissions.edubridgeerp.in"),
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "/enquiry" },
  icons: {
    icon: "/images/smcis/logo.png",
    apple: "/images/smcis/logo.png",
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: "/enquiry",
    siteName: "Seth Malook Chand International School",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Seth Malook Chand International School logo — Admissions open 2027–28, Sasni. Call 7055000524 or 7055000525.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [{ url: shareImage, alt: "SMCIS — Admissions open for 2027–28" }],
  },
  keywords: [
    "SMCIS",
    "Seth Malook Chand International School",
    "SMCIS Admissions",
    "School Admissions 2027",
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
