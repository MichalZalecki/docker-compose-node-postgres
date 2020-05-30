import { Context, Args } from './typings'

export default {
  ingredients(parent: any, args: Args, { service }: Context) {
    return service.ingredient.find({})
  },
  recipes(parent: any, args: Args, { service }: Context) {
    return service.recipe.find({})
  },
  techniques(parent: any, args: Args, { service }: Context) {
    return service.technique.find({})
  },
}
