import Ingredient from './Ingredient';
import Technique from './Technique';
import Query from './Query';
import Mutation from './Mutation';
import Recipe from './Recipe';
import User from './User';

const concatSchemas = (schemas: string[]): string => schemas.reduce((memo, schema) => memo + schema, '');
export default concatSchemas([User, Ingredient, Technique, Query, Recipe, Mutation]);
