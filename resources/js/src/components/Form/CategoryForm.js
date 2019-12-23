import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {TextField} from '@material-ui/core';
import {createCategory} from 'actions/categories';
import {connect} from "react-redux";

const validate = values => {
    const errors = {};
    const requiredFields = ['name'];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });

    return errors;
};

class CategoryForm extends React.Component {
    renderTextField({heplerText, input, label, meta: {touched, error}, ...custom}) {
        return (
            <div>
                <TextField placeholder={label} helperText={heplerText} {...input} {...custom}/>
            </div>
        );
    }

    onSubmit(data) {
        this.props.createCategory(data)
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="category_name" component={this.renderTextField} heplerText="Category Name" label="e.g. Food"/>

                <div style={{marginTop: 10}}>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default reduxForm({
    form: 'CategoryForm',
    validate
})(connect(mapStateToProps, {createCategory})(CategoryForm));
