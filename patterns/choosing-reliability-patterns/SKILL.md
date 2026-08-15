---
name: choosing-reliability-patterns
description: Use when designing or reviewing how a software system contains dependency failures, overload, duplicate work, data loss, or infrastructure failure.
---

# Choosing Reliability Patterns

Read `index.md` completely before making recommendations.

Use this exact Markdown output structure:

```markdown
## Failure
[Concrete failure mode and affected system boundary.]

## Patterns
- **Pattern name** — Failure controlled: [failure]. Key caution: [caution].

## Interactions
[Ordering, interactions, and amplification effects.]

## Costs and risks
[Operational costs and new failure modes.]
```

1. State the concrete failure mode and the system boundary it affects.
2. Select the smallest set of patterns that directly controls that failure.
3. Explain how the selected patterns interact, including ordering and amplification effects.
4. Name their operational costs and the new failure modes they introduce.

Return four short sections: **Failure**, **Patterns**, **Interactions**, and **Costs and risks**.

For conceptual requests, keep each recommendation at the pattern level: name the failure it controls and its key caution. Include implementation details only when the user explicitly requests them. Never recommend the full catalogue by default.
