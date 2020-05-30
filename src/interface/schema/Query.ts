const queryTypeDef = `
type Query {
  recipes(query: String): [Recipe]
  ingredients(query: String): [Ingredient]
  techniques(query: String): [Technique]
}
`
export { queryTypeDef as default }
