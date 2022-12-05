import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { CardMembership, Email, LinkedIn, PeopleOutline, PhoneIphone, Public } from '@mui/icons-material';
import './Profile.css';
import { Button, FormControl, OutlinedInput } from "@mui/material";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Footer from "../../../components/Footer/Footer";
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {

    const navigate = useNavigate();
    const param = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = param.id;
        const getData = async () => {
            await axios.post('http://localhost:5000/recruiter/getRecruiterDetailsById', { id })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setData(res.data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    navigate('/');
                });
        }

        getData();
    }, [navigate, param]);

    // alert
    const [alert, setAlert] = useState({});

    const Transition = (props) => {
        return <Slide {...props} direction="down" />;
    };

    const handleClose = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({});
    };
    const getDate = (date) => {
        const newDate = new Date(date);
        return newDate.getDate() + " " + newDate.toLocaleString('default', { month: 'long' }) + " " + newDate.getFullYear();
    }

    if (loading) {
        return (
            <>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "70vh" }}
                >
                    <ReactLoading
                        type="bubbles"
                        color="#1976d2"
                        height={100}
                        width={100}
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                {/* ---------------------- alert ---------------------- */}
                <Snackbar
                    autoHideDuration={2000}
                    open={alert.error ? true : false}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="error" onClose={handleClose}>
                        <span className="my-alert">{alert.error}</span>
                    </Alert>
                </Snackbar>
                <Snackbar
                    autoHideDuration={2000}
                    open={alert.success ? true : false}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" onClose={handleClose}>
                        <span className="my-alert">{alert.success}</span>
                    </Alert>
                </Snackbar>
                {/* --------------------------------------------------- */}
                <div className="container px-0 py-3 profile">
                    <div className="w-75 m-auto section">
                        <div className="d-inline-block">
                            <h3 className="text-orange">{data.name}</h3>
                            <p className="text-smaller">{data.companyName}</p>
                        </div>
                        {data.linkedin !== "" &&
                            <div className="float-end">
                                <a href={data.linkedin} target="_blank" rel="noreferrer">
                                    <LinkedIn fontSize="large" />
                                </a>
                            </div>}
                    </div>
                    <div className="row">
                        <div className="col-md-7 mx-3">

                            {/*--------------------- About me ---------------------*/}
                            <div className="section bg-light">
                                <h5 className="header mb-3">About me</h5>
                                <span dangerouslySetInnerHTML={{ __html: data.teamWorkDescription }} className="about text-secondary"></span>
                            </div>
                            {/* ---------------------------------------------------- */}

                            {/*--------------------- Candidate Details ---------------------*/}
                            <div className="section">
                                <h5 className="header">Employer Details</h5>
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div className="body-section1">
                                        <p className="text-black my-3"><span className='text-orange mx-1'><CardMembership /></span> <strong>Member Since: </strong><span className="text-secondary">{getDate(data.createDate)}</span></p>
                                        <p className="text-black my-3"><span className='text-orange mx-1'><Email /></span> <strong>Email: </strong><span className="text-secondary">{data.email}</span></p>
                                        <p className="text-black my-3"><span className='text-orange mx-1'><PhoneIphone /></span> <strong>Phone (This will be shown on public profile) </strong></p>
                                    </div>
                                    <div className="body-section2">
                                        <p className="text-black my-3"><span className='text-orange mx-1'><PeopleOutline /></span> <strong>Employees: </strong><span className="text-secondary">{data.teamSize}</span></p>
                                        <p className="text-black my-3"><span className='text-orange mx-1'><Public /></span> <strong>Company website: </strong><span className="text-secondary">{data.companyWebsite}</span></p>
                                    </div>
                                </div>
                            </div>
                            {/* ---------------------------------------------------- */}

                            {/*--------------------- Important Information ---------------------*/}
                            <div className="section bg-light">
                                <h5 className="header mb-3">Important Information</h5>

                                <div style={{ margin: "25px 0" }}>
                                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                                        Contact Number
                                    </div>
                                    {data.contactNumber}
                                </div>
                                <div style={{ margin: "25px 0" }}>
                                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                                        Role
                                    </div>
                                    {data.designation}
                                </div>
                                <div style={{ margin: "25px 0" }}>
                                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                                        About your organization
                                    </div>
                                    None
                                </div>
                            </div>
                            {/* ---------------------------------------------------- */}
                        </div>

                        <div className="col-md-4 mx-3 section bg-light">
                            Contact {data.name}
                            <hr />
                            <div className="form">
                                <FormControl sx={{ my: 1, width: "100%", background: "white" }} variant="outlined">
                                    <OutlinedInput
                                        id="signup-name"
                                        type='text'
                                        placeholder="Full name"
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ my: 1, width: "100%", background: "white" }} variant="outlined">
                                    <OutlinedInput
                                        id="signup-name"
                                        type='email'
                                        placeholder="Email address"
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ my: 1, width: "100%", background: "white" }} variant="outlined">
                                    <OutlinedInput
                                        id="signup-name"
                                        type='text'
                                        placeholder="Subject"
                                        required
                                    />
                                </FormControl>
                                <textarea className="form-control my-1" required></textarea>
                                <Button variant="contained" sx={{ my: 1, width: "100%" }}>Message</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
};

export default Profile;
