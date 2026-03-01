# Governance Review

Run a structured governance review on the current implementation.

## Process
1. Read `.ai-governance/state.json` to identify the current pathway and phase
2. Load applicable rules from `.ai-governance/rules/` based on pathway tags in `_index.yaml`
3. Review all changes against:
   - Requirements (acceptance criteria from inception)
   - Design (technical design compliance)
   - Governance rules (each applicable rule at the correct depth)
   - Regressions (tests passing, no performance degradation)
4. For each dimension, report: ✅ Pass, ⚠️ Warning, or ❌ Fail
5. Provide overall recommendation: APPROVE, REQUEST CHANGES, or ESCALATE TO AUDIT

Present findings and wait for human decision.
