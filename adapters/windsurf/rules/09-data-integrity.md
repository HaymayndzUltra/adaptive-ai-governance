# Rule: Data Integrity

**ID:** 09-data-integrity
**Priority:** CRITICAL
**Applies To:** standard, complex
**Domain:** database, backend

---

## Non-Negotiable Constraints

1. **Migration Safety** — Database migrations must be backward-compatible. The old code must work with the new schema during deployment overlap.

2. **No Destructive Migrations Without Backup** — Column drops, table drops, and data type changes require a verified backup and a rollback migration.

3. **Schema Validation** — All data entering the system must be validated against a schema before persistence. Use database constraints as the last line of defense.

4. **Referential Integrity** — Foreign key relationships must be enforced at the database level, not just in application code.

5. **Idempotent Operations** — Write operations (especially those triggered by events, queues, or retries) must be idempotent.

6. **Audit Trail** — Changes to sensitive data (user records, financial data, permissions) must produce an audit log entry.

## Depth Modulation

### MODERATE (Standard pathway)
- Verify migration backward-compatibility
- Check schema validation on new data paths
- Verify idempotency of new write operations

### DEEP (Complex pathway)
- All moderate PLUS:
- Full migration dry-run on production-like data
- Review referential integrity for new entity relationships
- Verify audit trail coverage for sensitive data changes
- Data consistency checks across service boundaries
