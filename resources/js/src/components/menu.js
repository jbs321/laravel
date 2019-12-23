import React from 'react';
import {Link, Router} from 'react-router-dom';

class Menu extends React.Component {
    render() {
        return (
                <div className="top-right links">
                    <Link to={'/'} className="nav-link"> Home </Link>
                    <Link to={'/import'} className="nav-link"> Import </Link>
                    <Link to={'/category'} className="nav-link"> Category </Link>
                    <Link to={'/login'} className="nav-link"> Login </Link>
                    <Link to={'/logout'} className="nav-link"> Logout </Link>
                </div>
        );
    }
}

export default Menu;
