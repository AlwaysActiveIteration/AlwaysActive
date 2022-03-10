/**
 * @description
 * Action types for events
 */

export const CREATE = 'CREATE';
// TODO: create an UPDATE action eventually
export const DELETE = 'DELETE';
export const FAVORITE = 'FAVORITE';
export const FILTER = 'FILTER';

/**
 * export const submitLoginActionCreator = (user) => { return (dispatch) => { fetch('/user/login', { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ email: user.email, password: user.password }) }).then(res => (res.json())) .then(response => { const payload = response; dispatch({type: types.SUBMIT_LOGIN, payload: payload}) }) .catch(err => console.log(err)) } } 
 */