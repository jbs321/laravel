import React from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from 'actions/categories'
import SimpleSelect from './SimpleSelect'
import PropTypes from 'prop-types'

class CategorySelect extends React.Component {
    componentDidMount () {
        if(_.isEmpty(this.props.categories)) {
            this.props.fetchCategories()
        }
    }

    render () {
        const { categories, handleChange } = this.props

        return <SimpleSelect
            id="categories"
            name="categories"
            label={'Categories'}
            options={_.values(categories)}
            handleChange={handleChange}
        />
    }
}

CategorySelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
}


export default connect(state => state, { fetchCategories })(CategorySelect)
