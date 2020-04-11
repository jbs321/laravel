import React from "react";
import {Switch, Route} from "react-router-dom";
import Category from "./src/components/Pages/Category";
import Import from "./src/components/Pages/Import";
import Dashboard from "./src/components/Pages/Dashboard";
import {connect} from "react-redux";
import Retailer from './src/components/Pages/Retailer';
import Transaction from 'components/Pages/Transaction';
import Test from './src/components/Pages/Test'

class Routes extends React.Component {
    render() {
        return (<div>
                <Switch>
                    <Route path="/test" component={Test}/>
                    <Route path="/category" component={Category}/>
                    <Route path="/retailer" component={Retailer}/>
                    <Route path="/import" component={Import}/>
                    <Route path="/transactions" component={Transaction}/>
                    <Route path="/" exact component={Dashboard}/>
                </Switch>
            </div>);
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Routes);
