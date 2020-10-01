import { Context, Args } from './typings'

export default {
  async ingredients(parent: any, args: Args, { service }: Context) {
    const ingredientIds = parent.ingredients.map((ingredient: any)=> {
      return ingredient.RecipeIngredient.ingredientId
    })

    const ingredients = await service.ingredient.find({id: ingredientIds})
    return ingredients.data
  },
  async techniques(parent: any, args: Args, { service }: Context) {
    const techniquesIds = parent.techniques.map((technique: any)=> {
      return technique.RecipeTechnique.techniqueId
    })

    const techniques = await service.technique.find({id: techniquesIds})
    return techniques.data
  },
  user(parent: any, args: Args, { service }: Context) {
    return service.user.find({id: parent.userId})
  },
}

