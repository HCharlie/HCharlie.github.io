# ML Project Lifecycle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an ML series landing page and a concise article showing how ML expands the familiar SDLC.

**Architecture:** Add `/ml/` as the stable series route and `/ml/project-lifecycle/` as its first article. Reuse the existing pattern layout. Update the hard-coded homepage and Mermaid roadmap links while selectively preserving unrelated local work.

**Tech Stack:** Eleventy 3, Liquid layouts, Markdown, Node.js test runner, Mermaid

**Spec:** `docs/superpowers/specs/2026-08-31-ml-project-lifecycle-design.md`

## Global Constraints

- Keep the article focused on one idea: ML expands what changes through the SDLC.
- Use `Define → Develop → Deliver → Operate → Retire`.
- Keep model families, modalities, tools, and future deep dives out of scope.
- Preserve unrelated About/CV and Working Principles changes.
- Do not push until explicitly requested.

---

### Task 1: Add failing publication tests

**Files:**
- Modify: `test/site.test.js`

- [x] **Step 1: Add an ML hierarchy test**

Read `_site/ml/index.html` and `_site/ml/project-lifecycle/index.html`. Assert that:

- the landing page links to `/ml/project-lifecycle/`;
- it contains Published and Coming gradually, but no In progress heading;
- the article contains the five phases in order;
- it contains the software and ML artifact comparisons;
- it contains `training and evaluation data`, `model artifacts`, and the operational-health distinction;
- it links back to `/ml/`;
- it contains no Mermaid diagram or table.

Extend the generated-site test to require a homepage `/ml/` published-series card and `click ML "/ml/"` in the roadmap.

- [x] **Step 2: Run `npm test`**

Expected: failure because the ML routes and links do not exist.

### Task 2: Publish the landing page and article

**Files:**
- Create: `src/ml/index.md`
- Create: `src/ml/project-lifecycle/index.md`

- [x] **Step 1: Create the ML series landing page**

Use `pattern.liquid`, title it `Machine Learning`, and publish it at `/ml/`. Include a short introduction, a Published link to the lifecycle article, and a Coming gradually note. Do not add In progress or enumerate speculative future articles.

- [x] **Step 2: Write the lifecycle article**

Use `pattern.liquid`, title it `ML Project Lifecycle: How ML Changes the SDLC`, use eyebrow `Machine Learning · Overview`, and publish it at `/ml/project-lifecycle/`.

Follow the approved narrative:

1. grounded personal motivation;
2. familiar five-phase lifecycle;
3. artifact comparison and compact diff;
4. five phase-specific diffs;
5. expanded iteration loop;
6. concise conclusion.

- [x] **Step 3: Run `npm test`**

Expected: ML page assertions pass while homepage and roadmap assertions still fail.

### Task 3: Connect navigation and verify

**Files:**
- Modify: `src/index.html`
- Modify: `src/roadmap/index.md`
- Modify: `docs/superpowers/plans/2026-08-31-ml-project-lifecycle.md`

- [x] **Step 1: Publish the homepage card**

Convert the ML Series planned block to `<a class="row" href="/ml/">` with metadata `Published series`. Keep it below SDLC and Commonly Used Patterns.

- [x] **Step 2: Update the roadmap**

Change the ML node to `ML Project Lifecycle (Published)`, add `click ML "/ml/" "Read the ML series"`, and set current focus to the ML series or lifecycle article.

- [x] **Step 3: Verify behavior and presentation**

Run:

```bash
npm test
git diff --check
```

Render `/ml/`, `/ml/project-lifecycle/`, the homepage, and roadmap at desktop and mobile widths. Verify links, card order, Mermaid rendering, article flow, and overflow.

- [x] **Step 4: Commit selectively**

Stage the ML files, plan, homepage ML hunk, roadmap ML hunks, and relevant tests. Exclude About/CV and Working Principles work.

Commit as:

```bash
git commit -m "Publish ML project lifecycle"
```

- [x] **Step 5: Report without pushing**

Report routes, word count, tests, visual checks, and commit hash. Wait for explicit permission before pushing.
