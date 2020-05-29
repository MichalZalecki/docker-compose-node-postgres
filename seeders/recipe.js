// const faker = require('faker')

// const getRandomRecipe = () => {
//   return {
//     id: faker.random.uuid(),
//     key: faker.company.catchPhraseAdjective(),
//     title: faker.company.catchPhraseAdjective(),
//     author: faker.company.catchPhraseAdjective(),
//     description: faker.company.catchPhraseAdjective(),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }
// }

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert(
//       'Recipe',
//       Array(100).map((i) => getRandomRecipe())
//     )
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Users', null, {})
//   },
// }
