import { RecipeMappedToApi, RecipeFromDB, ingredientFromDB, techniqueFromDB } from '../Recipe'

export function mapRecipe(recipe: RecipeFromDB | any): RecipeMappedToApi | null {
  if (!recipe) return null
  return { ...recipe, ingredients: mapIngredient(recipe.ingredients), techniques: mapTechnique(recipe.techniques) }
}

function mapIngredient(ingredients: ingredientFromDB[]) {
  if (!ingredients || !ingredients.length) return ingredients

  return ingredients.map((ingredient) => ({
    ...ingredient,
    id: ingredient.RecipeIngredient.ingredientId!,
    amount: ingredient.RecipeIngredient.amount!,
  }))
}

function mapTechnique(technique: techniqueFromDB[]) {
  if (!technique || !technique.length) return technique
  return technique.map((ingredient) => ({
    ...ingredient,
    id: ingredient.RecipeTechnique.techniqueId!,
    idealTemperature: ingredient.RecipeTechnique.idealTemperature!,
  }))
}
