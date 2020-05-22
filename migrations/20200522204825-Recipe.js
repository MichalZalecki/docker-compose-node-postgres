'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe', {
      id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: Sequelize.STRING,
      title: Sequelize.STRING,
      author: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recipe')
  },
}
