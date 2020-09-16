import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
import { RecipeAttributes, RecipeInstance } from './Recipe';

interface RecipeIngredientAttributes {
  recipeId: string
  ingredientId: string
  amount: number
  updatedAt?: Date
}
export interface IngredientAttributes {
  id?: string
  key: string
  title: string
  description: string
  category?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IngredientInstance
  extends Sequelize.Instance<IngredientAttributes>, IngredientAttributes {
  getRecipes: Sequelize.BelongsToManyGetAssociationsMixin<RecipeInstance>
  setRecipes: Sequelize.BelongsToManySetAssociationsMixin<
    RecipeInstance,
    RecipeInstance['id'],
    RecipeIngredientAttributes
  >
  addRecipes: Sequelize.BelongsToManyAddAssociationsMixin<
    RecipeInstance,
    RecipeInstance['id'],
    RecipeIngredientAttributes
  >
  addRecipe: Sequelize.BelongsToManyAddAssociationMixin<
    RecipeInstance,
    RecipeInstance['id'],
    RecipeIngredientAttributes
  >
  createRecipe: Sequelize.BelongsToManyCreateAssociationMixin<
    RecipeAttributes,
    RecipeInstance,
    RecipeIngredientAttributes
  >
  removeRecipe: Sequelize.BelongsToManyRemoveAssociationMixin<RecipeInstance, RecipeInstance['id']>
  removeRecipes: Sequelize.BelongsToManyRemoveAssociationsMixin<RecipeInstance, RecipeInstance['id']>
  hasRecipe: Sequelize.BelongsToManyHasAssociationMixin<RecipeInstance, RecipeInstance['id']>
  hasRecipes: Sequelize.BelongsToManyHasAssociationsMixin<RecipeInstance, RecipeInstance['id']>
  countRecipes: Sequelize.BelongsToManyCountAssociationsMixin
}

export const IngredientFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<IngredientInstance, IngredientAttributes> => {
  const attributes: SequelizeAttributes<IngredientAttributes> = {
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
    updatedAt: {
      type: DataTypes.DATE,
    },
  };

  const Ingredient = sequelize.define<IngredientInstance, IngredientAttributes>('Ingredient', attributes, {
    tableName: 'Ingredient',
    freezeTableName: true,
  });

  Ingredient.associate = (models): void => {
    Ingredient.belongsToMany(models.Recipe, {
      through: models.RecipeIngredient,
      foreignKey: 'ingredientId',
      as: 'recipes',
      otherKey: 'recipeId',
    });
  };

  return Ingredient;
};
