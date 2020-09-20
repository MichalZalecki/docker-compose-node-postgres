const queryTypeDef = `
type Query {
  recipes(query: RecipeFindInput): [Recipe]
  ingredients(query: IngredientFindInput): [Ingredient]
  techniques(query: TechniqueFindInput): [Technique]
  user(query: UserFindInput): User
}
`;
export { queryTypeDef as default };
