import * as model from './model.js';  // import all
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.replace(/#/g, '');
    console.log(recipeId);

    if (!recipeId) return;
    recipeView.renderSpinner();

    // 1) Get the recipe
    await model.loadRecipe(recipeId);

    // 2) Rendering recipe to UI
    recipeView.render(model.state.recipe)
  } catch (err) {
    console.log(err);
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipes)
}
init();
// controlRecipes(); | remove because we only want to show the recipe when the hash is changed
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
