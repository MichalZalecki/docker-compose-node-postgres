import Ingredient from '../../services/Ingredient'
import Recipe from '../../services/Recipe'
import Technique from '../../services/Technique'
import { ingredientFindParams } from '../../services/Ingredient'
import { recipeFindParams } from '../../services/Recipe'
import { techniqueFindParams } from '../../services/Ingredient'

type Context = {
  service: {
    Ingredient: Ingredient
    Recipe: Recipe
    Technique: Technique
  }
}

type Args = ingredientFindParams | recipeFindParams | techniqueFindParams
