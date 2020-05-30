import path from 'path'
import { createModels } from './models'
import config from '../config/config.json'
import { GraphQLServer } from 'graphql-yoga'
import Recipe from './services/Recipe'
import resolvers from './interface/resolvers'
import Ingredient from './services/Ingredient'
import Technique from './services/Technique'
// import typeDefs from './interface/schema'
import { Args, Context } from './interface/resolvers/typings'

const db = createModels(config)
const server = new GraphQLServer({
  typeDefs: `
  type Query {
  recipes(query: String): [Recipe]
  ingredients(query: String): [Ingredient]
  techniques(query: String): [Technique]
}

type Recipe {
  id: ID
  key: String
  title: String
  techniques: [Technique]
  ingredients: [Ingredient]
  description: String
  author: String
  createdAt: String
  updatedAt: String
}

type Ingredient {
  title: String
  key: String
  description: String
  createdAt: String
  updatedAt: String
}

type Technique {
  id: ID
  title: String
  key: String
  description: String
  standardTemperature: Float
  videoLink: String
  createdAt: String
  updatedAt: String
}`,
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
