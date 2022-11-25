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

    // -------------------------- React-hook ---------------------------- //
    const [alert, setAlert] = useState({
        error: "",
        success: ""
    });
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
    const [data, setSignUpData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("candidate");

    const intialState = {
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: ""
    }

    const setSignUpInput = (prop) => (event) => {
        setSignUpData({ ...data, [prop]: event.target.value });
    }

    const Transition = (props) => {
        return <Slide {...props} direction="down" />;
    }

    // ------------------------------- Backend ----------------------------------- //
    const submit = async () => {
        setLoading(true);
        setAlert({ error: "", success: "" });
        if (!data.name || !data.email || !data.contactNumber || !data.password || !data.confirmPassword) {
            setAlert({ error: "All field are required!!" });
        } else if (!isEmail(data.email)) {
            setAlert({ error: "Invalid email id!!" });
        } else if (data.password.length < 8) {
            setAlert({ error: "Password should be minimum 8 character!!" });
        } else if (data.contactNumber.length !== 10) {
            setAlert({ error: "Contact number should be 10 digit!!" });
        } else if (data.password !== data.confirmPassword) {
            setAlert({ error: "Confirm password not match with password!!" });
        } else if (type === "candidate") {
            await axios.post("http://localhost:5000/send-mail", { data, type })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setAlert({ success: res.message });
                        setSignUpData(intialState);
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert({ error: "Somthing went wrong with server!!" });
                });
        } else {
            await axios.post("http://localhost:5000/send-mail/", { data, type })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setAlert({ success: res.message });
                        setSignUpData(intialState);
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
                            value={data.name}
                            onChange={setSignUpInput('name')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Email</label>
                        <OutlinedInput
                            id="signup-email"
                            type='email'
                            value={data.email}
                            onChange={setSignUpInput('email')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Contact number</label>
                        <OutlinedInput
                            id="signup-contact-number"
                            type='number'
                            value={data.contactNumber}
                            onChange={setSignUpInput('contactNumber')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Password</label>
                        <OutlinedInput
                            id="signup-password"
                            type={showSignUpPassword ? 'text' : 'password'}
                            value={data.password}
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
                            value={data.confirmPassword}
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