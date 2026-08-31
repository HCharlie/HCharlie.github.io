# Software Delivery Article Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long software-delivery reference article with two short, linked articles: one mental model and one narrative guide to choosing patterns.

**Architecture:** Keep the existing `/patterns/software-delivery/` route for the terminology article and add `/patterns/choosing-delivery-patterns/` for pattern selection. The first page contains no Mermaid or tables; the second uses one six-row table and one compact five-step Mermaid flow. The Patterns index and site test connect and verify both pages.

**Tech Stack:** Eleventy 3, Liquid layouts, Markdown, Mermaid 11.16.1, Node.js test runner

**Spec:** `docs/superpowers/specs/2026-08-31-software-delivery-article-split-design.md`

## Global Constraints

- Keep `/patterns/software-delivery/` stable.
- Article 1 must be approximately 800–1,000 words and contain no pattern catalogue, comparison table, detailed decision flow, worked-plan list, or A1–D3 reference.
- Article 2 must be approximately 1,000–1,300 words and use the search-ranking scenario as a lightweight thread rather than a detailed case study.
- Article 2 may contain exactly one compact table and one compact five-step Mermaid flow.
- Deployment changes runtime state; release changes availability; rollout describes how either transition progresses.
- Patterns are composable choices at different layers, not interchangeable alternatives.
- Preserve detailed source material in existing drafts, research notes, and Git history.
- Preserve unrelated About/CV and Working Principles changes in the current workspace; never stage them with this work.
- Do not push until explicitly requested.

## File Structure

- Modify `src/patterns/software-delivery-patterns/index.md`: short terminology article at the existing route.
- Create `src/patterns/choosing-software-delivery-patterns/index.md`: short pattern-selection article and compact flow.
- Modify `src/patterns/index.md`: list both articles in reading order with distinct descriptions.
- Modify `src/_includes/layouts/pattern.liquid`: remove the obsolete wide-diagram rule after the detailed flow disappears.
- Modify `test/site.test.js`: verify routes, ordering, cross-links, content boundaries, table count, and compact Mermaid content.

---

### Task 1: Shorten the terminology article

**Files:**
- Modify: `src/patterns/software-delivery-patterns/index.md`
- Modify: `test/site.test.js`

**Interfaces:**
- Produces: `/patterns/software-delivery/`, a standalone mental model that links to `/patterns/choosing-delivery-patterns/`
- Consumes: `pattern.liquid` frontmatter contract: `layout`, `title`, `eyebrow`, `permalink`, optional `mermaid`

- [x] **Step 1: Replace the old software-delivery test with a failing split-page test**

Keep the unrelated About test unchanged. Replace only the existing `software delivery patterns are generated and linked from the series` test with this first-stage test:

```js
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
```

Leave the general generated-site test unchanged.

- [x] **Step 2: Run the test and verify the expected failure**

Run:

```bash
npm test
```

Expected: the focused mental-model test fails because the existing article still contains `Pattern Map` and does not link to the new route.

- [x] **Step 3: Rewrite Article 1 around one mental model**

Preserve this frontmatter, but remove `mermaid: true`:

```yaml
---
layout: pattern.liquid
title: Deployment, Release, and Rollout for Hosted Software
eyebrow: Commonly Used Patterns
permalink: /patterns/software-delivery/
---
```

Write 800–1,000 words under these headings:

```markdown
## Why I’m Writing This
## Deployment
## Release
## Rollout
## How the Three Concepts Relate
## From Model to Practice
```

Content requirements:

- Preserve the first-person motivation and hosted-software scope from the current opening, but remove the long list of pattern names.
- Define deployment with the exact sentence `Deployment changes the runtime state of software.`
- Explain that deployed code may remain unavailable behind a flag.
- Include the sentence `Release changes availability: what can be used, by whom, and under what status.` Remove the Python release-candidate detour because user-installed software is outside scope.
- Include the sentence `Rollout describes how deployment state, release state, or both change over time.` Explain that this controlled progression can apply to deployment, release, or both.
- Keep the two-state notation in one short code block:

```text
Deployment rollout: current runtime state → target runtime state
Release rollout:    current availability → target availability
```

- Explain immediate, sequential, and overlapping delivery in prose without enumerating A1–D3.
- Close with this companion transition:

```markdown
This model explains the states involved. To turn it into a practical delivery plan, continue with [Choosing Hosted Software Delivery Patterns](/patterns/choosing-delivery-patterns/).
```

- [x] **Step 4: Verify Article 1**

Run:

```bash
npm test
git diff --check
python3 - <<'PY'
from pathlib import Path
import re
p = Path("src/patterns/software-delivery-patterns/index.md")
body = p.read_text().split("---", 2)[-1]
count = len(re.findall(r"\b[\w’/-]+\b", body))
print(f"Article 1 words: {count}")
assert 800 <= count <= 1000
PY
```

Expected: tests pass and the reported count is between 800 and 1,000.

- [x] **Step 5: Commit the focused mental-model article**

Stage only the article and the software-delivery portion of `test/site.test.js`; preserve the unrelated About test as an unstaged working-tree change if it was already uncommitted.

```bash
git add src/patterns/software-delivery-patterns/index.md
git add -p test/site.test.js
git diff --cached --check
git commit -m "Shorten software delivery terminology article"
```

### Task 2: Add the narrative pattern-selection article

**Files:**
- Create: `src/patterns/choosing-software-delivery-patterns/index.md`
- Modify: `src/patterns/index.md`
- Modify: `src/_includes/layouts/pattern.liquid`
- Modify: `test/site.test.js`

**Interfaces:**
- Consumes: the deployment/release/rollout model at `/patterns/software-delivery/`
- Produces: `/patterns/choosing-delivery-patterns/`, one compact table, and one Mermaid block with class `delivery-flow`

- [x] **Step 1: Add a failing test for the companion article**

Add this test after the focused mental-model test:

```js
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

  for (const pattern of [
    "Recreate",
    "Rolling deployment",
    "Blue-green",
    "Feature flags",
    "Dark launch",
    "Shadow validation",
    "Canary",
    "Rings",
    "A/B testing",
    "Progressive delivery",
  ]) {
    assert.match(choosing, new RegExp(pattern));
  }

  assert.equal(choosing.match(/<table>/g)?.length, 1);
  const flow = choosing.match(/<pre class="mermaid delivery-flow">([\s\S]*?)<\/pre>/)?.[1] ?? "";
  for (const stage of ["Runtime", "Availability", "Validation", "Progression", "Evidence and recovery"]) {
    assert.match(flow, new RegExp(stage));
  }
  assert.doesNotMatch(choosing, /Reference: State-Change Combinations/);
  assert.doesNotMatch(choosing, /Operational Trade-offs/);
});
```

- [x] **Step 2: Run the test and verify the expected failure**

Run:

```bash
npm test
```

Expected: build or test failure because `/patterns/choosing-delivery-patterns/` does not exist.

- [x] **Step 3: Create the companion article**

Create `src/patterns/choosing-software-delivery-patterns/index.md` with this frontmatter:

```yaml
---
layout: pattern.liquid
title: Choosing Hosted Software Delivery Patterns
eyebrow: Commonly Used Patterns
permalink: /patterns/choosing-delivery-patterns/
mermaid: true
---
```

Write 1,000–1,300 words using this narrative order:

```markdown
## One Change, Several Decisions
## First Decide How Runtime Changes
## Separate Deployment from Availability
## Validate Before Broad Exposure
## Choose How Exposure Expands
## Safety Is Not Experimentation
## Automate Only What You Can Observe
## A Compact Pattern Guide
## Putting the Choices Together
```

Content requirements:

- Link to `[Deployment, Release, and Rollout for Hosted Software](/patterns/software-delivery/)` in the opening.
- Introduce a hosted search service replacing its ranking implementation. Keep the new behavior unavailable initially, shadow real requests, release to a small cohort, and expand only when evidence is healthy.
- Explain recreate, rolling deployment, and blue-green as runtime choices, not a universal safety ranking.
- Explain feature flags as release controls that do not replace deployment safety.
- Distinguish dark launch from shadow validation.
- Explain canary as a first cohort and rings, regions, or tenants as ways to choose cohorts.
- Distinguish A/B testing for learning from canary rollout for safety.
- Present progressive delivery as an umbrella for automated stages, evidence, promotion, and recovery.
- Include exactly this six-row table shape, with concise prose in each cell:

```markdown
| Decision | Useful patterns | Remember |
| --- | --- | --- |
| Replace runtime | Recreate, rolling deployment, blue-green | Choose interruption, incremental replacement, or parallel environments |
| Control availability | Feature flags, routing, entitlements | Deployment and release can move separately |
| Validate in production | Dark launch, shadow validation | Hidden use and mirrored traffic produce different evidence |
| Expand exposure | Canary, rings, regions, tenants | Choose a meaningful first cohort and promotion gate |
| Learn from users | A/B testing | Product comparison is not a substitute for safety checks |
| Automate delivery | Progressive delivery | Automate stages only when evidence and recovery are reliable |
```

- Include this compact Mermaid flow before the final section:

```markdown
<pre class="mermaid delivery-flow">
flowchart TB
  A[Runtime] --> B[Availability]
  B --> C[Validation]
  C --> D[Progression]
  D --> E[Evidence and recovery]
</pre>
```

- End by composing the scenario into one short plan rather than adding multiple recipes.

- [x] **Step 4: Update the Patterns index**

Replace the current single in-progress item with these two adjacent entries:

```markdown
- [Deployment, Release, and Rollout for Hosted Software](/patterns/software-delivery/) — separating runtime changes, availability changes, and the way each transition progresses.
- [Choosing Hosted Software Delivery Patterns](/patterns/choosing-delivery-patterns/) — combining deployment, release, validation, rollout, experimentation, and recovery choices into one plan.
```

Keep them under `## In progress` unless the user requests a status change.

- [x] **Step 5: Remove the obsolete wide-flow rule**

Delete this unused rule from `src/_includes/layouts/pattern.liquid`:

```css
.decision-flow svg { min-width: 48rem; }
```

Do not add a fixed width for `.delivery-flow`; Mermaid should fit the compact flow to its content.

- [x] **Step 6: Verify Article 2 and both routes**

Run:

```bash
npm test
git diff --check
python3 - <<'PY'
from pathlib import Path
import re
for path, low, high in [
    ("src/patterns/software-delivery-patterns/index.md", 800, 1000),
    ("src/patterns/choosing-software-delivery-patterns/index.md", 1000, 1300),
]:
    body = Path(path).read_text().split("---", 2)[-1]
    count = len(re.findall(r"\b[\w’/-]+\b", body))
    print(f"{path}: {count} words")
    assert low <= count <= high
PY
```

Expected: all tests pass, Article 1 remains within 800–1,000 words, and Article 2 is within 1,000–1,300 words.

- [x] **Step 7: Commit the companion article**

Stage only the four delivery-related files and the relevant test hunk:

```bash
git add src/patterns/choosing-software-delivery-patterns/index.md \
  src/patterns/index.md \
  src/_includes/layouts/pattern.liquid
git add -p test/site.test.js
git diff --cached --check
git commit -m "Add hosted delivery pattern guide"
```

### Task 3: Perform final editorial and visual verification

**Files:**
- Modify if needed: `src/patterns/software-delivery-patterns/index.md`
- Modify if needed: `src/patterns/choosing-software-delivery-patterns/index.md`
- Modify if needed: `src/_includes/layouts/pattern.liquid`
- Test: `test/site.test.js`

**Interfaces:**
- Consumes: both generated article routes from Tasks 1 and 2
- Produces: verified desktop and mobile pages with no page-level overflow

- [x] **Step 1: Run the complete automated verification**

Run:

```bash
npm test
git diff --check
```

Expected: all tests pass and `git diff --check` prints no errors.

- [x] **Step 2: Render both pages at desktop width**

Run Eleventy and serve `_site` locally. Capture both routes at approximately 1440px viewport width. Verify:

- Article 1 reads as a short mental model and ends with the companion link.
- Article 2 introduces patterns through the ranking scenario.
- The compact table is readable without dominating the page.
- The Mermaid flow renders in five stages.
- Heading rhythm and line lengths match the existing site.

- [x] **Step 3: Render Article 2 at mobile width**

At a 390px viewport, inspect `/patterns/choosing-delivery-patterns/` and run this DOM check:

```js
({
  page: [document.documentElement.clientWidth, document.documentElement.scrollWidth],
  table: [...document.querySelectorAll("table")].map((table) => [table.clientWidth, table.scrollWidth]),
  flow: (() => {
    const node = document.querySelector(".delivery-flow");
    return [node?.clientWidth, node?.scrollWidth, Boolean(node?.querySelector("svg"))];
  })(),
})
```

Expected:

- Page client width equals page scroll width.
- The table may scroll inside its own container.
- `.delivery-flow` contains an SVG and does not create page-level overflow.

- [x] **Step 4: Make only evidence-driven corrections**

If verification finds a problem, change only the smallest relevant copy or layout rule, then rerun Steps 1–3. Do not restore removed reference material or add new sections.

- [x] **Step 5: Commit verification corrections if any**

If files changed during visual review:

```bash
git add src/patterns/software-delivery-patterns/index.md \
  src/patterns/choosing-software-delivery-patterns/index.md \
  src/_includes/layouts/pattern.liquid \
  test/site.test.js
git diff --cached --check
git commit -m "Polish software delivery article split"
```

If no files changed, do not create an empty commit.

- [x] **Step 6: Report completion without pushing**

Report both routes, final word counts, automated test results, visual checks, and commit hashes. State that unrelated local changes remain untouched and wait for explicit permission before pushing.
