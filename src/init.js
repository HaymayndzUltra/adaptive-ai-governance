import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRAMEWORK_ROOT = path.resolve(__dirname, '..');

const ADAPTER_MAP = {
  cursor: {
    rulesDir: '.cursor/rules',
    promptsDir: '.cursor/prompts',
    bootFile: null,
  },
  claude: {
    rulesDir: null,
    promptsDir: '.claude/commands',
    bootFile: 'CLAUDE.md',
  },
  windsurf: {
    rulesDir: '.windsurf/rules',
    promptsDir: '.windsurf/workflows',
    bootFile: null,
  },
  generic: {
    rulesDir: null,
    promptsDir: null,
    bootFile: null,
  },
};

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function createStateFile(targetDir) {
  const stateDir = path.join(targetDir, '.ai-governance');
  fs.mkdirSync(stateDir, { recursive: true });

  const state = {
    version: '1.0.0',
    initialized: new Date().toISOString(),
    currentTask: null,
    currentPathway: null,
    currentPhase: null,
    assessmentHistory: [],
    auditHistory: [],
  };

  fs.writeFileSync(
    path.join(stateDir, 'state.json'),
    JSON.stringify(state, null, 2)
  );

  fs.writeFileSync(
    path.join(stateDir, '.gitkeep'),
    ''
  );

  return stateDir;
}

export async function initProject(opts) {
  const targetDir = path.resolve(opts.target || '.');
  const adapter = opts.adapter || 'generic';
  const force = opts.force || false;

  console.log(`\n🏗️  Initializing Adaptive AI Governance in: ${targetDir}`);
  console.log(`   Adapter: ${adapter}\n`);

  const govDir = path.join(targetDir, '.ai-governance');
  if (fs.existsSync(govDir) && !force) {
    console.log('⚠️  Governance directory already exists. Use --force to overwrite.');
    return;
  }

  // 1. Copy core governance files
  const governanceSrc = path.join(FRAMEWORK_ROOT, 'governance');
  const governanceDest = path.join(targetDir, '.ai-governance');
  copyDirRecursive(governanceSrc, governanceDest);
  console.log('   ✅ Core governance files installed');

  // 2. Create state tracking file
  createStateFile(targetDir);
  console.log('   ✅ State tracking initialized');

  // 3. Apply adapter-specific setup
  const adapterConfig = ADAPTER_MAP[adapter];
  if (!adapterConfig) {
    console.log(`   ⚠️  Unknown adapter: ${adapter}. Using generic.`);
  } else {
    const adapterSrc = path.join(FRAMEWORK_ROOT, 'adapters', adapter);

    // Copy entire adapter directory structure (includes rules, prompts, workflows)
    if (fs.existsSync(adapterSrc)) {
      if (adapterConfig.rulesDir) {
        const rulesSrc = path.join(adapterSrc, 'rules');
        const rulesDest = path.join(targetDir, adapterConfig.rulesDir);
        if (fs.existsSync(rulesSrc)) {
          copyDirRecursive(rulesSrc, rulesDest);
          console.log(`   ✅ Rules copied to ${adapterConfig.rulesDir}`);
        }
      }

      if (adapterConfig.promptsDir) {
        const promptsSrc = path.join(adapterSrc, path.basename(adapterConfig.promptsDir));
        const promptsDest = path.join(targetDir, adapterConfig.promptsDir);
        if (fs.existsSync(promptsSrc)) {
          copyDirRecursive(promptsSrc, promptsDest);
          console.log(`   ✅ Prompts/workflows copied to ${adapterConfig.promptsDir}`);
        }
      }

      if (adapterConfig.bootFile) {
        const bootSrc = path.join(FRAMEWORK_ROOT, 'governance', 'BOOT.md');
        if (fs.existsSync(bootSrc)) {
          const bootDest = path.join(targetDir, adapterConfig.bootFile);
          fs.copyFileSync(bootSrc, bootDest);
          console.log(`   ✅ Boot file created: ${adapterConfig.bootFile}`);
        }
      }
    }
  }

  console.log('\n🎯 Governance framework initialized successfully!');
  console.log('   Next steps:');
  console.log('   1. Review .ai-governance/rules/ and customize for your project');
  console.log('   2. Run `govern assess` to classify your first task');
  console.log('   3. Run `govern route` to get your adaptive workflow\n');
}
