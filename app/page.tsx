import legacyDocument from "../valex-website/index.html?raw";

const bodyMatch = legacyDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyMarkup = bodyMatch?.[1] ?? legacyDocument;

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/legacy/styles.css?v=5" />
      <main dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <script src="/legacy/script.js" defer />
    </>
  );
}
