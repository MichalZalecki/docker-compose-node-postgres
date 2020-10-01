const queryTypeDef = `
type Query {
  recipes(query: RecipeFindInput): RecipesData
  ingredients(query: IngredientFindInput): IngredientsData
  techniques(query: TechniqueFindInput): TechniquesData
  user(query: UserFindInput): User
}
`;
export { queryTypeDef as default };
