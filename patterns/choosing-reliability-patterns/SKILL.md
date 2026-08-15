---
name: choosing-reliability-patterns
description: Use when designing or reviewing how a software system contains dependency failures, overload, duplicate work, data loss, or infrastructure failure.
---

# Choosing Reliability Patterns

Read `index.md` completely before making recommendations.

1. State the concrete failure mode and the system boundary it affects.
2. Select the smallest set of patterns that directly controls that failure.
3. Explain how the selected patterns interact, including ordering and amplification effects.
4. Name their operational costs and the new failure modes they introduce.

Return four short sections: **Failure**, **Patterns**, **Interactions**, and **Costs and risks**.

Stay conceptual unless the user asks for implementation details. Never recommend the full catalogue by default.
