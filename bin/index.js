#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { detectPackageManager } = require('./lib/detect-pm');
const { scaffold } = require('./lib/scaffold');
const ui = require('./lib/ui');

function main() {
  const pm = detectPackageManager();
  const projectName = process.argv[2];

  if (!projectName) {
    ui.showUsage(pm);
    process.exit(1);
  }

  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    ui.showExistsError(projectName);
    process.exit(1);
  }

  const templateDir = path.resolve(__dirname, '..', 'template');

  ui.showCreating(projectName);
  scaffold(projectName, projectDir, templateDir, pm);
  ui.showCopySuccess();
  ui.showDone(projectName, pm);
}

main();
