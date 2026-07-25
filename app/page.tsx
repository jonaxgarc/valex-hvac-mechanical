import legacyDocument from "../valex-website/index.html?raw";
import Script from "next/script";

const bodyMatch = legacyDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyMarkup = bodyMatch?.[1] ?? legacyDocument;
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Valex HVAC Mechanical",
  url: "https://valex-hvac-mechanical.jonathanagarcia0821.chatgpt.site",
  telephone: "+13109260495",
  email: "valexhvacmechanical@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4825 W 94th St",
    addressLocality: "Inglewood",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: ["Inglewood", "Greater Los Angeles"],
  description:
    "Residential HVAC installation, repair, and maintenance serving Inglewood and Greater Los Angeles.",
};

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/legacy/styles.css?v=6" />
      <link rel="stylesheet" href="/gallery.css?v=3" />
      <link rel="preload" as="image" href="/portfolio/valex-project-36.jpg" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <Script src="/legacy/script.js?v=7" strategy="afterInteractive" />
    </>
  );
}
