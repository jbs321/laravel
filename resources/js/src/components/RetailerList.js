import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import { fetchRetailer, createRetailer, updateRetailer, deleteRetailer } from 'actions/retailers'
import { fetchCategories } from 'actions/categories'

const fakePromise = new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, 600)
})

class RetailerList extends React.Component {
    constructor (props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
    }

    componentDidMount () {
        const { fetchCategories, fetchRetailer } = this.props

        fetchRetailer()
        fetchCategories()
    }

    handleUpdate = (newData) => {
        this.props.updateRetailer(newData)

        return fakePromise
    }

    handleCreate (newData) {
        this.props.createRetailer(newData)
        return fakePromise
    }

    handleDelete (oldData) {
        this.props.deleteRetailer(oldData)
        return fakePromise
    }

    render () {
        const { retailers, categories } = this.props

        const categoriesById = {}
        _.each(categories, category => {
            categoriesById[category.id] = category.name
        })

        const columns = [
            { title: 'Name', field: 'name' },
            { title: 'Category', field: 'category', lookup: categoriesById }
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
