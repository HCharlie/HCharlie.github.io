# SDLC Overview Article Design

**Date:** 2026-08-31
**Status:** Approved for implementation planning

## Purpose

Publish a short, general introduction to the Software Development Life Cycle. The article should give readers a memorable start-to-finish model, show the typical work and tools around each phase, and avoid becoming a detailed methodology or product catalogue.

## Scope

The article applies to software development generally, including hosted services, libraries, mobile and desktop applications, firmware, and user-installed software.

It will not teach a specific methodology such as Agile, Scrum, Waterfall, or DevOps. It will not explain individual testing disciplines, architecture methods, or delivery patterns in depth.

## Location

- Source: `src/sdlc/index.md`
- Route: `/sdlc/`
- Title: **Software Development Life Cycle**
- Eyebrow: **SDLC · Overview**
- Target length: approximately 700–900 words

## Lifecycle Model

Use five one-word phases:

```text
Define → Develop → Deliver → Operate → Retire
```

The model is linear for explanation and memory. The conclusion should state that real work moves backward and forward between phases, and that operational evidence often begins the next cycle.

## Repeated Phase Format

Each phase should contain five concise elements:

1. **Purpose** — why the phase exists
2. **Typical work** — the main activities
3. **Tool categories** — durable categories rather than a product inventory
4. **Examples** — a small set of familiar tools
5. **Output** — what should exist when the phase is complete enough to move forward

Use level-two headings for the five phases. Keep the repeated elements easy to scan, preferably as short labelled paragraphs or bullets.

## Phase Content

### Define

- Purpose: decide what should be built and why
- Typical work: discover the problem, assess feasibility, establish scope, gather requirements, and sketch the design
- Tool categories: documents, issue trackers, diagrams, and prototypes
- Examples: Google Docs, Notion, Jira or Linear, Figma or Miro
- Output: an agreed problem, requirements, constraints, and initial design

### Develop

- Purpose: turn the agreed design into a verified software change
- Typical work: design in detail, implement, review, integrate, and test
- Tool categories: editors and IDEs, version control, code hosting, build tools, and test frameworks
- Examples: VS Code or JetBrains IDEs, Git, GitHub or GitLab, and language-specific test tools such as pytest or Jest
- Output: reviewed, integrated, and verified software that is ready to deliver

### Deliver

- Purpose: make a verified version available for use
- Typical work: package, release, deploy or distribute, migrate, and roll out
- Tool categories: CI/CD, artifact packaging, registries, infrastructure automation, deployment platforms, and distribution channels
- Examples: GitHub Actions or GitLab CI, Docker or OCI images, artifact registries, Terraform, Kubernetes, and Helm
- Output: a version available in its intended environment or distribution channel

Clarify that deployment is an activity, Docker packages container images, and Kubernetes schedules and operates containerized workloads. These are common hosted-software examples, not requirements for every kind of software. Other software may use package repositories, application stores, installers, or firmware update systems.

Link briefly to [Delivery Patterns, Part 1: Deployment, Release, and Rollout](/patterns/software-delivery/) for the deployment/release/rollout distinction.

### Operate

- Purpose: understand and support software in real use
- Typical work: observe behavior, support users, respond to incidents, fix defects, manage security, and improve the system
- Tool categories: metrics, logs, traces, error tracking, alerting, incident management, and user feedback
- Examples: Prometheus, Grafana, OpenTelemetry, Sentry, Datadog, and PagerDuty
- Output: operational evidence, resolved incidents, maintenance changes, and new improvement work

Explain that observation is cross-cutting: telemetry should be specified, designed, implemented, and verified before delivery, even though its evidence is most visible during operation.

### Retire

- Purpose: remove software safely when it is no longer needed
- Typical work: notify users, migrate users and data, stop traffic, archive required information, remove dependencies, and decommission infrastructure
- Tool categories: feature controls, migration tools, dependency inventories, archival storage, and infrastructure automation
- Examples should remain generic because retirement mechanisms depend strongly on the software being removed
- Output: users and required data migrated, dependencies removed, and resources safely decommissioned

## Tool-Naming Rules

- Name tool categories before product examples.
- Use product names only to make a category concrete.
- Avoid implying that a named tool is required or best for every project.
- Limit each phase to a small representative set.
- Explain the role of Docker and Kubernetes rather than listing them without context.

## Presentation

- Do not add a large diagram or comparison table.
- Show the five-phase lifecycle once as a short text sequence.
- Keep paragraphs and lists brief.
- Preserve the personal site’s plain-language tone.
- One article should have one clear purpose: remembering the major phases and recognizing the work and tools around them.

## Roadmap Integration

Update `src/roadmap/index.md` after publication:

- Change `SDLC Overview (Next)` to `SDLC Overview (Published)`.
- Add a visible Markdown link to `/sdlc/` near the roadmap so readers can reach the article without relying on Mermaid interaction.
- Preserve unrelated local Working Principles roadmap work.

No lifecycle landing page or new top-level navigation item is needed for the first article.

## Testing and Review

Automated checks should verify:

- `/sdlc/` is generated.
- The page contains the title and all five phase headings in order.
- The page contains representative tools from each relevant phase.
- The Deliver section links to Delivery Patterns Part 1.
- The roadmap marks SDLC Overview as published and links to `/sdlc/`.
- Existing routes and unrelated content remain intact.

Visual review should verify:

- The five phases are easy to scan on desktop and mobile.
- Product examples do not dominate the explanations.
- The article remains approximately 700–900 words.
- No page-level horizontal overflow is introduced.

## Success Criteria

- A reader can recall `Define → Develop → Deliver → Operate → Retire` after reading.
- Each phase explains its purpose, typical work, tools, examples, and output.
- Docker, Kubernetes, deployment, and observability are placed in the correct context.
- The article remains general rather than assuming all software is a hosted microservice.
- The article stays short enough to finish in one sitting.
