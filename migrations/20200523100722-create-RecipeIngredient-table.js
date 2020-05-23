'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'RecipeIngredient',
      {
        recipeId: {
          type: Sequelize.UUID,
          references: {
            model: 'Recipe',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          unique: true,
          allowNull: false,
        },
        ingredientId: {
          type: Sequelize.UUID,
          references: {
            model: 'Ingredient',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          unique: true,
          allowNull: false,
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        temperature: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
        tableName: 'RecipeIngredient',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecipeIngredient')
  },
}
