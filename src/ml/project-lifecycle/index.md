---
layout: pattern.liquid
title: "ML Project Lifecycle: How ML Changes the SDLC"
eyebrow: Machine Learning · Overview
permalink: /ml/project-lifecycle/
---

[← Machine Learning](/ml/)

As coding agents take on more of the mechanical work of navigating codebases and producing changes, I find the fundamentals becoming more important, not less. Speed only helps when we understand the problem, the system, and the direction in which it should evolve.

After more than eight years working in machine learning, I wanted to consolidate what I have learned from seeing models trained, evaluated, deployed, and replaced. What actually changes when the Software Development Life Cycle is applied to an ML system?

My conclusion is that machine learning does not replace the familiar lifecycle:

```text
Define → Develop → Deliver → Operate → Retire
```

It expands what moves through that lifecycle.

## Expand the unit of change

An ML system is still a software system. Part of its behavior comes from a model learned from data, so the application and model may follow separate paths before they work together.

- **Build software:** produce the application artifact from code and configuration.
- **Train the model:** use code and data to produce the model artifact—or select and adapt a pretrained model.
- **Deliver them together:** run compatible application and model artifacts as one software system.

The simplest way I think about the difference is:

```diff
  application code
+ model learned from data
```

That one addition changes every phase of the lifecycle.

## Define

**Define sets the contract: what problem the system solves and what must be true before learned behavior can be trusted.** It keeps the normal customer need and software constraints, then adds:

```diff
  customer need
  software behavior and constraints
+ bounded role for the model
+ viable source of learned capability
+ evaluation cases and acceptance threshold
+ fallback when the model cannot be trusted
```

A goal such as “use ML for customer support” is too broad. A bounded role might be: propose a grounded response from a support request and account context, while a person remains responsible for the final action.

The source of capability also needs to be credible. A team training a model needs suitable examples, labels, and representative data. A team integrating a pretrained model needs evidence that the model, prompts, context, retrieval, or tools can support the task.

Finally, define what “good enough” means. Predictive systems may use error rates and performance across important groups. Generative systems may use representative tasks and rubrics for usefulness, groundedness, and safety. Both need a baseline, an acceptance threshold, and a safe fallback.

Define ends with an agreement about the model's role and the evidence required to trust it—not a choice of technical implementation.

## Develop

**Develop chooses the technical mechanism and produces a candidate that can satisfy the contract.**

```diff
  technical implementation, integration, review, and testing
+ data or context preparation
+ model development or integration
+ empirical evaluation
```

For a trained model, this may include preparing data, building a training pipeline, running experiments, and comparing candidates. For a pretrained model, it may include selecting a model and developing prompts, retrieval, tools, or other context.

The application–model interface is implemented here, and the complete behavior is evaluated against the cases defined earlier. Develop ends with a reproducible candidate and evidence—not with a production release.

## Deliver

**Deliver takes an accepted candidate and makes it available through its intended environment or distribution channel.**

```diff
  application artifact and configuration
+ model artifact or model dependency
+ data transformations and contracts
+ application–model compatibility
```

A team that owns the model may version and deploy it with the application. A team using a hosted model may instead pin a provider, model version, prompts, tools, and retrieval resources. In either case, delivery preserves the assumptions about inputs, outputs, and compatibility established during development.

The destination may be an online service, batch pipeline, mobile application, desktop program, or embedded device. Deliver ends when the accepted version is safely available for use.

## Operate

**Operate begins when the system meets real use.** Traditional service health remains necessary, but it is no longer sufficient.

```diff
  latency, errors, logs, metrics, and traces
+ input quality
+ model behavior and output quality
+ production feedback
```

An ML service can be operationally healthy while its model behaves poorly. Predictions may degrade for an important group, or generated responses may be irrelevant even though every request succeeds.

Operation therefore observes both the software and the learned behavior. The useful evidence depends on the system: input checks, delayed labels, quality measures, drift, human feedback, or downstream outcomes. When evidence shows that the original contract is wrong or no longer met, the work returns to Define or Develop.

## Retire

**Retire ends the model’s use and removes its dependencies without surprising consumers or losing required evidence.**

```diff
  application and infrastructure dependencies
+ model versions
+ data, feature, prompt, or retrieval dependencies
+ retained evaluation records
```

A model may still serve a batch job, depend on a feature pipeline, or be needed to reproduce a past decision. Retirement moves consumers, preserves required records, and removes model and infrastructure costs that no longer serve a purpose.

## A wider iteration loop

The boundaries are simple: Define sets the contract, Develop proves a candidate, Deliver puts it into use, Operate learns from reality, and Retire removes it safely.

Production evidence may send the work backward. The next change might be code, data, evaluation, prompts, training configuration, or the model itself. The lifecycle stays familiar; the unit of change becomes wider.
