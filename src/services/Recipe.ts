import { DBInterface } from '../typings/DbInterface'
import { RecipeInstance } from '../models/Recipe'
import ErrorGenerator from '../error'

type recipeQueryParams = keyof RecipeInstance

interface TechniqueApiInterface {
  id: string
  idealTemperature: number
}

export interface RecipeIngredientApiInterface {
  id: string
  amount: number
}
interface RecipeApiInterface {
  key: string
  title: string
  description: string
  author: string
  ingredients?: RecipeIngredientApiInterface[]
  techniques?: TechniqueApiInterface[]
}

export default class Recipe {
  private db: DBInterface
  private attributes: {
    ingredients: string[]
    techniques: string[]
  }

  constructor(db: DBInterface) {
    this.db = db
    this.attributes = {
      ingredients: ['key', 'title', 'description'],
      techniques: ['key', 'title', 'description', 'duration', 'standardTemperature', 'videoLink'],
    }
  }

  async find(params: recipeQueryParams): Promise<RecipeInstance[]> {
    try {
      const recipeFound = await this.db.Recipe.findAll({
        where: params,
        raw: true,
        include: [
          {
            model: this.db.Ingredient,
            as: 'ingredients',
            attributes: this.attributes.ingredients,
          },
          {
            model: this.db.Technique,
            as: 'techniques',
            attributes: this.attributes.techniques,
          },
        ],
      })
      console.log(recipeFound)
      return recipeFound
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async getById(id: string) {
    try {
      const recipeFound = await this.db.Recipe.findById(id, {
        include: [
          {
            model: this.db.Ingredient,
            as: 'ingredients',
            attributes: this.attributes.ingredients,
          },
          {
            model: this.db.Technique,
            as: 'techniques',
            attributes: this.attributes.techniques,
          },
        ],
      })
      return recipeFound
    } catch (e) {
      return new ErrorGenerator('Server.internal', e)
    }
  }

  async create(recipe: RecipeApiInterface): Promise<RecipeInstance> {
    try {
      const newRecipe = await this.db.Recipe.create({
        key: recipe.key,
        title: recipe.title,
        description: recipe.description,
        author: recipe.author,
      })
      if (recipe.ingredients && recipe.ingredients.length) {
        const ingredients = recipe.ingredients.map((ing) => ({
          recipeId: newRecipe.id,
          ingredientId: ing.id,
          amount: ing.amount,
        }))
        await this.db.RecipeIngredient.bulkCreate(ingredients)
      }
      if (recipe.techniques && recipe.techniques.length) {
        const technique = recipe.techniques.map((tech) => ({
          recipeId: newRecipe.id,
          techniqueId: tech.id,
          idealTemperature: tech.idealTemperature,
        }))
        await this.db.RecipeTechnique.bulkCreate(technique)
      }
      return newRecipe
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }
}
