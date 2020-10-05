import 'cross-fetch/polyfill'
import ApolloBost, {gql} from 'apollo-boost'
import createModels from  '../models/index'
import config from '../../config/config.json'

const db = createModels(config)

const QUERY_USER = gql`
query {
  user(query:{id: "userId"}) {
    id
    name
  }
}
`

const REGISTER_OR_LOGIN_USER = gql`
mutation{
  registerOrLoginUser(userPayload: {id: "userId", name: "Ciro Ferrara", email: "ciro@ferrara.com"}){
    name
    id
    email
  }
}
`

const client = new ApolloBost({
  uri: 'http://localhost:4000'
})

afterEach(async () => {
  await db.User.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})

export const registerOrLoginUser = async ()=>{
  const response = await client.mutate({mutation: REGISTER_OR_LOGIN_USER})
  return response.data.user
}

describe('=== USER CREATE MUTATION', () => {
  test('should create 1 ingredient', async ()=> {
    const user = await registerOrLoginUser()
    expect(user).toHaveProperty('id')
  })
});

describe('=== INGREDIENTS QUERY ===', ()=>{
  test('ingredients should be have a working pagination and counter', async ()=> {
    await registerOrLoginUser()

    const response = await client.query({query: QUERY_USER})
    expect(response.data.registerOrLoginUser).toHaveProperty('id')
    expect(response.data.registerOrLoginUser).toHaveProperty('email')
    expect(response.data.registerOrLoginUser).toHaveProperty('name')
  })
})
