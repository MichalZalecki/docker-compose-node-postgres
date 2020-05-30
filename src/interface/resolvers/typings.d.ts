import Ingredient from '../../services/Ingredient'
import Recipe from '../../services/Recipe'
import Technique, { techniqueFindParams } from '../../services/Technique'
import { ingredientFindParams } from '../../services/Ingredient'
import { recipeFindParams } from '../../services/Recipe'

type Context = {
  service: {
    ingredient: Ingredient
    recipe: Recipe
    technique: Technique
  }
}

type Args = {
  query: ingredientFindParams | recipeFindParams | techniqueFindParams
}
