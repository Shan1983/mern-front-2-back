import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middelware = [thunk];

const initialState = {};

const REDUX_DEVTOOLS =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middelware), REDUX_DEVTOOLS),
);

export default store;
