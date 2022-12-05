import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { CalendarMonth, CardMembership, Download, Email, Favorite, Female, KeyboardArrowLeft, LinkedIn, Male, School, Transgender, Visibility } from '@mui/icons-material';
import { Timeline, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import './Profile.css';
import { Button, FormControl, OutlinedInput } from "@mui/material";
import saveAs from 'file-saver';
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Footer from "../../../components/Footer/Footer";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {

  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState({});
  const [defaultResume, setDefaultResume] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = param.id;
    const getData = async () => {
      await axios.post('http://localhost:5000/candidate/getCandidateDetailsById', { id })
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            if (res.data.defaultResumeId === null && res.data.resumes.length !== 0) {
              setDefaultResume(res.data.resumes[0].url);
            } else if (res.data.defaultResumeId !== null) {
              res.data.resumes.forEach(element => {
                if (element._id === res.data.defaultResumeId) {
                  setDefaultResume(element);
                }
              });
            }
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

      if (token) {
        await axios.post("http://localhost:5000/recruiter/getRecruiterDetails", { token: token })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              res.saveProfile.forEach(element => {
                if (element === id) {
                  setIsSaved(true);
                }
              });
              setTokenData(res.tokenData);
            }
          });
      }
    }

    getData();
  }, [navigate, param]);

  const token = localStorage.getItem("token");

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

  const saveResume = async () => {
    await axios.post("http://localhost:5000/recruiter/saveProfile", { token: token, id: param.id })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          res.saveProfile.forEach(element => {
            if (element === param.id) {
              setIsSaved(true);
            }
          });
          setAlert({ success: res.message });
        } else {
          setAlert({ error: res.message });
        }
      }).catch((err) => {
        console.lof(err);
        setAlert({ error: "Something went wrong with server!" });
      });
  }

  const getDate = (date) => {
    const newDate = new Date(date);
    return newDate.getDate() + " " + newDate.toLocaleString('default', { month: 'long' }) + " " + newDate.getFullYear();
  }

  const downloadResume = (url, name) => {
    saveAs.saveAs(url, name + "'s Resume");
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
        <div className="back-btn py-2 px-3">
          <Button onClick={() => window.history.go(-1)}><KeyboardArrowLeft /> Back</Button>
        </div>
        <div className="container px-0 py-3 profile">
          <div className="w-75 m-auto text-orange section">
            <h2 className="d-inline-block">
              {data.name}
            </h2>
            {data.linkedIn !== "" &&
              <div className="float-end">
                <a href={data.linkedIn} target="_blank" rel="noreferrer">
                  <LinkedIn fontSize="large" />
                </a>
              </div>}
          </div>
          <div className="row">
            <div className="col-md-7 mx-3">

              {/*--------------------- Candidate Details ---------------------*/}
              <div className="section">
                <h5 className="header">Candidate Details</h5>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="body-section1">
                    <p className="text-black my-3"><span className='text-orange mx-1'><CalendarMonth /></span> <strong>Date of Birth: </strong><span className="text-secondary">{getDate(data.DOB)}</span></p>
                    <p className="text-black my-3"><span className='text-orange mx-1'><CardMembership /></span> <strong>Memeber Since: </strong><span className="text-secondary">{getDate(data.DOB)}</span></p>
                    <p className="text-black my-3"><span className='text-orange mx-1'><School /></span> <strong>Experience: </strong><span className="text-secondary">{data.experience}</span></p>
                  </div>
                  <div className="body-section2">
                    <p className="text-black my-3"><span className='text-orange mx-1'><Email /></span> <strong>Email: </strong><span className="text-secondary">{data.email}</span></p>
                    {data.gender === "Male" && <p className="text-black my-3"><span className='text-orange mx-1'><Male /></span> <strong>Gender: </strong><span className="text-secondary">Male</span></p>}
                    {data.gender === "Female" && <p className="text-black my-3"><span className='text-orange mx-1'><Female /></span> <strong>Gender: </strong><span className="text-secondary">Female</span></p>}
                    {data.gender === "Other" && <p className="text-black my-3"><span className='text-orange mx-1'><Transgender /></span> <strong>Gender: </strong><span className="text-secondary">Other</span></p>}
                    <p className="text-black my-3"><span className='text-orange mx-1'><School /></span> <strong>Qualification: </strong><span className="text-secondary">{data.qualification}</span></p>
                  </div>
                </div>
              </div>
              {/* ---------------------------------------------------- */}

              {/*--------------------- About me ---------------------*/}
              <div className="section bg-light">
                <h5 className="header mb-3">About me</h5>
                <span dangerouslySetInnerHTML={{ __html: data.about }} className="about text-secondary"></span>
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
                    Are you open to work?
                  </div>
                  {data.isOpenToWork}
                </div>
                <div style={{ margin: "25px 0" }}>
                  <div style={{ color: "var(--text)", fontSize: "12px" }}>
                    What is your notice period
                  </div>
                  {data.noticePeriod}
                </div>
                <div style={{ margin: "25px 0" }}>
                  <div style={{ color: "var(--text)", fontSize: "12px" }}>
                    What is your current job location ?
                  </div>
                  {data.currentJobLocation}
                </div>
                <div style={{ margin: "25px 0" }}>
                  <div style={{ color: "var(--text)", fontSize: "12px" }}>
                    Desired cities to work in?
                  </div>
                  {data.desiredCitiesToWork}
                </div>
              </div>
              {/* ---------------------------------------------------- */}

              {/* ---------------------- Education ---------------------- */}
              <div className="section bg-light">
                <h5 className="header mb-3">Education</h5>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                  className="mt-3"
                >
                  {data.education.map((data, index) => {
                    let startDate = new Date(data.startDate);
                    let endDate = new Date(data.endDate);
                    return (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <p style={{ fontSize: "13px" }} className="text-secondary">
                            {startDate.toLocaleString('default', { month: 'long' }) + " " + startDate.getFullYear()}
                            &nbsp;-&nbsp;
                            {endDate.toLocaleString('default', { month: 'long' }) + " " + endDate.getFullYear()}</p>
                          <h5 className="text-black mb-1">{data.title}</h5>
                          <h6 style={{ color: "var(--main-orange)" }} className="mb-3">{data.instituteName}</h6>
                          <span dangerouslySetInnerHTML={{ __html: data.description }} className="about text-secondary"></span>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </div>
              {/* ---------------------------------------------------- */}

              {/* ---------------------- Work Experience ---------------------- */}
              <div className="section bg-light">
                <h5 className="header mb-3">Work Experience</h5>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                  className="mt-3"
                >
                  {data.workingExperience.map((data, index) => {
                    let startDate = new Date(data.jobStartDate);
                    let endDate = new Date(data.jobEndDate);
                    return (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <p style={{ fontSize: "13px" }} className="text-secondary">
                            {startDate.toLocaleString('default', { month: 'long' }) + " " + startDate.getFullYear()}
                            &nbsp;-&nbsp;
                            {!data.isCurrentlyWorking ? endDate.toLocaleString('default', { month: 'long' }) + " " + endDate.getFullYear() : 'Currently Working'}</p>
                          <h5 className="text-black mb-1">{data.designation}</h5>
                          <h6 style={{ color: "var(--main-orange)" }} className="mb-3">{data.organizationName}</h6>
                          <span dangerouslySetInnerHTML={{ __html: data.description }} className="about text-secondary"></span>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </div>
              {/* ---------------------------------------------------- */}

              {/* ---------------------- Resume ---------------------- */}
              {defaultResume.url &&
                <div className="section bg-light">
                  {tokenData.type === "recruiter" &&
                    (isSaved ?
                      <Button variant="contained" className="w-100 text-white my-1" color="success" disabled><Favorite />Saved</Button>
                      :
                      <Button variant="contained" onClick={saveResume} className="bg-orange w-100 text-white my-1"><Favorite />Save Profile</Button>)
                  }
                  <Button variant="contained" onClick={() => downloadResume(defaultResume.url, data.name)} className="bg-orange w-100 text-white my-1"><Download /> Download Resume</Button>
                  <a href={defaultResume.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                    <Button variant="contained" className="bg-orange w-100 text-white my-1"><Visibility />View Resume</Button>
                  </a>
                </div>
              }
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
