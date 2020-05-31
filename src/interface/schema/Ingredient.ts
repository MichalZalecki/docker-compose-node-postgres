const ingredientTypeDef = `
type Ingredient {
  id: ID!
  title: String
  key: String
  amount: Float!
  description: String
  createdAt: String
  updatedAt: String
}

input IngredientPayloadInput{
  title: String
  key: String
  description: String
} 

input RecipeIngredientInput {
  id: ID!
  amount: Float!
}
`
export { ingredientTypeDef as default }
