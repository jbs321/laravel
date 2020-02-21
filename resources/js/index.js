import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from 'reducers';
import Root from './Root'
import Routes from "./Routes";
import promise from 'redux-promise';

const store = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)}>
        <Root>
            <Routes/>
        </Root>
    </Provider>, document.querySelector("#root"));
