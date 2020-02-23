import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Routes from "./Routes";
import configureStore from './src/configureStore';
import Root from './Root';
import {BrowserRouter} from 'react-router-dom';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Root>
            <Routes/>
        </Root>
    </BrowserRouter>
</Provider>, document.querySelector("#root"));
