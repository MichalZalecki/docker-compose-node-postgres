const mutation = `type Mutation {
  createRecipe(recipePayload: RecipePayloadInput): Recipe!
  createIngredients(ingredientsPayload: [IngredientPayloadInput]): [Ingredient]!
  createTechniques(techniquesPayload: [TechniquePayloadInput]): [Technique]!
}
`
export { mutation as default }
