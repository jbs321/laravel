import React from 'react';
import {Container, Grid} from '@material-ui/core';
import TransactionList from 'components/TransactionList';

class Transaction extends React.Component {
    render() {
        return (<Container>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={10}>
                    <div>
                        <TransactionList/>
                    </div>
                </Grid>
            </Grid>
        </Container>);
    }
}

export default Transaction;
