const chalk = require('chalk');
const ora = require('ora');

function showUsage(pm) {
  console.log(chalk.bgRed.bold(' Error '));
  console.error(chalk.red('Please specify the project name:'));

  if (pm.name === 'npm') {
    console.log(chalk.cyan('  npx create-express-mongodb-ts-starter my-app'));
    console.log(chalk.cyan('  npm create express-mongodb-ts-starter my-app'));
  } else {
    console.log(chalk.cyan(`  ${pm.createCmd}`));
  }
}

function showExistsError(projectName) {
  console.log(chalk.bgRed.bold(' Error '));
  console.error(chalk.red(`Directory "${projectName}" already exists.`));
}

function showCreating(projectName) {
  console.log(chalk.bgCyan.bold(' Creating ') + chalk.white(` ${projectName} `));
  console.log();
}

function showCopySuccess() {
  const spinner = ora(chalk.cyan('Copying template files...')).start();
  spinner.succeed(chalk.green('✓ Files created successfully!'));
}

function showDone(projectName, pm) {
  console.log();
  console.log(chalk.bgGreen.white(' DONE '));
  console.log();
  console.log(chalk.bold('Next steps:'));
  console.log(chalk.gray('─'.repeat(35)));
  console.log(chalk.cyan('  cd ') + chalk.white(projectName));
  console.log(chalk.cyan(`  ${pm.installCmd}`));
  console.log(chalk.cyan(`  ${pm.devCmd}`));
  console.log(chalk.gray('─'.repeat(35)));
}

module.exports = {
  showUsage,
  showExistsError,
  showCreating,
  showCopySuccess,
  showDone,
};
