module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ingredient','imageSrc', Sequelize.STRING)

  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Ingredient', 'imageSrc')
  },
};
