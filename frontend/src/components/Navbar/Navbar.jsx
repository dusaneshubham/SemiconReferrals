import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import logoPath from '../../images/logo-semiconreferrals-rectangle.png';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, SwipeableDrawer, Button, List, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import './Navbar.css';
import LoginSignUpModal from '../Login-SignUp/LoginSignUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {

    const [state, setState] = React.useState(false);
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedin(true);
        }
    }, [])

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                {!loggedin &&
                    <ListItem className="d-flex justify-content-center">
                        <div>
                            <span data-bs-toggle="modal" data-bs-target="#loginSignUpModal">
                                <Button variant="contained" onClick={() => setState(false)}>
                                    Login / Register
                                </Button>
                            </span>
                        </div>
                    </ListItem>
                }
                <Divider />
                {['Home', 'Find Jobs', 'Employers', 'Candidates', 'Blog'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <NavLink to={'/' + text} className='navbar-link'> <ListItemText primary={text} /> </NavLink>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <nav className="nav-bar fixed-top">
                <div className="container-fluid w-100">
                    <NavLink to="#" className=" navbar-link"><img src={logoPath} alt="Autism Logo" className="img-fluid" height="150" width="150" /></NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Home</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Find Jobs</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Employers</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Candidates</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Blog</NavLink>
                    <div className='float-end'>
                        {!loggedin &&
                            <span className="main-navbar-link" data-bs-toggle="modal" data-bs-target="#loginSignUpModal">
                                <Button variant="contained" className="mx-1">
                                    Login / Register
                                </Button>
                            </span>
                        }
                        {loggedin && <Button variant="outlined" className="profile-btn border-0 py-1"><AccountCircleIcon fontSize='large' /></Button>}
                        {loggedin && <Button variant="outlined" className="profile-btn border-0 py-1"><NotificationsIcon fontSize='large' /></Button>}
                    </div>
                    <React.Fragment>
                        <Button className="menu-btn float-end mx-0 my-2" onClick={toggleDrawer(true)}><MenuIcon /></Button>
                        <SwipeableDrawer
                            open={state}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            className='box'
                        >
                            {list()}
                        </SwipeableDrawer>
                    </React.Fragment>
                    <LoginSignUpModal />
                </div>
            </nav>
        </>
    );
}

export default Navbar;