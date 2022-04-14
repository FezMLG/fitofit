const testEnv = {
  NODE_ENV: 'test',
  PORT: 3000,
  API_PREFIX: 'api',
};

process.env = Object.assign(process.env, testEnv);
