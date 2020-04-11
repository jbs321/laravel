import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import Toolbar from '@material-ui/core/Toolbar'
import * as React from 'react'
import PropTypes from 'prop-types';

class ToolbarWithCustomActions extends React.Component{
    render () {
        return <Toolbar>
            <FormControl>
                <InputLabel id="multi-assign-label">Retailer</InputLabel>
                <Select labelId="multi-assign-label"
                        onChange={this.updateState}
                        value={1}
                        style={{ minWidth: 100 }}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>
            <IconButton onClick={this.updateTransaction}>
                <SaveIcon/>
            </IconButton>
        </Toolbar>
    }
}

ToolbarWithCustomActions.propTypes = {
    actions: PropTypes.array,
}

export default ToolbarWithCustomActions;
