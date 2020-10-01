import 'cross-fetch/polyfill'
import ApolloBost, {gql} from 'apollo-boost'
import createModels from  '../models/index'
import config from '../../config/config.json'

const db = createModels(config)

const GET_TECHNIQUE_LIMIT_2 = gql`
query {
  techniques(query:{page: 0, limit: 2}) {
    data{
      id
      title
      description
    }
    count
  }
}
`

const GET_TECHNIQUE_LIMIT_1 = gql`
query {
  techniques(query:{page: 0, limit: 1}) {
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

const CREATE_TECHNIQUE = gql`
  mutation {
    createTechniques(
      techniquesPayload: {
        title: "Test"
        key: "test"
        description: "Test description"
        userId: "123456789"
        videoLink: "www.youtube.com"
        duration: 23
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
  await db.Technique.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})

export const createTechnique = async ()=>{
  const response = await client.mutate({mutation: CREATE_TECHNIQUE})
  return response.data.createTechniques[0]
}

describe('=== TECHNIQUES CREATE MUTATION', () => {
  test('should create 1 technique', async ()=> {
    const technique = await createTechnique()
    expect(technique).toHaveProperty('id')
  })
});

describe('=== TECHNIQUES QUERY ===', ()=>{
  test('techniques should be have a working pagination and counter', async ()=> {
    await createTechnique()
    await createTechnique()
    await createTechnique()

    const response = await client.query({query: GET_TECHNIQUE_LIMIT_2})
    expect(response.data.techniques.count).toBe(3)
    expect(response.data.techniques.data).toHaveLength(2)

    const responseWithLimit1 = await client.query({query: GET_TECHNIQUE_LIMIT_1})
    expect(responseWithLimit1.data.techniques.count).toBe(3)
    expect(responseWithLimit1.data.techniques.data).toHaveLength(1)
  })

  test('techniques should query recipes to which they belong', async ()=> {
    await client.mutate({mutation: CREATE_TECHNIQUE})

    const response = await client.query({query: GET_TECHNIQUE_LIMIT_1})
    expect(response.data.techniques.data[0]).toHaveProperty('recipes')
  })
})
