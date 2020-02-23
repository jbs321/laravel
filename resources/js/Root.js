import React from 'react'
import {connect} from "react-redux";
import LinearBuffer from './src/components/LinearBuffer';
import MenuVert from './src/components/menu-vert';


class Root extends React.Component {
    renderSpinner(isLoading) {
        if(isLoading === true) {
            return <LinearBuffer/>;
        }

        return null;
    }

    render() {
        return <div>
            <MenuVert/>
            {this.renderSpinner(this.props.general.isLoading)}
            {this.props.children}
        </div>
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Root)
