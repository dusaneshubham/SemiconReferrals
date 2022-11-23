import React from 'react';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, OutlinedInput, InputAdornment, FormControl, Button, Snackbar, Slide } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { isEmail } from 'validator';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
    const [alert, setAlert] = useState({
        error: "",
        success: ""
    });
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("candidate");

    const setSignUpInput = (prop) => (event) => {
        setSignUpData({ ...signUpData, [prop]: event.target.value });
    }

    const TransitionRight = (props) => {
        return <Slide {...props} direction="down" />;
    }

    const submit = async () => {
        setLoading(true);
        setAlert({ error: "", success: "" });
        if (!signUpData.name || !signUpData.email || !signUpData.contactNumber || !signUpData.password || !signUpData.confirmPassword) {
            setAlert({ error: "All field are required!!" });
        } else if (!isEmail(signUpData.email)) {
            setAlert({ error: "Invalid email id!!" });
        } else if (signUpData.password.length < 8) {
            setAlert({ error: "Password should be minimum 8 character!!" });
        } else if (signUpData.contactNumber.length !== 10) {
            setAlert({ error: "Contact number should be 10 digit!!" });
        } else if (signUpData.password !== signUpData.confirmPassword) {
            setAlert({ error: "Confirm password not match with password!!" });
        } else if (type === "candidate") {
            await axios.post("http://localhost:5000/candidate/register/", signUpData)
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
            await axios.post("http://localhost:5000/recruiter/register/", signUpData)
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setAlert({ success: res.message });
                        localStorage.setItem("type", "recruiter");
                        localStorage.setItem("token", res.token);
                        // redirect path as your wish
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
                <Snackbar
                    autoHideDuration={6000}
                    open={alert.error ? true : false}
                    TransitionComponent={TransitionRight}
                    onClose={() => setAlert({ success: "", error: "" })}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="error"><span className="my-alert">{alert.error}</span></Alert>
                </Snackbar>
                <Snackbar
                    autoHideDuration={6000}
                    open={alert.success ? true : false}
                    TransitionComponent={TransitionRight}
                    onClose={() => setAlert({ success: "", error: "" })}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success"><span className="my-alert">{alert.success}</span></Alert>
                </Snackbar>
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
                        <label className="my-2">Name</label>
                        <OutlinedInput
                            id="signup-name"
                            type='text'
                            value={signUpData.name}
                            onChange={setSignUpInput('name')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Email</label>
                        <OutlinedInput
                            id="signup-email"
                            type='email'
                            value={signUpData.email}
                            onChange={setSignUpInput('email')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Contact number</label>
                        <OutlinedInput
                            id="signup-contact-number"
                            type='number'
                            value={signUpData.contactNumber}
                            onChange={setSignUpInput('contactNumber')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Password</label>
                        <OutlinedInput
                            id="signup-password"
                            type={showSignUpPassword ? 'text' : 'password'}
                            value={signUpData.password}
                            onChange={setSignUpInput('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                        edge="end"
                                    >
                                        {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Confirm Password</label>
                        <OutlinedInput
                            id="signup-confirm-password"
                            type={showSignUpConfirmPassword ? 'text' : 'password'}
                            value={signUpData.confirmPassword}
                            onChange={setSignUpInput('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                                        edge="end"
                                    >
                                        {showSignUpConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            loadingIndicator="Loading…"
                            onClick={() => submit()}
                        >
                            Register
                        </LoadingButton>
                    </FormControl>
                </div>
            </Box>
        </>
    )
}

export default SignUp