# /review — Governance Review

Run a governance review on the current implementation against all applicable rules and the approved plan.

## Instructions
1. Identify the current task and its governance pathway from `.ai-governance/state.json`
2. Load all applicable governance rules from `.ai-governance/rules/`
3. Review all changes made during the implementation phase

## Review Dimensions

### Requirements Compliance
- All acceptance criteria satisfied?
- No scope creep or gaps?

### Design Compliance
- Implementation matches technical design?
- API contracts match specification?

### Governance Rule Compliance
Check each applicable rule at the pathway's depth level:
- Code Quality (01)
- Security (02)
- Architecture (03)
- Testing (04)
- Error Handling (05)
- Performance (06)
- Documentation (07)
- Infrastructure (08) — if applicable
- Data Integrity (09) — if applicable
- Accessibility (10) — if applicable

### Regression Check
- All tests pass?
- No performance regressions?

## Output Format
For each dimension, report: ✅ Pass, ⚠️ Warning, or ❌ Fail with specific findings.

Then provide an overall recommendation: APPROVE, REQUEST CHANGES, or ESCALATE TO AUDIT.
