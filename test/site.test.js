import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const site = (path) => new URL(`../_site/${path}`, import.meta.url);

test("deployment, release, and rollout stays focused on the mental model", async () => {
  const [patterns, delivery] = await Promise.all([
    readFile(site("patterns/index.html"), "utf8"),
    readFile(site("patterns/software-delivery/index.html"), "utf8"),
  ]);

  assert.match(patterns, /href="\/patterns\/software-delivery\/"/);
  assert.match(delivery, /Deployment, Release, and Rollout for Hosted Software/);
  assert.match(delivery, /Deployment changes the runtime state/);
  assert.match(delivery, /Release changes availability/);
  assert.match(delivery, /Rollout describes how/);
  assert.match(delivery, /href="\/patterns\/choosing-delivery-patterns\/"/);
  assert.doesNotMatch(delivery, /Pattern Map/);
  assert.doesNotMatch(delivery, /Operational Trade-offs/);
  assert.doesNotMatch(delivery, /Reference: State-Change Combinations/);
  assert.doesNotMatch(delivery, /class="[^\"]*\bmermaid\b[^\"]*"/);
  assert.equal(delivery.match(/<table>/g)?.length ?? 0, 0);
});

test("hosted delivery patterns form a short narrative companion", async () => {
  const [patterns, delivery, choosing] = await Promise.all([
    readFile(site("patterns/index.html"), "utf8"),
    readFile(site("patterns/software-delivery/index.html"), "utf8"),
    readFile(site("patterns/choosing-delivery-patterns/index.html"), "utf8"),
  ]);

  const conceptsLink = patterns.indexOf('href="/patterns/software-delivery/"');
  const choosingLink = patterns.indexOf('href="/patterns/choosing-delivery-patterns/"');
  assert.ok(conceptsLink >= 0);
  assert.ok(choosingLink > conceptsLink);
  assert.match(delivery, /href="\/patterns\/choosing-delivery-patterns\/"/);
  assert.match(choosing, /href="\/patterns\/software-delivery\/"/);
  assert.match(choosing, /Choosing Hosted Software Delivery Patterns/);

  const patternHeadings = [
    "Recreate",
    "Rolling Deployment",
    "Blue-Green",
    "Feature Flags",
    "Dark Launch",
    "Shadow Validation",
    "Canary",
    "Rings, Waves, Regions, and Tenants",
    "A/B Testing",
    "Progressive Delivery",
  ];
  let previousHeading = -1;
  for (const pattern of patternHeadings) {
    const position = choosing.indexOf(`<h3>${pattern}</h3>`);
    assert.ok(position > previousHeading, `${pattern} should be introduced as a pattern heading`);
    previousHeading = position;
  }

  assert.equal(choosing.match(/<table>/g)?.length ?? 0, 0);
  const flow = choosing.match(/<pre class="mermaid delivery-flow">([\s\S]*?)<\/pre>/)?.[1] ?? "";
  for (const stage of ["Runtime", "Availability", "Validation", "Progression", "Evidence and recovery"]) {
    assert.match(flow, new RegExp(stage));
  }
  assert.doesNotMatch(choosing, /Reference: State-Change Combinations/);
  assert.doesNotMatch(choosing, /Operational Trade-offs/);
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
