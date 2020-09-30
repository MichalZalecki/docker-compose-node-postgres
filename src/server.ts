import { GraphQLServer } from 'graphql-yoga';
import createModels from './models';
import config from '../config/config.json';
import Recipe from './services/Recipe';
import resolvers from './interface/resolvers';
import Ingredient from './services/Ingredient';
import Technique from './services/Technique';
import User from './services/User';
import typeDefs from './interface/schema';
import { Env } from './typings/Env';

const db = createModels(config as Env);

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    service: {
      recipe: new Recipe(db),
      ingredient: new Ingredient(db),
      technique: new Technique(db),
      user: new User(db)
    },
  },
});

export default server