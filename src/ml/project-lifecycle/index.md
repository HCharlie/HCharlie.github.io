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

**Define changes the mindset: from specifying behavior mainly through code to designing an empirical feedback loop around learned behavior.**

The customer need, expected software behavior, and constraints remain. What changes is that part of the behavior cannot be understood or controlled from code alone. It must be shaped by a model and judged through evidence.

```diff
  customer need
  software behavior and constraints
+ bounded role for the model
+ viable source of learned capability
+ evaluation cases and acceptance threshold
+ fallback when the model cannot be trusted
```

Start by deciding which behavior belongs to the model and how the surrounding software will use its prediction or generation. Then establish where that capability comes from: representative data for a trained model, or suitable model capabilities, prompts, context, retrieval, or tools for a pretrained model.

Finally, define the evidence loop. Before delivery, representative cases and a baseline show whether the behavior is good enough. After delivery, production outcomes and feedback show whether it remains useful. That evidence may lead to a new model, different data or context, changed software, or no change at all; continuous retraining is not assumed.

Define ends when the model's role, evidence, acceptable errors, and fallback are clear. Choosing and implementing the technical mechanism belongs to Develop.

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
