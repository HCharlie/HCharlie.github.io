# SDLC Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a short general SDLC overview organized as Define → Develop → Deliver → Operate → Retire, with practical tool examples and a roadmap link.

**Architecture:** Add one Markdown article at `/sdlc/`, update the existing roadmap node from Next to Published, and add a visible roadmap link. Extend the existing generated-site test instead of adding new infrastructure.

**Tech Stack:** Eleventy 3, Liquid layouts, Markdown, Node.js test runner

**Spec:** `docs/superpowers/specs/2026-08-31-sdlc-overview-design.md`

## Global Constraints

- Keep the article between 600 and 800 words.
- Use plain language, short paragraphs, and five phase headings in order.
- Mention tool categories before limited product examples.
- Do not add a fictional story, project example, table, large diagram, lifecycle landing page, or navigation item.
- Preserve unrelated About/CV and Working Principles changes in the current workspace.
- Do not push until explicitly requested.

---

### Task 1: Add the SDLC article and route test

**Files:**
- Create: `src/sdlc/index.md`
- Modify: `test/site.test.js`

**Interfaces:**
- Produces: `/sdlc/`
- Consumes: the existing `pattern.liquid` layout and `/patterns/software-delivery/` route

- [x] **Step 1: Write the failing route and content test**

Add this test before the general generated-site test:

```js
test("SDLC overview presents five practical lifecycle phases", async () => {
  const sdlc = await readFile(site("sdlc/index.html"), "utf8");

  assert.match(sdlc, /Software Development Life Cycle/);
  const phases = ["Define", "Develop", "Deliver", "Operate", "Retire"];
  let previousPhase = -1;
  for (const phase of phases) {
    const position = sdlc.indexOf(`<h2>${phase}</h2>`);
    assert.ok(position > previousPhase, `${phase} should follow the preceding SDLC phase`);
    previousPhase = position;
  }

  for (const tool of ["Google Docs", "Git", "Docker", "Kubernetes", "OpenTelemetry", "PagerDuty"]) {
    assert.match(sdlc, new RegExp(tool));
  }
  assert.match(sdlc, /href="\/patterns\/software-delivery\/"/);
  assert.equal(sdlc.match(/<table>/g)?.length ?? 0, 0);
  assert.doesNotMatch(sdlc, /class="[^\"]*\bmermaid\b[^\"]*"/);
});
```

- [x] **Step 2: Run the test and verify the expected failure**

Run `npm test`.

Expected: build or test failure because `_site/sdlc/index.html` does not exist.

- [x] **Step 3: Create the article**

Create `src/sdlc/index.md` with:

```yaml
---
layout: pattern.liquid
title: Software Development Life Cycle
eyebrow: SDLC · Overview
permalink: /sdlc/
---
```

Write 600–800 words with this exact heading order:

```markdown
## Define
## Develop
## Deliver
## Operate
## Retire
```

Begin with a brief first-person explanation and this sequence:

```text
Define → Develop → Deliver → Operate → Retire
```

Follow the phase content and tool boundaries in the spec. Mention Docker and Kubernetes as hosted-software examples, not universal requirements. Link the Deliver section to `/patterns/software-delivery/`. End by explaining that real work loops between phases and operational evidence begins the next cycle.

- [x] **Step 4: Verify the article**

Run:

```bash
npm test
git diff --check
python3 - <<'PY'
from pathlib import Path
import re
body = Path("src/sdlc/index.md").read_text().split("---", 2)[-1]
count = len(re.findall(r"\b[\w’/-]+\b", body))
print(f"SDLC article words: {count}")
assert 600 <= count <= 800
PY
```

Expected: all tests pass and the article is between 600 and 800 words.

### Task 2: Publish the roadmap entry and verify rendering

**Files:**
- Modify: `src/roadmap/index.md`
- Modify: `test/site.test.js`

**Interfaces:**
- Consumes: `/sdlc/` from Task 1
- Produces: a published roadmap node and visible Markdown link

- [x] **Step 1: Add failing roadmap assertions**

Add these assertions to the general generated-site test after the existing roadmap assertions:

```js
assert.match(roadmap, /SDLC Overview \(Published\)/);
assert.match(roadmap, /href="\/sdlc\/"/);
assert.doesNotMatch(roadmap, /SDLC Overview \(Next\)/);
```

Replace the old assertion for `SDLC Overview (Next)` rather than keeping contradictory expectations.

- [x] **Step 2: Run the test and verify the expected failure**

Run `npm test`.

Expected: failure because the roadmap still says Next and does not link to `/sdlc/`.

- [x] **Step 3: Update the roadmap**

In `src/roadmap/index.md`:

```text
SDLC["SDLC Overview (Next)"]
```

becomes:

```text
SDLC["SDLC Overview (Published)"]
```

After the Mermaid block, add:

```markdown
Current focus: [Software Development Life Cycle](/sdlc/).
```

Preserve the uncommitted `Working Principles (Planned)` node and edge in the working tree, but do not include them in the SDLC commit.

- [x] **Step 4: Run complete automated verification**

Run:

```bash
npm test
git diff --check
```

Expected: all tests pass and no whitespace errors appear.

- [x] **Step 5: Render-check desktop and mobile**

Render `/sdlc/` and `/roadmap/` at desktop width and `/sdlc/` near 390–500px width. Verify phase rhythm, readable tool examples, working cross-link, roadmap link, and no page-level horizontal overflow.

- [x] **Step 6: Commit only SDLC-related work**

Stage the article, the SDLC roadmap hunk, the relevant test hunks, this plan, and the spec if changed. Preserve About/CV and Working Principles work as unstaged changes.

```bash
git add src/sdlc/index.md docs/superpowers/plans/2026-08-31-sdlc-overview.md
git add -p src/roadmap/index.md test/site.test.js
git diff --cached --check
git commit -m "Publish SDLC overview"
```

- [x] **Step 7: Report without pushing**

Report the route, word count, test results, visual checks, and commit hash. Wait for explicit permission before pushing.
