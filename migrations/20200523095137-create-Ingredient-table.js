module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Ingredient',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(700),
        allowNull: true,
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
    { freezeTableName: true, tableName: 'Ingredient' },
  ),

  down: (queryInterface) => queryInterface.dropTable('Ingredient'),
};
