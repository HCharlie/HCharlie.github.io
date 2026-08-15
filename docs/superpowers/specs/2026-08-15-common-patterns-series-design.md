# Commonly Used Patterns Series Design

## Purpose

Create a concise personal-blog series that helps working software engineers quickly recognize commonly used engineering patterns and their trade-offs. The series begins with reliability patterns and will expand gradually to rollout, deployment, release, and other useful pattern families.

The writing is English-only, conceptual, and optimized for scanning. It does not teach fundamentals, provide code examples, or prescribe implementation details.

## Source of Truth

`HCharlie.github.io` owns the published content. The existing reliability note in `changli_life` becomes a short pointer to the public article instead of maintaining a second copy. Its separate circuit-breaker note remains unchanged.

## Site Structure

- `patterns/index.md`, published at `/patterns/`, is the series landing page. It explains the series, links to published entries, and names rollout, deployment, release, and other pattern families as planned topics.
- `patterns/reliability/index.md`, published at `/patterns/reliability/`, is the canonical Reliability Patterns article.
- `patterns/reliability/SKILL.md` is a repository-local, installable decision-aid skill. The adjacent `index.md` is its bundled reference, so the catalogue is not duplicated.
- The homepage contains a short introduction and link to the series.
- `_layouts/pattern.html` renders both Markdown pages while leaving the existing static homepage architecture intact.

## Reliability Article

The article preserves four groups from the existing note:

1. Dependency protection
2. Overload protection
3. Messaging and consistency
4. Availability and recovery

Each pattern is described through three compact ideas:

1. The failure it addresses
2. What the pattern does
3. Its main risk or constraint

The entries remain purely conceptual. A final Choosing Patterns section tells readers to start with the failure mode and combine only the patterns needed for that failure.

## Skill Behavior

The skill triggers when an agent is designing or reviewing reliability measures for a system. It directs the agent to:

1. Identify the concrete failure mode.
2. Recommend the smallest useful set of patterns.
3. Explain important interactions between those patterns.
4. Surface the new failure modes and operational costs they introduce.

The skill loads the adjacent article as its reference catalogue. It acts as a decision aid rather than a glossary and does not recommend every reliability mechanism by default.

## Verification

- Build the site locally with Jekyll when the available environment supports it.
- Otherwise validate YAML front matter, page structure, internal links, and GitHub Pages-compatible routes directly.
- Validate the skill front matter and confirm that its reference resolves to the adjacent article.
- Confirm that the `changli_life` note points to the final public URL and no longer duplicates the reliability catalogue.

## Publishing Boundary

Create and verify the implementation locally, then present the result for review before pushing changes to either repository.
