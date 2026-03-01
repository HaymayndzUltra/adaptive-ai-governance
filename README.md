# Adaptive AI Governance Framework

### Enterprise-Grade, Complexity-Routed AI Coding Governance

Stop applying the same rigid workflow to every task. Start **governing adaptively**.

The Adaptive AI Governance Framework is an **AWS AI-DLC inspired** system that transforms any AI coding assistant into a disciplined engineering partner with **complexity-aware workflow routing**, **depth-modulated phases**, and **embedded human oversight** at every decision gate.

Unlike static governance frameworks that force a bug fix through the same ceremony as a major feature, this framework **adapts the process to the problem** — automatically selecting the right workflow pathway and calibrating the depth of each phase based on task complexity.

---

## Key Innovations

| Feature | Description |
|---------|-------------|
| **Adaptive Workflow Routing** | AI assesses task complexity and selects the appropriate pathway (Trivial/Standard/Complex/Infrastructure) |
| **Depth Modulation** | Each phase executes at shallow/moderate/deep depth based on the pathway — no wasted ceremony |
| **Human Oversight Rituals** | Mandatory checkpoints at every phase transition — the AI cannot proceed without approval |
| **Weighted Audit Scorecard** | Quantitative 9-dimension quality scoring (not just pass/fail) with weighted governance score |
| **Rule Metadata Tagging** | Rules are tagged with pathway applicability and domain scope — only relevant rules are loaded |
| **Full Auditability** | Every assessment, routing decision, and audit is logged as structured JSON/Markdown |
| **Universal Adapter System** | Works with Cursor, Claude Code, Windsurf, and any other AI assistant |
| **Self-Improving Retrospectives** | Structured retrospectives that feed calibration changes back into the framework |

---

## Architecture

```
adaptive-ai-governance/
├── bin/govern.js              # CLI entry point
├── src/
│   ├── init.js                # Project initialization
│   ├── assess.js              # Complexity assessment engine
│   ├── route.js               # Adaptive workflow router
│   ├── audit.js               # Audit scorecard generator
│   └── status.js              # Governance status dashboard
├── governance/
│   ├── BOOT.md                # Universal AI boot sequence
│   ├── rules/                 # Source governance rules (10 rules)
│   │   ├── _index.yaml        # Rule registry with metadata
│   │   ├── 01-code-quality.md
│   │   ├── 02-security.md
│   │   ├── 03-architecture.md
│   │   ├── 04-testing.md
│   │   ├── 05-error-handling.md
│   │   ├── 06-performance.md
│   │   ├── 07-documentation.md
│   │   ├── 08-infrastructure.md
│   │   ├── 09-data-integrity.md
│   │   └── 10-accessibility.md
│   ├── phases/                # Depth-modulated workflow phases
│   │   ├── 01-inception.md
│   │   ├── 02-design.md
│   │   ├── 03-plan.md
│   │   ├── 04-implement.md
│   │   ├── 05-review.md
│   │   ├── 06-audit.md
│   │   └── 07-retrospective.md
│   └── templates/             # Reusable document templates
│       ├── prd.md
│       ├── task-list.md
│       ├── audit-scorecard.md
│       └── retrospective.md
└── adapters/                  # AI assistant adapters
    ├── cursor/
    │   ├── rules/             # All 10 governance rules + master rule
    │   └── prompts/           # Custom prompts for Cursor
    ├── claude/
    │   └── commands/          # Custom commands for Claude
    └── windsurf/
        └── workflows/         # All 10 governance rules + workflows
```

---

## How It Works

### The Four Pathways

The framework routes every task through one of four adaptive pathways based on a weighted complexity assessment:

```
  Task Description
        │
        ▼
  ┌─────────────┐
  │   ASSESS     │  ← Weighted scoring across 7 complexity factors
  │  Complexity  │
  └──────┬──────┘
         │
    ┌────┼────────────────┬──────────────┐
    ▼    ▼                ▼              ▼
 TRIVIAL  STANDARD     COMPLEX    INFRASTRUCTURE
 (0-20%)  (21-55%)     (56-100%)    (DevOps)
    │       │             │              │
    │    Inception      Inception     Design(deep)
    │    Design         Design(deep)  Plan(deep)
  Plan   Plan           Plan(deep)    Implement
  Impl   Implement      Implement     Review(deep)
  Review Review         Review(deep)  Audit
    │    Audit          Audit(full)      │
    │    Retro          Retro(deep)      │
    ▼       ▼             ▼              ▼
              ✅ DONE
```

### Complexity Assessment Factors

| Factor | Weight | Low | Medium | High |
|--------|--------|-----|--------|------|
| Files Affected | 15% | 0-3 | 4-10 | 11+ |
| Cross-Cutting Concerns | 20% | No | — | Yes |
| New Patterns | 15% | No | — | Yes |
| Security Sensitivity | 15% | No | — | Yes |
| Data Model Changes | 10% | No | — | Yes |
| External Dependencies | 10% | 0 | 1-2 | 3+ |
| Reversibility | 15% | Easy | Moderate | Hard |

### Depth Modulation Matrix

| Phase | Trivial | Standard | Complex | Infrastructure |
|-------|---------|----------|---------|----------------|
| Inception | skip | shallow | deep | skip |
| Design | skip | moderate | deep | deep |
| Plan | shallow | moderate | deep | deep |
| Implement | shallow | moderate | deep | moderate |
| Review | shallow | moderate | deep | deep |
| Audit | minimal | standard | comprehensive | comprehensive |
| Retrospective | skip | shallow | deep | moderate |

---

## Quick Start

### Prerequisites
- Node.js ≥ 18.0.0

### Installation

**Option A: Clone into your project (recommended)**
```bash
git clone https://github.com/your-org/adaptive-ai-governance.git .ai-governance
cd .ai-governance && npm install
```

**Option B: Install as dev dependency**
```bash
npm install --save-dev adaptive-ai-governance
```

### Initialize in Your Project

```bash
# Generic (works with any AI assistant)
npx govern init --target /path/to/your/project

# For Cursor users
npx govern init --target /path/to/your/project --adapter cursor

# For Claude Code users
npx govern init --target /path/to/your/project --adapter claude

# For Windsurf users
npx govern init --target /path/to/your/project --adapter windsurf
```

### Workflow

```bash
# 1. Assess task complexity
npx govern assess

# 2. Generate adaptive workflow plan
npx govern route

# 3. Check governance status
npx govern status

# 4. Run audit after implementation
npx govern audit --scorecard
```

---

## Using with AI Assistants

### Cursor
After `govern init --adapter cursor`:
- Governance rules are copied to `.cursor/rules/` (10 rules + master governance file)
- Custom prompts available in `.cursor/prompts/`: `/assess`, `/review`, `/audit`
- The AI automatically follows the adaptive governance boot sequence
- Rules are loaded directly by Cursor IDE

### Claude Code
After `govern init --adapter claude`:
- Commands available in `.claude/commands/`: `/assess`, `/review`, `/audit`
- `CLAUDE.md` boot file created at project root
- Claude reads governance context at conversation start
- Governance rules in `.ai-governance/rules/`

### Windsurf
After `govern init --adapter windsurf`:
- Workflows available in `.windsurf/workflows/`: `/assess`, `/review`, `/audit`
- Governance rules copied to `.windsurf/workflows/` (10 rules + master governance file)
- Governance context loaded automatically via workflows
- Rules are loaded directly by Windsurf IDE

### Other AI Assistants
The framework works with any AI assistant that reads project files. Point your assistant to `.ai-governance/BOOT.md` as the entry point.

---

## Governance Rules

All 10 rules include **depth modulation** — each rule specifies different verification levels for shallow, moderate, and deep depth:

| Rule | Priority | Applies To |
|------|----------|-----------|
| 01 Code Quality | CRITICAL | All pathways |
| 02 Security | CRITICAL | Standard, Complex, Infrastructure |
| 03 Architecture | HIGH | Standard, Complex |
| 04 Testing | HIGH | Standard, Complex |
| 05 Error Handling | HIGH | All pathways |
| 06 Performance | MEDIUM | Standard, Complex |
| 07 Documentation | MEDIUM | Standard, Complex |
| 08 Infrastructure | CRITICAL | Infrastructure, Complex |
| 09 Data Integrity | CRITICAL | Standard, Complex |
| 10 Accessibility | MEDIUM | Standard, Complex |

### Customizing Rules
Edit files in `.ai-governance/rules/` to match your project's standards. Update `_index.yaml` to adjust pathway applicability and priority.

---

## Audit Scorecard

The weighted audit system produces a quantitative governance score:

| Dimension | Weight |
|-----------|--------|
| Correctness | 20% |
| Security | 15% |
| Architecture | 15% |
| Code Quality | 15% |
| Test Coverage | 10% |
| Performance | 10% |
| Error Handling | 10% |
| Documentation | 5% |

**Verdicts:** ✅ PASS (≥85%) · ⚠️ CONDITIONAL (70-84%) · ❌ FAIL (<70%)

---

## Comparison with Other Frameworks

| Capability | This Framework | AI-Governor | GitHub Spec Kit | AWS AI-DLC |
|-----------|---------------|-------------|-----------------|------------|
| Adaptive Routing | ✅ | ❌ Fixed | ❌ Fixed | ✅ |
| Depth Modulation | ✅ | ❌ | ❌ | ✅ |
| Governance Rules | ✅ Tagged | ✅ Static | ❌ | ✅ |
| Quantitative Audit | ✅ Weighted | ❌ | ❌ | ⚠️ |
| CLI Tooling | ✅ | ❌ | ✅ | ⚠️ |
| Multi-Assistant | ✅ 3 adapters | ✅ | ✅ | ⚠️ |
| Self-Improving | ✅ Retro-fed | ⚠️ Manual | ❌ | ✅ |
| Zero Runtime Option | ✅ Markdown only | ✅ | ❌ | ❌ |

---

## Design Philosophy

This framework is built on three core principles from AWS AI-DLC:

1. **No Hard-Wired Workflows** — The AI recommends the Level 1 Plan based on pathway intention. Different tasks follow different paths.

2. **Adaptive Breadth AND Depth** — Not just which phases to run, but how deeply to engage each phase. A utility function doesn't need full DDD.

3. **Embedded Human Ownership** — Human approvals at every gate. The system deliberately slows down when automation races ahead of validation.

---

## License

Apache 2.0 — See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- **[AWS AI-DLC](https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/)** — Adaptive workflow principles and depth modulation concepts
- **[AI-Governor-Framework](https://github.com/Fr-e-d/AI-Governor-Framework)** — In-repo governance rules and quality audit inspiration
- **[GitHub Spec Kit](https://github.com/github/spec-kit)** — Spec-driven development patterns
- **[snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks)** — Original PRD → Tasks workflow
- **[Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-best-practices)** — CLAUDE.md and context engineering best practices
