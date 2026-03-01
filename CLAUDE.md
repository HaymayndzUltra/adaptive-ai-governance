# Adaptive AI Governance — Claude Boot Sequence

Read and follow `.ai-governance/BOOT.md` for the complete governance protocol.

## Quick Reference
- Before ANY task: assess complexity → select pathway → announce → execute with checkpoints
- Rules are in `.ai-governance/rules/` — they are NON-NEGOTIABLE
- Phase instructions are in `.ai-governance/phases/` — load only active phases
- Templates are in `.ai-governance/templates/`
- State is tracked in `.ai-governance/state.json`

## Commands
- `/assess` — Run complexity assessment (see `.claude/commands/assess.md`)
- `/review` — Run governance review (see `.claude/commands/review.md`)
- `/audit` — Run formal audit scorecard (see `.claude/commands/audit.md`)

## Pathways
| Score | Pathway | Active Phases |
|-------|---------|---------------|
| 0-20% | TRIVIAL | Plan(shallow) → Implement(shallow) → Review(shallow) → Audit(minimal) |
| 21-55% | STANDARD | All 7 phases at moderate depth |
| 56-100% | COMPLEX | All 7 phases at deep depth |
| DevOps | INFRASTRUCTURE | Design(deep) → Plan(deep) → Implement → Review(deep) → Audit(comprehensive) |

## Critical Rules
- Never skip human checkpoints
- Never bypass governance rules silently
- Always announce your pathway before writing code
- Log every phase completion
