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
