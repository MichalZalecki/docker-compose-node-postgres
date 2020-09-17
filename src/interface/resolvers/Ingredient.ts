import { UserFindParams } from '../../services/User'
import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    const recipeIds = parent.recipes.map((recipe: any)=> {
      return recipe.RecipeIngredient.recipeId
    })

    return service.recipe.find({id: recipeIds})  
  },
  user(parent: any, args: Args, { service }: Context) {
    return service.user.find({id: parent.userId} as UserFindParams)
  },
}
