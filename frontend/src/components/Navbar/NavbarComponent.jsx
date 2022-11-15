import React from 'react'
import { NavLink } from 'react-router-dom';
import logoPath from '../../images/logo-semiconreferrals-rectangle.png';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, SwipeableDrawer, Button, List, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import './Navbar.css';

const Navbar = () => {

    const [state, setState] = React.useState(false);

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
                <ListItem className="d-flex justify-content-center">
                    <div>
                        <Button variant="contained">Login / Register</Button>
                        <Button variant="contained" className="d-none">Add Job</Button>
                    </div>
                </ListItem>
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
            <nav className="nav-bar">
                {/* <button class='menu-btn' id='menu-btn'><MenuIcon /></button> */}
                <div className="container-fluid w-100">
                    <NavLink to="#" className=" navbar-link"><img src={logoPath} alt="Autism Logo" className="img-fluid" height="150" width="150" /></NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Home</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Find Jobs</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Employers</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Candidates</NavLink>
                    <NavLink to="#" className="navbar-link main-navbar-link">Blog</NavLink>
                    <div className='float-end py-1 main-navbar-link'>
                        <Button variant="contained" className="mx-1">Login / Register</Button>
                        <Button variant="contained" className="d-none">Add Job</Button>
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
                </div>
            </nav>
        </>
    );
}

export default Navbar;