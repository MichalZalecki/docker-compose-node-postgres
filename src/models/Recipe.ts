import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export interface RecipeAttributes {
  id?: string
  name: string
  title: string
  ingredients: string
  author?: string
  category?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RecipeInstance extends Sequelize.Instance<RecipeAttributes>, RecipeAttributes {}

export const RecipeFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<RecipeInstance, RecipeAttributes> => {
  const attributes: SequelizeAttributes<RecipeAttributes> = {
    name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.ARRAY,
    },
  }

  return sequelize.define<RecipeInstance, RecipeAttributes>('Recipe', attributes)
}
