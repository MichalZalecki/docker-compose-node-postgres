import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    return service.recipe.find(args.query)
  },
  techniques(parent: any, args: Args, { service }: Context) {
    return service.technique.find(args.query)
  },
}
