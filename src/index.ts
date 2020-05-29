import path from 'path'
import { createModels } from './models'
import config from '../config/config.json'
import { GraphQLServer } from 'graphql-yoga'
import Recipe from './services/Recipe'
import resolvers from './interface/resolvers'
import Ingredient from './services/Ingredient'
import { createIndexSchema } from './helpers/schemaGenerator'
import Technique from './services/Technique'

createIndexSchema(path.join(__dirname, './interface/schemas/'))
const db = createModels(config)

const server = new GraphQLServer({
  typeDefs: './src/interface/schema/index.graphql',
  resolvers,
  context: {
    service: {
      recipe: new Recipe(db),
      ingredient: new Ingredient(db),
      technique: new Technique(db),
    },
  },
})

server.start(() => {
  console.log('Server started')
})
