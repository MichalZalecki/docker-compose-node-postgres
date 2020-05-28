import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export interface TechniqueAttributes {
  id?: string
  name: string
  title: string
  description: string
  duration: number
  standardTemperature?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TechniqueInstance extends Sequelize.Instance<TechniqueAttributes>, TechniqueAttributes {}

export const TechniqueFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TechniqueInstance, TechniqueAttributes> => {
  const attributes: SequelizeAttributes<TechniqueAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(700),
    },
    standardTemperature: {
      type: DataTypes.FLOAT,
    },
    duration: {
      type: DataTypes.STRING,
    },
  }

  const Technique = sequelize.define<TechniqueInstance, TechniqueAttributes>('Technique', attributes, {
    tableName: 'Technique',
    freezeTableName: true,
  })

  Technique.associate = (models): void => {
    Technique.belongsToMany(models.Recipe, {
      through: models.RecipeTechnique,
      foreignKey: 'techniqueId',
      as: 'techniques',
      otherKey: 'recipeId',
    })
  }

  return Technique
}
