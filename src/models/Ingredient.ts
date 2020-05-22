import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export interface IngredientAttributes {
  id?: string
  name: string
  title: string
  category: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IngredientInstance extends Sequelize.Instance<IngredientAttributes>, IngredientAttributes {}

export const IngredientFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<IngredientInstance, IngredientAttributes> => {
  const attributes: SequelizeAttributes<IngredientAttributes> = {
    name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  }

  return sequelize.define<IngredientInstance, IngredientAttributes>('Ingredient', attributes)
}
