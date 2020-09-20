const recipeTypeDef = `
type Technique {
  id: ID!
  user: User
  recipes: [Recipe]
  title: String
  key: String
  description: String
  duration: Float
  standardTemperature: Float
  videoLink: String
  createdAt: String
  updatedAt: String
}

input TechniquePayloadInput{
  userId: String!
  title: String!
  key: String!
  description: String!
  duration: Float!
  videoLink: String
  standardTemperature: Float
} 

input TechniqueFindInput {
  id: ID
  key: String
  title: String
  description: String
  userId: String
  page: Int = 0
  limit: Int = 15
}

input RecipeTechniqueInput {
  id: ID!
  duration: Float!
  idealTemperature: Float
}

type TechniqueInRecipe {
  id: ID!
  duration: Float!
  idealTemperature: Float
}

`;
export { recipeTypeDef as default };
