import React from 'react'
import {connect} from "react-redux";
import CustomizedProgressBars from 'components/CustomizedProgressBars';
import MenuVert from 'components/menu-vert';

class Root extends React.Component {
    render() {
        return <div>
            <MenuVert/>
            <div className={"margin-bottom-15"}></div>
            {this.props.children}
        </div>
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Root)
