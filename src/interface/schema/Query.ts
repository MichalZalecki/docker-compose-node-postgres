const queryTypeDef = `
type Query {
  recipes(query: RecipeInput): [Recipe]
  ingredients: [Ingredient]
  techniques: [Technique]
}
`
export { queryTypeDef as default }
