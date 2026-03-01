# Phase 6: Quality Audit

**Purpose:** Independent, structured quality assessment using a weighted scorecard to produce a quantitative governance score.

---

<!-- depth:minimal -->
## Minimal Depth (Trivial Pathway)

### Quick Audit
Verify these three critical dimensions only:

| Dimension | Check | Pass? |
|-----------|-------|-------|
| Correctness | Does the change do what was requested? | |
| No Regressions | Do existing tests still pass? | |
| Code Quality | Does it follow project formatting and naming? | |

**Pass Criteria:** All three must pass.

### 🛑 CHECKPOINT
Report audit result: PASS or FAIL with brief justification.

---

<!-- depth:standard -->
## Standard Depth (Standard Pathway)

### 7-Layer Quality Audit

Score each dimension 0-10. Weighted score determines the verdict.

| # | Dimension | Weight | Score (0-10) | Weighted |
|---|-----------|--------|-------------|----------|
| 1 | **Correctness** — Does the code fulfill all acceptance criteria? | 20% | | |
| 2 | **Security** — No vulnerabilities, proper auth, input validation? | 15% | | |
| 3 | **Architecture** — Follows project patterns, correct dependency direction? | 15% | | |
| 4 | **Code Quality** — Clean, readable, follows standards? | 15% | | |
| 5 | **Test Coverage** — Adequate tests, edge cases covered? | 10% | | |
| 6 | **Performance** — No regressions, efficient implementations? | 10% | | |
| 7 | **Error Handling** — Structured errors, no silent failures, proper logging? | 10% | | |
| | **Documentation** | 5% | | |

### Scoring
- **≥85%** → ✅ **PASS** — Ship with confidence
- **70-84%** → ⚠️ **CONDITIONAL PASS** — Address noted issues before merge
- **<70%** → ❌ **FAIL** — Requires rework

### Audit Report Template
```markdown
## Governance Audit Report
**Task:** [description]
**Date:** [date]
**Pathway:** STANDARD
**Auditor:** AI + Human

### Scores
[Fill in the table above]

### Overall Score: [X]%
### Verdict: [PASS / CONDITIONAL / FAIL]

### Findings
- [Finding 1]
- [Finding 2]

### Required Actions (if conditional/fail)
1. [Action]
2. [Action]
```

### 🛑 CHECKPOINT
Present the audit report. Human reviews and confirms the verdict. If CONDITIONAL or FAIL, work must be revised.

---

<!-- depth:comprehensive -->
## Comprehensive Depth (Complex Pathway)

*Includes the full 7-layer audit from Standard, plus:*

### Extended Audit Dimensions

| # | Dimension | Weight | Score (0-10) | Weighted |
|---|-----------|--------|-------------|----------|
| 8 | **Reversibility** — Can this be safely rolled back? | 5% | | |
| 9 | **Governance Adherence** — All checkpoints honored, all rules followed? | 5% | | |

*Adjust weights: reduce Correctness to 18%, Security to 13% to accommodate.*

### Additional Audit Activities

1. **Governance Trail Audit** — Verify every phase has a logged checkpoint approval.
2. **Security Penetration Check** — For security-sensitive changes, perform targeted security testing.
3. **Load/Stress Verification** — For performance-critical changes, verify under load.
4. **Rollback Verification** — Execute the rollback procedure in a test environment to confirm it works.
5. **Cross-Team Impact Check** — Verify no downstream teams are affected by the changes.

### 🛑 CHECKPOINT
Formal audit review. All extended dimensions must score ≥7/10 individually. Overall must be ≥85% for PASS. This is the final quality gate before merge.
