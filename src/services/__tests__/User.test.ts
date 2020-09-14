import User from '../User'

import createModels from  '../../models'
import config from '../../../config/config.json'
const db = createModels(config)

const dummyUser = {
  id: 'a8228932-e88a-4170-9d4f-eaecc1cb9839',
  name: 'Ciro',
  email: 'ciro@email.com',
}

afterEach(async () => {
  await db.User.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})

describe('Test the User service', () => {
  test('should create multiple user in the db', async () => {
    const user = new User(db)
    const userCreated = await user.create(dummyUser)
    expect(userCreated.id).toBe(dummyUser.id)
    expect(userCreated).toHaveProperty('name')
  })

  test('Should find the user', async () => {
    const user = new User(db)
    await user.create(dummyUser)
    const userFound = await user.find({id: dummyUser.id})
    expect(userFound.id).toBe(dummyUser.id)
    expect(userFound).toHaveProperty('name')
  })
})
