import { Context, Args } from './typings'

export default {
  ingredients(parent: any, args: Args, { service }: Context) {
    console.log('PARENT ingredients', parent)
    return service.ingredient.find({})
  },
  recipes(parent: any, args: Args, { service }: Context) {
    console.log('PARENT RECIPES', parent)
    return service.recipe.find({})
  },
  techniques(parent: any, args: Args, { service }: Context) {
    console.log('PARENT TECHNIQUES', parent)
    return service.technique.find({})
  },
}
