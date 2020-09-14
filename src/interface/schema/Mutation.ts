const mutation = `type Mutation {
  createRecipe(recipePayload: RecipePayloadInput): RecipeSaved!
  createIngredients(ingredientsPayload: [IngredientPayloadInput]): [Ingredient]!
  createTechniques(techniquesPayload: [TechniquePayloadInput]): [Technique]!
  registerOrLoginUser(userPayload: UserRegisterOrLoginInput): User
}
`;
export { mutation as default };
