import { UserFindParams } from '../../services/User'
import { Context, Args } from './typings'

export default {
  async recipes(parent: any, args: Args, { service }: Context) {
    const recipeIds = parent.recipes.map((recipe: any)=> {
      return recipe.RecipeTechnique.recipeId
    })

    const recipes = await service.recipe.find({id: recipeIds})  
    return recipes.data
  },
  user(parent: any, args: Args, { service }: Context) {
    return service.user.find({id: parent.userId} as UserFindParams)
  },
}
