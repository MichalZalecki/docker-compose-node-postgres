module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ingredient','userId', Sequelize.STRING)
    await queryInterface.addColumn('Technique','userId', Sequelize.STRING)
    await queryInterface.addColumn('Recipe','userId', Sequelize.STRING)

  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Ingredient', 'userId')
    await queryInterface.removeColumn('Technique','userId')
    await queryInterface.removeColumn('Recipe','userId')
  },
};
