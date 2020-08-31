import axios from 'axios';
import { key, proxy } from '../config';

//class to hold all data for one recipe object
// Each recipe is identified by an ID
export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	//the axios call returns a promise
	async getRecipe() {
		try {
			const res = await axios(
				`${proxy}https://recipesapi.herokuapp.com/api/get?key=${key}&rId=${this.id}`
			);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {
			console.log(error);
			alert('Something went wrong :(');
		}
	}

	// Estimate cooking time
	// Assuming we need 15 mins for each 3 ingredients
	// find out from ingredients, how many 15 mins we have
	calcTime() {
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	// Servings
	calcServings() {
		this.servings = 4;
	}
}
