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
    const [searchMenuAnchorEl, setSearchMenuAnchorEl] = useState(null);
    const [sidebarSearchMenuAnchorEl, setSidebarSearchMenuAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);
    const search = {
        "jobslisting": "Search for Jobs",
        "employerslisting": "Search for Employers",
        "candidateslisting": "Search for Candidates"
    }

    // sidebar navbar
    const sidebarSearchMenuOpen = Boolean(sidebarSearchMenuAnchorEl);
    const handleSidebarSearchMenuClick = (event) => {
        setSidebarSearchMenuAnchorEl(event.currentTarget);
    };
    const handleSidebarSearchMenuClose = () => {
        setSidebarSearchMenuAnchorEl(null);
    };

    // on full screen navbar
    const searchMenuOpen = Boolean(searchMenuAnchorEl);
    const handleSearchMenuClick = (event) => {
        setSearchMenuAnchorEl(event.currentTarget);
    };
    const handleSearchMenuClose = () => {
        setSearchMenuAnchorEl(null);
    };

    // profile icon
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
                    <ListItemButton onClick={handleSidebarSearchMenuClick} >
                        <NavLink className='navbar-link'> <ListItemText primary='Search' /> </NavLink>
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
            {/* -------------------Sidebar Search Submenu ----------------- */}
            <Menu
                anchorEl={sidebarSearchMenuAnchorEl}
                id="search-menu"
                className='navbar-sidebar-menu'
                open={sidebarSearchMenuOpen}
                onClose={handleSidebarSearchMenuClose}
                onClick={handleSidebarSearchMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: "42%",
                            left: -5,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'center' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
            >
                {Object.entries(search).map(([key, value], index) => {
                    return (
                        <NavLink
                            to={"/" + key}
                            className='text-decoration-none text-black'
                            key={index}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <AccountCircle fontSize="small" />
                                </ListItemIcon>
                                {value}
                            </MenuItem>
                        </NavLink>
                    )
                })
                }
            </Menu>
        </Box>
    );

    return (
        <>
            <nav className="nav-bar fixed-top">
                <div className="container-fluid w-100">
                    <NavLink to="/" className=" navbar-link"><img src={logoPath} alt="Autism Logo" className="img-fluid" height="150" width="150" /></NavLink>
                    <NavLink to="/" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Home</NavLink>
                    <NavLink
                        onClick={handleSearchMenuClick}
                        className='navbar-link main-navbar-link'
                        aria-controls={open ? 'search-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        style={{ color: "black" }}
                    >
                        Search
                    </NavLink>
                    <NavLink to="/blog" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Blog</NavLink>
                    <NavLink to="/faqs" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>FAQs</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => 'navbar-link main-navbar-link ' + (isActive ? 'active-link' : '')}>Contact</NavLink>

                    {/* ------------------- Search Submenu ----------------- */}
                    <Menu
                        anchorEl={searchMenuAnchorEl}
                        id="search-menu"
                        className='main-navbar-link'
                        open={searchMenuOpen}
                        onClose={handleSearchMenuClose}
                        onClick={handleSearchMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: "46%",
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    >
                        {Object.entries(search).map(([key, value], index) => {
                            return (
                                <NavLink
                                    to={"/" + key}
                                    className='text-decoration-none text-black'
                                    key={index}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <AccountCircle fontSize="small" />
                                        </ListItemIcon>
                                        {value}
                                    </MenuItem>
                                </NavLink>
                            )
                        })
                        }
                    </Menu>

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
                                className="profile-btn border-0 m-sm-2 mt-2"
                                onClick={handleClick}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <AccountCircleIcon />
                            </Button>
                        }
                        {!loading && loggedin && <Button variant="outlined" className="profile-btn border-0 m-sm-2 mt-2"><NotificationsIcon /></Button>}
                    </div>

                    {/* ------------------- Account Submenu ----------------- */}
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {<NavLink
                            to={type === "admin" ? "/admin" : type === "recruiter" ? "/employer" : type === "candidate" ? "/candidate" : ''}
                            className='text-decoration-none text-black'>
                            <MenuItem>
                                <ListItemIcon>
                                    <AccountCircle fontSize="small" />
                                </ListItemIcon>
                                Dashboard
                            </MenuItem>
                        </NavLink>}
                        <MenuItem onClick={logout} className='text-black'>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

                    <Button className="menu-btn float-end mx-0 m-sm-2 mt-2" onClick={toggleDrawer(true)}><MenuIcon /></Button>
                    <SwipeableDrawer
                        open={state}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        className='box navbar-side-bar'
                    >
                        {list()}
                    </SwipeableDrawer>
                    <LoginSignUpModal />
                </div>
            </nav>
            <nav style={{ height: "70px" }}></nav>
        </>
    );
}

export default Navbar;