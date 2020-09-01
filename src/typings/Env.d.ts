export interface Config {
  username: string
  password: string
  database: string
  host: string
  port: string
  dialect: string
  operatorsAliases: boolean
  logging: boolean
  dialectOptions?:{
    ssl:{
      rejectUnauthorized: boolean
    }
  }
}

export interface Env {
  development: Config
  test: Config
  production: Config
}

export type EnvValue = keyof Env
