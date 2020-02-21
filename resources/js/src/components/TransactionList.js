import React from 'react';
import MaterialTable from "material-table";
import {connect} from "react-redux";
import {fetchTransaction} from "actions/transactions";

const columns = [
    {title: "Account Type",  field: "account_type"},
    {title: "Account Number",  field: "account_number"},
    {title: "Transaction Date",  field: "transaction_date"},
    {title: "Cheque Number",  field: "cheque_number"},
    {title: "Description 1",  field: "description_1"},
    {title: "Description 2",  field: "description_2"},
    {title: "CAD",  field: "cad"},
    {title: "USD",  field: "usd"},
];

const fakePromise = new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, 600);
});

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        console.log('dsads');
        this.props.fetchTransaction();
    }

    handleUpdate(newData, oldData) {
        return fakePromise;
    }

    handleCreate(newData) {
        return fakePromise;
    }

    handleDelete(oldData) {
        return fakePromise;
    }

    render() {
        return (
            <MaterialTable
                title="Transaction List"
                columns={columns}
                options={{
                    pageSize:10
                }}
                data={this.props.transaction}
                editable={{
                    onRowAdd: this.handleCreate,
                    onRowUpdate: this.handleUpdate,
                    onRowDelete: this.handleDelete
                }}
            />
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchTransaction})(TransactionList);
