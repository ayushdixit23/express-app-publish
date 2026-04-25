#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify the project name:');
  console.error('  npx create-express-mongodb-ts-starter my-app');
  console.error('  npm create express-mongodb-ts-starter my-app');
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

if (fs.existsSync(projectDir)) {
  console.error(`Directory "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`Creating project: ${projectName}...`);

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

console.log('Installing dependencies...');

const installProcess = spawn('npm', ['install', '--legacy-peer-deps'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true,
});

installProcess.on('close', (code) => {
  if (code === 0) {
    console.log('');
    console.log('Project created successfully!');
    console.log('');
    console.log('To get started:');
    console.log(`  cd ${projectName}`);
    console.log('  npm run dev');
  } else {
    console.error('Failed to install dependencies.');
    process.exit(1);
  }
});