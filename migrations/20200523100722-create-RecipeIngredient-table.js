module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
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
        primaryKey: true,
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
        primaryKey: true,
        allowNull: false,
      },
      amount: {
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
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: 'RecipeIngredient',
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('RecipeIngredient'),
};
