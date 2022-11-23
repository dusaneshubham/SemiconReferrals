import React from 'react';
import { useState } from 'react';
import { IconButton, OutlinedInput, InputAdornment, FormControl, Button, Link, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { isEmail } from 'validator';
import axios from 'axios';

const Login = () => {
    const [alert, setAlert] = useState({
        error: "",
        success: ""
    });
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [type, setType] = useState("candidate");

    const setLoginInput = (prop) => (event) => {
        setLoginData({ ...loginData, [prop]: event.target.value });
    }

    const submit = async () => {
        setAlert({ error: "", success: "" });
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
                        // redirect path as you wish
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
                        setAlert({ success: res.message });
                        localStorage.setItem("type", "recruiter");
                        localStorage.setItem("token", res.token);
                        // redirect path as you wish
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert({ error: "Somthing went wrong with server!!" });
                });
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {alert.error && <Alert severity="error" className="mb-3 w-100" onClose={() => setAlert({ ...alert, error: "" })}><span className="my-alert">{alert.error}</span></Alert>}
                {alert.success && <Alert severity="success" className="mb-3 w-100" onClose={() => setAlert({ ...alert, success: "" })}><span className="my-alert">{alert.success}</span></Alert>}
                <div>
                    <div>
                        <Button variant={type === "candidate" ? "contained" : "outlined"} className="type-btn" onClick={() => setType("candidate")}>
                            Candidate
                        </Button>
                        <Button variant={type === "recruiter" ? "contained" : "outlined"} className="type-btn" onClick={() => setType("recruiter")}>
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
                        <Link className="text-decoration-none" style={{ cursor: "pointer" }}>Forgotten password?</Link>
                    </div>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <Button variant="contained" onClick={() => submit()}>
                            Login
                        </Button>
                    </FormControl>
                </div>
            </Box>
        </>
    )
}

export default Login