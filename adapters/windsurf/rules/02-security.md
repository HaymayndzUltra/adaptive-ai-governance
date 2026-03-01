# Rule: Security Requirements

**ID:** 02-security
**Priority:** CRITICAL
**Applies To:** standard, complex, infrastructure
**Domain:** all

---

## Non-Negotiable Constraints

1. **No Hardcoded Secrets** — API keys, passwords, tokens, and connection strings must NEVER appear in source code. Use environment variables or a secrets manager.

2. **Input Validation** — All external inputs (user input, API payloads, query parameters, file uploads) must be validated and sanitized before processing.

3. **Authentication & Authorization** — Every endpoint that accesses user data or performs mutations MUST verify both identity (authn) and permissions (authz).

4. **SQL/NoSQL Injection Prevention** — Use parameterized queries or ORM methods. Never concatenate user input into queries.

5. **XSS Prevention** — All user-generated content rendered in the UI must be escaped or sanitized. Use framework-provided sanitization (React's JSX auto-escaping, DOMPurify, etc.).

6. **CSRF Protection** — State-changing requests must include CSRF tokens or use SameSite cookie attributes.

7. **Dependency Security** — Do not add dependencies with known critical CVEs. Run `npm audit` / `pip audit` / equivalent before merging.

8. **Least Privilege** — Database connections, API keys, and service accounts must have the minimum permissions required.

9. **Sensitive Data Logging** — Never log passwords, tokens, PII, or financial data. Mask or redact before logging.

10. **HTTPS Only** — All external communications must use TLS. No HTTP fallbacks in production.

## Depth Modulation

### MODERATE (Standard pathway)
- Verify no hardcoded secrets in changed files
- Check input validation on new endpoints
- Verify auth checks on new routes
- Run dependency audit

### DEEP (Complex pathway)
- All moderate checks PLUS:
- Full threat model for new attack surfaces
- Review authorization matrix for new roles/permissions
- Verify encryption at rest and in transit for new data flows
- Check for indirect prompt injection vectors if AI-facing
