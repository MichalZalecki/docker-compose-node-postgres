'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'RecipeTechnique',
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
        techniqueId: {
          type: Sequelize.UUID,
          references: {
            model: 'Technique',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          unique: true,
          allowNull: false,
        },
        amount: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        temperature: {
          type: Sequelize.STRING,
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
      { freezeTableName: true, tableName: 'RecipeTechnique' }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecipeTechnique')
  },
}
