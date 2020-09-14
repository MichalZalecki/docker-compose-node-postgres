import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface UserAttributes {
  id: string
  name: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInstance
  extends Sequelize.Instance<UserAttributes>, UserAttributes {}

export const UserFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(700),
      allowNull: true,
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes, {
    tableName: 'User',
    freezeTableName: true,
  });

  User.associate = (models): void => {
    User.hasMany(models.Recipe, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'Recipies',
    });

    User.hasMany(models.Ingredient, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'Ingredients',
    });

    User.hasMany(models.Technique, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'Techniques',
    });
  };

  return User;
};
