# Research: Ordering Software Delivery Patterns

Research date: 2026-08-30

## Question

What ordering best explains recreate, rolling deployment, blue-green, feature flags, canary, rings and waves, regional or tenant rollout, dark launch, shadow validation, A/B testing, and progressive delivery?

## Conclusion

There is no useful universal order from "worst" to "best" or "unsafe" to "safe." The patterns occupy different layers, and safety depends on exposure size, health gates, compatibility, observability, and recovery—not only the pattern name.

The clearest pedagogical order is:

1. **Deployment approaches:** Recreate; Rolling deployment; Blue-green
2. **Release controls:** Feature flags
3. **Pre-release validation:** Dark launch; Shadow validation
4. **Rollout policies and scopes:** Canary; Rings and waves; Regional or tenant rollout
5. **Experimentation:** A/B testing
6. **Umbrella approach:** Progressive delivery

This is a reader's decision order, not a claim that execution always happens in this sequence. Within a layer, simpler or more general mechanisms can appear before mechanisms that require more infrastructure, traffic control, or cohort design.

## Findings from primary sources

### The terms do not form one flat taxonomy

Kubernetes defines `Recreate` and `RollingUpdate` as the two values of a Deployment's replacement strategy. Its canary guidance instead says to create multiple Deployments, one for each release. This places canary at a different layer from the built-in replacement strategy.

Source: [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

Argo Rollouts supports blue-green and canary as rollout strategies and defines progressive delivery as controlled, gradual release using automation and metric analysis. This is narrower than Kubernetes' taxonomy and shows that terminology varies by tool.

Source: [Argo Rollouts concepts](https://argo-rollouts.readthedocs.io/en/stable/concepts/)

### Simple-to-complex is useful only within a comparable family

AWS Elastic Beanstalk describes deployment-policy selection as a trade-off. Its policies progress from all-at-once through rolling variants and immutable deployment to traffic splitting. All-at-once is quickest but accepts service loss; rolling avoids downtime with more time; immutable creates a second Auto Scaling group; traffic splitting adds canary testing. This supports a simple-to-more-controlled order among deployment mechanisms, not across feature flags, experiments, and validation techniques.

Source: [Deploying applications to Elastic Beanstalk environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html)

Argo Rollouts explicitly calls blue-green easier but more limited than canary and recommends starting with blue-green before adopting canary as metric and application maturity improve. This supports complexity or maturity as a secondary ordering criterion among related strategies.

Source: [Argo Rollouts: Which strategy to choose](https://argo-rollouts.readthedocs.io/en/stable/concepts/#which-strategy-to-choose)

### Unsafe-to-safe is misleading

Azure's safe-deployment guidance says every production deployment introduces risk. It organizes safety around progressive exposure, health models, issue detection, and recovery. Progressive exposure reduces potential blast radius, but only when each phase has health checks, adequate observation time, and a halt or recovery response.

Source: [Microsoft Azure Well-Architected Framework: Safe deployment practices](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments)

Google SRE defines canarying as a partial, time-limited deployment plus evaluation. It states that impact is proportional to the amount of traffic exposed and emphasizes population, duration, representative metrics, isolation, and rollback. Therefore canary is not intrinsically "safe" independent of its configuration.

Source: [Google SRE Workbook: Canarying Releases](https://sre.google/workbook/canarying-releases/)

### Rollout and experimentation should remain distinct by intent

LaunchDarkly defines a progressive rollout as gradually increasing the percentage receiving one variation over time. Its experimentation documentation instead defines experiments as measuring the effect of variants on chosen metrics, including A/B/n testing. Both may use flags and cohorts, but they answer different questions: controlled expansion versus comparative outcome measurement.

Sources:

- [LaunchDarkly progressive rollouts](https://launchdarkly.com/docs/home/releases/progressive-rollouts)
- [LaunchDarkly experimentation](https://launchdarkly.com/docs/home/experimentation)

Google SRE notes that canarying is technically an A/B comparison, but its stated objective is evaluating whether to proceed with a rollout and limiting reliability impact. This supports distinguishing canary from product experimentation by purpose even when their mechanisms overlap.

Source: [Google SRE Workbook: Canarying Releases](https://sre.google/workbook/canarying-releases/)

## Evaluation of possible ordering criteria

### Pattern role or layer

**Best primary criterion.** It preserves the article's composable model and prevents topologies, controls, rollout policies, validation techniques, experiments, and umbrella approaches from being presented as direct alternatives.

### Delivery decision or lifecycle

**Good narrative criterion.** A reader can choose how runtime changes, how release is controlled, how hidden validation occurs, how exposure expands, and whether an experiment is needed. It should be described as a decision flow rather than a mandatory execution timeline.

### Simple to complex

**Useful secondary criterion within a layer.** It becomes unreliable across layers because resource cost, operational complexity, and conceptual complexity do not increase together.

### Unsafe to safe

**Do not use.** Safety is multidimensional. Blue-green can switch all traffic at once; a feature flag cannot undo persistent side effects; a shadow workload can affect shared dependencies; and a poorly designed canary can produce misleading evidence.

### Resource cost, popularity, or alphabetical order

These can aid a narrow lookup table but do not support the article's main goal of explaining composition and state changes.

## Recommended editorial rule

Order first by **role in a complete delivery plan**. Within each role, order from the simplest or most general mechanism to mechanisms that normally require more infrastructure, traffic control, or cohort design. Keep the same order in both comparison tables and the explanatory subsections.
