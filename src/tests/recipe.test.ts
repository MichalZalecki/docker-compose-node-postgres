import 'cross-fetch/polyfill'
import ApolloBost, {gql} from 'apollo-boost'
import createModels from  '../models/index'
import config from '../../config/config.json'
import { createIngredient } from './ingredient.test'
import { createTechnique } from './technique.test'
import { RecipeAttributes } from '../models/Recipe'

const client = new ApolloBost({
  uri: 'http://localhost:4000'
})

afterEach(async () => {
  await db.Ingredient.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  await db.Technique.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  await db.Recipe.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})
const db = createModels(config)

export const CREATE_RECIPE = gql`
  mutation createRecipe($techniqueId: ID!, $ingredientId: ID!) {
    createRecipe(
      recipePayload: {
        title: "bread"
        key: "bread"
        userId: "cirosid13213"
        description: "delicious stuff"
        techniques: [
          {
            id: $techniqueId
            duration: 35
            idealTemperature: 25
          }
        ]
        ingredients: [
          { id: $ingredientId,
            amount: 400 
            }
          ]
      }
    ) {
      title
      id
      key
      description
    }
  }
`

export const GET_RECIPES = gql`
query {
  recipes(query:{limit: 2, page:0}) {
    count
    data{
      title
      techniques {
        title
        duration
        recipes {
          id
        }
      }
      ingredients {
        title
        recipes {
          id
        }
      }
    }
  }
}
`

const createRecipe = async () => {
  const ingredient = await createIngredient()
  const technique = await createTechnique()
  const recipe = await client.mutate<{createRecipe: RecipeAttributes}, {ingredientId: string, techniqueId: string}>(
    {
    variables: {
      ingredientId: ingredient.id,
      techniqueId: technique.id
      },
      mutation: CREATE_RECIPE
    }
  )

  return recipe?.data?.createRecipe
}

describe('=== CREATE RECIPE MUTATION ===', () => {
  test('recipe should be created with success', async ()=> {
    const recipe = await createRecipe()
    expect(recipe).toHaveProperty('id')
    expect(recipe).toHaveProperty('title')
    expect(recipe).toHaveProperty('key')
    expect(recipe).toHaveProperty('description')
  })
});

describe('=== RECIPE QUERY ===', () => {
  test('recipe should be queried with success', async ()=> {
    await createRecipe()
    await createRecipe()
    await createRecipe()

    const recipe = await client.query({query: GET_RECIPES})
    expect(recipe.data.recipes.count).toBe(3)
    expect(recipe.data.recipes.data).toHaveLength(2)
    expect(recipe.data.recipes.data[0].ingredients).toHaveLength(1)
    expect(recipe.data.recipes.data[0].techniques[0].recipes[0]).toHaveProperty('id')
  })
});