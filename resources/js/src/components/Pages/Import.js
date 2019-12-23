import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import {importFile} from 'actions/import';
import {withStyles} from '@material-ui/core/styles';

const classes = {
    header: {
        margin: "10px auto",
        fontSize: "4vw",
    }
};

class Import extends React.Component {
    constructor(props) {
        super(props);

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    onSubmit(data) {
        if(undefined === this.state.file) return;

        data['file'] = this.state.file;
        this.props.importFile(data);
    }

    fileChangedHandler(event) {
        this.setState({file: event.target.files[0]});
    };

    render() {
        const {handleSubmit, classes: {header}} = this.props;

        return (
            <div className="page page-import container">
                <div className={header}>Import RBC Bank Statement (.csv format)</div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                        <input accept=".csv" name="file" type="file" onChange={this.fileChangedHandler}/>
                        <Button type="submit" variant="contained" color="primary">Import</Button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default reduxForm({form: 'importForm'})(connect(mapStateToProps, {importFile})(withStyles(classes)(Import)));
