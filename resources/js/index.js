import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from 'reducers';
import Root from './Root'
import Routes from "./Routes";


ReactDOM.render(
    <Provider store={createStore(reducers, {})}>
        <Root>
            <Routes/>
        </Root>
    </Provider>, document.querySelector("#root"));
