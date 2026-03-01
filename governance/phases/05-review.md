# Phase 5: Review

**Purpose:** Systematic review of all implemented changes against requirements, design, and governance rules before audit.

---

<!-- depth:shallow -->
## Shallow Depth (Trivial Pathway)

### Review Checklist
- [ ] Changes match the original request
- [ ] No unintended side effects
- [ ] Existing tests still pass
- [ ] Code follows project formatting
- [ ] No dead code or debug artifacts left behind

### 🛑 CHECKPOINT
Present the checklist results. Human approves or requests changes.

---

<!-- depth:moderate -->
## Moderate Depth (Standard Pathway)

### Review Dimensions

#### 1. Requirements Compliance
- [ ] All acceptance criteria from Inception are satisfied
- [ ] No scope creep — nothing was added that wasn't in the plan
- [ ] No scope gaps — nothing from the plan was skipped

#### 2. Design Compliance
- [ ] Implementation matches the technical design
- [ ] API contracts match the design specification
- [ ] Data model changes match the design

#### 3. Governance Rule Compliance
- [ ] Code Quality (01): naming, formatting, function length, DRY
- [ ] Security (02): no secrets, input validation, auth checks
- [ ] Architecture (03): dependency direction, module boundaries
- [ ] Testing (04): coverage adequate, tests meaningful
- [ ] Error Handling (05): no silent failures, structured errors

#### 4. Regression Check
- [ ] Full test suite passes
- [ ] No performance regressions in affected areas
- [ ] No broken imports or dead references

#### 5. Diff Quality
- [ ] Each changed file is necessary for this task
- [ ] Changes are minimal — no unnecessary refactoring mixed in
- [ ] Commit messages are clear and descriptive

### 🛑 CHECKPOINT
Present the full review with dimension-by-dimension results. Human approves, requests changes, or escalates to audit.

---

<!-- depth:deep -->
## Deep Depth (Complex Pathway)

*Includes everything from Moderate, plus:*

### Additional Review Dimensions

#### 6. Security Review
- [ ] Threat model reviewed against implementation
- [ ] No new attack surfaces without mitigation
- [ ] Authentication and authorization verified end-to-end
- [ ] Dependency audit clean

#### 7. Performance Review
- [ ] Performance benchmarks meet targets from requirements
- [ ] No N+1 queries or unbounded operations
- [ ] Caching strategy implemented as designed

#### 8. Observability Review
- [ ] Metrics, logs, and traces in place for new components
- [ ] Alerts defined for failure scenarios
- [ ] Health checks operational

#### 9. Migration Review
- [ ] Migration is backward-compatible
- [ ] Rollback procedure tested
- [ ] Feature flags working correctly (on/off states verified)

#### 10. Documentation Review
- [ ] API documentation updated
- [ ] Architecture diagrams updated
- [ ] ADRs written for new decisions
- [ ] Changelog updated

### 🛑 CHECKPOINT
Formal review gate. All 10 dimensions must pass or have documented exceptions. Multiple reviewers may be required for complex changes.
