import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import logoPath from '../../images/logo-semiconreferrals-rectangle.png';
import { AccountCircle, Logout, Menu as MenuIcon } from '@mui/icons-material';
import { Box, SwipeableDrawer, Button, List, Divider, ListItem, ListItemButton, ListItemText, Menu, MenuItem, ListItemIcon } from '@mui/material';
import './Navbar.css';
import LoginSignUpModal from '../Login-SignUp/LoginSignUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

const Navbar = () => {

    const [state, setState] = useState(false);
    const [loggedin, setLoggedin] = useState(false);
    const [type, setType] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const tokenVerify = async () => {
            if (token) {
                await axios.post("http://localhost:5000/verify-token", { token })
                    .then((data) => data.data)
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem("type", data.tokenData.type);
                            setType(data.tokenData.type);
                            setLoggedin(true);
                            setLoading(false);
                        } else {
                            localStorage.clear();
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        localStorage.clear();
                        window.location.reload();
                    });
            } else {
                setLoading(false);
            }
        }
        tokenVerify();
    }, [])

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                {!loading && !loggedin &&
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
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/' className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}> <ListItemText primary='Home' /> </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/search' className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}> <ListItemText primary='Search' /> </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/blog' className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}> <ListItemText primary='Blog' /> </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/faqs' className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}> <ListItemText primary='FAQs' /> </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/contact' className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}> <ListItemText primary='Contact' /> </NavLink>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <nav className="nav-bar fixed-top">
                <div className="container-fluid w-100">
                    <NavLink to="/" className=" navbar-link"><img src={logoPath} alt="Autism Logo" className="img-fluid" height="150" width="150" /></NavLink>
                    <NavLink to="/" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Home</NavLink>
                    <NavLink to="/search" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Search</NavLink>
                    <NavLink to="/blog" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Blog</NavLink>
                    <NavLink to="/faqs" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>FAQs</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Contact</NavLink>
                    <div className='float-end'>
                        {!loading && !loggedin &&
                            <span className="main-navbar-link" data-bs-toggle="modal" data-bs-target="#loginSignUpModal">
                                <Button variant="contained" className="mx-1">
                                    Login / Register
                                </Button>
                            </span>
                        }
                        {!loading && loggedin &&
                            <Button
                                variant="outlined"
                                className="profile-btn border-0 py-1"
                                onClick={handleClick}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <AccountCircleIcon fontSize='large' />
                            </Button>
                        }
                        {!loading && loggedin && <Button variant="outlined" className="profile-btn border-0 py-1"><NotificationsIcon fontSize='large' /></Button>}
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            {type === "recruiter" && <NavLink to="/employer" className='text-decoration-none text-black'>Dashboard</NavLink>}
                            {type === "admin" && <NavLink to="/admin" className='text-decoration-none text-black'>Dashboard</NavLink>}
                            {type === "candidate" && <NavLink to="/candidate" className='text-decoration-none text-black'>Dashboard</NavLink>}
                        </MenuItem>
                        <MenuItem onClick={logout} className='text-black'>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                    <Button className="menu-btn float-end mx-0 my-2" onClick={toggleDrawer(true)}><MenuIcon /></Button>
                    <SwipeableDrawer
                        open={state}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        className='box'
                    >
                        {list()}
                    </SwipeableDrawer>
                    <LoginSignUpModal />
                </div>
            </nav>
        </>
    );
}

export default Navbar;