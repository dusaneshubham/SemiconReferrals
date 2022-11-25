import React from 'react';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, OutlinedInput, InputAdornment, FormControl, Button, Link, Snackbar, Slide } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { isEmail } from 'validator';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
// import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (prop) => {
    // const navigate = useNavigate();
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [type, setType] = useState("admin");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const setLoginInput = (prop) => (event) => {
        setLoginData({ ...loginData, [prop]: event.target.value });
    }

    const Transition = (props) => {
        return <Slide {...props} direction="down" />;
    }

    const submit = async () => {
        setLoading(true);
        if (!loginData.email || !loginData.password) {
            setAlert({ error: "All field are required!!" });
        } else if (!isEmail(loginData.email)) {
            setAlert({ error: "Invalid email id!!" });
        } else if (loginData.password.length < 8) {
            setAlert({ error: "Password should be minimum 8 character!!" });
        } else if (type === "candidate") {
            await axios.post("http://localhost:5000/candidate/login/", loginData)
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setAlert({ success: res.message });
                        localStorage.setItem("type", "candidate");
                        localStorage.setItem("token", res.token);
                        window.reload();
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert({ error: "Somthing went wrong with server!!" });
                });
        } else if (type === "admin") {
            await axios.post("http://localhost:5000/admin/login/", loginData)
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setAlert({ success: res.message });
                        localStorage.setItem("type", "admin");
                        localStorage.setItem("token", res.token);
                        window.reload();
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert({ error: "Somthing went wrong with server!!" });
                });
        } else {
            await axios.post("http://localhost:5000/recruiter/login/", loginData)
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        if (res.token) {
                            localStorage.setItem("type", "recruiter");
                            localStorage.setItem("token", res.token);
                            window.reload();
                        }
                        setAlert({ success: res.message });
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert({ error: "Somthing went wrong with server!!" });
                });
        }
        setLoading(false);
    }

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({});
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Snackbar
                    autoHideDuration={2000}
                    open={alert.error ? true : false}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="error" onClose={handleClose}><span className="my-alert">{alert.error}</span></Alert>
                </Snackbar>
                <Snackbar
                    autoHideDuration={2000}
                    open={alert.success ? true : false}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success" onClose={handleClose}><span className="my-alert">{alert.success}</span></Alert>
                </Snackbar>
                <div>
                    <div>
                        <Button variant={type === "admin" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setType("admin")}>
                            Admin
                        </Button>
                        <Button variant={type === "candidate" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setType("candidate")}>
                            Candidate
                        </Button>
                        <Button variant={type === "recruiter" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setType("recruiter")}>
                            Recruiter
                        </Button>
                    </div>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Email</label>
                        <OutlinedInput
                            id="login-email"
                            type='email'
                            value={loginData.email}
                            onChange={setLoginInput('email')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Password</label>
                        <OutlinedInput
                            id="login-password"
                            type={showLoginPassword ? 'text' : 'password'}
                            value={loginData.password}
                            onChange={setLoginInput('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                        edge="end"
                                    >
                                        {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className="float-end my-2">
                        <Link className="text-decoration-none" style={{ cursor: "pointer" }} onClick={() => prop.method()}>Forgotten password?</Link>
                    </div>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            loadingIndicator="Loading…"
                            onClick={() => submit()}
                        >
                            Login
                        </LoadingButton>
                    </FormControl>
                </div>
            </Box>
        </>
    )
}

export default Login