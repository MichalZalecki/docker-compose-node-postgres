import { EnvValue } from '../typings/Env';

const getEnv = (): EnvValue => {
  if (!process.env.NODE_ENV) {
    return 'development';
  }
  return process.env.NODE_ENV as EnvValue;
};

export default getEnv;
