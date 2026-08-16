---
layout: pattern
title: Website Roadmap
eyebrow: Building in public
permalink: /roadmap/
mermaid: true
---

This is a living map of what I’m building for this site. It starts small on purpose and will grow as each topic becomes real work.

<pre class="mermaid">
flowchart TD
    Site["Personal Website"]
    Patterns["Commonly Used Patterns"]
    Lifecycle["SDLC &amp; ML Project Lifecycle"]
    Reliability["Reliability Patterns (Published)"]
    FeatureFlags["Feature Flags (WIP)"]
    SDLC["SDLC Overview (Planned)"]
    ML["ML Project Lifecycle (Planned)"]
    FeatureEngineering["Feature Engineering (Later)"]
    Training["Training (Later)"]
    Serving["Serving (Later)"]

    Site --> Patterns
    Site --> Lifecycle
    Patterns --> Reliability
    Patterns --> FeatureFlags
    Lifecycle --> SDLC
    Lifecycle --> ML
    ML --> FeatureEngineering
    ML --> Training
    ML --> Serving
</pre>

The roadmap records direction, not deadlines. I’ll deepen each branch as I publish the work.
