# Complexity Assessment

Assess the complexity of the user's task and recommend the appropriate adaptive governance pathway.

## Process
1. Ask the user to describe the task (or use the description they already provided)
2. Evaluate complexity factors:
   - Files affected (1-3 = low, 4-10 = medium, 11+ = high)
   - Cross-cutting concerns
   - New architectural patterns
   - Security sensitivity
   - Data model changes
   - External dependencies
   - Reversibility
3. Compute complexity score (0-100%)
4. Select pathway: TRIVIAL (0-20%), STANDARD (21-55%), COMPLEX (56-100%), INFRASTRUCTURE
5. Generate depth profile for each phase

## Output
```
📊 GOVERNANCE ASSESSMENT
Task: [description]
Complexity Score: [X]%
Pathway: [TRIVIAL / STANDARD / COMPLEX / INFRASTRUCTURE]

Active Phases:
  [phase] — [depth]
  ...

Applicable Rules: [from .ai-governance/rules/_index.yaml]

Rationale: [why this pathway]
```

Ask for approval before proceeding.
