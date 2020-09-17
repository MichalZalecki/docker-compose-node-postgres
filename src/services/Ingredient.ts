import { DBInterface } from '../typings/DbInterface'
import { IngredientAttributes } from '../models/Ingredient'
import ErrorGenerator from '../error'

export interface IngredientFindParams extends Partial<IngredientAttributes> {}

export default class Ingredient {
  private db: DBInterface
  private eagerAttributes: {
    recipes: string[]
  }
  constructor(db: DBInterface) {
    this.db = db
    this.eagerAttributes = {
      recipes: ['id', 'key', 'title', 'description'],
    }
  }

  async find(params?: IngredientFindParams): Promise<IngredientAttributes[]> {
    try {
      const ingredientFound = await this.db.Ingredient.findAll({
        where: params,
        include: [
          {
            model: this.db.Recipe,
            as: 'recipes',
            attributes: this.eagerAttributes.recipes,
          }
        ],
      })
      return ingredientFound.map((el) => el.get({ plain: true }))
    } catch (e) {
      throw new Error(e)
    }
  }

  async create(ingredients: IngredientAttributes[]): Promise<IngredientAttributes[]> {
    if (!ingredients || !ingredients.length) {
      throw new ErrorGenerator('Validation.rejected')
    }

    try {
      const newIngredients = this.db.Ingredient.bulkCreate(ingredients).map((el) => el.get({ plain: true }))
      return newIngredients
    } catch (e) {
      throw new Error(e)
    }
  }
}
