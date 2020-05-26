import { DBInterface } from '../typings/DbInterface'
import { RecipeInstance } from '../models/Recipe'

export default class Recipe {
  db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  getRecipe(id: string) {
    this.db.Recipe.findById(id, {
      include: [
        {
          model: this.db.Ingredient,
          as: 'ingredients',
          attributes: ['name', 'title', 'description'],
        },
        {
          model: this.db.Technique,
          as: 'techniques',
          attributes: ['name', 'title', 'description', 'duration', 'standardTemperature', 'videoLink'],
        },
      ],
    })
  }
}
