import Recipe from '../Recipe'
import Ingredient from '../Ingredient'

import { createModels } from '../../models'
import config from '../../../config/config.json'
import { IngredientApiInterface } from '../Ingredient'
import { IngredientInstance } from '../../models/Ingredient'
const db = createModels(config)

const dummyIngredient = {
  name: 'Flour',
  title: 'flour',
  description: 'white dust',
}
afterAll(async () => {
  await db.Ingredient.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})
describe('Test the Ingredient service', () => {
  test('should create multiple ingredients in the db', async () => {
    const ingredient = new Ingredient(db)
    const ingredietsCreated = await ingredient.create([dummyIngredient, dummyIngredient, dummyIngredient])
    expect(ingredietsCreated.length).toBe(3)
    expect(ingredietsCreated[0]).toHaveProperty('id')
  })
  test('should find all ingredients filtering by title', () => {})
})
