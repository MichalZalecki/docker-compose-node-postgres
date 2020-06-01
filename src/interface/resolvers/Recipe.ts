import { Context, Args } from './typings'

export default {
  ingredients(parent: any, args: Args, ctx: Context) {
    return parent.ingredients
  },
  techniques(parent: any, args: Args, ctx: Context) {
    return parent.techniques
  },
}
