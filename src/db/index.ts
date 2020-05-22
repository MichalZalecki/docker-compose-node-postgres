import Sequelize from 'sequelize'
const config = require('../../db-config.json')

export default () => {
  return new Sequelize(config.database, config.username, config.password, {
    host: config.params.host,
    dialect: config.params.dialect,
  })
}
