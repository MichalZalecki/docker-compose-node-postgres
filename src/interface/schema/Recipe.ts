const recipeTypeDef = `
type Recipe {
  id: ID!
  key: String
  title: String!
  techniques: [Technique]!
  ingredients: [Ingredient]!
  description: String!
  author: String!
  createdAt: String
  updatedAt: String
}

input RecipeFindInput {
  id: ID
  key: String
  title: String
  description: String
  author: String
  page: Int = 1
  limit: Int = 15
}

input RecipePayloadInput {
  key: String
  title: String!
  techniques: [RecipeTechniqueInput]!
  ingredients: [RecipeIngredientInput]!
  description: String
  author: String!
}

type RecipeSaved {
  id: ID
  key: String
  title: String
  description: String
  author: String
}
`;
export { recipeTypeDef as default };
