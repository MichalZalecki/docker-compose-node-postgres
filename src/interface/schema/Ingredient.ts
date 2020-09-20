const ingredientTypeDef = `
type Ingredient {
  id: ID!
  user: User
  title: String
  imageSrc: String
  key: String
  description: String
  createdAt: String
  updatedAt: String
  recipes: [Recipe]
}

input IngredientPayloadInput{
  title: String!
  userId: String!
  key: String!
  description: String
  imageSrc: String
} 

input IngredientFindInput {
  id: ID
  key: String
  title: String
  description: String
  userId: String
  page: Int = 0
  limit: Int = 15
}

input RecipeIngredientInput {
  id: ID!
  amount: Float!
}

type IngredientInRecipe {
  id: ID!
  amount: Float!
}
`;
export { ingredientTypeDef as default };
