import * as model from './model.js'; // import all
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.replace(/#/g, '');

    if (!recipeId) return;
    recipeView.renderSpinner();

    // 1) Get the recipe
    await model.loadRecipe(recipeId);

    // 2) Rendering recipe to UI
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
 

    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    resultsView.render(model.state.search.results)
  } catch (err) {
    console.log(err)
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
// controlRecipes(); | remove because we only want to show the recipe when the hash is changed
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
