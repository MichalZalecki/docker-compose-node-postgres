export interface Config {
  username: string
  password: string
  database: string
  host: string
  dialect: string
  operatorsAliases: boolean
  logging: boolean
}

interface ProdEnv {
  use_env_variable: string
}

export interface Env {
  development: Config
  test: Config
  production: ProdEnv
}

export type EnvValue = keyof Env
