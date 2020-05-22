import * as Sequelize from 'sequelize'
import { IngredientAttributes, IngredientInstance } from '../models/Ingredient'
import { RecipeAttributes, RecipeInstance } from '../models/Recipe'
import { TechniqueAttributes, TechniqueInstance } from '../models/Technique'

export interface DbInterface {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  Ingredient: Sequelize.Model<IngredientInstance, IngredientAttributes>
}
