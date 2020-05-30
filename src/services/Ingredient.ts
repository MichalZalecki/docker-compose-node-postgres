import { DBInterface } from '../typings/DbInterface'
import { IngredientInstance, IngredientAttributes } from '../models/Ingredient'
import ErrorGenerator from '../error'

export interface ingredientFindParams extends Partial<IngredientAttributes> {}

export default class Ingredient {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params?: ingredientFindParams): Promise<IngredientInstance[]> {
    try {
      const ingredientFound = await this.db.Ingredient.findAll({ where: params })
      return ingredientFound
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async create(ingredients: IngredientAttributes[]): Promise<IngredientInstance[]> {
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
