import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';


const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    const logOut = () => {
        dispatch({type: 'LOGOUT' });
        history.push('/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    // logged in
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography classname={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button varaint="contained" className={classes.logout} color="secondary" onClick={logOut}>Log Out</Button>
                    </div>
                ) : (
                    // not logged in
                    <Button component={Link} to="/auth" varaint="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;



