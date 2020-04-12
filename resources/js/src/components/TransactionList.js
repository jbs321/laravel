import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import {
    fetchTransaction,
    updateTransactionRetailer,
    deleteTransaction,
    createTransaction,
    updateTransaction
} from 'actions/transactions'
import { fetchRetailer } from 'actions/retailers'
import MTableListToolbar from './MaterialTable/MtableListToolbar'
import RetailerSelect from './Form/RetailerSelect'
import Chip from '@material-ui/core/Chip'
import MultipleSelectCategories from './Form/MultipleSelectCategories'

class TransactionList extends React.Component {
    state = {
        isLoading: false,
        multiSelect: {
            retailerId: '',
        }
    }

    componentDidMount () {
        if (_.isEmpty(this.props.transactions)) {
            this.setState({ isLoading: true })

            this.props.fetchTransaction().then(() => {
                this.props.fetchRetailer().then(() => {
                    this.setState({ isLoading: false })
                })
            })


        }
    }

    handleUpdate = (newData) => {
        return this.props.updateTransaction(newData)
    }

    handleCreate = (newData) => {
        return this.props.createTransaction(newData)
    }

    handleDelete = (oldData) => {
        return this.props.deleteTransaction(oldData)
    }

    handleMultipleUpdate = (retailerId) => {
        this.setState({ multiSelect: { retailerId: retailerId } })
    }

    submitMultiUpdate = (evt, data) => {
        const { retailers, updateTransactionRetailer } = this.props
        const { retailerId } = this.state.multiSelect

        this.setState({ isLoading: true })
        updateTransactionRetailer(retailers[retailerId], data).then(() => {
            this.setState({ isLoading: false })
        })
    }

    submitRefresh = () => {
        this.setState({ isLoading: true })

        this.props.fetchTransaction().then(() => {
            this.setState({ isLoading: false })
        })
    }

    renderToolbar = (props) => {
        const select = <RetailerSelect handleChange={this.handleMultipleUpdate}/>

        return <MTableListToolbar {...props} selectedRowsComponent={select}/>
    }

    renderChips = (rowData) => {
        const { retailer } = rowData

        if (!retailer) return null

        return <div style={{ display: 'flex', flexWrap: 'wrap', }}>
            <Chip key={retailer.id} label={retailer.name} style={{ margin: 2 }}/>
        </div>
    }

    renderSelect = ({ value = '', rowData, columnDef, onRowDataChange }) => {
        return <RetailerSelect
            selected={value ? value : ''}
            handleChange={value => {
                const data = { ...rowData }
                data[columnDef.field] = value
                onRowDataChange(data)
            }}/>
    }

    render () {
        const { retailers, transactions } = this.props

        const columns = [
            { title: 'Account Type', field: 'account_type' },
            { title: 'Transaction Date', field: 'transaction_date' },
            {
                title: 'Retailer', field: 'retailer_id',
                lookup: retailers,
                editComponent: this.renderSelect,
                render: this.renderChips
            },
            { title: 'Description 1', field: 'description_1', cellStyle: { fontSize: 10, minWidth: 300, } },
            { title: 'CAD', field: 'cad' },
        ]

        return (<MaterialTable
            components={{ Toolbar: this.renderToolbar }}
            title="Transaction List"
            columns={columns}
            options={{
                selection: true,
                pageSize: 10
            }}
            isLoading={this.state.isLoading}
            data={_.values(transactions)}
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
            ]}

            //Panel
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            detailPanel={rowData => (
                <div>
                    Account Number: {rowData.account_number} <br/>
                    Description2: {rowData.description_2}<br/>
                    USD: {rowData.usd} <br/>
                    Cheque Number: {rowData.cheque_number} <br/>
                </div>
            )}
        />)
    }
}

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps, {
    fetchTransaction,
    fetchRetailer,
    updateTransactionRetailer,
    deleteTransaction,
    createTransaction,
    updateTransaction
})(TransactionList)
