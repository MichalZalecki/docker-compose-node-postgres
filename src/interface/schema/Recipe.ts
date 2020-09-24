const recipeTypeDef = `
type RecipesData{
  data: [Recipe]
  count: Int
}

type Recipe {
  id: ID!
  userId: String
  key: String
  title: String!
  techniques: [Technique]!
  ingredients: [Ingredient]!
  user: User
  description: String!
  createdAt: String
  updatedAt: String
}

input RecipeFindInput {
  id: ID
  key: String
  title: String
  description: String
  userId: String
  page: Int = 0
  limit: Int = 15
}

input RecipePayloadInput {
  title: String!
  key: String!
  techniques: [RecipeTechniqueInput]!
  ingredients: [RecipeIngredientInput]!
  description: String!
  userId: String!
}

type RecipeSaved {
  id: ID
  key: String
  title: String
  description: String
  userId: String
}
`;
export { recipeTypeDef as default };
