import { DBInterface } from '../typings/DbInterface'
import { IngredientInstance } from '../models/Ingredient'
import ErrorGenerator from '../error'

export interface IngredientCreateInterface {
  id?: string
  name: string
  title: string
  description: string
}

interface ingredientFindInterface {
  id?: string
  name?: string
  title?: string
  description?: string
}

export default class Ingredient {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params?: ingredientFindInterface): Promise<IngredientInstance[]> {
    try {
      const ingredientFound = await this.db.Ingredient.findAll({ where: params })
      return ingredientFound
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async create(ingredients: IngredientCreateInterface[]): Promise<IngredientInstance[]> {
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
