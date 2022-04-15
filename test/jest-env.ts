const testEnv = {
  NODE_ENV: 'test',
  PORT: 3000,
  API_PREFIX: 'api',
  DATABASE_URL: 'postgres://admin:admin@localhost:54321/fitofit_test',
  DATABASE_LOGGING: false,
};

process.env = Object.assign(process.env, testEnv);
