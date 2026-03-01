# /assess — Complexity Assessment

Assess the complexity of the following task and recommend the appropriate governance pathway.

## Instructions
1. Read the task description provided by the user
2. Evaluate against these complexity factors:
   - **Files affected:** Estimate how many files will be created or modified
   - **Cross-cutting:** Does this touch multiple modules or domains?
   - **New patterns:** Does this introduce new architectural patterns?
   - **Security:** Is this security-sensitive (auth, crypto, data)?
   - **Data model:** Does this require schema or data model changes?
   - **External deps:** How many new external dependencies?
   - **Reversibility:** How easy is it to roll back?

3. Compute a complexity score (0-100%)
4. Select pathway: TRIVIAL (0-20%), STANDARD (21-55%), COMPLEX (56-100%), or INFRASTRUCTURE
5. Generate the depth profile showing which phases are active and at what depth

## Output Format
```
📊 GOVERNANCE ASSESSMENT
Task: [description]
Complexity Score: [X]%
Pathway: [TRIVIAL / STANDARD / COMPLEX / INFRASTRUCTURE]

Active Phases:
  [phase] — [depth]
  [phase] — [depth]
  ...

Applicable Rules:
  [rule name] — [priority]
  ...

Rationale: [brief explanation of pathway selection]
```

Then ask: "Do you approve this pathway, or would you like to adjust?"
