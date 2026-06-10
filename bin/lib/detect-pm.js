const PM_CONFIG = {
  npm: {
    name: 'npm',
    createCmd: 'npm create express-mongodb-ts-starter my-app',
    createCmdAlt: 'npx create-express-mongodb-ts-starter my-app',
    installCmd: 'npm install',
    devCmd: 'npm run dev',
  },
  yarn: {
    name: 'yarn',
    createCmd: 'yarn create express-mongodb-ts-starter my-app',
    installCmd: 'yarn install',
    devCmd: 'yarn dev',
  },
  pnpm: {
    name: 'pnpm',
    createCmd: 'pnpm create express-mongodb-ts-starter my-app',
    installCmd: 'pnpm install',
    devCmd: 'pnpm dev',
  },
  bun: {
    name: 'bun',
    createCmd: 'bun create express-mongodb-ts-starter my-app',
    installCmd: 'bun install',
    devCmd: 'bun dev',
  },
};

function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || '';
  let pmName = ua.split(' ')[0].split('/')[0];

  if (!pmName || pmName === 'npm') {
    const execPath = process.env.npm_execpath || '';
    if (execPath.includes('pnpm')) pmName = 'pnpm';
    else if (execPath.includes('yarn')) pmName = 'yarn';
    else if (execPath.includes('bun')) pmName = 'bun';
  }

  return PM_CONFIG[pmName] || PM_CONFIG.npm;
}

module.exports = { detectPackageManager };
