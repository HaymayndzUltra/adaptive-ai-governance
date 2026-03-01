# Governance Audit

Run the formal quality audit using the weighted scorecard system.

## Process
1. Score each dimension 0-10:
   - Correctness (20%)
   - Security (15%)
   - Architecture Compliance (15%)
   - Code Quality (15%)
   - Test Coverage (10%)
   - Performance (10%)
   - Error Handling (10%)
   - Documentation (5%)
2. Compute weighted overall score
3. Determine verdict: PASS (≥85%), CONDITIONAL (70-84%), FAIL (<70%)
4. List critical issues, warnings, and observations
5. Generate required actions

Use template from `.ai-governance/templates/audit-scorecard.md`.
Present for human sign-off.
