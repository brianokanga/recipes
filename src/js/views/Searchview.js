import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
};

//private function(simple algorithm)
//split the title into its words
// use reduce method on the result array
// use reduce method on the result array
const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);

		//return results
		return `${newTitle.join(' ')} ...`;
	}
	return title;
};

//the function to render one receives just recipe from arrau of the recipes
const renderRecipe = recipe => {
	const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
											recipe.title
										)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//the function receive all recipes for the user input request
export const renderResults = recipes => {
	// recipes.foreach(cur => renderRecipe(cur));
	recipes.forEach(renderRecipe); //simple way autmatically passes current el
};
