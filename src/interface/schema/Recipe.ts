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

`
export { recipeTypeDef as default }
