import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Home, Person, ManageAccounts, Description, AssignmentTurnedIn, Bookmark, PeopleAlt, Logout
} from "@mui/icons-material";
import axios from 'axios';
import Navbar from "../../../components/Navbar/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const sideNavbar = {
    "Dashboard": "dashboard",
    "View Profile": "viewprofile/" + id,
    "Update Profile": "updateprofile",
    "My Resumes": "myresumes",
    "Applied Jobs": "appliedjobs",
    "Saved Jobs": "savedjobs",
    "Followed Employers": "followedemployers",
  };

  const obj = [<Home />, <Person />, <ManageAccounts />, <Description />, <AssignmentTurnedIn />, <Bookmark />, <PeopleAlt />];

  const tooltips = ["Dashboard", "View Profile", "Update Profile", "My Resumes", "Applied Jobs", "Saved Jobs", "Followed Employers"];

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  // authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    const auth = async () => {
      if (token) {
        await axios.post("http://localhost:5000/verify-token", { token })
          .then((res) => res.data)
          .then((res) => {
            if (!res.success || res.tokenData.type !== "candidate") {
              navigate('/');
            } else {
              setId(res.tokenData._id);
              setName(res.data.name);
              setLoading(false);
            }
          }).catch((err) => {
            console.log(err);
            navigate('/');
          });
      } else {
        navigate('/');
      }
    }

    auth();
  }, [navigate]);

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!loading) {
    return (
      <>
      <Navbar/>
      <Box sx={{ display: "flex" }} className="main">
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Welcome - {name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Object.entries(sideNavbar).map(([name, url], index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <NavLink to={url} className={({ isActive }) => "text-decoration-none " + (isActive ? "active-link" : "")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <Tooltip title={tooltips[index]} placement="right-end">
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {obj[index]}
                      </ListItemIcon>
                    </Tooltip>

                    <ListItemText
                      primary={name}
                      style={{ color: "var(--text)", textDecoration: "none" }}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={logout}>
                <Tooltip title="Logout" placement="right-end">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Logout />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Logout"
                  style={{ color: "var(--text)", textDecoration: "none" }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" className="bg-light" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
      </>
    );
  }
};

export default Dashboard;
