import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export interface IngredientAttributes {
  id?: string
  name: string
  title: string
  description: string
  category?: string
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
    updatedAt: {
      type: DataTypes.DATE,
    },
  }

  return sequelize.define<IngredientInstance, IngredientAttributes>('Ingredient', attributes)
}
