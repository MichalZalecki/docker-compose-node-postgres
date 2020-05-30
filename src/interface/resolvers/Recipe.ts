import { Context, Args } from './typings'

export default {
  ingredients(parent: any, args: Args, { service }: Context) {
    console.log('PARENTE UAHSDHAUS DIA SDHSADO ', parent, typeof parent)
    return parent.ingredients
  },
  techniques(parent: any, args: Args, { service }: Context) {
    return parent.techniques
  },
}
