import {createStore, applyMiddleware} from 'redux'
import reducers from 'reducers'
import {spinnerMiddleware} from './middleware/spinnerMiddleWare';
import thunk from 'redux-thunk'



const middleware = [
    spinnerMiddleware,
    thunk
];

const store = createStore(reducers, applyMiddleware(...middleware));

export default function configureStore() {
    return store;
}
