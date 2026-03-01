import fs from 'fs';
import path from 'path';

const AUDIT_DIMENSIONS = [
  { id: 'correctness',     label: 'Correctness',           weight: 0.20, description: 'Does the code do what the spec/PRD requires?' },
  { id: 'security',        label: 'Security',              weight: 0.15, description: 'No vulnerabilities, injection risks, or data exposure?' },
  { id: 'architecture',    label: 'Architecture Compliance', weight: 0.15, description: 'Follows project patterns and architectural rules?' },
  { id: 'code_quality',    label: 'Code Quality',          weight: 0.15, description: 'Clean, readable, follows coding standards?' },
  { id: 'testing',         label: 'Test Coverage',         weight: 0.10, description: 'Adequate tests, edge cases covered?' },
  { id: 'performance',     label: 'Performance',           weight: 0.10, description: 'No regressions, efficient algorithms?' },
  { id: 'documentation',   label: 'Documentation',         weight: 0.05, description: 'Updated docs, clear commit messages?' },
  { id: 'reversibility',   label: 'Reversibility',         weight: 0.05, description: 'Can this change be safely rolled back?' },
  { id: 'governance',      label: 'Governance Adherence',  weight: 0.05, description: 'All governance rules followed, checkpoints honored?' },
];

function generateScorecardMarkdown(taskId, scores, notes) {
  const lines = [];
  lines.push('# Governance Audit Scorecard');
  lines.push(`**Task:** ${taskId || 'Unspecified'}`);
  lines.push(`**Date:** ${new Date().toISOString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('| Dimension | Weight | Score | Weighted |');
  lines.push('|-----------|--------|-------|----------|');

  let totalWeighted = 0;
  for (const dim of AUDIT_DIMENSIONS) {
    const score = scores[dim.id] ?? 0;
    const weighted = score * dim.weight;
    totalWeighted += weighted;
    lines.push(`| ${dim.label} | ${(dim.weight * 100).toFixed(0)}% | ${score}/10 | ${weighted.toFixed(2)} |`);
  }

  const finalScore = (totalWeighted / 10 * 100).toFixed(1);
  lines.push('');
  lines.push(`**Overall Governance Score: ${finalScore}%**`);
  lines.push('');

  // Verdict
  const numScore = parseFloat(finalScore);
  let verdict, icon;
  if (numScore >= 85) { verdict = 'PASS — Ship with confidence'; icon = '✅'; }
  else if (numScore >= 70) { verdict = 'CONDITIONAL PASS — Address noted issues before merge'; icon = '⚠️'; }
  else { verdict = 'FAIL — Requires rework before merge'; icon = '❌'; }

  lines.push(`### ${icon} Verdict: ${verdict}`);
  lines.push('');

  // Notes
  if (notes && notes.length > 0) {
    lines.push('### Notes');
    for (const note of notes) {
      lines.push(`- ${note}`);
    }
    lines.push('');
  }

  // Dimension details
  lines.push('---');
  lines.push('### Dimension Details');
  lines.push('');
  for (const dim of AUDIT_DIMENSIONS) {
    const score = scores[dim.id] ?? 0;
    lines.push(`#### ${dim.label} (${score}/10)`);
    lines.push(`> ${dim.description}`);
    lines.push('');
  }

  return lines.join('\n');
}

function generateAuditLogEntry(taskId, pathway, phase) {
  return [
    `## Audit Entry: ${new Date().toISOString()}`,
    `- **Task:** ${taskId || 'N/A'}`,
    `- **Pathway:** ${pathway || 'N/A'}`,
    `- **Phase:** ${phase || 'N/A'}`,
    `- **Status:** Audit initiated`,
    '',
  ].join('\n');
}

export async function runAudit(opts) {
  console.log('\n🔍 Governance Audit Engine\n');

  const govDir = path.resolve('.ai-governance');
  const taskId = opts.task || 'current-task';

  // Load current state
  let state = {};
  const statePath = path.join(govDir, 'state.json');
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
  }

  if (opts.scorecard) {
    // Interactive scorecard generation
    console.log('   Generating audit scorecard template...\n');

    const defaultScores = {};
    for (const dim of AUDIT_DIMENSIONS) {
      defaultScores[dim.id] = 0;
    }

    const scorecard = generateScorecardMarkdown(taskId, defaultScores, [
      'Fill in scores (0-10) for each dimension',
      'Run audit with actual scores after review',
    ]);

    const scorecardDir = path.join(govDir, 'audits');
    fs.mkdirSync(scorecardDir, { recursive: true });
    const scorecardFile = path.join(scorecardDir, `scorecard-${taskId}-${Date.now()}.md`);
    fs.writeFileSync(scorecardFile, scorecard);

    console.log(`   📄 Scorecard template saved: ${scorecardFile}`);
    console.log('   Edit the scorecard with actual scores, then review.\n');
  } else {
    // Append audit log entry
    const auditLogPath = path.join(govDir, 'audit-log.md');
    const entry = generateAuditLogEntry(taskId, state.currentPathway, state.currentPhase);

    let existing = '';
    if (fs.existsSync(auditLogPath)) {
      existing = fs.readFileSync(auditLogPath, 'utf-8');
    } else {
      existing = '# Governance Audit Log\n\nAll audit entries are recorded here for traceability.\n\n---\n\n';
    }

    fs.writeFileSync(auditLogPath, existing + entry);
    console.log(`   📝 Audit entry logged: ${auditLogPath}`);

    // Update state
    if (fs.existsSync(statePath)) {
      state.auditHistory.push({
        timestamp: new Date().toISOString(),
        taskId,
        pathway: state.currentPathway,
        phase: state.currentPhase,
      });
      fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
    }
  }

  // Show audit dimensions
  console.log('\n   Audit Dimensions:');
  for (const dim of AUDIT_DIMENSIONS) {
    console.log(`     ${dim.label} (${(dim.weight * 100).toFixed(0)}%) — ${dim.description}`);
  }
  console.log('');
}

export { AUDIT_DIMENSIONS, generateScorecardMarkdown };
