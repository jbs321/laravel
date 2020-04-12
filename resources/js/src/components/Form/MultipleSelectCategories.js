import React from 'react'
import MultipleSelect from './MultipleSelect'
import { fetchCategories } from 'actions/categories'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MultipleSelectCategories extends React.Component {
    componentDidMount () {
        const { categories, fetchCategories } = this.props

        if (_.isEmpty(categories)) {
            fetchCategories()
        }
    }

    render () {
        const { categories, onChange, selected = [] } = this.props
        return <MultipleSelect
            id={'category-multi-select'}
            name={'category-multi-select'}
            labelId={'category-multi-select-label-id'}
            options={categories}
            selected={selected}
            onChange={onChange}
        />
    }
}

MultipleSelect.propTypes = {
    selected: PropTypes.array,
    onChange: PropTypes.func.isRequired,
}

export default connect(state => state, { fetchCategories })(MultipleSelectCategories)
