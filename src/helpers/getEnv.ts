import { EnvValue } from '../typings/Env'

export const getEnv = (): EnvValue => {
  if (!process.env.NODE_ENV) {
    return 'development'
  } else {
    return process.env.NODE_ENV as EnvValue
  }
}
