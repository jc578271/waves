import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise'

import rootReducer from '../reducers';

const middleware = applyMiddleware(promiseMiddleware, thunk);

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    rootReducer,
    compose(
        middleware,
        reduxDevTools
    )
);

export default store;