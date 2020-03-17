import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
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
        marginTop: theme.spacing(3),
    },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles (name, optionsName, theme) {
    return {
        fontWeight:
            optionsName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleSelect (props) {
    const classes = useStyles()
    const theme = useTheme()

    const [optionName, setOptionName] = React.useState(props.selected)

    const handleChange = event => {
        setOptionName(event.target.value);
        props.onChange(event);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Select Category</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={optionName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}>

                    {props.options.map(name => (
                        <MenuItem key={name} value={name} style={getStyles(name, optionName, theme)}>
                            {name}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    )
}

MultipleSelect.propTypes = {
    selected: PropTypes.array,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}
