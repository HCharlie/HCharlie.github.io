# ML Project Lifecycle Article Design

## Goal

Publish a concise, personal introduction to how machine learning changes the Software Development Life Cycle without presenting ML as a completely separate process.

The central idea is:

> Machine learning does not replace the SDLC. It expands what can change.

## Pages

### Machine Learning Series

- Source: `src/ml/index.md`
- Route: `/ml/`
- Title: **Machine Learning**
- Purpose: introduce the series and list published ML articles

The landing page contains:

- **Published:** `ML Project Lifecycle: How ML Changes the SDLC`, linking to `/ml/project-lifecycle/`
- **Coming gradually:** a restrained note that additional topics will appear when they become concrete

Do not add an **In progress** section or an exhaustive future catalogue.

### Lifecycle Article

- Source: `src/ml/project-lifecycle/index.md`
- Route: `/ml/project-lifecycle/`
- Title: **ML Project Lifecycle: How ML Changes the SDLC**
- Eyebrow: **Machine Learning · Overview**
- Length: approximately 800–1,000 words
- Navigation: link back to Machine Learning

## Audience and Voice

Write for software engineers and ML practitioners who know common engineering terms but want a clear mental model.

Use first person in the introduction and conclusion where it explains the author’s motivation. Keep the technical body direct and broadly applicable. Do not invent projects or personal experiences beyond the stated experience of more than eight years working with models that were trained, evaluated, deployed, and replaced.

## Article Shape

### Why I am writing this

Open with two ideas:

- Coding agents increasingly handle mechanical implementation and codebase navigation, making fundamentals and system direction more important rather than less.
- More than eight years of ML work created a reason to consolidate what actually changes when SDLC thinking is applied to ML systems.

Keep the language grounded rather than promotional or predictive.

### Start from the familiar lifecycle

Reuse the model:

```text
Define → Develop → Deliver → Operate → Retire
```

Explain that ML keeps these phases.

### Expand the unit of change

Clarify that an ML system remains a software system, while its application and model have separate build paths and artifacts:

- **Build software:** produce the application artifact from code and configuration.
- **Train the model:** use code and data to produce the model artifact.
- **Deliver them together:** run compatible application and model artifacts as one software system.

Acknowledge that traditional software also uses data. The distinction is that training and evaluation data directly shape learned behavior, while the model becomes another versioned artifact.

Include a compact diff:

```diff
  application code
+ model learned from data
```

Transition into the phase-by-phase comparison with: “That one addition changes every phase of the lifecycle.”

### Walk through the SDLC as a diff

Use the same five phase headings as the SDLC overview. In each phase, include a compact diff followed by a short explanation of what ML adds.

- **Define sets the contract:** preserve the customer need and software constraints, then add a bounded model role, a viable source of learned capability, evaluation cases and an acceptance threshold, and a fallback when the model cannot be trusted; distinguish trained models from integrated pretrained models and predictive criteria from generative rubrics
- **Develop produces a candidate:** choose the technical mechanism, prepare data or context, develop or integrate the model, implement the application–model interface, and gather reproducible evaluation evidence
- **Deliver puts an accepted candidate into use:** version the model artifact or external dependency with application code, transformations, prompts, tools, and compatibility contracts appropriate to the delivery channel
- **Operate learns from production:** observe service health, input quality, model behavior, output quality, and feedback; send unmet or incorrect contracts back to Define or Develop
- **Retire removes use safely:** migrate consumers, remove model and data, feature, prompt, or retrieval dependencies, and retain required evaluation records

State that a service can be operationally healthy while its model behaves poorly. Describe model behavior as statistical and data-dependent rather than universally nondeterministic.

### Expanded iteration loop

Explain briefly that production evidence may lead to changes in code, data, evaluation, training configuration, or the model. Do not add a separate deep dive into the roles of data.

### Conclusion

Return to the central idea: the lifecycle is familiar, its phase boundaries remain clear, and the unit of change includes code, data or context, models, prompts, and the evidence connecting them.

## Scope Boundaries

- Do not turn the article into a tool catalogue.
- Do not split the lifecycle by classical ML, neural networks, LLMs, or modality.
- Do not promise a deep dive for every phase.
- Mention feature engineering, training, evaluation, serving, and monitoring only where they clarify a phase.
- Keep the article useful without requiring external links.

## Navigation and Roadmap

- Change the homepage ML card title to **Machine Learning**, link it to `/ml/`, and label it **Published series**.
- Preserve SDLC above Commonly Used Patterns and ML below them.
- Change the roadmap node to `ML Project Lifecycle (Published)` and link it to `/ml/`.
- Change the roadmap current focus to the ML series or lifecycle article.
- Preserve unrelated About/CV and Working Principles work.

## Verification

- `/ml/` and `/ml/project-lifecycle/` are generated.
- The landing page links to the article and has no empty In progress section.
- The five phase headings appear in lifecycle order.
- The article contains the artifact comparison and compact diffs.
- The homepage and roadmap link to `/ml/` and mark it published.
- Existing SDLC and delivery pages remain unchanged.
- Both ML pages remain readable on desktop and mobile.
