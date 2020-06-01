const queryTypeDef = `
type Query {
  recipes(query: RecipeFindInput): [Recipe]
  ingredients: [Ingredient]
  techniques: [Technique]
}
`
export { queryTypeDef as default }
