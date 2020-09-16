const userTypeDef = `
type User {
  id: ID!
  name: String!
  email: String
  ingredients: [Ingredient]
  techniques: [Technique]
  recipes: [Recipe]
  createdAt: String
  updatedAt: String
}

input UserRegisterOrLoginInput{
  id: String!
  name: String!
  email: String
}

input UserFindInput{
  id: String!
}

`;
export { userTypeDef as default };
