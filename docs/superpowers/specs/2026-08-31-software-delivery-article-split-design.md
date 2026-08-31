# Software Delivery Article Split Design

**Date:** 2026-08-31
**Status:** Approved for implementation planning

## Purpose

The published software-delivery article is accurate but too long and reference-like for a personal website. It currently combines terminology, a pattern catalogue, operational comparisons, a detailed decision flow, worked plans, and exhaustive state-change combinations.

Split it into two short, connected articles. Each article should make one clear argument, use plain language, and be easy to finish in one sitting.

## Editorial Principles

- Prefer narrative explanation over exhaustive cataloguing.
- Introduce a pattern when the reader needs it.
- Keep deployment and release as separate state changes; rollout describes how either transition progresses.
- Treat delivery patterns as composable choices at different layers.
- Use one lightweight scenario to connect the second article.
- Publish only the material needed to explain and apply the model.
- Preserve detailed material in existing drafts, research notes, and Git history rather than reproducing it on the public pages.

## Article 1: Deployment, Release, and Rollout

### Location

- Source: `src/patterns/software-delivery-patterns/index.md`
- Route: `/patterns/software-delivery/`
- Eyebrow: **Hosted Software Delivery · Part 1**
- Title: **Deployment, Release, and Rollout**

The existing route remains unchanged so published links continue to work.

### Goal

Give readers a small mental model for three commonly confused terms. The article should explain what each term means, show how they relate, and stop before becoming a pattern catalogue.

### Target Length

Approximately 800–1,000 words.

### Narrative

1. Explain why the terminology becomes confusing in hosted systems.
2. Define deployment as a change to runtime state.
3. Define release as a change to availability.
4. Define rollout as the progression of either state change.
5. Show that deployment and release can happen independently, sequentially, or with controlled overlap.
6. Close by linking readers to the companion pattern-selection article.

### Exclusions

The page will not contain:

- Pattern comparison tables
- The detailed delivery decision flow
- Six worked plans
- A1–D3 state-change combinations
- An exhaustive pattern catalogue

### Companion Link

The conclusion will include a natural transition similar to:

> This model explains the states involved. To turn it into a practical delivery plan, [Continue to Part 2: Choosing Delivery Patterns](/patterns/choosing-delivery-patterns/).

## Article 2: Choosing Delivery Patterns

### Location

- New source: `src/patterns/choosing-software-delivery-patterns/index.md`
- Route: `/patterns/choosing-delivery-patterns/`
- Eyebrow: **Hosted Software Delivery · Part 2**
- Title: **Choosing Delivery Patterns**

### Goal

Help readers combine named patterns into a coherent delivery plan without presenting those patterns as interchangeable alternatives.

### Target Length

Approximately 1,000–1,300 words.

### Running Scenario

Use a hosted service introducing a new search-ranking capability. Keep the scenario lightweight and revisit it only when it helps explain a decision:

1. Deploy the new implementation while it remains unavailable to ordinary users.
2. Validate it under production conditions.
3. Release it to a small cohort.
4. Expand exposure based on evidence.
5. Optionally compare user outcomes.

The scenario is a narrative thread, not a detailed case study.

### Narrative

1. Establish that named patterns answer different questions.
2. Choose how runtime targets change: recreate, rolling, or blue-green.
3. Separate availability with feature flags or routing controls.
4. Validate before broad exposure with dark launch or shadow validation.
5. Choose rollout cohorts using canaries, rings, regions, or tenants.
6. Distinguish safety validation from A/B experimentation.
7. Introduce progressive delivery as automation around stages, evidence, promotion, and recovery.
8. Summarize how the choices compose into one delivery plan.

### Pattern Introductions

Group patterns by the delivery step they support:

- Runtime replacement
- Release control
- Production validation
- Rollout progression
- Experimentation
- Delivery automation

Give every pattern a named level-three heading and a short introduction, following the scannable style of the Reliability Patterns article. Keep the running scenario between groups so the page remains a connected narrative rather than a glossary. Do not add a summary table that repeats these introductions.

### Compact Decision Flow

Replace the existing detailed Mermaid diagram with a short, mobile-friendly five-step flow:

1. Runtime
2. Availability
3. Validation
4. Progression
5. Evidence and recovery

The diagram should clarify the reading order rather than encode every branch. It must not create page-level horizontal overflow on mobile.

### Exclusions

The page will not reproduce:

- The full operational comparison matrix
- Every state-change permutation
- The seven-question planning checklist
- Six separate worked plans
- The previous detailed decision tree

## Patterns Series Page

Update `src/patterns/index.md` so both articles appear under **Published**, next to each other in reading order:

1. Hosted Software Delivery, Part 1: Deployment, Release, and Rollout
2. Hosted Software Delivery, Part 2: Choosing Delivery Patterns

Each description should state the article’s distinct purpose. The first builds the mental model; the second applies it.

## Cross-Linking

- Article 1 links to Article 2 in its conclusion.
- Article 2 links back to Article 1 when it introduces the deployment/release distinction.
- Links use stable absolute site paths.

## Testing and Review

Automated checks will verify:

- Both routes are generated.
- The Patterns page links to both routes in the intended order.
- The articles link to each other.
- Article 1 does not contain the removed reference sections.
- Article 2 contains the named pattern introductions and Mermaid flow.
- The generated pages preserve the site’s existing content and routes.

Visual review will verify:

- Both pages have comfortable reading length and section rhythm.
- The named pattern sections remain easy to scan on mobile.
- The Mermaid flow renders and does not cause page-level overflow.
- No material from unrelated About/CV or Working Principles work enters the commit.

## Success Criteria

- Each article has one clear purpose and can be read independently.
- The first article explains the model without turning into a pattern guide.
- The second article teaches pattern composition through a lightweight narrative.
- The public pages no longer expose exhaustive reference material.
- Existing `/patterns/software-delivery/` links remain valid.
- The two articles feel consistent with the concise style of the personal site.
