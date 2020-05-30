import { DBInterface } from '../typings/DbInterface'
import { RecipeAttributes } from '../models/Recipe'
import ErrorGenerator from '../error'
import { RecipeIngredientAttributes } from '../models/RecipeIngredient'
import { RecipeTechniqueAttributes } from '../models/RecipeTechnique'
import { mapRecipe } from './helpers/mapper'
import { IngredientAttributes } from '../models/Ingredient'
import { TechniqueAttributes } from '../models/Technique'

export interface recipeFindParams extends Partial<RecipeAttributes> {}

export interface RecipeFromDB extends Omit<Partial<RecipeAttributes>, 'ingredients' | 'techniques'> {
  ingredients: ingredientFromDB[]
  techniques: techniqueFromDB[]
}

export interface ingredientFromDB extends IngredientAttributes {
  RecipeIngredient: RecipeIngredientAttributes
}

export interface techniqueFromDB extends TechniqueAttributes {
  RecipeTechnique: RecipeTechniqueAttributes
}
interface RecipeTechniqueMappedToApi extends Omit<RecipeTechniqueAttributes, 'techniqueId'> {
  id: string
  idealTemperature: number
}

interface RecipeIngredientMappedToApi extends Omit<RecipeIngredientAttributes, 'ingredientId'> {
  amount: number
  id: string
}
export interface RecipeMappedToApi extends Omit<Partial<RecipeAttributes>, 'ingredients' | 'techniques'> {
  ingredients: RecipeIngredientMappedToApi[]
  techniques: RecipeTechniqueMappedToApi[]
}

export default class Recipe {
  private db: DBInterface
  private eagerAttributes: {
    ingredients: string[]
    techniques: string[]
    recipeIngredient: string[]
    recipeTechnique: string[]
  }

  constructor(db: DBInterface) {
    this.db = db
    this.eagerAttributes = {
      ingredients: ['key', 'title', 'description'],
      techniques: ['key', 'title', 'description', 'duration', 'standardTemperature', 'videoLink'],
      recipeIngredient: ['amount'],
      recipeTechnique: ['idealTemperature'],
    }
  }

  async find(params: recipeFindParams): Promise<RecipeMappedToApi[]> {
    try {
      const recipesFound = await this.db.Recipe.findAll({
        where: params,
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
      //@ts-ignore
      return recipesFound.map((recipe) => mapRecipe(recipe.get({ plain: true })))
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async getById(id: string): Promise<RecipeMappedToApi | null | undefined> {
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
      //@ts-ignore
      return recipeFound ? mapRecipe(recipeFound.get({ plain: true })) : null
    } catch (e) {
      new ErrorGenerator('Server.internal', e)
    }
  }

  async create(recipe: RecipeMappedToApi): Promise<RecipeMappedToApi | null | undefined> {
    if (!recipe) {
      throw new ErrorGenerator('Validation.rejected')
    }
    try {
      const newRecipe = await this.db.Recipe.create({
        key: recipe.key!,
        title: recipe.title!,
        description: recipe.description!,
        author: recipe.author!,
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
      return newRecipe ? mapRecipe(newRecipe.get({ plain: true })) : null
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }
}
