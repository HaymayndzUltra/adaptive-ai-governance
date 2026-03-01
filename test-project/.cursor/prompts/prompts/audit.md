# /audit — Governance Audit Scorecard

Run the formal governance audit and generate a weighted scorecard.

## Instructions
1. Load the audit template from `.ai-governance/templates/audit-scorecard.md`
2. Evaluate all changes against each audit dimension
3. Score each dimension 0-10
4. Compute the weighted overall score
5. Determine verdict: PASS (≥85%), CONDITIONAL (70-84%), FAIL (<70%)

## Audit Dimensions
| # | Dimension | Weight |
|---|-----------|--------|
| 1 | Correctness | 20% |
| 2 | Security | 15% |
| 3 | Architecture Compliance | 15% |
| 4 | Code Quality | 15% |
| 5 | Test Coverage | 10% |
| 6 | Performance | 10% |
| 7 | Error Handling | 10% |
| 8 | Documentation | 5% |

## Output
Generate the complete audit scorecard with:
- Scores and weighted calculations
- Overall percentage and verdict
- Critical issues (must fix)
- Warnings (should fix)
- Observations (nice to have)
- Required actions with priorities

Present for human sign-off.
