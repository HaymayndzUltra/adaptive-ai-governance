import fs from 'fs';
import path from 'path';

export async function showStatus() {
  console.log('\n📋 Adaptive AI Governance — Status\n');

  const govDir = path.resolve('.ai-governance');
  const statePath = path.join(govDir, 'state.json');

  if (!fs.existsSync(statePath)) {
    console.log('   ⚠️  No governance state found. Run `govern init` first.\n');
    return;
  }

  const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));

  console.log(`   Version:          ${state.version}`);
  console.log(`   Initialized:      ${state.initialized}`);
  console.log(`   Current Task:     ${state.currentTask || 'None'}`);
  console.log(`   Current Pathway:  ${state.currentPathway?.toUpperCase() || 'None'}`);
  console.log(`   Current Phase:    ${state.currentPhase || 'None'}`);
  console.log(`   Assessments:      ${state.assessmentHistory?.length || 0}`);
  console.log(`   Audits:           ${state.auditHistory?.length || 0}`);

  // Show latest assessment if exists
  const assessDir = path.join(govDir, 'assessments');
  if (fs.existsSync(assessDir)) {
    const files = fs.readdirSync(assessDir).filter(f => f.endsWith('.json')).sort().reverse();
    if (files.length > 0) {
      const latest = JSON.parse(fs.readFileSync(path.join(assessDir, files[0]), 'utf-8'));
      console.log(`\n   Latest Assessment:`);
      console.log(`     Score:    ${(latest.score * 100).toFixed(0)}%`);
      console.log(`     Pathway:  ${latest.pathway}`);
      console.log(`     Phases:   ${latest.activePhases?.length || 0} active`);
    }
  }

  // Show available plans
  const plansDir = path.join(govDir, 'plans');
  if (fs.existsSync(plansDir)) {
    const plans = fs.readdirSync(plansDir).filter(f => f.endsWith('.md'));
    if (plans.length > 0) {
      console.log(`\n   Workflow Plans: ${plans.length}`);
      for (const p of plans.slice(-3)) {
        console.log(`     → ${p}`);
      }
    }
  }

  console.log('');
}
