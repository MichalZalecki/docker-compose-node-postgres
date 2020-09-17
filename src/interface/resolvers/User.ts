import { IngredientFindParams } from '../../services/Ingredient'
import { RecipeFindParams } from '../../services/Recipe'
import { TechniqueFindParams } from '../../services/Technique'
import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    return service.recipe.find({userId: parent.id} as RecipeFindParams)
  },
  techniques(parent: any, args: Args, { service }: Context) {
    return service.technique.find({userId: parent.id} as TechniqueFindParams)
  },
  ingredients(parent: any, args: Args, { service }: Context) {
    return service.ingredient.find({userId: parent.id} as IngredientFindParams)
  },
}
