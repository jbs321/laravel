import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Menu from "./src/components/menu";
import Category from "./src/components/Pages/Category";
import Import from "./src/components/Pages/Import";
import Dashboard from "./src/components/Pages/Dashboard";
import {connect} from "react-redux";

class Routes extends React.Component {
    render() {
        console.log(this.props);

        return (
            <div>
                <BrowserRouter>

                    <div className="flex-center position-ref full-height">
                        <Menu/>
                        <Switch>
                            <Route path="/category" component={Category}/>
                            <Route path="/import" component={Import}/>
                            <Route path="/" exact component={Dashboard}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Routes);
