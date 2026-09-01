---
layout: pattern.liquid
title: SDLC Overview
eyebrow: Software Development Life Cycle
permalink: /sdlc/overview/
---

[← Software Development Life Cycle](/sdlc/)

I find the Software Development Life Cycle useful as a map, not as a strict process. It gives common names to the work that happens between recognizing a problem and eventually removing the software that solved it.

The smallest version I can remember is:

```text
Define → Develop → Deliver → Operate → Retire
```

Each phase has a different purpose, produces different evidence, and tends to involve different tools.

## Define

Before writing code, decide what should be built and why. This includes understanding the problem, checking whether a solution is feasible, setting boundaries, gathering requirements, and sketching an initial design. A useful definition also records constraints: time, cost, security, compatibility, and the people affected by the change.

The tools are usually simple. Teams write and review ideas in Google Docs or Notion, track decisions and work in Jira or Linear, and explore workflows with Figma, Miro, or another diagramming tool. The specific product matters less than having one place where people can see the problem, assumptions, and decisions.

The result is not a perfect specification. It is enough shared understanding to begin development without every person solving a different problem.

## Develop

Development turns that understanding into working software. Design becomes more detailed, code is implemented and reviewed, components are integrated, and behavior is tested. New information often sends the team back to Define: an API may be harder to use than expected, or a constraint may make the original design impractical.

Editors and IDEs such as VS Code or JetBrains products support implementation. Git records changes, while GitHub or GitLab supports collaboration and review. Build tools and test frameworks—such as pytest or Jest—help turn source code into a repeatable, verified result.

The output is more than code that runs on one machine. It should be reviewed, integrated, and supported by enough evidence to be delivered with confidence.

## Deliver

Delivery makes a verified version available for use. Depending on the software, that may involve packaging, releasing, distributing, installing, deploying, migrating data, or gradually exposing new behavior.

CI/CD tools such as GitHub Actions or GitLab CI automate repeatable steps. Docker or another OCI-compatible tool packages software as container images; an artifact registry stores those images. Terraform can describe infrastructure, while Kubernetes schedules and operates containerized workloads and Helm packages Kubernetes configuration. These are common choices for hosted software, not requirements for every project. Libraries use package repositories, mobile applications use app stores, and desktop software may use installers.

Deployment is an activity, not a synonym for all delivery work. Release and rollout may be separate decisions. I cover that distinction in [Delivery Patterns, Part 1: Deployment, Release, and Rollout](/patterns/software-delivery/).

The phase ends with a version available through its intended environment or distribution channel.

## Operate

Once software is in use, the main source of knowledge changes from plans and tests to real behavior. Operation includes observing the system, supporting users, responding to incidents, fixing defects, managing security, and deciding what to improve next.

Metrics, logs, traces, error tracking, alerting, and incident-management tools reveal different parts of that behavior. Prometheus and Datadog collect operational signals; Grafana presents them; OpenTelemetry provides common instrumentation; Sentry records application errors; and PagerDuty helps coordinate incident response.

Observability should not begin after delivery. The necessary telemetry must be specified, designed, implemented, and verified earlier. Operation is where that preparation produces evidence—and where evidence creates the next round of work.

## Retire

Software should not remain forever simply because removing it is difficult. Retirement means moving users and required data, stopping traffic, preserving records that must be retained, removing dependencies, and decommissioning infrastructure.

The tools depend heavily on what is being removed. Feature controls may reduce use gradually, migration scripts may move data, dependency inventories may reveal remaining consumers, archival storage may preserve required records, and infrastructure automation may remove resources safely.

A successful retirement leaves no surprised users, abandoned data, hidden dependencies, or unnecessary running costs.

The lifecycle is linear only when written as a list. Real work moves backward and forward: development changes requirements, delivery exposes missing checks, and operation creates new plans. The five phases are useful because they make those movements easier to see and discuss.
