const fs = require('fs');
const path = require('path');

const DOT_FILES = ['gitignore', 'prettierrc'];

const PNPM_WORKSPACE = `allowBuilds:
  esbuild: true
  '@scarf/scarf': true
`;

function applyPmSpecificFiles(projectDir, pm) {
  if (pm.name === 'pnpm') {
    fs.writeFileSync(path.join(projectDir, 'pnpm-workspace.yaml'), PNPM_WORKSPACE);
  }
}

function scaffold(projectName, projectDir, templateDir, pm) {
  fs.mkdirSync(projectDir, { recursive: true });
  fs.cpSync(templateDir, projectDir, { recursive: true });

  for (const file of DOT_FILES) {
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
  applyPmSpecificFiles(projectDir, pm);
}

module.exports = { scaffold };
