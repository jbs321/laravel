import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";

const classes = {
    formControl: {
        margin: 1,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: 2,
    },
};

class SimpleSelect extends React.Component {

    handleChange(event) {
        console.log('dasasdsa');
    }

    render() {
        const {classes} = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">{this.props.label}</InputLabel>

                <Select
                    onChange={(val) => console.log(val)}
                    displayEmpty
                    className={classes.selectEmpty}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    {_.map(this.props.options, (option, $idx) => <MenuItem key={$idx} value={option.value}><em>{option.name}</em></MenuItem>)}
                </Select>
                <FormHelperText>Label + placeholder</FormHelperText>
            </FormControl>
        );
    };
}

SimpleSelect.propTypes = {
    label: PropTypes.string.isRequired,
    // handleChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default withStyles(classes)(SimpleSelect);

// export function SimpleSelectWithError() {
//     const classes = useStyles();
//
//     const handleChange = event => {
//         console.log('dasasdsa')
//     };
//
//     return (
//         <FormControl className={classes.formControl} error>
//             <InputLabel id="demo-simple-select-error-label">Name</InputLabel>
//             <Select
//                 labelId="demo-simple-select-error-label"
//                 id="demo-simple-select-error"
//                 value={age}
//                 onChange={handleChange}
//                 renderValue={value => `⚠️  - ${value}`}
//             >
//                 <MenuItem value="">
//                     <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={10}>Ten</MenuItem>
//                 <MenuItem value={20}>Twenty</MenuItem>
//                 <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//             <FormHelperText>Error</FormHelperText>
//         </FormControl>
//     );
// }

