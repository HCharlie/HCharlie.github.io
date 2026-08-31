---
layout: pattern.liquid
title: Choosing Hosted Software Delivery Patterns
eyebrow: Commonly Used Patterns
permalink: /patterns/choosing-delivery-patterns/
mermaid: true
---

## One Change, Several Decisions

Names such as blue-green, canary, feature flags, and progressive delivery are often presented as competing strategies. They are not. They answer different questions in a delivery plan.

The distinction starts with the model from [Deployment, Release, and Rollout for Hosted Software](/patterns/software-delivery/): deployment changes what runs, release changes what is available, and rollout describes how either change progresses.

Consider a hosted search service introducing a new ranking implementation. The team wants to run the new code in production, compare its answers with the current system, expose it to a small audience, and expand only when the evidence is healthy. No single pattern covers that whole journey. The team must make several choices that fit together.

## First Decide How Runtime Changes

The first choice is how the new implementation reaches runtime targets.

A **recreate** deployment stops the old version within a deployment scope and then starts the new one. It is simple and may be enough for a small internal service where interruption is acceptable. It becomes a poor fit when the service must remain continuously available.

A **rolling deployment** replaces instances in batches. The search service can update a few workers, check their health, and continue through the fleet. This limits the first deployment cohort, but old and new versions coexist during the transition. Requests, schemas, and shared dependencies must remain compatible.

A **blue-green** deployment prepares a separate environment for the new version. The team can validate the green environment before moving traffic away from blue. That makes switching back straightforward when the old environment remains usable, but it costs extra capacity and does not make traffic movement safe by itself.

These are runtime choices, not a ranking from unsafe to safe. A team might use blue-green between environments and rolling deployment inside each environment.

## Separate Deployment from Availability

The team can deploy the new ranking code while keeping the new behavior unavailable to ordinary users. A **feature flag**, routing rule, or entitlement can select which ranking path handles a request.

This separation creates room to validate and recover without another deployment. If the new behavior performs badly, the team can disable it quickly while leaving the artifact in place for investigation.

Flags do not remove the need for deployment safety. Both code paths may run in the same process, share a database, or produce irreversible side effects. A release control limits availability only when the underlying implementation respects that boundary.

## Validate Before Broad Exposure

With the implementation deployed but unreleased, the team can gather production evidence.

A **dark launch** makes hidden behavior available through an internal account, private route, or disabled-by-default flag. Engineers can exercise the new ranking path under real infrastructure conditions without offering it to the general audience.

**Shadow validation** goes further by copying production requests to the new ranking workload and discarding its responses. The team can compare latency, errors, resource use, and ranking output without changing what users receive. Side effects must be suppressed, and mirrored traffic adds compute cost.

The two techniques are related but not identical. Dark launch provides restricted use. Shadow validation provides duplicated production input. The useful choice depends on what evidence the team needs.

## Choose How Exposure Expands

Once the implementation looks healthy, the team can begin release.

A **canary** starts with a small cohort and expands only after evaluation. The cohort might be a percentage of traffic, a few service instances, selected users, or one tenant. What matters is not that the number is small; it is that the cohort can reveal relevant failures without exposing everyone.

**Rings** or waves order cohorts by risk. Employees might form the first ring, friendly customers the second, and the broader audience the last. Regions and tenants provide other useful boundaries when they match operational isolation or customer ownership.

Each stage needs a promotion gate. The search team might require healthy latency and error rates, stable resource use, and no unacceptable change in ranking quality. Poor evidence should trigger a defined response: pause, disable the new path, return traffic to the previous version, or fix the problem and roll forward.

## Safety Is Not Experimentation

After safety is established, the team may want to learn whether the new ranking actually improves outcomes. **A/B testing** assigns comparable user cohorts to variants and measures behavior such as successful searches or conversions.

A canary asks, “Is this change safe enough to expand?” An A/B test asks, “Which experience produces a better outcome?” The same flag or router may assign both cohorts, but the evidence and decision rules differ. Product metrics should not replace health checks, and a healthy service does not prove that the new experience is better.

## Automate Only What You Can Observe

If the team repeats this process, it may automate stages, checks, promotion, and recovery. That broader practice is **progressive delivery**.

Progressive delivery is not another runtime topology. It coordinates mechanisms already chosen: deployment orchestration, traffic routing, flags, observability, approval gates, and rollback or roll-forward actions.

Automation helps when the signals are trustworthy and the recovery action is safe. Otherwise it only makes a weak decision happen faster. Start with a delivery process people can explain, then automate the stable parts.

## A Compact Pattern Guide

The patterns become easier to choose when grouped by the decision they support.

| Decision | Useful patterns | Remember |
| --- | --- | --- |
| Replace runtime | Recreate, rolling deployment, blue-green | Choose interruption, incremental replacement, or parallel environments |
| Control availability | Feature flags, routing, entitlements | Deployment and release can move separately |
| Validate in production | Dark launch, shadow validation | Hidden use and mirrored traffic produce different evidence |
| Expand exposure | Canary, rings, regions, tenants | Choose a meaningful first cohort and promotion gate |
| Learn from users | A/B testing | Product comparison is not a substitute for safety checks |
| Automate delivery | Progressive delivery | Automate stages only when evidence and recovery are reliable |

A practical planning order is short:

<pre class="mermaid delivery-flow">
flowchart TB
  A[Runtime] --> B[Availability]
  B --> C[Validation]
  C --> D[Progression]
  D --> E[Evidence and recovery]
</pre>

## Putting the Choices Together

For the search service, one coherent plan might use rolling deployment to place the new implementation across the fleet, a flag to keep it unavailable, shadow traffic to compare production behavior, and a canary release that expands through risk rings. Health signals protect the service; an A/B test later measures user value. Progressive delivery can automate promotion only after those signals and recovery actions have proved reliable.

Another service may choose recreate, blue-green, or an immediate release. The point is not to copy one sequence. It is to name each decision, choose a pattern for that layer, and make the boundaries between runtime, availability, evidence, and recovery explicit.
