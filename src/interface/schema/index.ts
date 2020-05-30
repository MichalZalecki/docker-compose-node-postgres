import Ingredient from './Ingredient'
import Technique from './Technique'
import Query from './Query'
import Recipe from './Recipe'

const concatSchemas = (schemas: string[]): string => {
  return schemas.reduce((memo, schema) => memo + schema, ``)
}
export default concatSchemas([Ingredient, Technique, Query, Recipe])
