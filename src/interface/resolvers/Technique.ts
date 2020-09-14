import { UserFindParams } from '../../services/User'
import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    return service.recipe.find({})
  },
  user(parent: any, args: Args, { service }: Context) {
    return service.user.find(args.query as UserFindParams)
  },
}
