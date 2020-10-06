import { DBInterface } from '../typings/DbInterface'
import { RecipeAttributes } from '../models/Recipe'
import { RecipeIngredientAttributes } from '../models/RecipeIngredient'
import { RecipeTechniqueAttributes } from '../models/RecipeTechnique'
import { mapRecipe, mapQueryParams } from './helpers/mapper'
import { IngredientAttributes } from '../models/Ingredient'
import { TechniqueAttributes } from '../models/Technique'

export interface RecipeFindParams extends Partial<RecipeAttributes> {
  page?: number
  limit?: number
}
export interface RecipesData{
  data: RecipeMappedToApi[]
  count: number
}
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
  userId: string
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

  async find(params: RecipeFindParams): Promise<RecipesData> {
    try {
      const { findParams, paginationParams } = mapQueryParams(
        params,
        ['id', 'key', 'title', 'description', 'userId'],
        ['limit', 'page']
      )
      const recipesFound = await this.db.Recipe.findAndCountAll({
        where: findParams,
        order: [["createdAt", 'DESC']],
        limit: paginationParams.limit,
        offset: paginationParams.limit && paginationParams.page && paginationParams.limit * paginationParams.page,
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
      return {
        data: (recipesFound.rows || []).map((recipe) => mapRecipe(recipe.get({ plain: true }))),
        count: recipesFound.count}
    } catch (e) {
      throw Error(e)
    }
  }

  async create(recipe: RecipeMappedToApi): Promise<RecipeAttributes> {
    if (!recipe) {
      throw new Error('Validation.rejected')
    }
    try {
      const newRecipe = await this.db.Recipe.create({
        key: recipe.key!,
        title: recipe.title!,
        description: recipe.description!,
        userId: recipe.userId!,
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
      throw new Error(e)
    }
  }
}
