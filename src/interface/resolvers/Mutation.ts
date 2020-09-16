import { Context, Args } from './typings'

export default {
  createIngredients(parent: any, args: Args, { service }: Context) {
    try {
      return service.ingredient.create(args.ingredientsPayload)
    } catch (e) {
      console.log(e)
    }
  },
  createRecipe(parent: any, args: Args, { service }: Context) {
    try {
      return service.recipe.create(args.recipePayload)
    } catch (e) {
      console.log(e)
    }
  },
  createTechniques(parent: any, args: Args, { service }: Context) {
    try {
      return service.technique.create(args.techniquesPayload)
    } catch (e) {
      console.log(e)
    }
  },
  registerOrLoginUser(parent: any, args: Args, { service }: Context) {
    try {
      return service.user.createIfNotExists(args.userPayload)
    } catch (e) {
      console.log(e)
    }
  },
}
