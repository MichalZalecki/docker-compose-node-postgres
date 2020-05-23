import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export interface TechniqueAttributes {
  id?: string
  name: string
  title: string
  description: string
  duration: number
  temperature?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TechniqueInstance extends Sequelize.Instance<TechniqueAttributes>, TechniqueAttributes {}

export const TechniqueFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TechniqueInstance, TechniqueAttributes> => {
  const attributes: SequelizeAttributes<TechniqueAttributes> = {
    name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(700),
    },
    temperature: {
      type: DataTypes.FLOAT,
    },
    duration: {
      type: DataTypes.STRING,
    },
  }

  const Technique = sequelize.define<TechniqueInstance, TechniqueAttributes>('Technique', attributes, {
    tableName: 'Technique',
  })

  Technique.associate = (models): void => {
    Technique.belongsToMany(models.Recipe, {
      through: 'TechniqueIngredients',
      as: 'techniques',
      foreignKey: 'ingredientId',
      otherKey: 'recipeId',
    })
  }

  return Technique
}
