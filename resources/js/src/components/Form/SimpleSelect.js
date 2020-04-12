import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useInputChange } from '../Hooks/useInputChange'

const classes = {
    formControl: {
        margin: 1,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: 2,
    },
}

const SimpleSelect = ({ selected = '', options, classes, label, id, name, handleChange } ) => {
    const [input, handleInputChange] = useInputChange(selected)

    const renderMenuItems = () => {
        return _.map(options, (option, $idx) => {
            return <MenuItem key={$idx} value={option.id}><em>{option.name}</em></MenuItem>
        })
    }

    const handleSelectionChange = (e) => {
        handleInputChange(e);

        if(_.isFunction(handleChange)) {
            handleChange(e.target.value);
        }
    }

    return <FormControl className={classes.formControl}>
        <InputLabel shrink id={id}>{label}</InputLabel>

        <Select
            displayEmpty
            labelId={id}
            className={classes.selectEmpty}
            onChange={handleSelectionChange}
            value={input}
            name={name}
            id={name}>
            {renderMenuItems()}
        </Select>
    </FormControl>
}

SimpleSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    selected: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    options: PropTypes.array.isRequired
}

export default withStyles(classes)(SimpleSelect)
