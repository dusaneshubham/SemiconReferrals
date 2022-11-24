import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { image4 } from '../images/images';
import './css/email-verification.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { Snackbar, Slide } from '@mui/material';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EmailVerification() {

    const [alert, setAlert] = useState({
        error: "",
        success: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const urlData = new URLSearchParams(window.location.search);
    const token = urlData.get("token");

    const submit = async () => {
        setLoading(true);
        if (!token) {
            setAlert({ error: "Error!! Invalid token!" });
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            await axios.post('http://localhost:5000/verify-mail', { token })
                .then((res) => res.data)
                .then(async (res) => {
                    if (res.success) {
                        if (res.type === "candidate") {
                            await axios.post('http://localhost:5000/candidate/register', res.data)
                                .then((res) => res.data)
                                .then((data) => {
                                    if (data.success) {
                                        setAlert({ success: res.message });
                                        localStorage.setItem("token", data.token);
                                        setTimeout(() => {
                                            navigate('/');
                                        }, 2000);
                                    } else {
                                        setAlert({ error: res.message });
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                    setAlert({ error: "Something went wrong with server!" });
                                });
                        } else {
                            await axios.post('http://localhost:5000/recruiter/register', res.data)
                                .then((res) => res.data)
                                .then((data) => {
                                    if (data.success) {
                                        setAlert({ success: res.message });
                                        localStorage.setItem("token", data.token);
                                        setTimeout(() => {
                                            navigate('/');
                                        }, 2000);
                                    } else {
                                        setAlert({ error: res.message });
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                    setAlert({ error: "Something went wrong with server!" });
                                });
                        }
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert({ error: "Something went wrong with server!" });
                })
        }
        setLoading(false);
    }

    const TransitionRight = (props) => {
        return <Slide {...props} direction="down" />;
    }

    return (
        <>
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
            <div className="w-100 h-100 d-flex justify-content-center align-content-around">
                <div className="container-fluid bg-light w-50 mt-5 text-center p-3">
                    <img src={image4} alt="company logo" className="img-fluid" height="300" width="300" /><hr />
                    <h6 className="responsive-text">Verify Your Email Here</h6>
                    <LoadingButton
                        variant="contained"
                        loading={loading}
                        loadingIndicator="Loading…"
                        onClick={() => submit()}
                        className="responsive-text"
                        color="success"
                    >
                        Verify email
                    </LoadingButton>
                </div>
            </div>
        </>
    )
}

export default EmailVerification