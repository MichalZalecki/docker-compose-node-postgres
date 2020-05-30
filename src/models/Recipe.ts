import sequelize, * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'
import { IngredientInstance, IngredientAttributes } from './Ingredient'
import { TechniqueInstance, TechniqueAttributes } from './Technique'
import { RecipeTechniqueAttributes } from './RecipeTechnique'
import { RecipeIngredientAttributes } from './RecipeIngredient'
export interface RecipeAttributes {
  id?: string
  key: string
  title: string
  author: string
  description: string
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

  getTechniques: Sequelize.BelongsToManyGetAssociationsMixin<TechniqueInstance>
  setTechniques: Sequelize.BelongsToManySetAssociationsMixin<
    TechniqueInstance,
    TechniqueInstance['id'],
    RecipeTechniqueAttributes
  >
  addTechniques: Sequelize.BelongsToManyAddAssociationsMixin<
    TechniqueInstance,
    TechniqueInstance['id'],
    RecipeTechniqueAttributes
  >
  addTechnique: Sequelize.BelongsToManyAddAssociationMixin<
    TechniqueInstance,
    TechniqueInstance['id'],
    RecipeTechniqueAttributes
  >
  createTechnique: Sequelize.BelongsToManyCreateAssociationMixin<
    TechniqueAttributes,
    TechniqueInstance,
    RecipeTechniqueAttributes
  >
  removeTechnique: Sequelize.BelongsToManyRemoveAssociationMixin<TechniqueInstance, TechniqueInstance['id']>
  removeTechniques: Sequelize.BelongsToManyRemoveAssociationsMixin<TechniqueInstance, TechniqueInstance['id']>
  hasTechnique: Sequelize.BelongsToManyHasAssociationMixin<TechniqueInstance, TechniqueInstance['id']>
  hasTechniques: Sequelize.BelongsToManyHasAssociationsMixin<TechniqueInstance, TechniqueInstance['id']>
  countTechniques: Sequelize.BelongsToManyCountAssociationsMixin
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
    key: {
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
    freezeTableName: true,
  })

  Recipe.associate = (models): void => {
    Recipe.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredient,
      foreignKey: 'recipeId',
      as: 'ingredients',
      otherKey: 'ingredientId',
    })

    Recipe.belongsToMany(models.Technique, {
      through: models.RecipeTechnique,
      foreignKey: 'recipeId',
      as: 'techniques',
      otherKey: 'techniqueId',
    })
  }
  return Recipe
}
