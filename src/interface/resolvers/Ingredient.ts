import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    console.log('PARENT RECIPES in INGREDIENTS', parent)
    return parent.ingredient.find({})
  },
  techniques(parent: any, args: Args, { service }: Context) {
    return service.technique.find(args.query)
  },
}
