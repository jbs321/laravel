import React from 'react';
import {Container, Grid} from '@material-ui/core';
import CategoryList from "components/CategoryList";

class Category extends React.Component {
    render() {
        return (
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10}>
                        <CategoryList/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Category;
