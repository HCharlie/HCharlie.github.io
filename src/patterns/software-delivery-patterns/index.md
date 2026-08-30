---
layout: pattern.liquid
title: Deployment, Release, and Rollout for Hosted Software
eyebrow: Commonly Used Patterns
permalink: /patterns/software-delivery/
mermaid: true
---

## Why I’m Writing This

After many years of working with software systems, I still find myself pausing when I use the words **deployment**, **release**, and **rollout**.

I have often used them interchangeably. Sometimes that seems natural because the activities happen close together. At other times, treating them as the same thing makes it difficult to understand what is actually changing.

Are they interchangeable? Are they orthogonal concepts? Do they partially overlap? Is one of them a process applied to the others? Is there a broader term that contains all three?

This confusion becomes more visible when discussing patterns such as blue-green deployment, rolling deployment, canary rollout, dark launch, and feature flags. A feature flag can release a capability immediately or expose it gradually. Blue-green describes two environments, but it does not by itself say how traffic should move between them. Canary can apply to infrastructure, user-visible capabilities, or both.

I want to write this down to build a working model that I can use consistently. The goal is not to claim that every team uses these words in exactly the same way. The goal is to make my definitions explicit, explain how the concepts relate, and use those definitions to reason about the patterns associated with them.

For this article, I will use **software delivery** as the umbrella term for moving a software change from an artifact or capability toward safe, usable availability.

This article focuses on **hosted software**: web applications, APIs, jobs, and services for which one organization controls the runtime and user availability. User-installed software follows a different delivery chain—release, distribution, installation or update, and optional rollout—and may become a separate article later.

## Terminology Clarification

### Deployment

**Deployment changes the runtime state of software.**

It places or activates an artifact, configuration, schema, or model in an environment where it can run. Deployment answers questions such as:

- Which version is running?
- Where is it running?
- Which instances, environments, regions, or cells have received it?

Deployment does not necessarily make a capability available to users. Code can be deployed to production while a feature flag keeps its new behavior disabled.

### Release

**Release makes a named artifact, service, or capability available to a defined audience under a declared maturity or support status.**

Release answers questions such as:

- What has become available?
- Who can access or use it?
- Where is it available?
- Is it alpha, beta, release candidate, generally available, or deprecated?

A Python release candidate is a release: a named artifact becomes available for people to download and test under an RC maturity status. The Python project does not operate that interpreter in every user's environment; users decide when to install and run it.

A hosted service becoming available in Europe is also a release. The service may already exist elsewhere, but its availability changes for a geographic audience.

### Rollout

**Rollout is the controlled transition from a current deployment or release state toward a target state over time.**

Rollout answers questions such as:

- Which instances, users, tenants, or regions change first?
- How quickly does exposure expand?
- What evidence allows the next step?
- When should the process pause, roll back, or roll forward?

A rollout may change deployment state, release availability, or both.

## How the Three Concepts Relate

The three words are not equal, orthogonal categories.

Deployment and release describe two separable concerns:

- **Deployment state:** which artifact revision runs on which target, such as a host, container, VM, cluster, or serverless service
- **Release state:** what is available, to whom, and under what status

They are related but can be controlled independently. A capability must have some implementation available before people can use it, but once the implementation is deployed, release availability can often change without another deployment.

Rollout is different. It describes how deployment state, release state, or both change over time:

```text
Deployment rollout: current runtime state → target runtime state
Release rollout:    current availability → target availability
```

## Deriving the Common Situations

The common situations can be derived from two possible state changes:

```text
D₀ → D₁    deployment state changes
R₀ → R₁    release availability changes
```

Either transition may happen in one step or through intentional intermediate stages:

```text
Immediate:   D₀ → D₁
Progressive: D₀ → Dₐ → Dᵦ → D₁
```

The same distinction applies to release availability. Intermediate stages may represent instances, traffic percentages, users, tenants, regions, or risk rings.

Groups A and B are the basic building blocks: deployment changes while release stays the same, or release changes while deployment stays the same. When both states must change, group C combines these building blocks sequentially, while group D allows their execution to overlap.

### A. Deployment changes; release does not

#### A1. Immediate deployment without release

```text
Deployment: D₀ ─────────→ D₁
Release:    R₀ ─────────→ R₀
```

An internal service implementation is replaced all at once without changing customer-visible availability.

#### A2. Deployment rollout without release

```text
Deployment: D₀ → 10% → 50% → D₁
Release:    R₀ ─────────────→ R₀
```

A provider rolls out an internal refactor, runtime upgrade, or infrastructure change across its fleet. Rolling deployment, infrastructure canary, regional deployment, and shadow deployment may fit this situation.

### B. Release changes; deployment does not

These situations require the capability to be deployed already.

#### B1. Immediate release without deployment

```text
Deployment: D₁ ─────────→ D₁
Release:    R₀ ─────────→ R₁
```

Code was deployed earlier with its feature flag disabled. The capability is now enabled for the full intended audience.

#### B2. Release rollout without deployment

```text
Deployment: D₁ ─────────────────→ D₁
Release:    R₀ → internal → 10% → R₁
```

A deployed capability gradually becomes available through feature flags, entitlements, percentages, tenants, regions, or risk rings.

### C. Deployment completes before release starts

Deployment and release are explicitly separated.

#### C1. Immediate deployment, then immediate release

```text
Deployment: D₀ → D₁
Release:             R₀ → R₁
```

The provider deploys a version, validates it, and then enables its capability for everyone.

#### C2. Deployment rollout, then immediate release

```text
Deployment: D₀ → 10% → 50% → D₁
Release:                         R₀ → R₁
```

The provider completes a rolling deployment across the fleet and then performs one global release action.

#### C3. Immediate deployment, then release rollout

```text
Deployment: D₀ ─────→ D₁
Release:                    R₀ → internal → 10% → R₁
```

The provider deploys code everywhere with the capability disabled, then gradually expands availability.

#### C4. Deployment rollout, then release rollout

```text
Deployment: D₀ → canary → 50% → D₁
Release:                              R₀ → beta → 25% → R₁
```

The provider first validates the runtime across infrastructure and then begins a separate customer rollout. This offers strong decoupling at the cost of a longer delivery timeline.

### D. Deployment and release change during the same delivery window

When deployment and release overlap, users should only be routed to versions that support the capabilities available to them.

#### D1. Coupled or lockstep rollout

```text
Deployment: D₀ → 5% → 25% → D₁
Release:    R₀ → 5% → 25% → R₁
```

Each deployment cohort receives matching user exposure. A canary pool may run the new artifact while a corresponding percentage of traffic is routed to it. This is fast, but failures are harder to attribute because both states change together.

#### D2. Pipelined rollout

```text
Deployment: Region A → Region B → Region C
Release:               Region A → Region B → Region C
```

Deployment stays one stage ahead of release. The provider deploys and validates Region A, releases there while deploying Region B, and continues the pipeline. Work overlaps without releasing ahead of compatible runtime coverage.

#### D3. Partially coupled rollout

```text
Deployment: D₀ → 10% → 50% → D₁
Release:          1% → 10% → 50% → R₁
```

Deployment leads release, but both progress during the same delivery window. This is useful when additional runtime capacity must exist before more users can be exposed.

### Reading familiar patterns through the situations

- **Blue-green** prepares parallel deployment states; traffic movement may then use an immediate, percentage, canary, or regional release transition.
- **Feature flags** control release state and allow release to happen after deployment, although they can also participate in a coupled rollout.
- **Rolling deployment** defines a progressive deployment transition but says nothing by itself about release availability.
- **Canary** defines a small initial stage and may apply to deployment, release, or both together.
- **Dark launch** usually changes deployment state while leaving release availability unchanged.

## The Composable Model

A software delivery approach can be described by choosing across several dimensions:

1. **Target:** What is changing—runtime artifact, capability, configuration, schema, or model?
2. **Mechanism:** What controls the change—orchestrator, traffic router, feature flag, entitlement, or configuration?
3. **Scope:** Which instances, users, tenants, regions, or risk rings change first?
4. **Progression:** Does it happen all at once, in rolling batches, by percentage, through canaries, or in waves?
5. **Promotion gate:** What evidence allows expansion—time, approval, health checks, SLOs, or business metrics?
6. **Recovery:** What happens on failure—pause, disable, rollback, or roll forward?

A named pattern usually fixes only some of these dimensions. The remaining choices must still be made.

## Patterns to Examine

These patterns operate at different layers and should be composed rather than treated as mutually exclusive alternatives. Recreate, rolling, and blue-green are deployment approaches; feature flags are a release control; canary and rings are rollout policies; A/B testing is an experimentation policy; and progressive delivery is an umbrella approach.

The tables and notes are ordered by role in a complete delivery plan: deployment approach, release control, pre-release validation, rollout policy and scope, experimentation, then umbrella approach. This is a decision order, not a required execution timeline.

### Pattern map

| Pattern | Pattern type or layer | State affected | Mechanism and typical scope |
| --- | --- | --- | --- |
| Recreate | Deployment replacement | Deployment; often release too | Stop all old runtime targets, then start the new version across the full deployment scope |
| Rolling deployment | Deployment progression | Deployment | An orchestrator replaces instances in batches, availability zones, or regions |
| Blue-green | Deployment topology | Deployment; optionally release | Parallel environments plus an immediate cutover or gradual traffic shift |
| Feature flags | Release control | Release | Runtime evaluation targets all users, percentages, tenants, or rings |
| Dark launch | Exposure and validation technique | Deployment while release remains unchanged | A hidden flag or routing rule enables internal or otherwise hidden use |
| Shadow validation | Validation technique | Deployment while release remains unchanged | Production traffic is mirrored to a shadow workload and its output is discarded |
| Canary | Rollout policy | Deployment, release, or both | Orchestration, routing, or flags expose a small instance, traffic, or audience cohort |
| Rings and waves | Rollout policy | Deployment, release, or both | Ordered risk cohorts change one ring or wave at a time |
| Regional or tenant rollout | Scope-selection policy | Deployment, release, or both | Routing, configuration, or entitlements select region or tenant cohorts |
| A/B testing | Experimentation policy | Release | A flag, router, or experiment service assigns comparable user cohorts to variants |
| Progressive delivery | Umbrella approach | Deployment, release, or both | Automation combines gradual stages, evidence, promotion gates, and recovery |

The comparisons below describe typical tendencies, not guarantees. Data migrations, persistent side effects, shared dependencies, and the chosen rollout policy can dominate availability, risk, and recovery time. Blast radius means the initial exposure before a rollout expands.

### Operational comparison

| Pattern | Runtime profile | Risk and recovery | Main trade-off | Best fit |
| --- | --- | --- | --- | --- |
| Recreate | Interruption expected; low overhead at about 1× capacity | All users at the deployment scope; redeploy the previous version or roll forward | Simplest and least expensive, but causes interruption and exposes the whole service | Development and staging environments, batch jobs, and small services that tolerate downtime |
| Rolling deployment | Usually no downtime; about 1× capacity plus temporary surge | Current batch; pause, then restore or replace affected targets | Avoids a second full environment, but requires readiness checks and safe mixed-version operation | Stateless or compatible services, microservices, and Kubernetes workloads |
| Blue-green | Usually no downtime; up to about 2× application capacity | All shifted traffic after an immediate cutover; route back only while blue and its data remain compatible | Provides isolated validation and fast switchback, but costs duplicate capacity and requires a safe cutover | Important services where parallel environments are feasible and fast switchback matters |
| Feature flags | No inherent availability impact; low runtime and flag-service overhead | Flag-selected audience; disable the flag, although completed side effects remain | Separates deployment from release, but creates flag debt and additional test combinations | Hosted capabilities that should release independently from deployment |
| Dark launch | No intended visible interruption; cost depends on hidden execution volume | Hidden audience and shared dependencies; disable the hidden path | Validates hidden behavior in production, but can create hidden load, divergence, and cleanup work | Capabilities that can run safely for internal or hidden audiences |
| Shadow validation | No intended user-visible output; cost grows with mirrored traffic and may approach 2× compute | Infrastructure and side effects may still be exposed; stop traffic mirroring | Enables comparison with real requests, but adds compute, privacy, isolation, and analysis work | Backend rewrites, performance validation, data pipelines, and ML models |
| Canary | No inherent availability impact; low to medium canary or surge capacity | Canary cohort; stop expansion and remove its traffic or access | Limits initial exposure, but needs representative cohorts, routing control, and strong observability | High-traffic services, risky changes, and ML model updates |
| Rings and waves | Depends on the underlying mechanism; no fixed capacity overhead | Current ring or wave; pause, restore, or disable the affected cohort | Creates explicit risk checkpoints, but slows delivery and prolongs version skew | Enterprise, regulated, or heterogeneous user and device populations |
| Regional or tenant rollout | Depends on the underlying mechanism; isolation may require spare capacity | Current region or tenant cohort; isolate, disable, or roll it back | Contains failures within meaningful boundaries, but cohorts may differ in traffic, dependencies, and configuration | Multi-region or multi-tenant systems needing isolation |
| A/B testing | No inherent availability impact; low runtime plus experimentation and analytics overhead | Variant cohort, with potentially broader shared dependencies; return users to control | Measures causal outcomes, but requires stable assignment, sufficient samples, and statistical discipline | Product experiments, UI or workflow variants, and business-metric optimization |
| Progressive delivery | Depends on the composed mechanisms; adds delivery-platform overhead | Current stage; automatically pause, disable, roll back, or roll forward | Standardizes gradual evidence and recovery, but requires mature controls, automation, and ownership | Teams repeatedly delivering high-risk changes at scale |

### Recreate

Primarily a deployment replacement strategy: stop the old runtime targets before starting the new version. It is simple, but it normally couples deployment with an interruption and immediate release of the running version.

### Rolling deployment

A common composition of runtime replacement, instance batches, health gates, and a pause or rollback policy.

### Blue-green

Primarily a deployment topology: old and new versions run in separate environments. Traffic routing and rollout progression remain separate choices. An immediate cutover can still expose all traffic at once.

### Feature flags

Primarily a release and exposure control. A flag can support an immediate release, percentage rollout, tenant rollout, experimentation, or a kill switch.

### Dark launch

Runs deployed behavior under production conditions while withholding it from the general audience. It may use internal access, a hidden flag, or a routing rule, and it does not necessarily duplicate all request processing.

### Shadow validation

Copies production requests to a new workload and discards its output. Side effects must be isolated or suppressed. Compute cost grows with the share of traffic being mirrored.

### Canary

Primarily a rollout policy: begin with a small cohort, evaluate evidence, and expand. The cohort may consist of instances, traffic, users, tenants, or regions. Canary primarily asks whether a change is safe enough to expand.

### Rings, waves, regions, and tenants

Ways to choose and order rollout cohorts according to risk, geography, customer boundaries, or operational isolation.

### A/B testing

Assigns comparable user cohorts to different released variants to measure product or business outcomes. Unlike canary, which primarily asks whether expansion is safe, A/B testing asks which variant performs better.

### Progressive delivery

An umbrella approach that combines gradual rollout, observability, promotion gates, and automated safety actions across deployment and release.

## Building a Complete Delivery Plan

Use the flow as a planning order, not a required execution timeline. Start by choosing the deployment lane, the release lane, or both. Each lane has its own progression; when both states change, choose how they are coordinated. Canary deployment appears in the deployment lane, canary release appears in the release lane, and a lockstep canary combines them.

<pre class="mermaid decision-flow">
flowchart TB
  accTitle: Building a complete delivery plan
  accDescr: A seven-stage planning flow for identifying deployment and release state changes, planning each transition, coordinating them, validating in production, choosing evidence and recovery, and deciding whether to automate progressive delivery.

  Start([Software change]) --> State(["1 · Which states change?<br/>Choose one or both lanes"])

  State -->|Deployment state| DTarget
  State -->|Release state| RTarget

  %% Mermaid renders sibling subgraphs right-to-left, so declare release first.
  subgraph ReleaseLane["2B · Release lane"]
    direction TB
    RTarget["What availability changes?<br/>capability · audience · region · status"]
    RTarget --> RControl["Which release control?<br/>deployment-coupled · flag · routing · entitlement"]
    RControl --> RProgress["How should release progress?<br/>one step · percentage · canary release · rings · tenants · regions"]
  end

  subgraph DeploymentLane["2A · Deployment lane"]
    direction TB
    DTarget["What runtime target changes?<br/>artifact · configuration · schema · model"]
    DTarget --> DApproach["Which deployment approach?<br/>recreate · rolling · blue-green"]
    DApproach --> DProgress["How should deployment progress?<br/>one step · canary deployment · batches · rings · regions"]
  end

  DProgress --> Coordinate(["3 · If both states change,<br/>choose coordination"])
  RProgress --> Coordinate

  Coordinate -->|One state only| Single["No coordination needed"]
  Coordinate -->|Deploy, then release| Sequential["Sequential"]
  Coordinate -->|Same cohort together| Lockstep["Lockstep"]
  Coordinate -->|Deployment leads release| Overlap["Pipelined or<br/>partially coupled"]

  Single --> Validate(["4 · Pre-release production validation?"])
  Sequential --> Validate
  Lockstep --> Validate
  Overlap --> Validate

  Validate -->|Not needed| NoValidation["Continue"]
  Validate -->|Run hidden behavior| Dark["Dark launch"]
  Validate -->|Compare real requests| Shadow["Shadow validation"]

  NoValidation --> Evidence["5 · Promotion evidence<br/>Safety baseline: health and SLO gates<br/>Add approval, time, or business metrics as needed<br/>Add A/B testing for comparative outcomes"]
  Dark --> Evidence
  Shadow --> Evidence

  Evidence --> Recovery["6 · Failure action<br/>Pause · Disable · Roll back · Roll forward"]
  Recovery --> Automate(["7 · For staged transitions, can progression<br/>and recovery be automated reliably?"])

  Automate -->|No staged transition| ImmediatePlan["Immediate delivery plan"]
  Automate -->|Not yet| Manual["Explicit staged plan<br/>with manual gates"]
  Automate -->|Yes| Progressive["Progressive delivery"]
</pre>

## How the Patterns Compose

The patterns above do not all occupy the same layer. A complete delivery plan normally combines choices from several layers.

### Composition rules

1. **Choose a primary deployment approach.** Recreate, rolling, and blue-green are usually alternatives at the same deployment boundary, although they may be nested at different boundaries.
2. **Choose a release control.** A feature flag, traffic router, entitlement, or no separate control determines whether deployment and release can happen independently.
3. **Choose a rollout policy for each transition.** Deployment and release may each be immediate, canary, percentage-based, ring-based, regional, or tenant-based.
4. **Add promotion gates and recovery.** Health checks, SLOs, product metrics, approval, pause, disable, rollback, and roll forward complete the operational plan.
5. **Optionally add pre-release validation.** Dark launch and shadow validation provide evidence before visible release.
6. **Treat progressive delivery as the umbrella.** It combines gradual progression, evidence, and automated safety actions rather than acting as one more peer pattern.

The following plans are examples of composition, not standardized bundles that every system should adopt.

### 1. Simple low-risk delivery

```text
Recreate deployment
+ immediate release
+ smoke test
+ redeploy the previous version on failure
```

Use when simplicity matters more than downtime or gradual risk reduction.

### 2. Standard rolling service update

```text
Immutable artifact
+ rolling deployment
+ readiness and SLO gates
+ pause or roll forward
+ no separate release change
```

Use for compatible backend updates or internal changes that do not introduce new customer availability.

### 3. Deploy first, release progressively

```text
Rolling or blue-green deployment
+ feature flag off
+ runtime validation
+ internal users
+ percentage or tenant rollout
+ technical and product gates
+ disable the flag on failure
```

This is a representative hosted SaaS plan. Deployment and release are intentionally separated so runtime risk and product risk can be evaluated independently.

### 4. Coupled canary delivery

```text
Canary deployment
+ weighted traffic routing
+ matching user exposure
+ SLO gates
+ expand or roll back
```

Deployment and release move together. This shortens the delivery timeline but makes failures harder to attribute because both states change at once.

### 5. Shadow validation followed by release

```text
Shadow workload
+ mirrored production traffic
+ output comparison
+ canary deployment
+ feature or traffic rollout
```

Use for risky backend rewrites, data pipelines, or ML models. It provides stronger production evidence at the cost of additional infrastructure and operational effort.

### 6. Pipelined regional delivery

```text
Deploy Region A
+ validate
+ release Region A while deploying Region B
+ repeat
+ regional gates and rollback
```

Use for large multi-region systems where deployment should remain one stage ahead of release.
