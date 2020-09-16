import { Context, Args } from './typings'

export default {
  ingredients(parent: any, args: Args, { service }: Context) {
    const ingredientIds = parent.ingredients.map((ingredient: any)=> {
      return ingredient.RecipeIngredient.ingredientId
    })

    return service.ingredient.find({id: ingredientIds})
  },
  techniques(parent: any, args: Args, { service }: Context) {
    const techniquesIds = parent.techniques.map((technique: any)=> {
      return technique.RecipeTechnique.techniqueId
    })

    return service.technique.find({id: techniquesIds})
  },
  user(parent: any, args: Args, { service }: Context) {
    return service.user.find({id: parent.userId})
  },
}

