import Sequelize from 'sequelize'
import { DBInterface } from '../typings/DbInterface'
import { IngredientFactory } from './Ingredient'
import { RecipeFactory } from './Recipe'
import { RecipeIngredientFactory } from './RecipeIngredient'
import { RecipeTechniqueFactory } from './RecipeTechnique'
import { TechniqueFactory } from './Technique'
import { getEnv } from '../helpers/getEnv'
import { Env } from '../typings/Env'

export const createModels = (sequelizeConfig: Env): DBInterface => {
  const { database, username, password, dialect, host } = sequelizeConfig[getEnv()]
  function getSequelizeParams (){
    if(process.env.NODE_ENV === 'production'){
      return new Sequelize(process.env.DATABASE_URL as string, { dialectOptions: 'postgres', logging: true })
    } else {
      return new Sequelize(database, username, password, { dialect, host })
    }
  }

  const sequelize = getSequelizeParams()

  const db: DBInterface = {
    sequelize,
    Sequelize,
    Ingredient: IngredientFactory(sequelize, Sequelize),
    Recipe: RecipeFactory(sequelize, Sequelize),
    Technique: TechniqueFactory(sequelize, Sequelize),
    RecipeIngredient: RecipeIngredientFactory(sequelize, Sequelize),
    RecipeTechnique: RecipeTechniqueFactory(sequelize, Sequelize),
  }

  Object.keys(db).forEach((modelName) => {
    // @ts-ignore
    if (db[modelName].associate) {
      // @ts-ignore
      db[modelName].associate(db)
    }
  })

  return db
}
