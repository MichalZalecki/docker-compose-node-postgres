import { Context, Args } from './typings'

export default {
  createIngredients(parent: any, args: Args, { service }: Context) {
    try {
      return service.ingredient.create(args.ingredientsPayload)
    } catch (e) {
      e.logError()
    }
  },
  createRecipe(parent: any, args: Args, { service }: Context) {
    try {
      return service.recipe.create(args.recipePayload)
    } catch (e) {
      e.logError()
    }
  },
  createTechniques(parent: any, args: Args, { service }: Context) {
    try {
      return service.technique.create(args.techniquesPayload)
    } catch (e) {
      e.logError()
    }
  },
  registerOrLoginUser(parent: any, args: Args, { service }: Context) {
    try {
      return service.user.create(args.userPayload)
    } catch (e) {
      e.logError()
    }
  },
}
