import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};

// controlRecipes(); | remove because we only want to show the recipe when the hash is changed
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
