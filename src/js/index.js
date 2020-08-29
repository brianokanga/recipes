import axios from 'axios';

//async method definition
async function getResults(query) {
	const proxy = 'https://cors-anywhere.herokuapp.com/';
	const key = '';

	try {
		const res = await axios(
			`${proxy}https://recipesapi.herokuapp.com/api/search?key=${key}&q=${query}`
		);
		const recipes = res.data.recipes;
		console.log(recipes);
	} catch (error) {
		alert(error);
	}
}

getResults('pizza'); //method
