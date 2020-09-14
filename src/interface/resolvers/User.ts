import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    console.log(parent)
    return service.recipe.find({userId: parent.id})
  },
  techniques(parent: any, args: Args, { service }: Context) {
    console.log(parent)
    return service.technique.find({userId: parent.id})
  },
  ingredients(parent: any, args: Args, { service }: Context) {
    console.log(parent)
    return service.ingredient.find({userId: parent.id})
  },
}
