import 'cross-fetch/polyfill'
import ApolloBost, {gql} from 'apollo-boost'
import createModels from  '../models/index'
import config from '../../config/config.json'

const db = createModels(config)

const GET_INGREDIENT_LIMIT_2 = gql`
query {
  ingredients(query:{page: 0, limit: 2}) {
    data{
      id
      title
      description
    }
    count
  }
}
`

const GET_INGREDIENT_LIMIT_1 = gql`
query {
  ingredients(query:{page: 0, limit: 1}) {
    data{
      id
      title
      description
      recipes{
        id
      }
    }
    count
  }
}
`

const CREATE_INGREDIENT = gql`
  mutation {
    createIngredients(
      ingredientsPayload: {
        title: "Test"
        key: "test"
        description: "Test description"
        userId: "123456789"
        imageSrc: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sourdough-bread-vertical-512-1548048987.jpg?crop=1.00xw:0.669xh;0,0.162xh&resize=768:*"
      }
    ) {
      id
      title
      description
    }
  }
`

const client = new ApolloBost({
  uri: 'http://localhost:4000'
})

afterEach(async () => {
  await db.Ingredient.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})

export const createIngredient = async ()=>{
  const response = await client.mutate({mutation: CREATE_INGREDIENT})
  return response.data.createIngredients[0]
}

describe('=== INGREDIENTS CREATE MUTATION', () => {
  test('should create 1 ingredient', async ()=> {
    const ingredient = await createIngredient()
    expect(ingredient).toHaveProperty('id')
  })
});

describe('=== INGREDIENTS QUERY ===', ()=>{
  test('ingredients should be have a working pagination and counter', async ()=> {
    await createIngredient()
    await createIngredient()
    await createIngredient()

    const response = await client.query({query: GET_INGREDIENT_LIMIT_2})
    expect(response.data.ingredients.count).toBe(3)
    expect(response.data.ingredients.data).toHaveLength(2)

    const responseWithLimit1 = await client.query({query: GET_INGREDIENT_LIMIT_1})
    expect(responseWithLimit1.data.ingredients.count).toBe(3)
    expect(responseWithLimit1.data.ingredients.data).toHaveLength(1)
  })

  test('ingredients should query recipes to which they belong', async ()=> {
    await client.mutate({mutation: CREATE_INGREDIENT})

    const response = await client.query({query: GET_INGREDIENT_LIMIT_1})
    expect(response.data.ingredients.data[0]).toHaveProperty('recipes')
  })
})
