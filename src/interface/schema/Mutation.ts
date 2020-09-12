const mutation = `type Mutation {
  createRecipe(recipePayload: RecipePayloadInput): RecipeSaved!
  createIngredients(ingredientsPayload: [IngredientPayloadInput]): [Ingredient]!
  createTechniques(techniquesPayload: [TechniquePayloadInput]): [Technique]!
}
`;
export { mutation as default };
