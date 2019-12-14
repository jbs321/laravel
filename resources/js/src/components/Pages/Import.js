import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {importFile} from 'actions/import';

const FileInput = (props) => (
    <input type="file" name="file-input" multiple {...props} />
);

class Import extends React.Component {
    constructor(props) {
        super(props);

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    renderField(field) {
        return (
            <div>
                <span>{field.label}</span>
                <TextField {...field.input} />
            </div>
        );
    }

    renderFileField(field) {
        return (
            <div>
                <span>{field.label}</span>
                <input id="file" name="file" type="file"/>
            </div>
        );
    }

    onSubmit(data) {
        data['file'] = this.state.file;
        this.props.importFile(data);
    }

    fileChangedHandler(event) {
        this.setState({file: event.target.files[0]});
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="page page-import container">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="name" label="Name" component={this.renderField}/>
                    <input name="file" type="file" onChange={this.fileChangedHandler}/>
                    <Button type="submit" variant="contained" color="primary">Primary</Button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    // if (!values.email) {
    //     errors.email = 'Missing Email';
    // }

    return errors;
}

function mapStateToProps(state) {
    return state;
}

export default reduxForm({
    validate,
    form: 'importForm'
})(connect(mapStateToProps, {importFile})(Import));
