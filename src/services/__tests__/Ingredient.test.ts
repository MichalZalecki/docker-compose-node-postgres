import Ingredient from '../Ingredient'

import { createModels } from '../../models'
import config from '../../../config/config.json'
const db = createModels(config)

const dummyIngredient = {
  key: 'Flour',
  title: 'flour',
  description: 'white dust',
}

// afterEach(async () => {
//   await db.Ingredient.destroy({
//     where: {},
//     truncate: true,
//     cascade: true,
//   })
// })

describe('Test the Ingredient service', () => {
  test('should create multiple ingredients in the db', async () => {
    const ingredient = new Ingredient(db)
    const ingredietsCreated = await ingredient.create([dummyIngredient, dummyIngredient, dummyIngredient])
    expect(ingredietsCreated.length).toBe(3)
    expect(ingredietsCreated[0]).toHaveProperty('id')
  })

  test('should find all ingredients', async () => {
    const ingredient = new Ingredient(db)
    await ingredient.create([dummyIngredient, dummyIngredient, dummyIngredient])
    const ingredietsFound = await ingredient.find()
    expect(ingredietsFound.length).toBe(3)
    expect(ingredietsFound[0]).toHaveProperty('id')
  })

  test('should find filter ingredients by title', async () => {
    const ingredient = new Ingredient(db)
    let differentIng = { ...dummyIngredient, title: 'cane' }
    await ingredient.create([dummyIngredient, dummyIngredient, differentIng])
    const ingredietsFound = await ingredient.find({ title: 'cane' })
    expect(ingredietsFound.length).toBe(1)
    expect(ingredietsFound[0]).toHaveProperty('title', 'cane')
  })
})
