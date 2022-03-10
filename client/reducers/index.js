/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

 import { combineReducers } from 'redux';
 import {Provider} from 'react-redux';
 
 // import all reducers here
 import eventsReducer from './eventsReducer';
 
 
 // combine reducers
 const reducers = combineReducers({
   // if we had other reducers, they would go here
   events: eventsReducer,
 });
 
 // make the combined reducers available for import
 export default reducers;
 