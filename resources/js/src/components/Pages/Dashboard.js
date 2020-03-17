import React from 'react'
import {connect} from "react-redux"
import {fetchAnnualSummary} from 'actions/logs'
import BaseTable from "components/BaseTable";

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchAnnualSummary();
    }

    render() {
        console.log(this.props)
        const {data, headers} = this.props.logs;
        return (
            <div className="page page-dashboard container">
                <BaseTable
                    headers={headers}
                    rows={data} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchAnnualSummary})(Dashboard);
