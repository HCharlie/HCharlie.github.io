# Eleventy Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Jekyll with Eleventy without changing site content, appearance, public URLs, or Mermaid behavior.

**Architecture:** Eleventy reads site sources from `src/`, renders Liquid layouts from `src/_includes/layouts/`, and writes deployable HTML to `_site/`. Node built-in smoke tests validate the generated artifact, and GitHub Actions publishes that artifact from `main`.

**Tech Stack:** Node.js 18+, Eleventy 3.1.6, Liquid, Node test runner, GitHub Pages Actions

**Spec:** `docs/superpowers/specs/2026-08-16-eleventy-migration-design.md`

## Global Constraints

- Preserve all existing prose, styling, public routes, and Mermaid behavior.
- Keep `src/patterns/choosing-reliability-patterns/SKILL.md` adjacent to its article but exclude it from `_site/`.
- Add no frontend framework, asset pipeline, or Eleventy plugin.
- Deploy only pushes to `main`; pull requests build and test without deploying.

---

### Task 1: Specify the generated-site contract

**Files:**
- Create: `test/site.test.js`

**Interfaces:**
- Consumes: Generated files under `_site/`.
- Produces: A smoke-test contract for routes, copy, links, Mermaid loading, and excluded skill files.

- [ ] **Step 1: Write the failing smoke test**

Use `node:test`, `node:assert/strict`, and `node:fs/promises` to read `_site/index.html`, `_site/patterns/index.html`, `_site/patterns/reliability/index.html`, and `_site/roadmap/index.html`. Assert representative existing copy and links, assert the pinned Mermaid URL appears only in the roadmap output, and assert no generated `SKILL/index.html` exists.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/site.test.js`

Expected: FAIL because Eleventy has not generated `_site/`.

- [ ] **Step 3: Commit the contract**

```bash
git add test/site.test.js
git commit -m "Test generated site contract"
```

### Task 2: Migrate site generation to Eleventy

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `eleventy.config.js`
- Move: `index.html` to `src/index.html`
- Move: `_layouts/pattern.html` to `src/_includes/layouts/pattern.liquid`
- Move: `patterns/` to `src/patterns/`
- Move: `roadmap/` to `src/roadmap/`
- Modify: `.gitignore`
- Modify: `src/patterns/index.md`
- Modify: `src/patterns/choosing-reliability-patterns/index.md`
- Modify: `src/roadmap/index.md`

**Interfaces:**
- Consumes: Existing HTML, Markdown, Liquid-like layout, front matter, and the adjacent reliability skill.
- Produces: `npm run dev`, `npm run build`, `npm run clean`, and a generated `_site/` matching Task 1's contract.

- [ ] **Step 1: Add the minimal Node package definition**

Define a private ESM package with Eleventy 3.1.6, Node `>=18`, and scripts for `dev`, `build`, `clean`, and `test` (`build` followed by `node --test`). Run `npm install` to generate the lockfile.

- [ ] **Step 2: Add Eleventy configuration**

Configure `src/` as input, `_site/` as output, `_includes/` as includes, `_includes/layouts/` as layouts, and Liquid for Markdown and HTML templates. Ignore the reliability `SKILL.md` input.

- [ ] **Step 3: Move sources into the approved structure**

Move the homepage, shared layout, patterns tree, and roadmap tree under `src/`. Preserve the skill's `agents/` directory beside `SKILL.md`.

- [ ] **Step 4: Adapt only Jekyll-specific layout syntax**

Change front matter to `layout: pattern.liquid`; change `page.title`, `page.eyebrow`, and `page.mermaid` to Eleventy data variables while leaving HTML, CSS, copy, routes, and the Mermaid import unchanged.

- [ ] **Step 5: Ignore generated and installed files**

Add `_site/` and `node_modules/` to `.gitignore` while retaining `.worktrees/`.

- [ ] **Step 6: Run the contract to verify it passes**

Run: `npm test`

Expected: Eleventy writes four pages and all Node smoke tests pass.

- [ ] **Step 7: Commit the migration**

```bash
git add .gitignore package.json package-lock.json eleventy.config.js src test
git commit -m "Migrate site build to Eleventy"
```

### Task 3: Replace local and production Jekyll workflows

**Files:**
- Create: `.github/workflows/pages.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: Package scripts and `_site/` from Task 2.
- Produces: Documented local commands plus pull-request validation and `main` deployment through GitHub Pages Actions.

- [ ] **Step 1: Add a GitHub Pages workflow**

On pull requests and pushes to `main`, check out the repository, install Node, run `npm ci`, and run `npm test`. On `main` only, configure Pages, upload `_site/`, and deploy it with the `github-pages` environment and required `pages: write` and `id-token: write` permissions.

- [ ] **Step 2: Replace README local instructions**

Document Node.js 18+, `npm install`, `npm run dev`, `http://localhost:8080`, `npm test`, and `npm run build`. Remove all Ruby and Jekyll commands.

- [ ] **Step 3: Verify locally**

Run: `npm ci && npm test && git diff --check`

Expected: dependency installation succeeds, the build and smoke tests pass, and the diff has no whitespace errors.

- [ ] **Step 4: Verify rendered behavior**

Run `npm run dev`, open `/`, `/patterns/`, `/patterns/reliability/`, and `/roadmap/` locally, and confirm the existing copy and layout remain intact. Confirm Mermaid renders to one SVG with no console errors or horizontal overflow.

- [ ] **Step 5: Commit and publish the change**

```bash
git add .github/workflows/pages.yml README.md
git commit -m "Deploy Eleventy site with GitHub Actions"
git push
```

Update the existing pull request description with the Eleventy migration, verification evidence, and the one-time post-merge Pages source switch.
