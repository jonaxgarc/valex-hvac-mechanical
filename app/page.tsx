import legacyDocument from "../valex-website/index.html?raw";

const bodyMatch = legacyDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyMarkup = bodyMatch?.[1] ?? legacyDocument;

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/legacy/styles.css?v=6" />
      <link rel="stylesheet" href="/gallery.css?v=2" />
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <script src="/legacy/script.js?v=6" defer />
    </>
  );
}
