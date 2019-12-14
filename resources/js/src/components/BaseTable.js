import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const classes = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    first: {
        textTransform: "capitalize",
    },
    cell: {
        padding: 1,
    }
};

class BaseTable extends React.Component {
    renderHeaders(headers) {
        const {classes} = this.props;

        if(headers.length === 0) return;
        let firstColumn = _.first(headers);
        let columns = _.slice(headers, 1, headers.length);
        return <TableRow>
            <TableCell className={_.join([classes.first,classes.cell], " ")}>{firstColumn}</TableCell>
            {_.map(columns, (header) => <TableCell align="right" className={classes.cell} key={header}>{header}</TableCell>)}
        </TableRow>
    }

    renderRow(row, rowIndex) {
        const {classes} = this.props;

        let firstColumn = _.first(row);
        let columns = _.slice(row, 1, row.length);

        return (
            <TableRow key={rowIndex}>
                <TableCell className={_.join([classes.first,classes.cell], " ")} component="th" scope="row">{firstColumn}</TableCell>
                {_.map(columns, (column, columnIdx) => <TableCell className={classes.cell} align="right" key={_.join([rowIndex,columnIdx],"_")}>{column}</TableCell>)}
            </TableRow>
        );
    }

    renderRows(rows) {
        return _.map(rows, (row, rowIndex) => this.renderRow(row, rowIndex))
    }

    render() {
        const {classes, rows, headers} = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        {this.renderHeaders(headers)}
                    </TableHead>
                    <TableBody>
                        {this.renderRows(rows, headers)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

BaseTable.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
};

export default withStyles(classes)(BaseTable);
