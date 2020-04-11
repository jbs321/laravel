import React from 'react'
import { connect } from 'react-redux'
import { fetchAnnualSummary } from 'actions/logs'
import MaterialTable, { MTableToolbar } from 'material-table'
import { Container, Grid } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core'

const commonColumnStyle = {
    cellStyle: {
        padding: '4px',
    }
}
const renderColumn = (rowKey, rowData) => {
    const val = rowData[rowKey]

    if (0 === val) {
        return <span style={{color: "#c5c5c5"}}>{val}</span>
    } else {
        return val;
    }

}

const column = [
    { title: 'Category', field: 'Category', cellStyle: { ...commonColumnStyle.cellStyle, minWidth: '250px' } },
    { title: 'Jan.', field: 'January', render: (rowData) => renderColumn('January', rowData), ...commonColumnStyle },
    { title: 'Feb.', field: 'February', render: (rowData) => renderColumn('February', rowData), ...commonColumnStyle },
    { title: 'Mar.', field: 'March', render: (rowData) => renderColumn('March', rowData), ...commonColumnStyle },
    { title: 'Apr.', field: 'April', render: (rowData) => renderColumn('April', rowData), ...commonColumnStyle },
    { title: 'May.', field: 'May', render: (rowData) => renderColumn('May', rowData), ...commonColumnStyle },
    { title: 'Jun.', field: 'June', render: (rowData) => renderColumn('June', rowData), ...commonColumnStyle },
    { title: 'Jul.', field: 'July', render: (rowData) => renderColumn('July', rowData), ...commonColumnStyle },
    { title: 'Aug.', field: 'August', render: (rowData) => renderColumn('August', rowData), ...commonColumnStyle },
    {
        title: 'Sep.',
        field: 'September',
        render: (rowData) => renderColumn('September', rowData), ...commonColumnStyle
    },
    { title: 'Oct.', field: 'October', render: (rowData) => renderColumn('October', rowData), ...commonColumnStyle },
    { title: 'Nov.', field: 'November', render: (rowData) => renderColumn('November', rowData), ...commonColumnStyle },
    { title: 'Dec.', field: 'December', render: (rowData) => renderColumn('December', rowData), ...commonColumnStyle },
]

class Dashboard extends React.Component {
    state = {
        year: 2020,
    }

    componentDidMount () {
        this.props.fetchAnnualSummary()
    }

    handleYearChange = (e) => {
        const year = e.target.value
        this.setState({ year: year })
        this.props.fetchAnnualSummary(year)
    }

    render () {
        return (
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10}>
                        <MaterialTable
                            title="Annual Overview"
                            columns={column}
                            data={this.props.logs}
                            options={{
                                paging: false,
                                rowStyle: {
                                    height: '10px'
                                },
                                headerStyle: { padding: '3px' },
                            }}
                            components={{
                                Toolbar: props => (
                                    <div>
                                        <MTableToolbar {...props} />
                                        <div style={{ padding: '0px 10px' }}>
                                            <InputLabel id="select-year-label">Year</InputLabel>
                                            <Select
                                                labelId="select-year-label"
                                                id="year-select"
                                                value={this.state.year}
                                                onChange={this.handleYearChange}
                                            >
                                                <MenuItem value={2018}>2018</MenuItem>
                                                <MenuItem value={2019}>2019</MenuItem>
                                                <MenuItem value={2020}>2020</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps, { fetchAnnualSummary })(Dashboard)
