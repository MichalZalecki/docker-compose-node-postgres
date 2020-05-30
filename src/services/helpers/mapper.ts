import { RecipeApiInterface } from '../Recipe'
import { RecipeIngredientAttributes } from '../../models/RecipeIngredient'
import { IngredientAttributes } from '../../models/Ingredient'
import { RecipeAttributes } from '../../models/Recipe'
import { TechniqueAttributes } from '../../models/Technique'
import { RecipeTechniqueAttributes } from '../../models/RecipeTechnique'

interface RecipeFromDB extends RecipeAttributes {
  ingredients: ingredientFromDB[]
  techniques: techniqueFromDB[]
}

interface ingredientFromDB extends IngredientAttributes {
  RecipeIngredient: RecipeIngredientAttributes
}

interface techniqueFromDB extends TechniqueAttributes {
  RecipeTechnique: RecipeTechniqueAttributes
}

export function mapRecipe(recipe: RecipeFromDB): RecipeApiInterface {
  return { ...recipe, ingredients: mapIngredient(recipe.ingredients), techniques: mapTechnique(recipe.techniques) }
}

function mapIngredient(ingredients: ingredientFromDB[]) {
  if (!ingredients.length) return []
  return ingredients.map((ingredient) => ({
    ...ingredient,
    id: ingredient.RecipeIngredient.ingredientId!,
    amount: ingredient.RecipeIngredient.amount,
  }))
}

function mapTechnique(technique: techniqueFromDB[]) {
  if (!technique.length) return []
  return technique.map((ingredient) => ({
    ...ingredient,
    id: ingredient.RecipeTechnique.techniqueId!,
    idealTemperature: ingredient.RecipeTechnique.idealTemperature,
  }))
}
