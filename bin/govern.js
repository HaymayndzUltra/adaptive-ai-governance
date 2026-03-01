#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from '../src/init.js';
import { assessComplexity } from '../src/assess.js';
import { routeWorkflow } from '../src/route.js';
import { runAudit } from '../src/audit.js';
import { showStatus } from '../src/status.js';

const program = new Command();

program
  .name('govern')
  .description('Adaptive AI Governance CLI — complexity-routed, depth-modulated workflow engine')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize governance framework in the target project')
  .option('-t, --target <path>', 'Target project path', '.')
  .option('--adapter <name>', 'AI assistant adapter: cursor | claude | windsurf | generic', 'generic')
  .option('--force', 'Overwrite existing governance files', false)
  .action(async (opts) => {
    await initProject(opts);
  });

program
  .command('assess')
  .description('Assess task complexity and recommend workflow pathway')
  .option('-d, --description <text>', 'Task description')
  .option('-f, --files <count>', 'Estimated files affected', '0')
  .option('--interactive', 'Run interactive complexity questionnaire', true)
  .action(async (opts) => {
    await assessComplexity(opts);
  });

program
  .command('route')
  .description('Route to appropriate workflow based on assessment')
  .option('-p, --pathway <name>', 'Force pathway: trivial | standard | complex | infrastructure')
  .option('-a, --assessment <file>', 'Path to assessment JSON file')
  .action(async (opts) => {
    await routeWorkflow(opts);
  });

program
  .command('audit')
  .description('Run governance audit on current task artifacts')
  .option('-t, --task <id>', 'Task ID to audit')
  .option('--scorecard', 'Generate audit scorecard', false)
  .action(async (opts) => {
    await runAudit(opts);
  });

program
  .command('status')
  .description('Show current governance status and active workflow')
  .action(async () => {
    await showStatus();
  });

program.parse();
