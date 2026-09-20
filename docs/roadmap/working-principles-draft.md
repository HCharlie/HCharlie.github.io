# Working Principles Roadmap Draft

Status: Draft. This detailed outline is intentionally not published on the website.

The public Mermaid roadmap should remain high-level, showing only **Working Principles (Planned)**. This document keeps both the original notes and a refined editorial version. The original language should not be replaced as the series develops; it records the understanding behind the polished principles.

## Original Notes

The following thoughts are preserved in their original language and only formatted with line breaks.

> Don't boil the ocean.
>
> Find the real problem.
>
> and make it deep.
>
> and find the fundamental gap.
>
> and stay focused.

> 過早的優化是萬惡之源。
>
> Add features to your MVP when they are needed.
>
> Make it work, make it right, and make it fast in this order.
>
> Make it fast 應該是在最後，而不是最開始去考慮的事情。

## Editorial Version

### Don't boil the ocean

Narrow the scope until meaningful progress becomes possible. Solve a bounded problem instead of attempting to solve everything around it.

### Find the real problem

Separate symptoms from causes. Spend enough time framing the problem before committing to a solution.

### Go deep where it matters

Understand the constraints, mechanisms, and trade-offs beneath the surface instead of collecting shallow answers.

### Find the fundamental gap

Ask what capability, knowledge, evidence, or feedback is actually missing. Address that gap rather than adding activity around it.

### Stay focused

Follow one important question far enough to produce a durable result. Protect attention from attractive but unrelated work.

### Add features when they are needed

Keep an MVP small. Add a feature when real use or evidence demonstrates the need, not because it might become useful later.

### Make it work, make it right, make it fast—in that order

Start with the smallest working solution. Establish correctness and improve the design before optimizing the implementation.

### Measure before optimizing

Understand hard performance constraints early, but optimize only after a working system can reveal its real bottlenecks through profiling and benchmarking. **Make it fast** belongs at the end of the implementation sequence, not at the beginning.
