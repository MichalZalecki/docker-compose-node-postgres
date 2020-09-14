const queryTypeDef = `
type Query {
  recipes(query: RecipeFindInput): [Recipe]
  ingredients: [Ingredient]
  techniques: [Technique]
  user(query: UserFindInput): User
}
`;
export { queryTypeDef as default };
