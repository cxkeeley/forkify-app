import { async } from 'regenerator-runtime';

export const state = {
  recipe: {}
}

export const loadRecipe = async function (recipeId) {
  try {
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfcc'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      );
      const data = await res.json();
      
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      
      const { recipe } = data.data;
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
      };
      console.log(state.recipe);
    } catch (err) {
      alert(err)
    }
}


