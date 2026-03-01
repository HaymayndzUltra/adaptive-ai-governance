import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const COMPLEXITY_WEIGHTS = {
  filesAffected:      { low: [0, 3], medium: [4, 10], high: [11, Infinity], weight: 0.15 },
  crossCutting:       { low: false, high: true, weight: 0.20 },
  newPatterns:        { low: false, high: true, weight: 0.15 },
  securitySensitive:  { low: false, high: true, weight: 0.15 },
  dataModelChanges:   { low: false, high: true, weight: 0.10 },
  externalDeps:       { low: [0, 0], medium: [1, 2], high: [3, Infinity], weight: 0.10 },
  reversibility:      { easy: 0, moderate: 0.5, hard: 1, weight: 0.15 },
};

const PATHWAY_THRESHOLDS = {
  trivial:        { min: 0,    max: 0.20 },
  standard:       { min: 0.21, max: 0.55 },
  complex:        { min: 0.56, max: 1.00 },
};

const DEPTH_MAP = {
  trivial: {
    inception: 'skip',
    design: 'skip',
    plan: 'shallow',
    implement: 'shallow',
    review: 'shallow',
    audit: 'minimal',
    retrospective: 'skip',
  },
  standard: {
    inception: 'shallow',
    design: 'moderate',
    plan: 'moderate',
    implement: 'moderate',
    review: 'moderate',
    audit: 'standard',
    retrospective: 'shallow',
  },
  complex: {
    inception: 'deep',
    design: 'deep',
    plan: 'deep',
    implement: 'deep',
    review: 'deep',
    audit: 'comprehensive',
    retrospective: 'deep',
  },
  infrastructure: {
    inception: 'moderate',
    design: 'deep',
    plan: 'deep',
    implement: 'moderate',
    review: 'deep',
    audit: 'comprehensive',
    retrospective: 'moderate',
  },
};

function computeScore(answers) {
  let totalScore = 0;

  // Files affected
  const files = parseInt(answers.filesAffected || 0);
  const fw = COMPLEXITY_WEIGHTS.filesAffected;
  if (files <= fw.low[1]) totalScore += 0;
  else if (files <= fw.medium[1]) totalScore += 0.5 * fw.weight;
  else totalScore += 1.0 * fw.weight;

  // Boolean factors
  if (answers.crossCutting) totalScore += COMPLEXITY_WEIGHTS.crossCutting.weight;
  if (answers.newPatterns) totalScore += COMPLEXITY_WEIGHTS.newPatterns.weight;
  if (answers.securitySensitive) totalScore += COMPLEXITY_WEIGHTS.securitySensitive.weight;
  if (answers.dataModelChanges) totalScore += COMPLEXITY_WEIGHTS.dataModelChanges.weight;

  // External dependencies
  const deps = parseInt(answers.externalDeps || 0);
  const dw = COMPLEXITY_WEIGHTS.externalDeps;
  if (deps <= dw.low[1]) totalScore += 0;
  else if (deps <= dw.medium[1]) totalScore += 0.5 * dw.weight;
  else totalScore += 1.0 * dw.weight;

  // Reversibility
  const rev = answers.reversibility || 'easy';
  totalScore += COMPLEXITY_WEIGHTS.reversibility[rev] * COMPLEXITY_WEIGHTS.reversibility.weight;

  return Math.min(totalScore, 1.0);
}

function classifyPathway(score, answers) {
  // Infrastructure override
  if (answers.isInfrastructure) return 'infrastructure';

  for (const [pathway, range] of Object.entries(PATHWAY_THRESHOLDS)) {
    if (score >= range.min && score <= range.max) return pathway;
  }
  return 'standard';
}

function getDepthProfile(pathway) {
  return DEPTH_MAP[pathway] || DEPTH_MAP.standard;
}

function getActivePhases(depthProfile) {
  return Object.entries(depthProfile)
    .filter(([_, depth]) => depth !== 'skip')
    .map(([phase, depth]) => ({ phase, depth }));
}

export async function assessComplexity(opts) {
  console.log('\n📊 Adaptive Complexity Assessment Engine\n');

  let answers;

  if (opts.interactive !== false) {
    // In non-interactive mode or when inquirer isn't available, use defaults/flags
    answers = {
      description: opts.description || 'No description provided',
      filesAffected: parseInt(opts.files || '1'),
      crossCutting: false,
      newPatterns: false,
      securitySensitive: false,
      dataModelChanges: false,
      externalDeps: 0,
      reversibility: 'easy',
      isInfrastructure: false,
    };

    try {
      const { default: inquirer } = await import('inquirer');
      const responses = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: 'Describe the task:',
          default: opts.description || '',
        },
        {
          type: 'number',
          name: 'filesAffected',
          message: 'Estimated number of files affected:',
          default: parseInt(opts.files || '1'),
        },
        {
          type: 'confirm',
          name: 'crossCutting',
          message: 'Does this touch multiple modules/domains?',
          default: false,
        },
        {
          type: 'confirm',
          name: 'newPatterns',
          message: 'Does this introduce new architectural patterns?',
          default: false,
        },
        {
          type: 'confirm',
          name: 'securitySensitive',
          message: 'Is this security-sensitive (auth, crypto, data exposure)?',
          default: false,
        },
        {
          type: 'confirm',
          name: 'dataModelChanges',
          message: 'Does this require data model / schema changes?',
          default: false,
        },
        {
          type: 'number',
          name: 'externalDeps',
          message: 'Number of new external dependencies:',
          default: 0,
        },
        {
          type: 'list',
          name: 'reversibility',
          message: 'How reversible is this change?',
          choices: ['easy', 'moderate', 'hard'],
          default: 'easy',
        },
        {
          type: 'confirm',
          name: 'isInfrastructure',
          message: 'Is this primarily infrastructure / DevOps work?',
          default: false,
        },
      ]);
      answers = responses;
    } catch {
      console.log('   Using non-interactive mode with provided flags.\n');
    }
  }

  const score = computeScore(answers);
  const pathway = classifyPathway(score, answers);
  const depthProfile = getDepthProfile(pathway);
  const activePhases = getActivePhases(depthProfile);

  const assessment = {
    timestamp: new Date().toISOString(),
    description: answers.description,
    score: Math.round(score * 100) / 100,
    pathway,
    depthProfile,
    activePhases,
    answers,
  };

  console.log(`\n   Complexity Score: ${(score * 100).toFixed(0)}%`);
  console.log(`   Recommended Pathway: ${pathway.toUpperCase()}`);
  console.log(`\n   Active Phases:`);
  for (const { phase, depth } of activePhases) {
    const depthIcon = { shallow: '▪', moderate: '▪▪', deep: '▪▪▪', minimal: '·', standard: '▪▪', comprehensive: '▪▪▪' };
    console.log(`     ${depthIcon[depth] || '▪'}  ${phase} (${depth})`);
  }

  // Save assessment
  const stateDir = path.resolve('.ai-governance');
  if (fs.existsSync(stateDir)) {
    const statePath = path.join(stateDir, 'state.json');
    if (fs.existsSync(statePath)) {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      state.currentTask = answers.description;
      state.currentPathway = pathway;
      state.currentPhase = activePhases[0]?.phase || null;
      state.assessmentHistory.push(assessment);
      fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
    }
  }

  // Write assessment file
  const assessDir = path.resolve('.ai-governance', 'assessments');
  fs.mkdirSync(assessDir, { recursive: true });
  const assessFile = path.join(assessDir, `assessment-${Date.now()}.json`);
  fs.writeFileSync(assessFile, JSON.stringify(assessment, null, 2));
  console.log(`\n   📄 Assessment saved: ${assessFile}`);

  console.log(`\n   Run \`govern route --pathway ${pathway}\` to generate your workflow.\n`);

  return assessment;
}

export { computeScore, classifyPathway, getDepthProfile, getActivePhases, DEPTH_MAP };
