# Phase 4: Implement

**Purpose:** Execute the plan one task at a time, producing working, tested code that complies with all governance rules.

---

<!-- depth:shallow -->
## Shallow Depth (Trivial Pathway)

### Steps
1. **Execute Tasks Sequentially** — Work through the task list one at a time. Complete each fully before moving to the next.
2. **Apply Relevant Rules** — For each file touched, verify compliance with active governance rules (at minimum: 01-code-quality, 05-error-handling).
3. **Self-Verify** — After completing each task, confirm the "done when" criterion is met.
4. **Minimal Testing** — Run existing tests to verify no regressions.

### Governance Guardrails
- Do NOT modify files outside the task scope
- Do NOT refactor unrelated code (note it for future work instead)
- Do NOT add dependencies without explicit approval

### 🛑 CHECKPOINT
After completing all tasks, present a summary of changes for human review before proceeding to Review phase.

---

<!-- depth:moderate -->
## Moderate Depth (Standard Pathway)

### Steps
1. **Task-by-Task Execution** — Implement one task at a time. After each task:
   - State what you changed and why
   - List files modified
   - Confirm governance rule compliance
   - Run relevant tests

2. **Rule Compliance Check** — For each task, verify against all applicable rules loaded during Boot:
   - Code Quality (01) — naming, formatting, function length
   - Security (02) — input validation, no secrets
   - Architecture (03) — dependency direction, module boundaries
   - Error Handling (05) — no silent failures, structured errors

3. **Test After Each Task** — Write or update tests for the code you just wrote. Run the test suite. Fix any failures before proceeding.

4. **Commit Granularity** — Each task should be a logical, reviewable unit. Describe the change clearly.

### Governance Guardrails
- Follow the plan exactly. If you discover the plan is wrong, STOP and propose an amendment — do not silently deviate.
- If a governance rule conflicts with the task, flag the conflict and wait for human resolution.
- Log each task completion with: task ID, files changed, rules verified, tests status.

### Implementation Log Template
```markdown
### Task [ID]: [Name]
- **Files Changed:** [list]
- **Rules Verified:** [01, 02, 03, 05]
- **Tests:** [passed/failed — details]
- **Notes:** [any deviations or concerns]
```

### 🛑 CHECKPOINT
After each task group (or every 3 tasks), pause for human review. Present the implementation log.

---

<!-- depth:deep -->
## Deep Depth (Complex Pathway)

*Includes everything from Moderate, plus:*

### Additional Steps
5. **Feature Flag Gating** — Implement behind feature flags as specified in the plan. Verify flag behavior (on/off) for each feature-flagged task.

6. **Cross-Module Verification** — After tasks that touch module boundaries:
   - Verify interface contracts are maintained
   - Run integration tests across the boundary
   - Check for circular dependency introduction

7. **Performance Baseline** — For performance-critical tasks, capture before/after metrics.

8. **Security Audit Per Task** — For security-sensitive tasks:
   - Verify input validation
   - Check authentication/authorization
   - Review for injection vulnerabilities
   - Confirm secrets management

9. **Incremental Documentation** — Update API docs, README, or architecture docs as you go — not as an afterthought.

### Governance Guardrails
- Every task completion must be logged in `.ai-governance/audit-log.md`
- Feature flag states must be documented
- Any plan deviation requires formal amendment and approval

### 🛑 CHECKPOINT
After EVERY task (not every 3), pause for human review. The higher complexity demands tighter oversight loops.
