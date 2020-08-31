import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		try {
			const res = await axios(
				`${proxy}https://recipesapi.herokuapp.com/api/search?key=${key}&q=${this.query}`
			);
			this.result = res.data.recipes;
			// console.log(this.results);
		} catch (error) {
			alert(error);
		}
	}
}
