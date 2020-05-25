import sequelize, * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'
import { IngredientInstance, IngredientAttributes } from './Ingredient'
export interface RecipeAttributes {
  id?: string
  name: string
  title: string
  author: string
  description: string
  updatedAt?: Date
}
interface RecipeIngredientAttributes {
  recipeId?: string
  ingredientId?: string
  amount: number
  updatedAt?: Date
}
export interface RecipeInstance extends Sequelize.Instance<RecipeAttributes>, RecipeAttributes {
  getIngredients: Sequelize.BelongsToManyGetAssociationsMixin<IngredientInstance>
  setIngredients: Sequelize.BelongsToManySetAssociationsMixin<
    IngredientInstance,
    IngredientInstance['id'],
    RecipeIngredientAttributes
  >
  addIngredients: Sequelize.BelongsToManyAddAssociationsMixin<
    IngredientInstance,
    IngredientInstance['id'],
    RecipeIngredientAttributes
  >
  addIngredient: Sequelize.BelongsToManyAddAssociationMixin<
    IngredientInstance,
    IngredientInstance['id'],
    RecipeIngredientAttributes
  >
  createIngredient: Sequelize.BelongsToManyCreateAssociationMixin<
    IngredientAttributes,
    IngredientInstance,
    RecipeIngredientAttributes
  >
  removeIngredient: Sequelize.BelongsToManyRemoveAssociationMixin<IngredientInstance, IngredientInstance['id']>
  removeIngredients: Sequelize.BelongsToManyRemoveAssociationsMixin<IngredientInstance, IngredientInstance['id']>
  hasIngredient: Sequelize.BelongsToManyHasAssociationMixin<IngredientInstance, IngredientInstance['id']>
  hasIngredients: Sequelize.BelongsToManyHasAssociationsMixin<IngredientInstance, IngredientInstance['id']>
  countIngredients: Sequelize.BelongsToManyCountAssociationsMixin
}

export const RecipeFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<RecipeInstance, RecipeAttributes> => {
  const attributes: SequelizeAttributes<RecipeAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
      defaultValue: DataTypes.NOW,
    },
  }
  const Recipe = sequelize.define<RecipeInstance, RecipeAttributes>('Recipe', attributes, {
    tableName: 'Recipe',
  })

  Recipe.associate = (models): void => {
    Recipe.belongsToMany(models.Ingredient, {
      through: 'RecipeIngredient',
      foreignKey: 'recipeId',
      otherKey: 'ingredientId',
    })
  }
  return Recipe
}
