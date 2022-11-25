import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { image4 } from '../images/images';
import './css/email-verification.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { Snackbar, Slide } from '@mui/material';
import { IconButton, OutlinedInput, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { isEmail } from 'validator';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ForgetPassword() {

    const [alert, setAlert] = useState({
        error: "",
        success: ""
    });
    const [data, setData] = useState({
        type: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const urlData = new URLSearchParams(window.location.search);
        const token = urlData.get("token");

        const callback = async () => {
            if (!token) {
                setAlert({ error: "Error!! Invalid token!" });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                await axios.post('http://localhost:5000/verify-token', { token })
                    .then((res) => res.data)
                    .then(async (res) => {
                        if (res.success) {
                            setData({ email: res.data.email, type: res.data.type, password: "", confirmPassword: "" });
                        } else {
                            setAlert({ error: res.message });
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ error: "Something went wrong with server!!" });
                    })
            }
        }
        callback();
    }, [navigate]);

    const submit = async () => {
        setLoading(true);

        if (!data.email || !data.password || !data.confirmPassword || !data.type) {
            setAlert({ error: "All field are required!" });
        } else if (!isEmail(data.email)) {
            setAlert({ error: "Invalid mail Id!" });
        } else if (data.password.length < 8) {
            setAlert({ error: "Password should be 8 or more character!" });
        } else if (data.password !== data.confirmPassword) {
            setAlert({ error: "Password and Confirm password does not match!" });
        } else {
            if (data.type === "candidate") {
                await axios.post("http://localhost:5000/candidate/update-password", data)
                    .then((res) => res.data)
                    .then((data) => {
                        if (data.success) {
                            setAlert({ success: data.message });
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        } else {
                            setAlert({ error: data.message });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ error: "Something went wrong with server!" });
                    });
            } else if (data.type === "admin") {
                await axios.post("http://localhost:5000/admin/update-password", data)
                    .then((res) => res.data)
                    .then((data) => {
                        if (data.success) {
                            setAlert({ success: data.message });
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        } else {
                            setAlert({ error: data.message });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ error: "Something went wrong with server!" });
                    });
            } else if (data.type === "recruiter") {
                await axios.post("http://localhost:5000/recruiter/update-password", data)
                    .then((res) => res.data)
                    .then((data) => {
                        if (data.success) {
                            setAlert({ success: data.message });
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        } else {
                            setAlert({ error: data.message });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ error: "Something went wrong with server!" });
                    });
            } else {
                setAlert({ error: "Invalid token!" });
            }
        }

        setLoading(false);
    }

    const Transition = (props) => {
        return <Slide {...props} direction="down" />;
    }

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({});
    }

    return (
        <>
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
            <div className="w-100 h-100 d-flex justify-content-center align-content-around">
                <div className="container-fluid bg-light w-50 mt-5 p-3">
                    <img src={image4} alt="company logo" className="img-fluid" height="300" width="300" /><hr />
                    <h6 className="responsive-text text-center">Reset password</h6>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Password</label>
                        <OutlinedInput
                            id="signup-password"
                            type={showSignUpPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
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
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
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
                    <div className="text-center">
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            loadingIndicator="Loading…"
                            onClick={() => submit()}
                            className="responsive-text"
                            color="success"
                        >
                            Reset password
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword