import { Context } from './typings'
import { ingredientFindParams } from '../../services/Ingredient'

export default {
  ingredient(parent: any, { query: ingredientFindParams }, { service }: Context) {
    return service.Ingredient.find
  },
  recipe(parent, params, { service }: Context) {
    return service.Technique
  },
  technique(parent, params, { service }: Context) {},
}
