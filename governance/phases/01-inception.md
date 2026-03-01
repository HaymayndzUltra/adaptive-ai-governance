# Phase 1: Inception

**Purpose:** Transform a raw idea or request into a clear, validated understanding of WHAT needs to be built and WHY.

---

<!-- depth:shallow -->
## Shallow Depth (Standard Pathway)

### Objective
Produce a lightweight requirements summary — just enough to align on scope.

### Steps
1. **Capture Intent** — Summarize the request in 2-3 sentences: What is the user asking for? What problem does it solve?
2. **Identify Stakeholders** — Who benefits? Who is affected?
3. **Define Acceptance Criteria** — List 3-5 concrete, testable conditions that define "done."
4. **Scope Boundary** — Explicitly state what is IN scope and what is OUT of scope.

### Artifact
```markdown
## Requirements Summary
- **Intent:** [2-3 sentences]
- **Stakeholders:** [list]
- **Acceptance Criteria:**
  1. [criterion]
  2. [criterion]
  3. [criterion]
- **In Scope:** [list]
- **Out of Scope:** [list]
```

### 🛑 CHECKPOINT
Present the Requirements Summary for human approval before proceeding to Design.

---

<!-- depth:moderate -->
## Moderate Depth (Standard Pathway — Complex Features)

*Includes everything from Shallow, plus:*

### Additional Steps
5. **User Stories** — Write user stories in "As a [role], I want [action], so that [benefit]" format for each major interaction.
6. **Constraints & Dependencies** — List technical constraints, external dependencies, and timeline expectations.
7. **Risk Identification** — Identify top 3 risks and mitigation strategies.

### Artifact
Full Product Requirements Document (PRD). Use template at `.ai-governance/templates/prd.md`.

### 🛑 CHECKPOINT
Present the PRD for human approval. Discuss risks and constraints.

---

<!-- depth:deep -->
## Deep Depth (Complex Pathway)

*Includes everything from Moderate, plus:*

### Additional Steps
8. **Domain Analysis** — Map the domain entities, relationships, and business rules affected by this change.
9. **Impact Analysis** — Identify all systems, services, and teams affected. Map the blast radius.
10. **Success Metrics** — Define quantitative success metrics (performance targets, adoption goals, error rate thresholds).
11. **Non-Functional Requirements** — Explicitly define scalability, availability, latency, and compliance requirements.

### Artifact
Comprehensive PRD with domain model, impact analysis, success metrics, and NFRs.

### 🛑 CHECKPOINT
Present the comprehensive PRD for stakeholder review. This is a formal approval gate — multiple stakeholders may need to sign off.
