import React from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from 'actions/categories'
import SimpleSelect from './SimpleSelect'
import PropTypes, { number } from 'prop-types'

class CategorySelect extends React.Component {
    componentDidMount () {
        if (_.isEmpty(this.props.categories)) {
            this.props.fetchCategories()
        }
    }

    render () {
        const { selected = '', categories, handleChange } = this.props

        return <SimpleSelect
            id="categories"
            name="categories"
            selected={selected}
            label={'Categories'}
            options={_.values(categories)}
            handleChange={handleChange}
        />
    }
}

CategorySelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default connect(state => state, { fetchCategories })(CategorySelect)
