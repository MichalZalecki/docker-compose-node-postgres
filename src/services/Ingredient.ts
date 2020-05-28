import { DBInterface } from '../typings/DbInterface'
import { IngredientInstance } from '../models/Ingredient'
import ErrorGenerator from '../error'

type ingredientQueryParams = keyof IngredientInstance

export interface IngredientApiInterface {
  name: string
  title: string
  description: string
}

export default class Ingredient {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params: ingredientQueryParams): Promise<IngredientInstance[]> {
    try {
      const ingredientFound = await this.db.Ingredient.findAll({ where: params })
      return ingredientFound
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async create(ingredients: IngredientApiInterface[]): Promise<IngredientInstance[]> {
    if (!ingredients || !ingredients.length) {
      throw new ErrorGenerator('Server.internal')
    }

    try {
      const newIngredients = this.db.Ingredient.bulkCreate(ingredients)
      return newIngredients
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }
}
