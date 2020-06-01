import Ingredient from '../../services/Ingredient'
import Recipe from '../../services/Recipe'
import Technique, { techniqueFindParams } from '../../services/Technique'
import { ingredientFindParams } from '../../services/Ingredient'
import { recipeFindParams, RecipeMappedToApi } from '../../services/Recipe'
import { TechniqueAttributes } from '../../models/Technique'
import { IngredientAttributes } from '../../models/Ingredient'

type Context = {
  service: {
    ingredient: Ingredient
    recipe: Recipe
    technique: Technique
  }
}

type Args = {
  query: ingredientFindParams | recipeFindParams | techniqueFindParams
  recipePayload: RecipeMappedToApi
  techniquesPayload: TechniqueAttributes[]
  ingredientsPayload: IngredientAttributes[]
}
