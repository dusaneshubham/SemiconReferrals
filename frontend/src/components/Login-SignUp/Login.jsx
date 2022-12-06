import React from 'react';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, OutlinedInput, InputAdornment, FormControl, Button, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { isEmail } from 'validator';
import axios from 'axios';
import AlertPopUp from '../AlertPopUp/AlertPopUp';
// import { useNavigate } from 'react-router-dom';

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
                        window.location.reload();
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
                        window.location.reload();
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
                        localStorage.setItem("type", "recruiter");
                        localStorage.setItem("token", res.token);
                        window.location.reload();
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

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* ---------------------- alert ---------------------- */}
                <AlertPopUp
                    alert={alert}
                    setAlert={setAlert}
                />
                {/* --------------------------------------------------- */}
                <div>
                    <div>
                        <Button variant={type === "admin" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setType("admin")}>
                            Admin
                        </Button>
                        <Button variant={type === "recruiter" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setType("recruiter")}>
                            Recruiter
                        </Button>
                        <Button variant={type === "candidate" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setType("candidate")}>
                            Candidate
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