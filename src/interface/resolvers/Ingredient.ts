import { UserFindParams } from '../../services/User'
import { Context, Args } from './typings'

export default {
  recipes(parent: any, args: Args, { service }: Context) {
    return service.recipe.find(args.query)
  },
  user(parent: any, args: Args, { service }: Context) {
    return service.user.find({id: parent.userId} as UserFindParams)
  },
}
