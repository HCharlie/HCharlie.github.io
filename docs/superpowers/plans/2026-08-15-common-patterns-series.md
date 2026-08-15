# Commonly Used Patterns Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the Commonly Used Patterns landing page and concise Reliability Patterns article, bundle the article with a reliability decision-aid skill, and replace the duplicate `changli_life` catalogue with a public link.

**Architecture:** GitHub Pages uses one Jekyll layout to render Markdown under `patterns/`. The reliability folder is both a public article route and a self-contained skill directory: `index.md` is the human-readable catalogue and `SKILL.md` tells an agent how to apply it. `HCharlie.github.io` is authoritative; `changli_life` only links to it.

**Tech Stack:** Static HTML, GitHub Pages Jekyll, Markdown, YAML front matter, shell verification, Codex skill format

**Spec:** `docs/superpowers/specs/2026-08-15-common-patterns-series-design.md`

## Global Constraints

- Write in English for working software engineers.
- Keep every pattern purely conceptual and brief: failure, response, main caution.
- Use `https://hcharlie.github.io/patterns/reliability/` as the public canonical URL.
- Add no JavaScript, package manager, build dependency, or analytics.
- Do not push either repository until the local implementation has been shown to the user for review.

---

### Task 1: Patterns Landing Page and Jekyll Layout

**Files:**
- Create: `_layouts/pattern.html`
- Create: `patterns/index.md`
- Modify: `index.html:82-85`

**Interfaces:**
- Consumes: GitHub Pages' built-in Jekyll rendering and the existing homepage color palette.
- Produces: The `pattern` layout, the `/patterns/` route, and a homepage link used by the reliability article.

- [ ] **Step 1: Run a failing structure check**

```bash
test -f _layouts/pattern.html && test -f patterns/index.md && rg -F 'href="/patterns/"' index.html
```

Expected: FAIL because neither page nor homepage link exists.

- [ ] **Step 2: Create `_layouts/pattern.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page.title }} · HCharlie</title>
  <style>
    :root { color-scheme: light dark; --bg: #0f1419; --fg: #e7ecf3; --muted: #8b98a5; --accent: #1d9bf0; }
    @media (prefers-color-scheme: light) { :root { --bg: #f7f9fc; --fg: #0f1419; --muted: #536471; --accent: #1a8cd8; } }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; line-height: 1.65; }
    main { max-width: 44rem; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
    h1 { margin: 0 0 1.5rem; font-size: clamp(2rem, 6vw, 3rem); line-height: 1.15; letter-spacing: -0.03em; }
    h2 { margin: 3rem 0 1rem; font-size: 1.4rem; }
    h3 { margin: 1.75rem 0 0.35rem; font-size: 1.05rem; }
    p, li { color: var(--muted); }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .back-link { display: inline-block; margin-bottom: 3rem; }
    .eyebrow { margin: 0 0 0.5rem; color: var(--accent); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  </style>
</head>
<body>
  <main>
    <a class="back-link" href="/">← HCharlie</a>
    {% if page.eyebrow %}<p class="eyebrow">{{ page.eyebrow }}</p>{% endif %}
    <h1>{{ page.title }}</h1>
    {{ content }}
  </main>
</body>
</html>
```

- [ ] **Step 3: Create `patterns/index.md` with exact front matter and series purpose**

```markdown
---
layout: pattern
title: Commonly Used Patterns
eyebrow: A field guide for working software engineers
permalink: /patterns/
---

Software patterns are compressed experience: names for recurring problems, their usual responses, and the trade-offs that follow.

This series keeps them brief. Each entry is a practical refresher for engineers who need to recognize a pattern, understand when it helps, and remember what it can cost.

## Published

- [Reliability Patterns](/patterns/reliability/) — containing dependency failures, controlling overload, preserving work, and recovering safely.

## Coming gradually

Rollout, deployment, release, and other patterns that show up repeatedly in real systems.
```

- [ ] **Step 4: Add the series link to the homepage**

Insert this paragraph before the GitHub link:

```html
<p style="margin-top: 1.5rem;">
  <a href="/patterns/">Commonly Used Patterns</a><br>
  Short field notes for working software engineers.
</p>
```

- [ ] **Step 5: Run the structure check and whitespace validation**

```bash
test -f _layouts/pattern.html
test -f patterns/index.md
rg -F 'permalink: /patterns/' patterns/index.md
rg -F 'href="/patterns/"' index.html
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 6: Commit the site foundation**

```bash
git add _layouts/pattern.html patterns/index.md index.html
git commit -m "Add patterns series landing page"
```

---

### Task 2: Reliability Article and Decision-Aid Skill

**Files:**
- Create: `patterns/reliability/index.md`
- Create: `patterns/reliability/SKILL.md`

**Interfaces:**
- Consumes: `_layouts/pattern.html` from Task 1 and the source material in `changli_life/20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md`.
- Produces: The `/patterns/reliability/` article and an installable `choosing-reliability-patterns` skill whose adjacent reference is `index.md`.

- [ ] **Step 1: Run a failing article-and-skill check**

```bash
test -f patterns/reliability/index.md && test -f patterns/reliability/SKILL.md
```

Expected: FAIL because both files are absent.

- [ ] **Step 2: Create the Reliability Patterns article**

```markdown
---
layout: pattern
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

Records outgoing events with business changes and records consumed identities before applying effects. It avoids distributed transactions at the cost of extra storage, cleanup, and delivery machinery.

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
```

- [ ] **Step 3: Create `patterns/reliability/SKILL.md`**

```markdown
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
```

- [ ] **Step 4: Validate article structure and skill linkage**

```bash
ruby -e "require 'yaml'; %w[patterns/index.md patterns/reliability/index.md patterns/reliability/SKILL.md].each { |p| s = File.read(p); abort \"missing front matter: #{p}\" unless s.start_with?(\"---\\n\"); YAML.safe_load(s.split(/^---\\s*$/, 3)[1]) }"
python3 /Users/changli/.codex/skills/.system/skill-creator/scripts/quick_validate.py patterns/reliability
test -f patterns/reliability/index.md
rg -F 'name: choosing-reliability-patterns' patterns/reliability/SKILL.md
rg -F 'Read `index.md`' patterns/reliability/SKILL.md
test "$(rg -c '^### ' patterns/reliability/index.md)" -eq 16
git diff --check
```

Expected: every command exits 0 and the article contains exactly 16 pattern headings.

- [ ] **Step 5: Commit the article and skill**

```bash
git add patterns/reliability/index.md patterns/reliability/SKILL.md
git commit -m "Add reliability patterns field guide"
```

---

### Task 3: Replace the Duplicate `changli_life` Catalogue

**Files:**
- Modify: `../changli_life/20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md`

**Interfaces:**
- Consumes: The canonical public route produced by Task 2.
- Produces: A stable Obsidian note pointing readers to the public source without duplicating its content.

- [ ] **Step 1: Run a failing canonical-link check**

```bash
rg -F 'https://hcharlie.github.io/patterns/reliability/' '../changli_life/20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md'
```

Expected: FAIL because the note still contains the original catalogue.

- [ ] **Step 2: Replace the note with the canonical pointer**

Use the complete file content:

```markdown
# System Reliability Patterns

This field guide now lives on my personal site:

[Read Reliability Patterns](https://hcharlie.github.io/patterns/reliability/)

Detailed note: [[circuit breaker]]
```

- [ ] **Step 3: Validate the pointer and preserved detailed note**

```bash
rg -F 'https://hcharlie.github.io/patterns/reliability/' '../changli_life/20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md'
rg -F '[[circuit breaker]]' '../changli_life/20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md'
git -C ../changli_life diff --check
```

Expected: every command exits 0.

- [ ] **Step 4: Commit the `changli_life` pointer**

```bash
git -C ../changli_life add '20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md'
git -C ../changli_life commit -m "Point reliability patterns note to personal site"
```

---

### Task 4: Final Local Verification and Review Handoff

**Files:**
- Verify: all files created or modified in Tasks 1-3

**Interfaces:**
- Consumes: The complete local implementation in both repositories.
- Produces: Evidence that the site source and cross-repository pointer are ready for user review; no remote state changes.

- [ ] **Step 1: Verify routes, article coverage, and repository cleanliness**

```bash
set -e
rg -F 'permalink: /patterns/' patterns/index.md
rg -F 'permalink: /patterns/reliability/' patterns/reliability/index.md
test "$(rg -c '^### ' patterns/reliability/index.md)" -eq 16
rg -F 'href="/patterns/"' index.html
rg -F 'https://hcharlie.github.io/patterns/reliability/' '../changli_life/20 Knowledge/Technology/Software Engineering/System Reliability Patterns/reliability patterns.md'
git diff --check
git -C ../changli_life diff --check
git status --short
git -C ../changli_life status --short
```

Expected: content checks exit 0, both whitespace checks are clean, and both status commands print nothing.

- [ ] **Step 2: Use Jekyll when available**

```bash
if command -v jekyll >/dev/null 2>&1; then
  jekyll build --destination "$(mktemp -d)"
else
  echo "Jekyll unavailable; source validation from Tasks 1-4 is the verification boundary."
fi
```

Expected: Jekyll exits 0, or the explicit unavailable message is printed.

- [ ] **Step 3: Present the local result for review**

Report the new routes, both repository commits, verification output, and that neither repository has been pushed. Ask for approval to push `HCharlie.github.io/main` and `changli_life`'s current branch.
