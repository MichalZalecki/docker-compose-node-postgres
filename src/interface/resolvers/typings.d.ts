import Ingredient from '../../services/Ingredient'
import Recipe, { RecipeMappedToApi } from '../../services/Recipe'
import Technique, { TechniqueFindParams } from '../../services/Technique'
import { IngredientFindParams } from '../../services/Ingredient'
import { RecipeFindParams } from '../../services/Recipe'
import User, { UserFindParams } from '../../services/User'
import { TechniqueAttributes } from '../../models/Technique'
import { IngredientAttributes } from '../../models/Ingredient'
import { UserAttributes } from '../../models/User'

type Context = {
  service: {
    ingredient: Ingredient
    recipe: Recipe
    technique: Technique
    user: User
  }
}

type Args = {
  query: IngredientFindParams | RecipeFindParams | TechniqueFindParams | UserFindParams
  recipePayload: RecipeMappedToApi
  techniquesPayload: TechniqueAttributes[]
  ingredientsPayload: IngredientAttributes[]
  userPayload: UserAttributes
}
