import './css/styles.css';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App';
import store from './store/store';

render(<App />, document.getElementById('root'));

// render(
//   // wrap the App in the Provider Component and pass in the store
//   <Provider store = {store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );