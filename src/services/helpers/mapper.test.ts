import { mapRecipe, mapQueryParams } from './mapper';

const recipe1 = {
  id: 'bf3eb840-2a22-4f3b-80ed-e77d3f6322e4',
  key: 'bread',
  title: 'bread',
  description: 'put all the stuff',
  userId: 'myself',
  updatedAt: new Date(),
  createdAt: new Date(),
  ingredients: [],
  techniques: [],
};

const recipe2 = {
  id: 'bf3eb840-2a22-4f3b-80ed-e77d3f6322e4',
  key: 'bread',
  title: 'bread',
  description: 'put all the stuff',
  userId: 'myself',
  updatedAt: new Date(),
  createdAt: new Date(),
  ingredients: [
    {
      key: 'Flour',
      title: 'flour',
      description: 'white dust',
      RecipeIngredient: {
        recipeId: 'bf3eb840-2a22-4f3b-80ed-e77d3f6322e4',
        ingredientId: 'e569e03b-c770-4bbc-a5d9-fae42e498432',
        amount: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ],
  techniques: [
    {
      key: 'Flour',
      title: 'flour',
      description: 'white dust',
      duration: 32,
      RecipeTechnique: {
        recipeId: 'bf3eb840-2a22-4f3b-80ed-e77d3f6322e4',
        techniqueId: '6cdb741a-180c-4340-a3cd-f707a7d9171a',
        idealTemperature: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ],
};

const queryParams = {
  title: 'hi',
  description: 'meh',
  duration: 4,
  limit: 10,
  page: 3,
};

describe('Mappers should work', () => {
  test('should map recipes and techniques to plain object', () => {
    const mapped = mapRecipe(recipe2);
    expect(mapped!.ingredients![0]).toHaveProperty('id');
    expect(mapped!.ingredients![0]).toHaveProperty('amount');
    expect(mapped!.techniques![0]).toHaveProperty('id');
    expect(mapped!.techniques![0]).toHaveProperty('idealTemperature');
  });
  test('shouldn\t break if having empty recipes or techniques', () => {
    const mapped = mapRecipe(recipe1);
    expect(mapped!.ingredients).toEqual([]);
    expect(mapped!.ingredients).toEqual([]);
    expect(mapped!.description).toBeDefined();
  });

  test('should map find and pagination params', async () => {
    const mapped = mapQueryParams(queryParams, ['title', 'description', 'duration'], ['limit', 'page']);
    // @ts-ignore
    expect(mapped.findParams.description).toBeDefined();
    // @ts-ignore
    expect(mapped.findParams.description).toBeDefined();
    // @ts-ignore
    expect(mapped.paginationParams.limit).toBeDefined();
  });

  test('should map find and pagination params', async () => {
    const mapped = mapQueryParams({}, ['title', 'description', 'duration'], ['limit', 'page']);
    // @ts-ignore
    expect(mapped.findParams).toEqual({});
    // @ts-ignore
    expect(mapped.paginationParams).toEqual({});
  });
});
