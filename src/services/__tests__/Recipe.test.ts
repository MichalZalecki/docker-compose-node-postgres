import Recipe, { RecipesData } from '../Recipe'
import Ingredient from '../Ingredient'
import Technique from '../Technique'

import createModels from  '../../models'
import config from '../../../config/config.json'
import { IngredientAttributes } from '../../models/Ingredient'
import { TechniqueAttributes } from '../../models/Technique'
const db = createModels(config)

const dummyIngredient = {
  key: 'Flour',
  title: 'flour',
  description: 'white dust',
  imageSrc: "https://ciao.png"
}

const dummyRecipe = {
  key: 'bread',
  title: 'bread',
  description: 'put all the stuff',
  userId: 'myssdfsdfdsfelf',
  techniques: [],
  ingredients: [],
}

const dummyTechnique = {
  key: 'Slap and fold',
  title: 'slap and fold',
  description: 'first slap and then fold',
  duration: 43,
  standardTemperature: 32,
  videoLink: 'https://you.tu/243423dsdasddds/',
}

let ingredientsCreated: IngredientAttributes[]
let techniquesCreated: TechniqueAttributes[]

const ingredient = new Ingredient(db)
const technique = new Technique(db)

beforeAll(async () => {
  ingredientsCreated = await ingredient.create([dummyIngredient, dummyIngredient, dummyIngredient])
  techniquesCreated = await technique.create([dummyTechnique])
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
  await db.Technique.destroy({
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
        userId: dummyRecipe.userId,
        ingredients: ingredientsCreated.map((i) => ({ id: i.id!, amount: 200 })),
        techniques: techniquesCreated.map((technique) => ({
          id: technique.id!,
          duration: technique.duration!,
          idealTemperature: technique.standardTemperature!,
        })),
      })
    } catch (e) {
      console.log(e)
    }
    expect(newRecipe).toHaveProperty('id')
  })

  test('should find all the Recipes', async () => {
    const recipe = new Recipe(db)
    const foundRecipes = await recipe.find({})
    expect(foundRecipes.data[0]).toHaveProperty('title')
    expect(foundRecipes.data[0]).toHaveProperty('id')
    expect(foundRecipes.data[0]).toHaveProperty('ingredients')
    expect(foundRecipes.data[0].techniques[0]).toHaveProperty('duration')
  })
})
