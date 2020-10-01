import {
  RecipeMappedToApi, RecipeFromDB, ingredientFromDB, techniqueFromDB, RecipeFindParams,
} from '../Recipe';
import { IngredientFindParams } from '../Ingredient';
import { TechniqueFindParams } from '../Technique';

function mapIngredient(ingredients: ingredientFromDB[]) {
  if (!ingredients || !ingredients.length) return ingredients;

  return ingredients.map((ingredient) => ({
    ...ingredient,
    id: ingredient.RecipeIngredient.ingredientId!,
    amount: ingredient.RecipeIngredient.amount!,
  }));
}

function mapTechnique(technique: techniqueFromDB[]) {
  if (!technique || !technique.length) return technique;
  return technique.map((ingredient) => ({
    ...ingredient,
    id: ingredient.RecipeTechnique.techniqueId!,
    idealTemperature: ingredient.RecipeTechnique.idealTemperature!,
  }));
}

export function mapRecipe(recipe: RecipeFromDB | any): RecipeMappedToApi {
  if (!recipe) null;
  return {
    ...recipe,
    ingredients: mapIngredient(recipe.ingredients),
    techniques: mapTechnique(recipe.techniques),
  };
}

export function mapQueryParams(
  params: RecipeFindParams & IngredientFindParams & TechniqueFindParams,
  findParamsKeys: string[],
  paginationsParamsKeys: string[],
): any {
  if (!params) return { findParams: {}, paginationParams: {} };

  return Object.keys(params).reduce(
    (memo, paramKey) => {
      if (findParamsKeys.includes(paramKey)) {
        // @ts-ignore
        memo.findParams[paramKey] = params[paramKey];
      }
      if (paginationsParamsKeys.includes(paramKey)) {
        // @ts-ignore
        memo.paginationParams[paramKey] = params[paramKey];
      }
      return memo;
    },
    { findParams: {}, paginationParams: {} },
  );
}
