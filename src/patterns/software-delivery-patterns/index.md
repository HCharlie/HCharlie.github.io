---
layout: pattern.liquid
title: Deployment, Release, and Rollout
eyebrow: Hosted Software Delivery · Part 1
permalink: /patterns/software-delivery/
---

## Why I’m Writing This

After many years of working with software systems, I still find myself pausing when I use the words **deployment**, **release**, and **rollout**.

I have often used them interchangeably. That seems natural when the activities happen close together, but it becomes confusing as soon as they do not. A capability can be deployed but unavailable. It can be released to one group but not another. Its runtime and audience can each change gradually.

I want a small working model that makes those situations easier to describe. The goal is not to claim that every team uses these words in exactly the same way. It is to make my definitions explicit and use them consistently.

I use **software delivery** as the umbrella term for moving a software change toward safe, usable availability. This article focuses on **hosted software**—web applications, APIs, jobs, and services for which one organization controls both the runtime and user availability. User-installed software has additional steps such as distribution, installation, and client-side updates, so I leave it outside this model.

## Deployment

**Deployment changes the runtime state of software.**

It places or activates an artifact, configuration, schema, or model in an environment where it can run. Deployment answers questions such as:

- Which version is running?
- Where is it running?
- Which instances, clusters, regions, or cells have received it?

Suppose a service has ten instances. Replacing version 4 with version 5 on those instances changes deployment state. The replacement might happen all at once, one instance at a time, or in a separate environment. Those choices affect availability and recovery, but they all concern what is running.

Deployment does not necessarily make new behavior available to users. Version 5 may contain a capability that remains disabled behind a feature flag. The implementation is present, but its availability has not changed.

This distinction is useful because “it is in production” can otherwise mean two different things: the code is running there, or users can use it there.

## Release

**Release changes availability: what can be used, by whom, and under what status.**

For hosted software, release answers questions such as:

- Which capability is available?
- Which users, tenants, or regions can access it?
- Is it internal, beta, generally available, or deprecated?

Imagine version 5 has already been deployed everywhere with a new search experience disabled. Enabling it for employees changes release state without changing deployment state. Enabling it later for one tenant, ten percent of users, or an entire region changes release state again.

A release therefore does not have to mean publishing a new binary or deploying another service version. It can be a controlled change in routing, entitlement, configuration, or feature-flag evaluation. What matters is that availability changes for a defined audience.

Deployment and release remain related: a usable capability needs an implementation somewhere. But once that implementation exists, availability can often change independently.

## Rollout

**Rollout describes how deployment state, release state, or both change over time.**

A change may happen in one step, but it can also progress through instances, users, tenants, or regions. Rollout describes that progression:

```text
Deployment rollout: current runtime state → target runtime state
Release rollout:    current availability → target availability
```

A deployment rollout might replace two instances, check their health, and then continue through the fleet. A release rollout might begin with employees, expand to a small customer cohort, and eventually reach everyone.

Rollout also includes the decisions around progression: which cohort changes first, what evidence permits expansion, and what happens when evidence is poor. The response may be to pause, return traffic to the old version, disable the capability, or fix the problem and continue forward.

This is why “canary” by itself can be ambiguous. A canary may mean a small set of instances running a new artifact, a small group of users receiving a new capability, or both at the same time. Saying **deployment rollout** or **release rollout** makes the changing state clear.

## How the Three Concepts Relate

The three terms are not equal, orthogonal categories.

Deployment and release describe two separable states:

- **Deployment state:** which artifact revision runs on which runtime target
- **Release state:** what is available, to whom, and under what status

Rollout describes the path from a current state to a target state. It applies to one lane or both.

That gives a few common arrangements without requiring a large taxonomy. A team may deploy an internal refactor while availability stays unchanged. It may release an already-deployed capability by changing a flag. It may finish deployment first and begin release later. Or it may let the two transitions overlap while ensuring users reach only compatible runtime targets.

None of these arrangements is automatically safest. Safety also depends on compatibility, observability, cohort quality, promotion evidence, and recovery options. The model simply tells us what is changing so that we can choose those controls deliberately.

## From Model to Practice

The practical benefit of separating these terms is precision. Instead of saying “we are rolling out version 5,” a plan can say: “we will deploy version 5 across the fleet, keep the new capability unavailable, validate it, and then release it to progressively larger groups.”

That sentence exposes several different decisions. Runtime replacement, availability control, validation, progression, and recovery need not come from one named pattern. They are parts of a delivery plan that can be composed.

This model explains the states involved. To turn it into a practical delivery plan, [Continue to Part 2: Choosing Delivery Patterns](/patterns/choosing-delivery-patterns/).
