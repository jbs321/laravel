import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from 'reducers';
import Dashboard from "components/Pages/Dashboard";
import Root from './Root'
import {BrowserRouter, Route} from "react-router-dom";
import Import from "components/Pages/Import";

ReactDOM.render(
    <Provider store={createStore(reducers, {})}>
        <Root>
            <BrowserRouter>
                <Route path="/import" component={Import}/>
                <Route path="/" exact component={Dashboard}/>
            </BrowserRouter>
        </Root>
    </Provider>, document.querySelector("#root"));
