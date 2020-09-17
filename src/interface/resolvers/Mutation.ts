import { Context, Args } from './typings'

export default {
  createIngredients(parent: any, args: Args, { service }: Context) {
    return service.ingredient.create(args.ingredientsPayload)
  },
  createRecipe(parent: any, args: Args, { service }: Context) {
    return service.recipe.create(args.recipePayload)
  },
  createTechniques(parent: any, args: Args, { service }: Context) {
    return service.technique.create(args.techniquesPayload)
  },
  registerOrLoginUser(parent: any, args: Args, { service }: Context) {
    return service.user.createIfNotExists(args.userPayload)
  },
}
