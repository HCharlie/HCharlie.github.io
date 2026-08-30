import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const site = (path) => new URL(`../_site/${path}`, import.meta.url);

test("software delivery patterns are generated and linked from the series", async () => {
  const [patterns, delivery] = await Promise.all([
    readFile(site("patterns/index.html"), "utf8"),
    readFile(site("patterns/software-delivery/index.html"), "utf8"),
  ]);

  assert.match(patterns, /href="\/patterns\/software-delivery\/"/);
  assert.match(delivery, /Deployment, Release, and Rollout for Hosted Software/);
  assert.match(delivery, /Pattern map/);
  assert.match(delivery, /Operational comparison/);
  assert.match(delivery, /Building a Complete Delivery Plan/);
  assert.match(delivery, /class="[^"]*\bmermaid\b[^"]*"/);
  assert.match(delivery, /mermaid@11\.16\.1/);
  assert.match(delivery, /A\/B testing/);

  const decisionFlow = delivery.match(/<pre class="mermaid decision-flow">([\s\S]*?)<\/pre>/)?.[1] ?? "";
  for (const concept of [
    "Which states change",
    "Deployment lane",
    "What runtime target changes",
    "Which deployment approach",
    "How should deployment progress",
    "Release lane",
    "What availability changes",
    "Which release control",
    "How should release progress",
    "canary deployment",
    "canary release",
    "Sequential",
    "Lockstep",
    "Pipelined or",
    "Pause",
    "Roll forward",
    "No staged transition",
  ]) {
    assert.match(decisionFlow, new RegExp(concept));
  }
  assert.match(delivery, /typical tendencies, not guarantees/);
  assert.equal(delivery.match(/<table>/g)?.length, 2);

  const patternOrder = [
    "Recreate",
    "Rolling deployment",
    "Blue-green",
    "Feature flags",
    "Dark launch",
    "Shadow validation",
    "Canary",
    "Rings and waves",
    "Regional or tenant rollout",
    "A/B testing",
    "Progressive delivery",
  ];

  for (const [, table] of delivery.matchAll(/<table>([\s\S]*?)<\/table>/g)) {
    let previousPosition = -1;
    for (const pattern of patternOrder) {
      const position = table.indexOf(pattern);
      assert.ok(position > previousPosition, `${pattern} should follow the preceding pattern group`);
      previousPosition = position;
    }
  }
});

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
