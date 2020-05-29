import Technique from '../Technique'

import { createModels } from '../../models'
import config from '../../../config/config.json'
const db = createModels(config)

const dummyTechnique = {
  key: 'Slap and fold',
  title: 'slap and fold',
  description: 'first slap and then fold',
  duration: 43,
  standardTemperature: 32,
  videoLink: 'https://you.tu/243423dsdasddds/',
}

afterEach(async () => {
  await db.Technique.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})

describe('Test the Technique service', () => {
  test('should create multiple ingredients in the db', async () => {
    const technique = new Technique(db)
    const ingredietsCreated = await technique.create([dummyTechnique, dummyTechnique])
    expect(ingredietsCreated.length).toBe(2)
    expect(ingredietsCreated[0]).toHaveProperty('id')
  })

  test('should find all ingredients', async () => {
    const technique = new Technique(db)
    await technique.create([dummyTechnique, dummyTechnique])
    const ingredietsFound = await technique.find()
    expect(ingredietsFound.length).toBe(2)
    expect(ingredietsFound[0]).toHaveProperty('id')
  })

  test('should find filter ingredients by title', async () => {
    const technique = new Technique(db)
    let differentIng = { ...dummyTechnique, title: 'cane' }
    await technique.create([dummyTechnique, dummyTechnique, differentIng])
    const ingredietsFound = await technique.find({ title: 'cane' })
    expect(ingredietsFound.length).toBe(1)
    expect(ingredietsFound[0]).toHaveProperty('title', 'cane')
  })
})
