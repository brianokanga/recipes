import Search from './models/Search';
import * as searchView from './views/Searchview';
import { elements } from './views/base';

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

		//4. Search for recipe(returns a promise stored in the globla state)
		await state.search.getResults(); //result from API call

		//5. Render result to the UI
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});
