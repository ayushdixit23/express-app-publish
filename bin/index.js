#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || '';
  const pmName = ua.split('/')[0];

  switch (pmName) {
    case 'yarn':
      return { name: 'yarn', installCmd: 'yarn', installArgs: [], devCmd: 'yarn dev' };
    case 'pnpm':
      return { name: 'pnpm', installCmd: 'pnpm', installArgs: ['install'], devCmd: 'pnpm dev' };
    case 'bun':
      return { name: 'bun', installCmd: 'bun', installArgs: ['install'], devCmd: 'bun dev' };
    default:
      return { name: 'npm', installCmd: 'npm', installArgs: ['install'], devCmd: 'npm run dev' };
  }
}

const pm = detectPackageManager();

const projectName = process.argv[2];

if (!projectName) {
  console.log(chalk.bgRed.bold(' Error '));
  console.error(chalk.red('Please specify the project name:'));

  if (pm.name === 'npm') {
    console.log(chalk.cyan('  npx create-express-mongodb-ts-starter my-app'));
    console.log(chalk.cyan('  npm create express-mongodb-ts-starter my-app'));
  } else {
    console.log(chalk.cyan(`  ${pm.name} create express-mongodb-ts-starter my-app`));
  }

  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

if (fs.existsSync(projectDir)) {
  console.log(chalk.bgRed.bold(' Error '));
  console.error(chalk.red(`Directory "${projectName}" already exists.`));
  process.exit(1);
}

console.log(chalk.bgCyan.bold(' Creating ') + chalk.white(` ${projectName} `));
console.log();

fs.mkdirSync(projectDir, { recursive: true });

const templateDir = path.resolve(__dirname, '..', 'template');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(templateDir, projectDir);

const spinner = ora(chalk.cyan('Copying template files...')).start();
spinner.succeed(chalk.green('✓ Files created successfully!'));

const dotFilesToRename = ['gitignore', 'prettierrc'];

for (const file of dotFilesToRename) {
  const srcPath = path.join(projectDir, file);
  const destPath = path.join(projectDir, `.${file}`);
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
  }
}

const packageJsonPath = path.join(projectDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.name = projectName;
packageJson.description = `Express + MongoDB + TypeScript starter - ${projectName}`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

if (pm.name !== 'npm') {
  const npmLockPath = path.join(projectDir, 'package-lock.json');
  if (fs.existsSync(npmLockPath)) {
    fs.unlinkSync(npmLockPath);
  }
}

const installSpinner = ora(chalk.cyan('Installing dependencies...')).start();

const installProcess = spawn(
  pm.installCmd,
  pm.installArgs,
  { cwd: projectDir, stdio: 'pipe', shell: true }
);

installProcess.on('error', () => {
  installSpinner.fail(chalk.red(`Failed to run ${pm.installCmd}. Is it installed?`));
  process.exit(1);
});

installProcess.stdout.on('data', (data) => {
  process.stdout.write(data);
});

installProcess.stderr.on('data', (data) => {
  process.stderr.write(data);
});

installProcess.on('close', (code) => {
  if (code === 0) {
    installSpinner.succeed(chalk.green('✓ Dependencies installed'));
    console.log();
    console.log(chalk.bgGreen.white(' DONE '));
    console.log();
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.gray('─'.repeat(35)));
    console.log(chalk.cyan('  cd ') + chalk.white(projectName));
    console.log(chalk.cyan(`  ${pm.devCmd}`));
    console.log(chalk.gray('─'.repeat(35)));
  } else {
    installSpinner.fail(chalk.red('Failed to install dependencies'));
    process.exit(1);
  }
});