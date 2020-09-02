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

	//standardize units of ingredients
	parseIngredients() {
		const unitsLong = [
			'tablespoons',
			'tablespoon',
			'ounces',
			'ounce',
			'teaspoons',
			'teaspoon',
			'cups',
			'pounds',
		];

		const unitsShort = [
			'tbsp',
			'tbsp',
			'oz',
			'oz',
			'tsp',
			'tsp',
			'cup',
			'pound',
		];
		const units = [...unitsShort, 'kg', 'g'];

		// Create new array with new ingredients based on the old ones
		// array map creates a new array based o what is provided
		const newIngredients = this.ingredients.map(el => {
			//1 Uniform units(all ingredient to lowecase)
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});

			//2 Remove Parethesis(regular expression)
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			//3. Parse ingredients into count, unit and ingredients
			const arrIng = ingredient.split(' ');
			const unitIndex = arrIng.findIndex(cur2 => units.includes(cur2)); // returns index and elememt

			// check if there is a unit
			let objIng;
			if (unitIndex > -1) {
				// There is a unit
				// Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
				// Ex. 4 cups, arrCount is [4]
				const arrCount = arrIng.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				}

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' '),
				};
			} else if (parseInt(arrIng[0], 10)) {
				// There is NO unit, but 1st element is number
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' '),
				};
			} else if (unitIndex === -1) {
				// There is NO unit and NO number in 1st position
				objIng = {
					count: 1,
					unit: '',
					ingredient,
				};
			}

			return objIng;
		});
		this.ingredients = newIngredients;
	}
}
