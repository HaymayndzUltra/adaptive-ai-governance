# Phase 3: Plan

**Purpose:** Break down the design into a sequenced, granular task list that can be executed one step at a time with clear verification criteria.

---

<!-- depth:shallow -->
## Shallow Depth (Trivial Pathway)

### Steps
1. **Task Breakdown** — List 1-5 concrete tasks, each achievable in a single focused action.
2. **Order of Operations** — Sequence tasks so each builds on the previous.
3. **Verification** — Each task has a simple "done when" criterion.

### Artifact
```markdown
## Task Plan
1. [ ] [Task description] — Done when: [criterion]
2. [ ] [Task description] — Done when: [criterion]
3. [ ] [Task description] — Done when: [criterion]
```

### 🛑 CHECKPOINT
Present task list for approval. Confirm scope matches the request.

---

<!-- depth:moderate -->
## Moderate Depth (Standard Pathway)

### Steps
1. **Task Decomposition** — Break the design into tasks of 1-3 files each. Each task should be independently testable.
2. **Dependency Ordering** — Sequence tasks respecting code dependencies (data model first, then services, then UI).
3. **Test Tasks** — Include explicit testing tasks after each implementation task.
4. **Risk-Ordered** — Front-load the riskiest or most uncertain tasks.
5. **Verification Criteria** — Each task has specific, testable acceptance criteria.

### Artifact
Use template at `.ai-governance/templates/task-list.md`.

```markdown
## Implementation Plan

### Phase A: Foundation
1. [ ] **[Task Name]**
   - Files: [list]
   - Dependencies: [none / task X]
   - Done when: [specific criterion]
   - Test: [what to test]

2. [ ] **[Task Name]**
   ...

### Phase B: Core Logic
3. [ ] ...

### Phase C: Integration & Testing
...
```

### 🛑 CHECKPOINT
Present the implementation plan. Verify task ordering, test coverage, and completeness against the design.

---

<!-- depth:deep -->
## Deep Depth (Complex Pathway)

*Includes everything from Moderate, plus:*

### Additional Steps
6. **Parallel Tracks** — Identify tasks that can be executed in parallel vs. those that are strictly sequential.
7. **Feature Flag Strategy** — Define which tasks should be behind feature flags for safe rollout.
8. **Integration Points** — Mark tasks that touch integration boundaries and need cross-team coordination.
9. **Rollback Plan Per Task** — Each task group has a defined rollback procedure.
10. **Estimation** — Rough complexity estimate per task (S/M/L) for planning.

### Artifact
Full Implementation Plan with parallel tracks, feature flags, rollback procedures, and estimates.

### 🛑 CHECKPOINT
Formal plan review. Verify rollback procedures. Confirm feature flag strategy. Agree on execution order.
