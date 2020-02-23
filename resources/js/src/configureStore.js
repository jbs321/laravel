import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import reducers from 'reducers'
import promise from 'redux-promise';
import {spinnerMiddleware} from './middleware/spinnerMiddleWare';



const middleware = [
    spinnerMiddleware,
    promise
];

const store = createStore(reducers, applyMiddleware(...middleware));

export default function configureStore() {
    return store;
}
