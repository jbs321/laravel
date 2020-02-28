import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import { fetchTransaction, updateTransaction } from 'actions/transactions'
import { fetchRetailer } from 'actions/retailers'

const fakePromise = new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, 600)
})

class TransactionList extends React.Component {
    componentDidMount () {
        if(_.isEmpty(this.props.retailers)) {
            this.props.fetchRetailer()
        }

        if(_.isEmpty(this.props.transactions)) {
            this.props.fetchTransaction()
        }
    }

    handleUpdate = (newData) => {
        return this.props.updateTransaction(newData);
    }

    handleCreate = (newData) => {
        return fakePromise
    }

    handleDelete = (oldData) => {
        return fakePromise
    }

    render () {
        let lookup = {}
        const { retailers, transactions } = this.props

        _.each(retailers, (retailer) => {
            lookup[retailer.id] = retailer.name
        })

        const columns = [
            { title: 'Account Type', field: 'account_type' },
            { title: 'Transaction Date', field: 'transaction_date' },
            { title: 'Retailer', field: 'retailer_id', lookup: lookup },
            { title: 'Description 1', field: 'description_1', cellStyle: { fontSize: 10, minWidth: 300, } },
            { title: 'CAD', field: 'cad' },]

        return (<MaterialTable
            title="Transaction List"
            columns={columns}
            options={{
                pageSize: 10
            }}
            data={_.flatMap(transactions)}

            editable={{
                onRowAdd: this.handleCreate,
                onRowUpdate: this.handleUpdate,
                onRowDelete: this.handleDelete
            }}

            actions={[
                {
                    tooltip: 'Remove All Selected Users',
                    icon: 'delete',
                    onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                }
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

export default connect(mapStateToProps, { fetchTransaction, updateTransaction, fetchRetailer })(TransactionList)
