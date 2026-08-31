# Software Delivery Article Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the software-delivery article so it defines the vocabulary, introduces the patterns, helps readers compare and choose them, demonstrates composition, and leaves the exhaustive state derivation as reference material.

**Architecture:** Keep the existing article, tables, decision flow, recipes, and detailed state combinations, but give each one a single narrative responsibility. Remove the standalone Composable Model and repeated composition rules; represent that knowledge once as the seven planning questions paired with the decision flow.

**Tech Stack:** Eleventy 3, Markdown, Liquid, Mermaid, Node.js test runner

**Spec:** `src/patterns/software-delivery-patterns/index.md`, using the user-approved pattern-first outline captured below

## Global Constraints

- Preserve the existing definitions of deployment, release, rollout, and software delivery.
- Keep the hosted-software scope.
- Keep both comparison tables and the Mermaid decision flow.
- Preserve the six worked delivery plans and full A1–D3 state combinations.
- Do not commit unrelated About/CV or Working Principles changes.
- Keep detailed reference material outside the main explanatory path.

---

### Task 1: Rebuild the article narrative

**Files:**
- Modify: `src/patterns/software-delivery-patterns/index.md`
- Test: `test/site.test.js`

**Interfaces:**
- Consumes: Existing article sections, tables, Mermaid flow, and recipes.
- Produces: One ordered article with these top-level sections: Why I’m Writing This; Terminology Clarification; How the Three Concepts Relate; From Concepts to Delivery Patterns; Pattern Map; Operational Trade-offs; Choosing a Delivery Plan; Worked Delivery Plans; Reference: State-Change Combinations; Key Takeaways.

- [x] **Step 1: Write the failing narrative-order test**

Add the following assertion to the existing software-delivery article test without staging the unrelated About test:

```js
const narrativeOrder = [
  "How the Three Concepts Relate",
  "From Concepts to Delivery Patterns",
  "Pattern Map",
  "Operational Trade-offs",
  "Choosing a Delivery Plan",
  "Worked Delivery Plans",
  "Reference: State-Change Combinations",
  "Key Takeaways",
];

let previousSection = -1;
for (const section of narrativeOrder) {
  const position = delivery.indexOf(section);
  assert.ok(position > previousSection, `${section} should follow the preceding narrative section`);
  previousSection = position;
}
assert.doesNotMatch(delivery, />The Composable Model</);
assert.doesNotMatch(delivery, />How the Patterns Compose</);
```

- [x] **Step 2: Run the test and verify that it fails**

Run:

```bash
npm test
```

Expected: the software-delivery test fails because the approved headings and order do not yet exist.

- [x] **Step 3: Add the thesis bridge**

Immediately after `How the Three Concepts Relate`, add `From Concepts to Delivery Patterns`. State that named patterns operate on different parts of the deployment/release model and that each pattern fixes only part of a complete plan.

Use this central claim:

```markdown
A named pattern usually fixes only some parts of a delivery plan. The remaining choices must still be made.
```

- [x] **Step 4: Build the Pattern Map section**

Move the pattern taxonomy and Pattern Map table immediately after the thesis bridge. Replace the repeated one-paragraph entry for every pattern with an `Important distinctions` subsection covering only:

- recreate, rolling, and blue-green as different runtime choices
- blue-green versus canary
- dark launch versus shadow validation
- canary versus A/B testing
- progressive delivery as an umbrella

- [x] **Step 5: Build the Operational Trade-offs section**

Move the existing operational comparison and its caveat into a top-level `Operational Trade-offs` section after Pattern Map. Preserve the table values.

- [x] **Step 6: Merge the composable model into Choosing a Delivery Plan**

Remove `The Composable Model`. Add a top-level `Choosing a Delivery Plan` section that first summarizes four state-change shapes:

```text
Deployment only
Release only
Deployment then release
Deployment and release overlapping
```

Then introduce the decision flow with these seven questions:

1. Which states change?
2. What target, mechanism, scope, and progression apply to each lane?
3. How are deployment and release coordinated?
4. Is pre-release production validation needed?
5. What evidence permits promotion?
6. What happens on failure?
7. Can staged progression and recovery be automated reliably?

Keep the existing Mermaid diagram under `Building a Complete Delivery Plan` as the visual representation of these questions.

- [x] **Step 7: Build Worked Delivery Plans**

Rename `How the Patterns Compose` to `Worked Delivery Plans`. Remove the repeated composition-rule list and retain the six existing recipes unchanged apart from transitions needed for flow.

- [x] **Step 8: Move detailed state combinations to reference**

Move the full notation, immediate/progressive explanation, A1–D3 cases, and safety note into `Reference: State-Change Combinations` after the worked plans. Remove `Reading familiar patterns through the situations` because the Pattern Map and Important distinctions now carry that responsibility.

- [x] **Step 9: Add Key Takeaways**

End with six concise points:

- Deployment changes runtime state.
- Release changes availability.
- Rollout controls progression.
- Patterns operate at different layers.
- Complete plans compose multiple patterns.
- Safety depends on compatibility, evidence, and recovery rather than a pattern name alone.

- [x] **Step 10: Run automated verification**

Run:

```bash
npm test
git diff --check
```

Expected: all tests pass and `git diff --check` reports no errors.

- [x] **Step 11: Render-check the article**

Build and open `/patterns/software-delivery/`. Verify:

- both tables remain readable
- the Mermaid flow renders
- the deployment subflow remains left of the release subflow
- mobile-width tables and diagram scroll inside their own containers
- the page itself has no horizontal overflow

- [x] **Step 12: Commit only when explicitly requested**

Do not commit as part of this task. Preserve unrelated local work.
