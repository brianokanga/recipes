import Search from './models/Search';
import * as searchView from './views/Searchview';
import { elements, renderLoader, clearLoader } from './views/base';

/*Global state
1. Search object
2. Current search
3. Shopping list object
4. Liked recipes
*/
const state = {};

//async function since we wait dor search results to be returned to render to UI
const controlSearch = async () => {
	//1. Get query from the view
	const query = searchView.getInput();

	if (query) {
		//2 . New search query and add to state
		state.search = new Search(query);

		//3. Prepare UI for result
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes); //spinner

		//4. Search for recipe(returns a promise stored in the globla state)
		await state.search.getResults(); //result from API call

		//5. Render result to the UI
		clearLoader();
		searchView.renderResults(state.search.result);
	}
};

// EVENT LISTENERS
elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

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
