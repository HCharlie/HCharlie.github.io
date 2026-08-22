import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const site = (path) => new URL(`../_site/${path}`, import.meta.url);

test("generated site preserves routes, content, links, Mermaid, and exclusions", async () => {
  const [home, patterns, reliability, roadmap, asset] = await Promise.all([
    readFile(site("index.html"), "utf8"),
    readFile(site("patterns/index.html"), "utf8"),
    readFile(site("patterns/reliability/index.html"), "utf8"),
    readFile(site("roadmap/index.html"), "utf8"),
    readFile(site("assets/changli.jpg")),
  ]);

  assert.ok(asset.length > 0);
  assert.match(home, /Hello, I’m Changli/);
  assert.match(home, /href="\/patterns\/"/);
  assert.match(home, /href="\/roadmap\/"/);
  assert.match(home, /src="\/assets\/changli\.jpg"/);
  assert.match(patterns, /Software patterns are compressed experience/);
  assert.match(patterns, /href="\/patterns\/reliability\/"/);
  assert.match(reliability, /Reliability patterns help systems contain failures/);
  assert.match(reliability, /href="\/patterns\/"/);
  assert.match(roadmap, /This is a living map of what I’m building for this site/);

  const mermaidUrl = "https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.esm.min.mjs";
  assert.equal(`${home}${patterns}${reliability}`.includes(mermaidUrl), false);
  assert.equal(roadmap.includes(mermaidUrl), true);

  await assert.rejects(access(site("patterns/choosing-reliability-patterns/SKILL/index.html")));
});
