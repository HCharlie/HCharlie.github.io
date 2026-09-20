---
layout: pattern.liquid
title: "ML Project Lifecycle: How ML Changes the SDLC"
eyebrow: Machine Learning · Overview
permalink: /ml/project-lifecycle/
---

[← Machine Learning](/ml/)

As coding agents take on more of the mechanical work of navigating codebases and producing changes, I find the fundamentals becoming more important, not less. Agents can help us onboard quickly and spend less time typing code, but speed only helps when we understand the problem, the system, and the direction in which it should evolve.

I have also spent more than eight years working in machine learning and have seen many models trained, evaluated, deployed, and replaced. I wanted to sit down and consolidate what I have learned: what actually changes when the Software Development Life Cycle is applied to an ML system?

My conclusion is that machine learning does not replace the familiar lifecycle. It expands what can change.

The lifecycle is still:

```text
Define → Develop → Deliver → Operate → Retire
```

The difference is the set of artifacts and evidence moving through it.

## Expand the unit of change

An ML system is still a software system. What changes is that part of its behavior comes from a trained model. The application and model usually have separate build paths, produce separate artifacts, and must remain compatible when delivered together.

- **Build software:** produce the application artifact from code and configuration.
- **Train the model:** use code and data to produce the model artifact.
- **Deliver them together:** run compatible application and model artifacts as one software system.

The simplest way I think about the difference is:

```diff
  application code
+ model learned from data
```

That one addition changes every phase of the lifecycle.

## Define

In conventional software, this phase defines the customer need, the behavior the software should provide, and its constraints. ML keeps all of that and adds a contract around the learned behavior:

```diff
  customer need
  software behavior and constraints
+ bounded role for the model
+ viable source of learned capability
+ evaluation cases and acceptance threshold
+ fallback when the model cannot be trusted
```

First, bound the model's role. A vague goal such as “use ML for customer support” is not enough. A clearer definition might ask a model to propose a grounded response from a support request and account context, while a person or another rule remains responsible for the final action.

Next, establish a credible source of capability. If the team trains a model, that means finding suitable examples, labels, and representative data. If the team integrates a pretrained model, it means checking whether the model—combined with prompts, context, retrieval, or tools—can support the task.

Then define the evidence required for acceptance. Predictive systems may use error rates, calibration, and performance across important groups. Generative systems may use representative tasks and rubrics for usefulness, groundedness, and safety. Both need a baseline and a threshold for being good enough.

Finally, define what happens when the model is unavailable, uncertain, or produces an unacceptable result. The software might fall back to rules, ask for more information, request human review, or refuse safely.

The output of Define is therefore more than a requirement. It is a clear agreement about the model's role, the evidence needed to trust it, and the behavior of the system when that trust is not justified.

## Develop

```diff
  design, implementation, review, and testing
+ data preparation
+ training and experimentation
+ model evaluation
```

Development now changes more than application code. It may include correcting labels, defining features, building data pipelines, selecting a model, adjusting training configuration, running experiments, and comparing model candidates.

Training resembles a build process because it turns inputs into an artifact. Unlike a normal compilation step, however, it is also an empirical search. The same code can produce different behavior when the data, initialization, parameters, or model architecture changes.

A working result therefore includes the code and an evaluated model, along with enough information to reproduce and understand how that model was produced.

## Deliver

```diff
  application artifact and configuration
+ model artifact
+ preprocessing and post-processing
+ model–code compatibility
```

Delivery has to bring the model and its surrounding software together. A service may need application code, a model artifact, input validation, feature transformations, output interpretation, and compatible runtime libraries. These pieces can change independently, but they must work as one deployed system.

The interaction also carries data. An online request may contain features, text, an image, or another input for inference; a batch job may process a dataset instead. The delivery mechanism must preserve the assumptions made during development about schemas, transformations, and model inputs.

Serving is one form of delivery, not the only one. Models may also run in batch pipelines, mobile applications, desktop software, or embedded devices.

## Operate

```diff
  latency, errors, logs, metrics, and traces
+ input data quality
+ output and model quality
+ drift and production feedback
```

Classic operational signals still matter. We need to know whether the service is available, fast enough, free of unexpected errors, and using resources safely.

But an ML service can be operationally healthy while its model behaves poorly. Inputs may no longer resemble the development data. Required fields may be present but semantically wrong. Predictions may degrade for an important segment, or generated responses may be irrelevant even though every request returns successfully.

Operation therefore needs evidence about both the software and the learned behavior. Depending on the system, that may include schema checks, input and output distributions, delayed labels, quality measures, drift indicators, and feedback from users or downstream outcomes.

Model behavior is statistical and data-dependent. Monitoring must reflect that rather than treating a successful response as proof of a correct result.

## Retire

```diff
  application and infrastructure dependencies
+ model versions
+ feature and data dependencies
+ training and evaluation records
```

Retirement may involve more than stopping an application. A model version might still be used by a batch workflow, depend on a feature pipeline, or be required to reproduce a past decision. Data and evaluation records may also have retention, privacy, or audit requirements.

A safe retirement identifies those relationships, moves consumers to an appropriate replacement, preserves required evidence, and removes model and infrastructure costs that no longer serve a purpose.

## A wider iteration loop

In a conventional software iteration, the most visible change is usually a code change. In ML, production evidence may lead to a code change, a data correction, a different evaluation method, new training configuration, or a newly trained model.

The lifecycle remains recognizable, but the feedback loop has more dimensions. That is the main difference I want to keep in mind: ML does not ask us to discard the SDLC. It asks us to apply it to a larger unit of change—code, data, models, and the evidence connecting them.
