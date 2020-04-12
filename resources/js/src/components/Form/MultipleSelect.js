import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'
import { useInputChange } from '../Hooks/useInputChange'

const classes = {
    formControl: {
        margin: 1,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: 1,
    },
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 200,
            width: 250,
        },
    },
}

const MultipleSelect = ({ id, name, options = [], selected = [], onChange, labelId, labelTitle, classes }) => {
    const [input, handleInputChange] = useInputChange(selected)

    const handleChange = (e) => {
        handleInputChange(e)

        if (_.isFunction(onChange)) {
            onChange(e)
        }
    }

    const renderMenuItems = () => {
        return _.map(_.values(options), ({ name, id }) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
        ))
    }

    const renderChips = (selected) => {
        return <div className={classes.chips}>
            {selected.map((option, key) =>
                <Chip key={key} label={options[option].name} className={classes.chip}/>
            )}
        </div>
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id={labelId}>{labelTitle}</InputLabel>
                <Select
                    multiple
                    labelId={labelId}
                    id={id}
                    name={name}
                    value={input}
                    onChange={handleChange}
                    input={<Input id={id} name={name}/>}
                    renderValue={renderChips}
                    MenuProps={MenuProps}>

                    {renderMenuItems()}
                </Select>
            </FormControl>
        </div>
    )
}

MultipleSelect.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    labelId: PropTypes.string,
    selected: PropTypes.array,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default withStyles(classes)(MultipleSelect)
