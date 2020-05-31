const recipeTypeDef = `
type Recipe {
  id: ID
  key: String
  title: String
  techniques: [Technique]
  ingredients: [Ingredient]
  description: String
  author: String
  createdAt: String
  updatedAt: String
}

input RecipeInput{
  id: ID
  key: String
  title: String
  description: String
  author: String
  page: Int = 1
  limit: Int = 15
}
`
export { recipeTypeDef as default }
