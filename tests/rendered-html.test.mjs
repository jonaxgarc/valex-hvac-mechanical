import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Valex homepage with conversion and SEO essentials", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Expert heating &amp; cooling/);
  assert.match(html, /Call \(310\) 926-0495/);
  assert.match(html, /CA #1146930 BBB/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /HVACBusiness/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /codex-preview|Starter Project|Building your site/i);
});

test("server-renders the dedicated, accessible projects gallery", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Projects built for comfort/);
  assert.match(html, /Skip to projects/);
  assert.match(html, /data-gallery-filter="all"/);
  assert.match(html, /data-gallery-lightbox/);
  assert.match(html, /valex-project-39/);
  assert.match(html, /aria-label="Project photo viewer"/);
  assert.match(html, /rel="canonical"/);
});
