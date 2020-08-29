import Search from './models/Search';

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
	const query = 'pizza'; //implement later

	if (query) {
		//2 . New search query and add to state
		state.search = new Search(query);

		//3. Prepare UI for result

		//4. Search for recipe(returns a promise stored in the globla state)
		await state.search.getResults();

		//5. Render result to the UI
		console.log(state.search.result);
	}
};

document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});
