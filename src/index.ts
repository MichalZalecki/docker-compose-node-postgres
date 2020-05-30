import path from 'path'
import { createModels } from './models'
import config from '../config/config.json'
import { GraphQLServer } from 'graphql-yoga'
import Recipe from './services/Recipe'
import resolvers from './interface/resolvers'
import Ingredient from './services/Ingredient'
import Technique from './services/Technique'
import typeDefs from './interface/schema'
import { Args, Context } from './interface/resolvers/typings'

const db = createModels(config)
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    service: {
      recipe: new Recipe(db),
      ingredient: new Ingredient(db),
      technique: new Technique(db),
    },
  },
})

server.start((info) => {
  console.log('Server started', info.port)
})
