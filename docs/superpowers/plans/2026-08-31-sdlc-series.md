# SDLC Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `/sdlc/` into an SDLC series landing page and move the existing overview to `/sdlc/overview/`.

**Architecture:** Reuse the existing pattern layout for both pages. Keep homepage and roadmap links stable at `/sdlc/`; only the overview route changes. Update generated-site tests to verify the hierarchy and absence of an empty In progress section.

**Tech Stack:** Eleventy 3, Liquid layouts, Markdown, Node.js test runner

**Spec:** `docs/superpowers/specs/2026-08-31-sdlc-overview-design.md`

## Global Constraints

- `/sdlc/` remains valid and becomes the series landing page.
- The overview moves to `/sdlc/overview/` without changing its main content.
- Homepage and roadmap continue linking to `/sdlc/`.
- Homepage SDLC metadata becomes `Published series`.
- Preserve unrelated About/CV and Working Principles changes.
- Do not push until explicitly requested.

---

### Task 1: Add the hierarchy regression test

**Files:**
- Modify: `test/site.test.js`

- [x] **Step 1: Update the SDLC test**

Read both generated pages:

```js
const [series, overview] = await Promise.all([
  readFile(site("sdlc/index.html"), "utf8"),
  readFile(site("sdlc/overview/index.html"), "utf8"),
]);
```

Assert that the landing page links to `/sdlc/overview/`, contains `Published` and `Coming gradually`, and does not contain `<h2>In progress</h2>`. Run the existing phase, tool, delivery-link, table, and Mermaid assertions against `overview`.

In the general site test, change the homepage SDLC metadata expectation from `Published article` to `Published series`.

- [x] **Step 2: Verify the expected failure**

Run `npm test`.

Expected: failure because `/sdlc/overview/` does not exist and the homepage still says Published article.

### Task 2: Split the series and overview pages

**Files:**
- Create: `src/sdlc/overview/index.md`
- Rewrite: `src/sdlc/index.md`
- Modify: `src/index.html`

- [x] **Step 1: Move the overview**

Copy the existing article to `src/sdlc/overview/index.md`, then change its frontmatter to:

```yaml
---
layout: pattern.liquid
title: SDLC Overview
eyebrow: Software Development Life Cycle
permalink: /sdlc/overview/
---
```

Add a short link back to `[Software Development Life Cycle](/sdlc/)` without changing the five-phase content.

- [x] **Step 2: Create the series landing page**

Replace `src/sdlc/index.md` with:

```yaml
---
layout: pattern.liquid
title: Software Development Life Cycle
eyebrow: A practical map from idea to retirement
permalink: /sdlc/
---
```

The page briefly introduces the series, then contains:

```markdown
## Published

- [SDLC Overview](/sdlc/overview/) — defining, developing, delivering, operating, and retiring software.

## Coming gradually

Deeper notes on individual lifecycle phases will be added as each topic becomes concrete.
```

Do not add an In progress section.

- [x] **Step 3: Update homepage metadata**

Change only the SDLC card metadata in `src/index.html`:

```html
<span class="meta">Published series</span>
```

Keep SDLC above Commonly Used Patterns.

- [x] **Step 4: Verify**

Run:

```bash
npm test
git diff --check
```

Render `/sdlc/`, `/sdlc/overview/`, and the homepage at desktop and mobile widths. Verify the hierarchy, links, card order, and page overflow.

- [x] **Step 5: Commit selectively**

Stage the two SDLC pages, homepage SDLC hunk, relevant test hunks, and this plan. Exclude About/CV and Working Principles work.

```bash
git add src/sdlc/index.md src/sdlc/overview/index.md docs/superpowers/plans/2026-08-31-sdlc-series.md
git add -p src/index.html test/site.test.js
git diff --cached --check
git commit -m "Add SDLC series landing page"
```

- [x] **Step 6: Report without pushing**

Report routes, tests, visual checks, and commit hash. Wait for explicit permission before pushing.
