import React from 'react'
import { connect } from 'react-redux'
import { fetchRetailer } from 'actions/retailers'
import SimpleSelect from './SimpleSelect'
import PropTypes from 'prop-types'

class RetailerSelect extends React.Component {
    componentDidMount () {
        if(_.isEmpty(this.props.retailers)) {
            this.props.fetchRetailer()
        }
    }

    render () {
        const { retailers, selected, handleChange } = this.props
        return <SimpleSelect handleChange={handleChange} selected={selected} name="retailers" id="retailers" options={_.values(retailers)} label={'Retailers'}/>
    }
}

RetailerSelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
}

export default connect(state => state, { fetchRetailer })(RetailerSelect)
