# Eleventy Build-System Migration Design

## Goal

Replace Jekyll with Eleventy while preserving all published content, styling, URLs, and client-side Mermaid behavior.

## Project structure

Site inputs move under `src/`. Layouts live in `src/_includes/layouts/`, generated files go to `_site/`, smoke tests live in `test/`, and deployment automation lives in `.github/workflows/`.

The reliability article and its agent skill remain adjacent under `src/patterns/choosing-reliability-patterns/`. Eleventy excludes `SKILL.md` and the skill's `agents/` metadata from generated output.

## Build system

The project uses Eleventy 3.1.6 with Node.js 18 or newer. Liquid remains the layout language. A small `eleventy.config.js` defines the `src/` input, `_site/` output, layouts directory, and ignored skill files.

`package.json` exposes three commands:

- `npm run dev` serves the site with file watching.
- `npm run build` generates `_site/`.
- `npm test` builds and runs smoke tests against generated HTML.

No frontend framework, asset pipeline, or Eleventy plugin is introduced.

## Rendering compatibility

The existing homepage stays plain HTML. Markdown pages keep their front matter and permalinks. The shared pattern layout changes only the variable syntax required by Eleventy and continues loading the pinned Mermaid module only when `mermaid: true` is present.

The generated site must retain these routes:

- `/`
- `/patterns/`
- `/patterns/reliability/`
- `/roadmap/`

## Verification

A Node built-in test verifies that every expected HTML file is generated, that representative existing copy remains present, that internal links keep their paths, and that Mermaid is enabled only for the roadmap. Browser verification confirms the roadmap becomes an SVG without console errors or horizontal overflow.

## Deployment

A GitHub Actions workflow runs the build and tests for pull requests and pushes. Only pushes to `main` upload `_site/` and deploy it with the official GitHub Pages actions. After the workflow reaches `main`, the repository's Pages build source changes from the legacy branch build to GitHub Actions.

## Non-goals

This migration does not redesign pages, revise prose, add navigation, bundle Mermaid, or introduce new site features.
