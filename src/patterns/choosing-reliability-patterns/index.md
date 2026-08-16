---
layout: pattern.liquid
title: Reliability Patterns
eyebrow: Commonly Used Patterns
permalink: /patterns/reliability/
---

Reliability patterns help systems contain failures, control overload, preserve work, and recover safely. Start with the failure you need to control; every mechanism adds cost and can introduce another failure mode.

## Dependency Protection

### Timeout and Deadline

Stops waiting when an operation or request chain exceeds its useful duration. Limits that are too short create false failures; limits that are too long leave resources blocked.

### Retry with Exponential Backoff and Jitter

Repeats transient failures after progressively longer, randomized delays. Retries must be bounded and safe to repeat, or they amplify outages and duplicate effects.

### Circuit Breaker

Stops calls to a dependency after failures cross a threshold, then probes for recovery. Bad thresholds can trip on healthy variance or keep traffic away after recovery.

### Fallback and Graceful Degradation

Returns cached, partial, default, or alternate results when the preferred path fails. A fallback can hide persistent failure or serve misleadingly stale data.

## Overload Protection

### Bulkhead

Isolates resource pools so one workload cannot exhaust the whole system. Rigid partitions can waste capacity or relocate the bottleneck.

### Rate Limiting

Caps work by client, tenant, endpoint, or system to protect finite resources and fairness. Rejected callers need an explicit response and a safe retry policy.

### Backpressure

Signals producers to slow down when consumers cannot keep up. Without end-to-end propagation, pressure merely accumulates somewhere else.

### Load Shedding

Drops lower-priority work near saturation to preserve critical paths. Poor priority rules discard valuable work or make failures unpredictable.

## Messaging and Consistency

### Idempotency

Makes repeated execution produce the same intended effect as one execution. It requires stable operation identity and a clear policy for storing or deriving prior outcomes.

### Retry Queue

Moves transiently failed messages aside for delayed reprocessing. Unbounded attempts turn temporary isolation into an endless failure loop.

### Dead-Letter Queue

Separates messages that exceed their retry allowance so normal processing can continue. Without monitoring, ownership, and replay procedures, it becomes silent storage for lost work.

### Transactional Outbox and Inbox

Records outgoing events atomically with business changes and records consumed identities atomically with their effects. It avoids distributed transactions at the cost of extra storage, cleanup, and delivery machinery.

## Availability and Recovery

### Health, Readiness, and Startup Checks

Tell an orchestrator whether an instance is alive, routable, or still starting. Checks that depend on too much can remove every instance during a shared dependency failure.

### Replication and Failover

Maintains redundant service or data instances and redirects work after failure. It introduces replication lag, split-brain risk, and a recovery path that must be exercised.

### Caching

Stores reusable results near callers to reduce latency and dependency load. Staleness, invalidation, and simultaneous cache misses become new failure modes.

### Feature-Flag Kill Switch

Disables faulty or expensive behavior without a deployment. It cannot undo completed side effects or incompatible data changes, and temporary flags create lasting complexity if never removed.

## Choosing Patterns

- A slow dependency may need a deadline, bounded retries, a circuit breaker, and a fallback.
- Overload may need capacity limits, rate limiting, backpressure, bulkheads, or load shedding according to priority.
- Asynchronous work may need idempotency, bounded retries, retry queues, and a monitored dead-letter queue.
- Infrastructure failure may need health checks, redundancy, tested failover, and explicit recovery procedures.

Combine only what addresses the concrete failure. Define the limits, observe the behavior, and test the recovery path.

[← All patterns](/patterns/)
