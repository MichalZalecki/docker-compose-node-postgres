import Sequelize from 'sequelize';
import { DBInterface } from '../typings/DbInterface';
import { IngredientFactory } from './Ingredient';
import { RecipeFactory } from './Recipe';
import { RecipeIngredientFactory } from './RecipeIngredient';
import { RecipeTechniqueFactory } from './RecipeTechnique';
import { TechniqueFactory } from './Technique';
import { UserFactory } from './User';
import getEnv from '../helpers/getEnv';
import { Config, Env } from '../typings/Env';

const createModels = (sequelizeConfig: Env): DBInterface => {
  const {
    database, username, password, dialect, host, logging
  } = sequelizeConfig[getEnv()] as Config;
  function getSequelizeParams() {
    if (process.env.NODE_ENV === 'production') {
      return new Sequelize(process.env.DATABASE_URL as string, { dialectOptions: 'postgres', logging: false });
    }
    return new Sequelize(database, username, password, { dialect, host, logging });
  }

  const sequelize = getSequelizeParams();

  const db: DBInterface = {
    sequelize,
    Sequelize,
    Ingredient: IngredientFactory(sequelize, Sequelize),
    Recipe: RecipeFactory(sequelize, Sequelize),
    Technique: TechniqueFactory(sequelize, Sequelize),
    RecipeIngredient: RecipeIngredientFactory(sequelize, Sequelize),
    RecipeTechnique: RecipeTechniqueFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach((modelName) => {
    // @ts-ignore
    if (db[modelName].associate) {
      // @ts-ignore
      db[modelName].associate(db);
    }
  });

  return db;
};

export default createModels;
