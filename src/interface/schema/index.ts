import Ingredient from './Ingredient';
import Technique from './Technique';
import Query from './Query';
import Mutation from './Mutation';
import Recipe from './Recipe';

const concatSchemas = (schemas: string[]): string => schemas.reduce((memo, schema) => memo + schema, '');
export default concatSchemas([Ingredient, Technique, Query, Recipe, Mutation]);
