import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import { fetchCategories, createCategory, deleteCategory, updateCategory } from 'actions/categories'

const columns = [{ title: 'Name', field: 'name' },]

class CategoryList extends React.Component {
    state = {
        isLoading: false,
    }

    componentDidMount () {
        if (_.isEmpty(this.props.categories)) {
            this.setState({ isLoading: true })

            this.props.fetchCategories().then(() => {
                this.setState({ isLoading: false })
            })
        }
    }

    handleUpdate = (newData, oldData) => {
        return this.props.updateCategory(newData)
    }

    handleCreate = (newData) => {
        return this.props.createCategory(newData)
    }

    handleDelete = (oldData) => {
        return this.props.deleteCategory(oldData)
    }

    submitRefresh = () => {
        this.setState({ isLoading: true })

        this.props.fetchCategories().then(() => {
            this.setState({ isLoading: false })
        })
    }

    render () {
        const { categories } = this.props

        return (<MaterialTable
            title="Category List"
            isLoading={this.state.isLoading}
            columns={columns}
            options={{
                pageSize: 10
            }}
            data={_.values(categories)}
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
            ]}
        />)
    }
}

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps, {
    fetchCategories,
    createCategory,
    deleteCategory,
    updateCategory
})(CategoryList)
