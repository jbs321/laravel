import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import {
    fetchRetailer,
    createRetailer,
    updateRetailer,
    deleteRetailer,
    updateRetailersWithCategoryId,
    deleteRetailers
} from 'actions/retailers'
import { fetchCategories } from 'actions/categories'
import Chip from '@material-ui/core/Chip'
import MTableListToolbar from './MaterialTable/MtableListToolbar'
import CategorySelect from './Form/CategorySelect'
import MultipleSelectCategories from './Form/MultipleSelectCategories'

class RetailerList extends React.Component {
    state = {
        isLoading: false,
        multiSelect: {
            categoryId: '',
        }
    }

    componentDidMount () {
        if (_.isEmpty(this.props.retailers)) {
            this.toggleLoader(true)
            this.props.fetchRetailer().then(() => {
                this.toggleLoader(false)
            })
        }

        if (_.isEmpty(this.props.categories)) {
            this.toggleLoader(true)
            this.props.fetchCategories().then(() => {
                this.toggleLoader(false)
            })
        }

    }

    handleMultipleUpdate = (categoryId) => {
        this.setState({ multiSelect: { categoryId: categoryId } })
    }

    submitMultiRemove = (evt, data) => {
        this.toggleLoader(true)
        this.props.deleteRetailers(_.map(data, row => row.id)).then(() => {
            this.props.fetchRetailer().then(() => {
                this.toggleLoader(false)
            })
        })
    }

    toggleLoader = (isLoading) => {
        if (!_.isBoolean(isLoading)) throw new Error('isLoading must be boolean')
        this.setState({ isLoading: isLoading })
    }

    submitMultiUpdate = (evt, data) => {
        const { multiSelect: { categoryId } } = this.state
        const { fetchRetailer, updateRetailersWithCategoryId } = this.props

        if (!categoryId) {
            return null
        }

        this.toggleLoader(true)
        return updateRetailersWithCategoryId(categoryId, data).then(() => {
            fetchRetailer().then(() => {
                this.toggleLoader(false)
            })
        })
    }

    handleCreate = (newData) => {
        return this.props.createRetailer(newData)
    }

    handleUpdate = (newData) => {
        return this.props.updateRetailer(newData)
    }

    handleDelete = (oldData) => {
        return this.props.deleteRetailer(oldData)
    }

    renderSelect = ({ value = [], rowData, columnDef, onRowDataChange }) => {
        const selected = _.map(_.keys(_.keyBy(value, 'id')), val => parseInt(val));

        return <MultipleSelectCategories
            selected={selected}
            onChange={e => {
                const data = { ...rowData }
                data[columnDef.field] = e.target.value
                onRowDataChange(data)
            }}/>
    }

    renderChips = (rowData) => {
        if (rowData.categories === undefined) {
            return null
        }

        return <div style={{ display: 'flex', flexWrap: 'wrap', }}>
            {rowData.categories.map(category => (
                <Chip key={category.id} label={category.name} style={{ margin: 2 }}/>))}
        </div>
    }

    renderToolbar = (props) => {
        const { categoryId } = this.state.multiSelect
        const select = <CategorySelect selected={categoryId} handleChange={this.handleMultipleUpdate}/>

        return <MTableListToolbar {...props} selectedRowsComponent={select}/>
    }

    submitRefresh = () => {
        this.toggleLoader(true)
        this.props.fetchRetailer().then(() => {
            this.toggleLoader(false)
        })
    }

    render () {
        const { retailers } = this.props

        const columns = [
            {
                title: 'Name',
                field: 'name',
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
                isLoading={this.state.isLoading}
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
                        onClick: this.submitRefresh,
                    },
                    {
                        tooltip: 'Update Rows',
                        icon: 'update',
                        onClick: this.submitMultiUpdate
                    },
                    {
                        tooltip: 'Remove Rows',
                        icon: 'delete',
                        onClick: this.submitMultiRemove
                    },
                ]}

                components={{ Toolbar: this.renderToolbar }}
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
    fetchCategories,
    updateRetailersWithCategoryId,
    deleteRetailers,
})(RetailerList)
