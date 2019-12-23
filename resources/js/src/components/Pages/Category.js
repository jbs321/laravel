import React from 'react';
import CategoryForm from "components/Form/CategoryForm";
import {Grid, Container} from '@material-ui/core';
import BaseTable from "../BaseTable";
import CategoryList from "components/CategoryList";

class Category extends React.Component {
    render() {
        return (
            <Container>
            <Grid container spacing={1}>
                <CategoryList/>
            </Grid>
            </Container>
        );
    }
}

export default Category;
