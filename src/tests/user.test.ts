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
    email
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
  return response.data.registerOrLoginUser
}

describe('=== USER CREATE MUTATION', () => {
  test('should create 1 ingredient', async ()=> {
    const user = await registerOrLoginUser()
    expect(user).toHaveProperty('id')
  })
});

describe('=== INGREDIENTS QUERY ===', ()=>{
  test('user should be have id email and name', async ()=> {
    await registerOrLoginUser()

    const response = await client.query({query: QUERY_USER})
    expect(response.data.user).toHaveProperty('id')
    expect(response.data.user).toHaveProperty('email')
    expect(response.data.user).toHaveProperty('name')
  })
})
