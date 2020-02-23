import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Category from "./src/components/Pages/Category";
import Import from "./src/components/Pages/Import";
import Dashboard from "./src/components/Pages/Dashboard";
import {connect} from "react-redux";
import Retailer from './src/components/Pages/Retailer';
import Transaction from 'components/Pages/Transaction';
import Menu2 from './src/components/menu2';

class Routes extends React.Component {
    render() {
        return (<BrowserRouter>
                <div>
                    <Menu2/>
                    <div className="flex-center position-ref full-height">
                        <Switch>
                            <Route path="/category" component={Category}/>
                            <Route path="/retailer" component={Retailer}/>
                            <Route path="/import" component={Import}/>
                            <Route path="/transactions" component={Transaction}/>
                            <Route path="/" exact component={Dashboard}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>);
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Routes);
