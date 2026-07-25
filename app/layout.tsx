import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://valex-hvac-mechanical.jonathanagarcia0821.chatgpt.site"),
  title: "Valex HVAC Mechanical | Heating & Air Conditioning in Inglewood, CA",
  description:
    "Residential heating and air conditioning for Inglewood and Greater Los Angeles. 25 years of experience. License 1146930 BBB.",
  icons: {
    icon: "/brand/valex-logo-v4-transparent.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Valex HVAC Mechanical",
    title: "Valex HVAC Mechanical | Heating & Air Conditioning",
    description:
      "Residential heating and air conditioning serving Inglewood and Greater Los Angeles.",
    images: [
      {
        url: "/og-v5.png",
        width: 1731,
        height: 909,
        alt: "Valex HVAC Mechanical — Home comfort, heated and cooled right.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valex HVAC Mechanical | Heating & Air Conditioning",
    description:
      "Residential heating and air conditioning serving Inglewood and Greater Los Angeles.",
    images: ["/og-v5.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
