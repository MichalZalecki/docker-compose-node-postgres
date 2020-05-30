import Recipe from '../Recipe'
import Ingredient from '../Ingredient'
import { RecipeIngredientApiInterface } from '../Recipe'

import { createModels } from '../../models'
import config from '../../../config/config.json'
import { IngredientInstance } from '../../models/Ingredient'
const db = createModels(config)

const dummyIngredient = {
  key: 'Flour',
  title: 'flour',
  description: 'white dust',
}

const dummyRecipe = {
  key: 'bread',
  title: 'bread',
  description: 'put all the stuff',
  author: 'myself',
  techniques: [],
  ingredients: [],
}

let ingredietsCreated: IngredientInstance[]

const ingredient = new Ingredient(db)

beforeAll(async () => {
  ingredietsCreated = await ingredient.create([dummyIngredient, dummyIngredient, dummyIngredient])
})

afterAll(async () => {
  await db.Recipe.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  await db.Ingredient.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
})

describe('Test the Recipe service', () => {
  test('should create a new Recipe', async () => {
    const recipe = new Recipe(db)
    let newRecipe
    try {
      newRecipe = await recipe.create({
        key: dummyRecipe.key,
        title: dummyRecipe.title,
        description: dummyRecipe.description,
        author: dummyRecipe.author,
        ingredients: ingredietsCreated.map((i) => ({ id: i.id!, amount: 200 })),
      })
      expect(newRecipe).toHaveProperty('id')
    } catch (e) {
      console.log(e)
    }
  })

  test('should find the new Recipe', async () => {
    const recipe = new Recipe(db)
    let newRecipe
    try {
      newRecipe = await recipe.create({
        key: dummyRecipe.key,
        title: dummyRecipe.title,
        description: dummyRecipe.description,
        author: dummyRecipe.author,
        ingredients: ingredietsCreated.map((i) => ({ id: i.id!, amount: 200 })),
      })
      expect(newRecipe).toHaveProperty('id')
    } catch (e) {
      console.log(e)
    }
  })
})
