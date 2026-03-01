import fs from 'fs';
import path from 'path';
import { DEPTH_MAP } from './assess.js';

const PHASE_FILES = {
  inception:      '01-inception.md',
  design:         '02-design.md',
  plan:           '03-plan.md',
  implement:      '04-implement.md',
  review:         '05-review.md',
  audit:          '06-audit.md',
  retrospective:  '07-retrospective.md',
};

function loadPhaseContent(phaseName, depth, govDir) {
  const phaseFile = PHASE_FILES[phaseName];
  if (!phaseFile) return null;

  const phasePath = path.join(govDir, 'phases', phaseFile);
  if (!fs.existsSync(phasePath)) return null;

  const content = fs.readFileSync(phasePath, 'utf-8');

  // Extract depth-specific section
  const depthMarker = `<!-- depth:${depth} -->`;
  const nextDepthMarker = /<!-- depth:\w+ -->/;

  const depthStart = content.indexOf(depthMarker);
  if (depthStart === -1) return content; // Return full content if no depth markers

  const afterMarker = content.substring(depthStart + depthMarker.length);
  const nextMatch = afterMarker.search(nextDepthMarker);
  const depthContent = nextMatch === -1 ? afterMarker : afterMarker.substring(0, nextMatch);

  return depthContent.trim();
}

function loadApplicableRules(pathway, govDir) {
  const rulesDir = path.join(govDir, 'rules');
  if (!fs.existsSync(rulesDir)) return [];

  const indexPath = path.join(rulesDir, '_index.yaml');
  if (!fs.existsSync(indexPath)) {
    // Fallback: load all .md files in rules/
    return fs.readdirSync(rulesDir)
      .filter(f => f.endsWith('.md'))
      .map(f => ({
        file: f,
        name: f.replace('.md', ''),
        appliesTo: ['all'],
      }));
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    // Simple YAML-like parsing for rule entries
    const rules = [];
    const blocks = indexContent.split('- file:');
    for (const block of blocks.slice(1)) {
      const lines = block.trim().split('\n');
      const rule = { file: '', name: '', appliesTo: [], priority: 'medium' };
      for (const line of lines) {
        const trimmed = line.trim();
        if (lines.indexOf(line) === 0) rule.file = trimmed;
        else if (trimmed.startsWith('name:')) rule.name = trimmed.replace('name:', '').trim();
        else if (trimmed.startsWith('applies-to:')) {
          rule.appliesTo = trimmed.replace('applies-to:', '').trim()
            .split(',').map(s => s.trim());
        }
        else if (trimmed.startsWith('priority:')) rule.priority = trimmed.replace('priority:', '').trim();
      }
      rules.push(rule);
    }
    return rules.filter(r =>
      r.appliesTo.includes('all') || r.appliesTo.includes(pathway)
    );
  } catch {
    return [];
  }
}

function generateWorkflowPlan(pathway, depthProfile, activePhases, govDir) {
  const lines = [];
  lines.push(`# Adaptive Workflow Plan`);
  lines.push(`**Pathway:** ${pathway.toUpperCase()}`);
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Applicable rules
  const rules = loadApplicableRules(pathway, govDir);
  if (rules.length > 0) {
    lines.push('## Governance Rules (Active)');
    for (const rule of rules) {
      lines.push(`- **${rule.name || rule.file}** (${rule.priority || 'standard'})`);
    }
    lines.push('');
  }

  // Phase plan
  lines.push('## Phase Execution Plan');
  lines.push('');

  const allPhases = Object.keys(PHASE_FILES);
  for (const phase of allPhases) {
    const depth = depthProfile[phase];
    if (depth === 'skip') {
      lines.push(`### ⏭️ ${phase.charAt(0).toUpperCase() + phase.slice(1)} — SKIPPED`);
      lines.push(`> Skipped for ${pathway} pathway.`);
      lines.push('');
      continue;
    }

    const isActive = activePhases.some(p => p.phase === phase);
    const icon = isActive ? '🔵' : '⚪';
    lines.push(`### ${icon} ${phase.charAt(0).toUpperCase() + phase.slice(1)} — Depth: ${depth.toUpperCase()}`);
    lines.push('');

    const phaseContent = loadPhaseContent(phase, depth, govDir);
    if (phaseContent) {
      lines.push(phaseContent);
    } else {
      lines.push(`Execute ${phase} phase at **${depth}** depth. See \`.ai-governance/phases/${PHASE_FILES[phase]}\` for details.`);
    }

    // Human checkpoint
    lines.push('');
    lines.push(`> **🛑 HUMAN CHECKPOINT:** Review and approve ${phase} artifacts before proceeding.`);
    lines.push('');
  }

  // Audit trail reminder
  lines.push('---');
  lines.push('');
  lines.push('## Audit Trail');
  lines.push('Every AI-generated plan, decision, and artifact must be logged in `.ai-governance/audit-log.md`.');
  lines.push('Use `govern audit --scorecard` at the end to generate the final governance scorecard.');

  return lines.join('\n');
}

export async function routeWorkflow(opts) {
  console.log('\n🔀 Adaptive Workflow Router\n');

  const govDir = path.resolve('.ai-governance');
  let pathway = opts.pathway;
  let depthProfile;
  let activePhases;

  if (!pathway) {
    // Try to load from latest assessment
    const assessDir = path.join(govDir, 'assessments');
    if (fs.existsSync(assessDir)) {
      const files = fs.readdirSync(assessDir).filter(f => f.endsWith('.json')).sort().reverse();
      if (files.length > 0) {
        const latest = JSON.parse(fs.readFileSync(path.join(assessDir, files[0]), 'utf-8'));
        pathway = latest.pathway;
        depthProfile = latest.depthProfile;
        activePhases = latest.activePhases;
        console.log(`   Using latest assessment: ${pathway} (score: ${latest.score})`);
      }
    }
  }

  if (!pathway) {
    console.log('   ⚠️  No pathway specified and no assessment found.');
    console.log('   Run `govern assess` first or use --pathway flag.\n');
    return;
  }

  if (!depthProfile) {
    depthProfile = DEPTH_MAP[pathway] || DEPTH_MAP.standard;
    activePhases = Object.entries(depthProfile)
      .filter(([_, depth]) => depth !== 'skip')
      .map(([phase, depth]) => ({ phase, depth }));
  }

  const workflowPlan = generateWorkflowPlan(pathway, depthProfile, activePhases, govDir);

  // Save workflow plan
  const plansDir = path.join(govDir, 'plans');
  fs.mkdirSync(plansDir, { recursive: true });
  const planFile = path.join(plansDir, `workflow-${pathway}-${Date.now()}.md`);
  fs.writeFileSync(planFile, workflowPlan);

  console.log(`   ✅ Workflow plan generated: ${planFile}`);
  console.log(`   📋 Pathway: ${pathway.toUpperCase()}`);
  console.log(`   📊 Active phases: ${activePhases.length}/${Object.keys(PHASE_FILES).length}`);
  console.log(`\n   Phases:`);
  for (const { phase, depth } of activePhases) {
    console.log(`     → ${phase} (${depth})`);
  }
  console.log('');

  // Update state
  const statePath = path.join(govDir, 'state.json');
  if (fs.existsSync(statePath)) {
    const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
    state.currentPathway = pathway;
    state.currentPhase = activePhases[0]?.phase || null;
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  }

  return { pathway, depthProfile, activePhases, planFile };
}
