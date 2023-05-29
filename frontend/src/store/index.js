import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';

const rootReducer = combineReducers({
	session: sessionReducer
});

let enhancer;

if(process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
	// Note: when a store is created by invoking below, Redux dispatches a dummy action
	// to reduceer to populate store with initial state, no need to handle dummy action directly.
	// Source: https://redux.js.org/api/createstore
	return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;