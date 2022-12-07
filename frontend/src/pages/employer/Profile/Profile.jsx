import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    CardMembership,
    Email,
    KeyboardArrowLeft,
    LinkedIn,
    PeopleOutline,
    Public,
} from "@mui/icons-material";
import "./Profile.css";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import Footer from "../../../components/Footer/Footer";
import axios from "axios";
import AlertPopUp from "../../../components/AlertPopUp/AlertPopUp";
import Loading from "../../../components/Loading/Loading";

const Profile = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [candidateId, setCandidateId] = useState("");
    const [isFollow, setIsFollow] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const id = param.id;
        const getData = async () => {

            if (token) {
                axios.post("http://localhost:5000/candidate/getCandidateDetails", { token })
                    .then((res) => res.data)
                    .then((res) => {
                        if (res.success) {
                            setCandidateId(res.candidateId);
                            if (res.followings) {
                                res.followings.forEach(element => {
                                    if (element.recruiter === id)
                                        setIsFollow(true);
                                });
                            }
                        }
                    }).catch((err) => {
                        console.log(err);
                        window.history.go(-1);
                    })
            }

            await axios
                .post("http://localhost:5000/recruiter/getRecruiterDetailsById", { id })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        setData(res.data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    navigate("/");
                });
        };

        getData();
    }, [navigate, param, token]);

    // alert
    const [alert, setAlert] = useState({});

    const getDate = (date) => {
        const newDate = new Date(date);
        return (
            newDate.getDate() +
            " " +
            newDate.toLocaleString("default", { month: "long" }) +
            " " +
            newDate.getFullYear()
        );
    };

    const followRecruiter = () => {
        axios.post("http://localhost:5000/candidate/followRecruiter", { token, recruiterId: param.id })
            .then((res) => res.data)
            .then((res) => {
                if (res.success) {
                    setIsFollow(true);
                } else {
                    setAlert({ error: res.message });
                }
            }).catch((err) => {
                console.log(err);
                setAlert({ message: "Something went wrong with server!!" });
            });
    }

    const unFollowRecruiter = () => {
        axios.post("http://localhost:5000/candidate/unFollowRecruiter", { token, recruiterId: param.id })
            .then((res) => res.data)
            .then((res) => {
                if (res.success) {
                    setIsFollow(false);
                } else {
                    setAlert({ error: res.message });
                }
            }).catch((err) => {
                setAlert({ message: "Something went wrong with server!!" });
            });
    }

    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    } else {
        return (
            <>
                {/* ---------------------- alert ---------------------- */}
                <AlertPopUp
                    alert={alert}
                    setAlert={setAlert}
                />
                {/* --------------------------------------------------- */}
                <div className="back-btn py-2 px-3">
                    <Button onClick={() => window.history.go(-1)}>
                        <KeyboardArrowLeft /> Back
                    </Button>
                </div>
                <div className="container px-0 py-3 profile">
                    <div className="m-auto section">
                        <div className="d-inline-block">
                            <h3 className="text-orange">{data.name}</h3>
                            <p className="text-smaller">{data.companyName}</p>
                        </div>
                        {data.linkedin !== "" && (
                            <div className="float-end">
                                <a href={data.linkedin} target="_blank" rel="noreferrer">
                                    <LinkedIn fontSize="large" />
                                </a>
                            </div>
                        )}
                        {candidateId !== "" && <>
                            <hr />
                            <div className="d-flex justify-content-center">
                                {/* --------------------- Save Candidate --------------------- */}
                                {isFollow ?
                                    <Button className="w-25" variant="contained" color="error" onClick={unFollowRecruiter}>UnFollow</Button>
                                    :
                                    <Button className="w-25" variant="contained" color="success" onClick={followRecruiter}>Follow</Button>
                                }
                                {/* ---------------------------------------------------------- */}
                            </div>
                        </>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-7 mx-3 employer-profile">
                            {/*--------------------- About me ---------------------*/}
                            <div className="section bg-light">
                                <h5 className="header mb-3">About me</h5>
                                <span
                                    dangerouslySetInnerHTML={{ __html: data.teamWorkDescription }}
                                    className="about text-secondary"
                                ></span>
                            </div>
                            {/* ---------------------------------------------------- */}

                            {/*--------------------- Employer Details ---------------------*/}
                            <div className="section">
                                <h5 className="header">Employer Details</h5>
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div className="body-section1">
                                        <p className="text-black mb-3"><span className='text-orange mx-1'><CardMembership /></span> <strong>Member Since: </strong><span className="text-secondary">{getDate(data.createDate)}</span></p>
                                        <p className="text-black my-3"><span className='text-orange mx-1'><Email /></span> <strong>Email: </strong><span className="text-secondary">{data.email}</span></p>
                                    </div>
                                    <div className="body-section2">
                                        <p className="text-black mb-3"><span className='text-orange mx-1'><PeopleOutline /></span> <strong>Employees: </strong><span className="text-secondary">{data.teamSize}</span></p>
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

                        <div className="col-md-4 mx-3 section bg-light h-25">
                            Contact {data.name}
                            <hr />
                            <div className="form">
                                <FormControl
                                    sx={{ my: 1, width: "100%", background: "white" }}
                                    variant="outlined"
                                >
                                    <OutlinedInput
                                        id="signup-name"
                                        type="text"
                                        placeholder="Full name"
                                        required
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{ my: 1, width: "100%", background: "white" }}
                                    variant="outlined"
                                >
                                    <OutlinedInput
                                        id="signup-name"
                                        type="email"
                                        placeholder="Email address"
                                        required
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{ my: 1, width: "100%", background: "white" }}
                                    variant="outlined"
                                >
                                    <OutlinedInput
                                        id="signup-name"
                                        type="text"
                                        placeholder="Subject"
                                        required
                                    />
                                </FormControl>
                                <textarea className="form-control my-1" required></textarea>
                                <Button variant="contained" sx={{ my: 1, width: "100%" }}>
                                    Message
                                </Button>
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
