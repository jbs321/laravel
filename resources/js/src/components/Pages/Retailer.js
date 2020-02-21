import React from 'react';
import {Container, Grid} from '@material-ui/core';
import RetailerList from 'components/RetailerList';

class Retailer extends React.Component {
    render() {
        return (
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10}>
                        <RetailerList/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Retailer;
