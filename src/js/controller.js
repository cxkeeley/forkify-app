import * as model from './model.js'; // import all
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.replace(/#/g, '');

    if (!recipeId) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

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
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) Render New results
  // resultsView.render(model.state.search.results)
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render New initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  // Update the recipe servings (in state)
  model.updateServings(updateTo);

  // Update the recipe view
  // recipeView.render(model.state.recipe); // render method give the web browser flickering and recall all the element that is waste of work and data
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  
};
init();
// controlRecipes(); | remove because we only want to show the recipe when the hash is changed
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
