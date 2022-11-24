import React from 'react';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { OutlinedInput, FormControl, Button, Snackbar, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import { isEmail } from 'validator';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgetPass = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        type: "admin",
        email: ""
    });
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const Transition = (props) => {
        return <Slide {...props} direction="down" />;
    }

    const submit = async () => {
        setLoading(true);

        if (!data.email) {
            setAlert({ error: "All field are required!" });
        } else if (!isEmail(data.email)) {
            setAlert({ error: "Invalid mail id!!" });
        } else {
            await axios.post("http://localhost:5000/send-forget-pass-mail", data)
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setAlert({ success: res.message });
                        console.log(res.url);
                        setData({ ...data, email: "" });
                        navigate('/');
                    } else {
                        setAlert({ error: res.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    setAlert("Something went wrong with server!!");
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
                <div className='w-100 mt-2'>
                    <div>
                        <Button variant={data.type === "admin" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setData({ ...data, type: "admin" })}>
                            Admin
                        </Button>
                        <Button variant={data.type === "candidate" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setData({ ...data, type: "candidate" })}>
                            Candidate
                        </Button>
                        <Button variant={data.type === "recruiter" ? "contained" : "outlined"} className="login-type-btn" onClick={() => setData({ ...data, type: "recruiter" })}>
                            Recruiter
                        </Button>
                    </div>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Email</label>
                        <OutlinedInput
                            id="email"
                            type='email'
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            loadingIndicator="Loading…"
                            onClick={() => submit()}
                        >
                            Submit
                        </LoadingButton>
                    </FormControl>
                </div>
            </Box>
        </>
    )
}

export default ForgetPass