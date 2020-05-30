import { DBInterface } from '../typings/DbInterface'
import { RecipeAttributes } from '../models/Recipe'
import ErrorGenerator from '../error'
import { RecipeIngredientAttributes } from '../models/RecipeIngredient'
import { RecipeTechniqueAttributes } from '../models/RecipeTechnique'

export interface recipeFindParams extends Partial<RecipeAttributes> {}

interface TechniqueApiInterface extends Omit<RecipeTechniqueAttributes, 'techniqueId'> {
  id: string
  idealTemperature: number
}

export interface RecipeIngredientApiInterface extends Omit<RecipeIngredientAttributes, 'ingredientId'> {
  id: string
}
interface RecipeApiInterface extends RecipeAttributes {
  ingredients?: RecipeIngredientApiInterface[]
  techniques?: TechniqueApiInterface[]
}

export default class Recipe {
  private db: DBInterface
  private eagerAttributes: {
    ingredients: string[]
    techniques: string[]
  }

  constructor(db: DBInterface) {
    this.db = db
    this.eagerAttributes = {
      ingredients: ['key', 'title', 'description'],
      techniques: ['key', 'title', 'description', 'duration', 'standardTemperature', 'videoLink'],
    }
  }

  async find(params: recipeFindParams): Promise<RecipeAttributes[]> {
    try {
      const recipesFound = await this.db.Recipe.findAll({
        where: params,
        //@ts-ignore
        include: [
          {
            model: this.db.Ingredient,
            as: 'ingredients',
            attributes: this.eagerAttributes.ingredients,
          },
          {
            model: this.db.Technique,
            as: 'techniques',
            attributes: this.eagerAttributes.techniques,
          },
        ],
      })
      // console.log('FOUND', recipesFound)
      return recipesFound.map((el) => el.get({ plain: true }))
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
            attributes: this.eagerAttributes.ingredients,
          },
          {
            model: this.db.Technique,
            as: 'techniques',
            attributes: this.eagerAttributes.techniques,
          },
        ],
      })
      return recipeFound?.get({ plain: true })
    } catch (e) {
      return new ErrorGenerator('Server.internal', e)
    }
  }

  async create(recipe: RecipeApiInterface): Promise<RecipeAttributes> {
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
      return newRecipe.get({ plain: true })
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }
}
