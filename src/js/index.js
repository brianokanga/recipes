import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/Searchview';
import { elements, renderLoader, clearLoader } from './views/base';

/*Global state
1. Search object
2. Current search
3. Shopping list object
4. Liked recipes
*/

// GLOBAL STATE
const state = {};

// SEARCH CONTROLLER
//async function since we wait dor search results to be returned to render to UI
const controlSearch = async () => {
	//1. Get query from the view
	// FOR TESTING
	// const query = 'pizza';
	const query = searchView.getInput();

	if (query) {
		//2 . New search query and add to state
		state.search = new Search(query);

		//3. Prepare UI for result
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes); //spinner

		try {
			//4. Search for recipe(returns a promise stored in the globla state)
			await state.search.getResults(); //result from API call

			//5. Render result to the UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (err) {
			alert('Error processing search');
			clearLoader();
		}
	}
};

// EVENT LISTENERS
elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

// FOR TESTING
// window.addEventListener('load', e => {
// 	e.preventDefault();
// 	controlSearch();
// });

// event delegations since the are not availabe at load
// So we attach the event to the parent element(available at load)
elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10); //returns a string
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
		console.log(goToPage);
	}
});

// RECIPE CONTROLLER
// the hash is a string hence we can use string methods on it
const controlRecipe = async () => {
	//1. Get id frim url
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		//2. Prepare UI for changes
		//3. Create a new recipe object
		// FOR TESTING
		// window.r = state.recipe;
		// console.log(window.r);
		state.recipe = new Recipe(id);

		try {
			//4. Get recipe Data and parse ingredients(returns a promise)
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			//5. Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			//6. Render Recipe
			console.log(state.recipe);
		} catch (err) {
			alert('Error processing recipe');
		}
	}
};

// add event listemer to the global object(window)
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// add same event listemer to multiple events
['hashchange', 'load'].forEach(event =>
	window.addEventListener(event, controlRecipe)
);
