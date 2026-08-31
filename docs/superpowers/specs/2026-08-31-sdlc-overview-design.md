# SDLC Overview Article Design

**Date:** 2026-08-31
**Status:** Approved for implementation planning

## Goal

Publish a short, general introduction to the Software Development Life Cycle. It should be easy to read, systematic enough to remember, and written in the natural tone of an experienced engineer explaining the subject plainly.

## Page

- Source: `src/sdlc/index.md`
- Route: `/sdlc/`
- Title: **Software Development Life Cycle**
- Eyebrow: **SDLC · Overview**
- Length: approximately 600–800 words

## Model

Use five one-word phases:

```text
Define → Develop → Deliver → Operate → Retire
```

Present the sequence once near the beginning. Do not add a large diagram or table.

## Article Shape

Start with a brief first-person explanation of why a small lifecycle model is useful. Then give each phase one short section.

Each section should naturally explain:

- What happens in the phase
- The common categories of tools used there
- A few representative examples
- What the phase should produce

Do not repeat rigid labels such as “Purpose,” “Tools,” and “Output” in every section. The structure should be consistent without sounding like a template.

### Define

Cover problem definition, feasibility, scope, requirements, and initial design. Mention documents, issue trackers, diagrams, and prototypes, with examples such as Google Docs, Jira or Linear, and Figma or Miro.

### Develop

Cover detailed design, implementation, review, integration, and testing. Mention editors or IDEs, Git, GitHub or GitLab, build tools, and test frameworks such as pytest or Jest.

### Deliver

Cover packaging, release, deployment or distribution, migration, and rollout. Mention CI/CD, Docker or OCI images, artifact registries, Terraform, Kubernetes, and Helm as common hosted-software examples—not universal requirements.

Clarify briefly that deployment is an activity, Docker packages container images, and Kubernetes schedules and operates containerized workloads. Other software may use package repositories, application stores, installers, or firmware update systems.

Link to [Delivery Patterns, Part 1: Deployment, Release, and Rollout](/patterns/software-delivery/) for the deeper terminology.

### Operate

Cover observation, user support, incidents, defects, security, and improvement. Mention metrics, logs, traces, error tracking, alerting, and incident management, with examples such as Prometheus, Grafana, OpenTelemetry, Sentry, Datadog, and PagerDuty.

State that observability must be considered before delivery even though its evidence is used most visibly during operation.

### Retire

Cover user and data migration, traffic removal, archival, dependency cleanup, and infrastructure decommissioning. Keep tool examples generic because retirement depends strongly on the software being removed.

## Tone and Boundaries

- Use plain language and short paragraphs.
- Sound reflective and practical, not academic or procedural.
- Name tool categories before products.
- Keep product examples illustrative and limited.
- Do not add a fictional story or project example.
- Do not explain Agile, Scrum, Waterfall, DevOps, detailed testing disciplines, or delivery patterns in depth.
- End by noting that real work moves backward and forward between phases, and operational evidence often starts the next cycle.

## Roadmap

After publication:

- Change `SDLC Overview (Next)` to `SDLC Overview (Published)` in `src/roadmap/index.md`.
- Add a visible Markdown link to `/sdlc/` near the roadmap.
- Preserve unrelated local Working Principles work.

No lifecycle landing page or new navigation item is needed yet.

## Verification

- `/sdlc/` is generated.
- The five phase headings appear in order.
- The page includes representative tools without becoming a catalogue.
- Deliver links to Delivery Patterns Part 1.
- The roadmap marks and links the published article.
- The article is approximately 600–800 words and remains readable on desktop and mobile.
- Existing routes and unrelated content remain intact.
