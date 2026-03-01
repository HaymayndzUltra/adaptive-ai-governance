# Phase 2: Design

**Purpose:** Translate requirements into a technical architecture and design that respects existing patterns and governance rules.

---

<!-- depth:shallow -->
## Shallow Depth

*Design phase is typically SKIPPED for trivial pathway. If activated at shallow depth:*

### Steps
1. **Pattern Check** — Identify which existing project patterns apply to this change.
2. **File Map** — List the files that will be created or modified.

### Artifact
Brief design note (5-10 lines) embedded in the plan.

---

<!-- depth:moderate -->
## Moderate Depth (Standard Pathway)

### Steps
1. **Component Design** — Define new components/modules with their responsibilities, interfaces, and dependencies.
2. **Data Model** — Design or modify data models/schemas. Include entity relationships.
3. **API Design** — Define new or modified API contracts (endpoints, request/response schemas, status codes).
4. **Dependency Analysis** — Map how new components interact with existing ones. Verify dependency direction compliance (Rule 03).
5. **State Management** — Define how state changes flow through the system.
6. **Error Scenarios** — Design error handling for each failure mode.

### Artifact
```markdown
## Technical Design

### Component Architecture
[Describe new/modified components, their responsibilities, and interfaces]

### Data Model Changes
[Schema changes, new entities, relationship modifications]

### API Contracts
[New/modified endpoints with request/response schemas]

### Dependency Map
[How this integrates with existing system components]

### Error Handling Strategy
[Failure modes and how each is handled]
```

### 🛑 CHECKPOINT
Present the Technical Design for human review. Verify it complies with architecture rules (Rule 03).

---

<!-- depth:deep -->
## Deep Depth (Complex Pathway)

*Includes everything from Moderate, plus:*

### Additional Steps
7. **Architecture Decision Records** — Write ADRs for any new patterns, technologies, or significant design decisions. Include alternatives considered.
8. **Sequence Diagrams** — Create sequence diagrams for critical interactions showing the flow between components.
9. **Scalability Design** — Define how the system handles 10x and 100x load. Identify bottlenecks and mitigation.
10. **Security Design** — Threat model for new attack surfaces. Define authentication, authorization, and data protection for new flows.
11. **Migration Strategy** — If modifying existing systems, define the migration path including backward compatibility, feature flags, and rollback.
12. **Observability Design** — Define metrics, logs, traces, and alerts for new components.

### Artifact
Comprehensive Technical Design Document with ADRs, sequence diagrams, security analysis, and migration strategy.

### 🛑 CHECKPOINT
Formal design review. Architecture compliance verification. Security review if security-sensitive (Rule 02).
