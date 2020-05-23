import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export interface RecipeAttributes {
  id?: string
  name: string
  title: string
  author: string
  description: string
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
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(700),
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }

  return sequelize.define<RecipeInstance, RecipeAttributes>('Recipe', attributes, {
    tableName: 'Recipe',
  })
}
