import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const site = (path) => new URL(`../_site/${path}`, import.meta.url);

test("deployment, release, and rollout stays focused on the mental model", async () => {
  const [patterns, delivery] = await Promise.all([
    readFile(site("patterns/index.html"), "utf8"),
    readFile(site("patterns/software-delivery/index.html"), "utf8"),
  ]);

  assert.match(patterns, /Delivery Patterns, Part 1: Deployment, Release, and Rollout/);
  assert.match(delivery, /Delivery Patterns · Part 1/);
  assert.match(delivery, /<h1 id="page-title">Deployment, Release, and Rollout<\/h1>/);
  assert.match(delivery, /Deployment changes the runtime state/);
  assert.match(delivery, /Release changes availability/);
  assert.match(delivery, /Rollout describes how/);
  assert.match(delivery, /href="\/patterns\/choosing-delivery-patterns\/">Continue to Part 2:/);
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
  const publishedHeading = patterns.indexOf("<h2>Published</h2>");
  const comingHeading = patterns.indexOf("<h2>Coming gradually</h2>");
  assert.ok(conceptsLink > publishedHeading);
  assert.ok(choosingLink > conceptsLink);
  assert.ok(comingHeading > choosingLink);
  assert.doesNotMatch(patterns, /<h2>In progress<\/h2>/);
  assert.match(patterns, /Delivery Patterns, Part 2: Choosing Patterns/);
  assert.match(delivery, /href="\/patterns\/choosing-delivery-patterns\/">Continue to Part 2:/);
  assert.match(choosing, /href="\/patterns\/software-delivery\/">Part 1:/);
  assert.match(choosing, /Delivery Patterns · Part 2/);
  assert.match(choosing, /<h1 id="page-title">Choosing Delivery Patterns<\/h1>/);

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

test("SDLC series links to a practical five-phase overview", async () => {
  const [series, overview] = await Promise.all([
    readFile(site("sdlc/index.html"), "utf8"),
    readFile(site("sdlc/overview/index.html"), "utf8"),
  ]);

  assert.match(series, /<h2>Published<\/h2>/);
  assert.match(series, /href="\/sdlc\/overview\/"/);
  assert.match(series, /<h2>Coming gradually<\/h2>/);
  assert.doesNotMatch(series, /<h2>In progress<\/h2>/);
  assert.match(overview, /SDLC Overview/);

  const phases = ["Define", "Develop", "Deliver", "Operate", "Retire"];
  let previousPhase = -1;
  for (const phase of phases) {
    const position = overview.indexOf(`<h2>${phase}</h2>`);
    assert.ok(position > previousPhase, `${phase} should follow the preceding SDLC phase`);
    previousPhase = position;
  }

  for (const tool of ["Google Docs", "Git", "Docker", "Kubernetes", "OpenTelemetry", "PagerDuty"]) {
    assert.match(overview, new RegExp(tool));
  }
  assert.match(overview, /href="\/sdlc\/"/);
  assert.match(overview, /href="\/patterns\/software-delivery\/"/);
  assert.equal(overview.match(/<table>/g)?.length ?? 0, 0);
  assert.doesNotMatch(overview, /class="[^\"]*\bmermaid\b[^\"]*"/);
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
  const homepageSdlc = home.indexOf('<a class="row" href="/sdlc/">');
  const homepagePatterns = home.indexOf('<a class="row" href="/patterns/">');
  assert.ok(homepageSdlc >= 0);
  assert.ok(homepagePatterns > homepageSdlc);
  assert.match(home, /<a class="row" href="\/sdlc\/">[\s\S]*?<h3>SDLC<\/h3>[\s\S]*?<span class="meta">Published series<\/span>/);
  assert.match(home, /href="\/roadmap\/"/);
  assert.match(home, /src="\/assets\/changli\.jpg"/);
  assert.match(patterns, /Software patterns are compressed experience/);
  assert.match(patterns, /href="\/patterns\/reliability\/"/);
  assert.match(reliability, /Reliability patterns help systems contain failures/);
  assert.match(reliability, /href="\/patterns\/"/);
  assert.match(roadmap, /This is a living map of what I’m building for this site/);
  assert.match(roadmap, /Delivery Patterns \(Published\)/);
  assert.match(roadmap, /SDLC Overview \(Published\)/);
  assert.match(roadmap, /href="\/sdlc\/"/);
  assert.match(roadmap, /click SDLC "\/sdlc\/"/);
  assert.doesNotMatch(roadmap, /SDLC Overview \(Next\)/);
  assert.match(roadmap, /Sizing Systems \(Planned\)/);
  assert.doesNotMatch(roadmap, /Feature Flags \(WIP\)/);

  const mermaidUrl = "https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.esm.min.mjs";
  assert.equal(`${home}${patterns}${reliability}`.includes(mermaidUrl), false);
  assert.equal(roadmap.includes(mermaidUrl), true);

  await assert.rejects(access(site("patterns/choosing-reliability-patterns/SKILL/index.html")));
});
