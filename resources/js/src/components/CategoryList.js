import React from 'react';
import MaterialTable from "material-table";
import {connect} from "react-redux";
import {fetchCategories, createCategory, deleteCategory} from "../actions/categories";

const columns = [
    {title: 'Name', field: 'name'},
];

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
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    this.setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return {...prevState, data};
                    });
                }
            }, 600);
        });
    }

    handleCreate(newData) {
        this.props.createCategory(newData);

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    }

    handleDelete(oldData) {
        this.props.deleteCategory(oldData);

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    }

    render() {
        return (
            <MaterialTable
                title="Category List"
                columns={columns}
                data={this.props.categories}
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


export default connect(mapStateToProps, {createCategory, fetchCategories, deleteCategory})(CategoryList);
