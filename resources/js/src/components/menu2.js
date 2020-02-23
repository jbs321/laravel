import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useHistory} from 'react-router-dom';

const options = [{name: "Home", path: '/'}, {name: "Import", path: '/import'}, {
    name: "Category",
    path: '/category'
}, {name: "Retailer", path: '/retailer'}, {name: "Transaction", path: '/transactions'}, {
    name: "Login",
    path: '/login'
}, {name: "Logout", path: '/logout'}];

const ITEM_HEIGHT = 48;

const Menu2 = (props) => {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
        history.push(option.path);
    };

    return (<div>
        <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <MoreVertIcon/>
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5, width: 200,
                },
            }}
        >
            {options.map(option => (// selected={option === 'Pyxis'}
                <MenuItem key={option.name} onClick={() => handleClose(option)}>
                    {option.name}
                </MenuItem>))}
        </Menu>
    </div>);
};

export default Menu2;
