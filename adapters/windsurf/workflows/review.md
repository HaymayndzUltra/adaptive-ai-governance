---
description: Run governance review on current implementation
---

1. Read `.ai-governance/state.json` to get current pathway and phase
2. Load applicable governance rules from `.ai-governance/rules/`
3. Review changes against requirements, design, and all applicable rules
4. Check for regressions (tests, performance)
5. Score each review dimension: ✅ Pass, ⚠️ Warning, or ❌ Fail
6. Recommend: APPROVE, REQUEST CHANGES, or ESCALATE TO AUDIT
7. Present findings and wait for human decision
