# Commonly Used Patterns Roadmap Draft

Status: Draft. This detailed outline is intentionally not published on the website.

The public Mermaid roadmap should remain high-level. It should show the published Reliability and Delivery families, **Design Patterns (Next)**, and **Architecture Patterns (Later)** beneath **Commonly Used Patterns**.

## Series Model

**Commonly Used Patterns** is the single public series and entry point. Design, Architecture, Reliability, Delivery, and any later topics are families within it rather than independent top-level series.

Organize the collection by the problem a reader needs to solve:

- organize behavior and dependencies inside an application;
- define consequential application and system boundaries;
- contain failures and overload;
- change running systems safely;
- coordinate data, concurrent work, APIs, or trust when those topics become substantial enough to publish.

Families may overlap. Give each article one primary home and cross-link related material instead of duplicating it or forcing a perfect taxonomy.

## Shared Editorial Rules

Each article should answer:

1. What recurring problem or pressure makes this pattern relevant?
2. What is the simplest useful model?
3. What responsibility, variation, or boundary does the pattern make explicit?
4. What complexity and failure modes does it introduce?
5. What simpler alternative should be preferred when the pressure is absent?

Keep articles language-agnostic. Explain the reasoning before implementation structure. A short language contrast may show how functions, interfaces, traits, enums, modules, or other capabilities change the implementation, but the central explanation should not depend on one language.

Treat established names as useful vocabulary rather than a checklist. Publish patterns selectively according to practical value instead of attempting an exhaustive catalogue.

# Design Patterns — Next

## Purpose

Present reusable decisions for recurring problems inside application code and module boundaries. Combine useful classic object-oriented patterns with modern code-level patterns without preserving unnecessary class-heavy implementations.

Design Patterns covers:

- selecting and changing behavior;
- adapting interfaces;
- composing responsibilities;
- constructing values and dependencies;
- representing state and work;
- coordinating in-process flow.

It does not own major system boundaries, distributed communication, deployment, or operational reliability mechanisms.

## Opening Article

### Design Patterns: Reusable Decisions in Code

Establish the series model:

- patterns preserve reasoning rather than copyable code;
- context and forces come before structure;
- language features can absorb or simplify a pattern;
- indirection must earn its cost;
- patterns, principles, idioms, and architecture operate at different levels;
- direct code remains the baseline alternative.

Optionally use Strategy as a brief example of one problem expressed through functions, interfaces, traits, callables, or other language mechanisms. Keep the comparison secondary to the language-agnostic model.

## Candidate Articles

### Choosing and changing behavior

- **Strategy** — isolate a varying policy or algorithm; compare it with a callable, conditional, or lookup table.
- **State** — make behavior and valid transitions depend on explicit state; avoid assuming a hierarchy of state classes is required.
- **Command** — represent work as a value when it must be queued, retried, logged, composed, or undone.

### Boundaries and composition

- **Adapter** — contain an incompatible interface at a boundary.
- **Facade** — provide a smaller, coherent entry point to a complex subsystem.
- **Decorator** — add behavior around a core operation through composition, functions, or middleware.
- **Composite** — apply shared operations to genuinely hierarchical values and groups.

### Construction and dependencies

- **Factory** — centralize a real construction decision that callers should not own.
- **Builder** — construct complex values through explicit steps when validation or ordering justifies it.
- **Dependency Injection** — separate construction from behavior, starting with explicit parameter passing before containers or framework wiring.

### Flow and communication

- **Pipeline and Middleware** — pass work through ordered stages with clear error and short-circuit behavior.
- **Observer** — notify in-process consumers of change; distinguish it from distributed event-driven architecture.
- **Iterator** — separate traversal from representation where the language has not already made the abstraction ordinary.

## Candidate Publishing Order

1. Design Patterns: Reusable Decisions in Code
2. Strategy
3. Adapter
4. State
5. Decorator and Middleware
6. Dependency Injection
7. Factory and Builder
8. Command
9. Observer
10. Composite or Iterator only when a concrete writing need appears

The order is directional, not a commitment to publish every entry. Strategy and Adapter are strong first examples because they expose variation and boundaries without requiring a framework.

# Architecture Patterns — Later

## Purpose

Explain recurring choices that shape major application or system boundaries, dependency direction, data ownership, communication, deployment, and evolution.

Architecture patterns carry broader and more expensive consequences than code-level design patterns. Every article should begin with the constraints that justify the pattern and include a simpler architecture as the baseline.

Architecture Patterns covers choices affecting one or more of:

- major application or subsystem boundaries;
- dependency direction between core behavior and external mechanisms;
- ownership and consistency of data;
- synchronous or asynchronous communication;
- independent deployment and operational responsibility;
- evolution across teams or long-lived components.

## Opening Article

### Architecture Patterns: Boundaries Before Boxes

Establish the series model:

- architecture records consequential boundaries and dependencies;
- constraints and change pressure matter more than diagram shape;
- data ownership often determines the real boundary;
- runtime distribution introduces failure, latency, and operational cost;
- team structure influences architecture but does not automatically justify it;
- the simplest architecture satisfying current constraints is the baseline.

## Candidate Articles

### Organizing an application

- **Layered Architecture** — organize responsibility through ordered layers and explicit dependency rules.
- **Modular Monolith** — keep one deployment while enforcing meaningful module and data boundaries.
- **Ports and Adapters** — keep core behavior independent from user interfaces, storage, messaging, and external services without requiring an interface for every operation.

### Communication and distribution

- **Event-Driven Architecture** — use events for temporal decoupling while accounting for ownership, ordering, duplication, observability, and schema evolution.
- **Service Boundaries** — distribute ownership or deployment only when scaling, security, organizational, or operational constraints justify network and data costs.

Detailed Saga, CQRS, Event Sourcing, and Change Data Capture articles can later live in a Data and Integration family. Architecture articles may introduce and link to them where they affect system boundaries.

## Candidate Publishing Order

1. Architecture Patterns: Boundaries Before Boxes
2. Layered Architecture
3. Modular Monolith
4. Ports and Adapters
5. Data Ownership Across Boundaries
6. Event-Driven Architecture
7. Service Boundaries

Start with structures that work inside one deployable application before introducing distribution. Distributed systems are not the default destination.

# Possible Future Families

Record these as directions, not current publishing commitments.

## Data and Integration Patterns

- Saga
- Change Data Capture
- CQRS
- Event Sourcing
- Transactional Outbox and Inbox, linked to Reliability Patterns

## Concurrency and Work Coordination Patterns

- Producer–Consumer
- Worker Pool
- Fork–Join
- Actor Model
- Structured Concurrency

## API Interaction Patterns

- Pagination
- Idempotency Keys, linked to general Idempotency in Reliability Patterns
- Long-Running Operations
- Polling and Webhooks
- Versioning and compatibility

## Security Principles and Patterns

- Least Privilege
- Defense in Depth
- Secure Defaults
- Explicit Trust Boundaries
- Capability-Based Access

Only expose a future family on the public site when at least one focused article is ready or actively being written.

# Cross-Family Boundaries

- **Design Patterns** owns choices inside application code and modules.
- **Architecture Patterns** owns consequential application and system boundaries.
- **Reliability Patterns** owns failure containment, overload control, idempotency, recovery, and related operational mechanisms.
- **Delivery Patterns** owns deployment, release, rollout, validation, experimentation, and recovery choices for change.
- **Programming Languages** owns language-specific idioms and implementations.
- **Working Principles** reinforces direct solutions until repeated variation or evidence justifies additional structure.

When a topic crosses families, choose the home based on its primary question and link to the other consequences.
