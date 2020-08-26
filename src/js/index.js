// Global app controller
import str from './models/Search';

// import {add as a, multiply as m, ID} from './views/Searchview';
import * as Searchview from './views/Searchview';

// console.log (
//   `Using imported functions! ${a (ID, 2)} and multiply ${m (3, 5)}. ${str} `
// );

console.log (
  `Using imported functions! ${Searchview.add (Searchview.ID, 2)} and multiply ${Searchview.multiply (3, 5)}. ${str} `
);
