import { IngredientInstance } from '../../models/Ingredient'
import { RecipeInstance } from '../../models/Recipe'
import { TechniqueInstance } from '../../models/Technique'

type Context = {
  service: {
    Ingredient: IngredientInstance
    Recipe: RecipeInstance
    Technique: TechniqueInstance
  }
}
