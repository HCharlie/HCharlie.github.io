---
layout: pattern.liquid
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
    Tools["Dev Tools"]
    SystemsHPC["Systems &amp; HPC"]
    LinuxSystems["Linux Systems (Planned)"]
    HPC["High-Performance Computing (Planned)"]
    Languages["Programming Languages"]
    Python["Python (Planned)"]
    Rust["Rust (Planned)"]
    Go["Go (Planned)"]
    CCpp["C / C++ (Planned)"]
    Reliability["Reliability Patterns (Published)"]
    FeatureFlags["Feature Flags (WIP)"]
    SDLC["SDLC Overview (Planned)"]
    ML["ML Project Lifecycle (Planned)"]
    FeatureEngineering["Feature Engineering (Later)"]
    Training["Training (Later)"]
    ModelMath["Model Architecture &amp; Math (Later)"]
    ParameterCounting["Neural Network Parameter Counting (Later)"]
    TransformerParams["Transformer Parameter Counting (Later)"]
    LLMTraining["LLM Training (Later)"]
    Pretraining["Pretraining (Later)"]
    PostTraining["Post-training (Later)"]
    FineTuning["Fine-tuning (Later)"]
    LoRA["LoRA / Parameter-Efficient Fine-Tuning (Later)"]
    Serving["Serving (Later)"]

    Site --> Patterns
    Site --> Lifecycle
    Site --> Tools
    Site --> SystemsHPC
    SystemsHPC --> LinuxSystems
    SystemsHPC --> HPC
    Site --> Languages
    Languages --> Python
    Languages --> Rust
    Languages --> Go
    Languages --> CCpp
    Patterns --> Reliability
    Patterns --> FeatureFlags
    Lifecycle --> SDLC
    Lifecycle --> ML
    Tools --> DevTools["Dev Tools (Planned)"]
    ML --> FeatureEngineering
    ML --> Training
    ML --> Serving
    Training --> ModelMath
    ModelMath --> ParameterCounting
    ParameterCounting --> TransformerParams
    Training --> LLMTraining
    LLMTraining --> Pretraining
    LLMTraining --> PostTraining
    PostTraining --> FineTuning
    FineTuning --> LoRA
</pre>

The roadmap records direction, not deadlines. I’ll deepen each branch as I publish the work.
