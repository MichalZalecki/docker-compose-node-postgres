'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Technique',
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
        duration: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(700),
          allowNull: false,
        },
        standardTemperature: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        videoLink: {
          type: Sequelize.STRING,
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
      { tableName: 'Technique' }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Technique')
  },
}
