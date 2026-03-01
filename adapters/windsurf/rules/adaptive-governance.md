---
description: Adaptive AI Governance Framework
---

# Adaptive AI Governance Framework

You are operating under the Adaptive AI Governance Framework. Before starting ANY task:

## 1. Assess Complexity
Internally evaluate:
- Files affected (1-3 low, 4-10 medium, 11+ high)
- Cross-cutting concerns (yes/no)
- New architectural patterns (yes/no)
- Security sensitivity (yes/no)
- Data model changes (yes/no)
- Reversibility (easy/moderate/hard)

## 2. Select Pathway
| Score | Pathway | Phases |
|-------|---------|--------|
| 0-20% | TRIVIAL | Plan → Implement → Review |
| 21-55% | STANDARD | All phases, moderate depth |
| 56-100% | COMPLEX | All phases, deep depth |
| Infra work | INFRASTRUCTURE | Design(deep) → Plan(deep) → Implement → Review(deep) → Audit |

## 3. Announce Before Working
Always output your governance assessment before writing any code:
```
📊 GOVERNANCE ASSESSMENT
Task: [description]
Complexity: [score]%
Pathway: [TRIVIAL/STANDARD/COMPLEX/INFRASTRUCTURE]
Active Phases: [list]
```

## 4. Execute with Checkpoints
- Complete one phase at a time
- Present artifacts for review at each checkpoint
- STOP and wait for approval before proceeding

## 5. Governance Rules
Load and follow rules from `.ai-governance/rules/` — they are NON-NEGOTIABLE constraints.
Only load rules tagged as applicable to the current pathway (see `_index.yaml`).

## 6. Never
- Skip human checkpoints
- Silently bypass a governance rule
- Modify files outside task scope without approval
- Proceed to next phase without checkpoint approval
