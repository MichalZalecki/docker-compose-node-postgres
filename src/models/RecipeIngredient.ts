import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface RecipeIngredientAttributes {
  recipeId?: string
  ingredientId?: string
  amount?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface RecipeIngredientInstance
  extends Sequelize.Instance<RecipeIngredientAttributes>,
    RecipeIngredientAttributes {}

export const RecipeIngredientFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<RecipeIngredientInstance, RecipeIngredientAttributes> => {
  const attributes: SequelizeAttributes<RecipeIngredientAttributes> = {
    recipeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ingredientId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  };
  const RecipeIngredient = sequelize.define<RecipeIngredientInstance, RecipeIngredientAttributes>(
    'RecipeIngredient',
    attributes,
    {
      tableName: 'RecipeIngredient',
      freezeTableName: true,
    },
  );

  return RecipeIngredient;
};
