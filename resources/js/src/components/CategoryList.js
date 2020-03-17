import React from 'react';
import MaterialTable from "material-table";
import {connect} from "react-redux";
import {fetchCategories, createCategory, deleteCategory, updateCategory} from "actions/categories";

const columns = [{title: 'Name', field: 'name'},];

const fakePromise = new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, 600);
});

class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleUpdate(newData, oldData) {
        this.props.updateCategory(newData);

        return fakePromise;
    }

    handleCreate(newData) {
        this.props.createCategory(newData);

        return fakePromise;
    }

    handleDelete(oldData) {
        this.props.deleteCategory(oldData);

        return fakePromise;
    }

    render() {
        const {categories} = this.props;

        return (<MaterialTable
                title="Category List"
                columns={columns}
                options={{
                    pageSize: 10
                }}
                data={_.values(categories)}
                editable={{
                    onRowAdd: this.handleCreate, onRowUpdate: this.handleUpdate, onRowDelete: this.handleDelete
                }}
            />);
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchCategories, createCategory, deleteCategory, updateCategory})(CategoryList);
