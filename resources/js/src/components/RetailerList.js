import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import { fetchRetailer, createRetailer, updateRetailer, deleteRetailer } from 'actions/retailers'
import { fetchCategories } from 'actions/categories'
import MultipleSelect from './Form/MultipleSelect'
import Chip from '@material-ui/core/Chip'

const fakePromise = new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, 600)
})

class RetailerList extends React.Component {
    componentDidMount () {
        const { fetchCategories, fetchRetailer } = this.props

        fetchRetailer()
        fetchCategories()
    }

    handleUpdate = (newData) => {
        this.props.updateRetailer(newData)
        return fakePromise
    }

    handleCreate = (newData) => {
        this.props.createRetailer(newData)
        return fakePromise
    }

    handleDelete = (oldData) => {
        this.props.deleteRetailer(oldData)
        return fakePromise
    }

    renderSelect = (props) => {
        const options = _.map(this.props.categories, 'name')
        const selected = props.value

        return <MultipleSelect
            options={options}
            selected={selected}
            onChange={e => {
                const data = { ...props.rowData }
                data[props.columnDef.field] = e.target.value
                props.onRowDataChange(data)
            }}/>
    }

    renderChips = (rowData) => {
        if(rowData.categories === undefined) {
            return null;
        }
        return <div style={{display: 'flex',flexWrap: 'wrap',}}>
            {rowData.categories.map(value => (<Chip key={value} label={value} style={{ margin: 2 }}/>))}
        </div>
    }

    render () {
        const { retailers } = this.props

        const columns = [
            {
                title: 'Name',
                field: 'name'
            },
            {
                title: 'Categories',
                field: 'categories',
                editComponent: this.renderSelect,
                render: this.renderChips
            },
        ]

        return (
            <MaterialTable
                title="Retailer List"
                columns={columns}
                options={{
                    pageSize: 10,
                    selection: true
                }}
                data={_.values(retailers)}
                editable={{
                    onRowAdd: this.handleCreate,
                    onRowUpdate: this.handleUpdate,
                    onRowDelete: this.handleDelete
                }}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: this.props.fetchRetailer,
                    },
                    {
                        tooltip: 'Remove All Selected Users',
                        icon: 'delete',
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    }
                ]}
            />
        )
    }
}

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps, {
    fetchRetailer,
    createRetailer,
    deleteRetailer,
    updateRetailer,
    fetchCategories
})(RetailerList)
