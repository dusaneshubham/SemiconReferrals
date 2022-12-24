import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarMonth,
  CardMembership,
  Download,
  Email,
  Favorite,
  Female,
  KeyboardArrowLeft,
  LinkedIn,
  Male,
  School,
  Transgender,
  Visibility,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import "./Profile.css";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import saveAs from "file-saver";
import Footer from "../../../components/Footer/Footer";
import AlertPopUp from "../../../components/AlertPopUp/AlertPopUp";
import Loading from "../../../components/Loading/Loading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LoadingButton from "@mui/lab/LoadingButton";
import { isEmail } from "validator";

const Profile = () => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState({});
  const [defaultResume, setDefaultResume] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [contactUsData, setContactUsData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = param.id;
    const getData = async () => {
      await axios
        .post("http://localhost:5000/candidate/getCandidateDetailsById", { id })
        .then((res) => res.data)
        .then((res) => {
          if (res.success && res.data.candidateId) {
            if (
              res.data.defaultResumeId === null &&
              res.data.resumes.length !== 0
            ) {
              setDefaultResume(res.data.resumes[0].url);
            } else if (res.data.defaultResumeId !== null) {
              res.data.resumes.forEach((element) => {
                if (element._id === res.data.defaultResumeId) {
                  setDefaultResume(element);
                }
              });
            }
            setData(res.data);
          } else {
            setData((data) => {
              res = res.data;
              return { ...data, ...res };
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          window.history.go(-1);
        });

      if (token) {
        await axios
          .post("http://localhost:5000/recruiter/getRecruiterDetails", {
            token: token,
          })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              if (res.saveCandidateProfile) {
                res.saveCandidateProfile.forEach((element) => {
                  if (element.candidate === id) {
                    setIsSaved(true);
                  }
                });
              }
              setTokenData(res.tokenData);
            }
          });
      }
    };

    getData();
  }, [navigate, param]);

  const token = localStorage.getItem("token");

  // alert
  const [alert, setAlert] = useState({});

  const saveResume = async () => {
    await axios
      .post("http://localhost:5000/recruiter/saveCandidateProfile", {
        token: token,
        id: param.id,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setIsSaved(true);
          setAlert({ success: res.message });
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      });
  };

  const getDate = (date) => {
    if (date === "NaN") return "NaN";
    const newDate = new Date(date);
    return (
      newDate.getDate() +
      " " +
      newDate.toLocaleString("default", { month: "long" }) +
      " " +
      newDate.getFullYear()
    );
  };

  const downloadResume = (url, name) => {
    saveAs.saveAs(url, name + "'s Resume");
  };

  // send message for contact
  const sendMessage = async () => {
    setBtnLoading(true);
    if (
      !contactUsData.name ||
      !contactUsData.subject ||
      !contactUsData.message ||
      !contactUsData.email
    ) {
      setAlert({ error: "All field are required!!" });
      setBtnLoading(false);
    } else if (!isEmail(contactUsData.email)) {
      setAlert({ error: "Invalid Email id!!" });
      setBtnLoading(false);
    } else {
      axios
        .post("http://localhost:5000/sendMailForContact", {
          ...contactUsData,
          to: data.email,
        })
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setAlert({ success: res.message });
            setContactUsData({ name: "", email: "", message: "", subject: "" });
          } else {
            setAlert({ error: res.message });
          }
          setBtnLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setAlert({ message: "Something went wrong with server!!" });
          setBtnLoading(false);
        });
    }
  };

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
        <AlertPopUp alert={alert} setAlert={setAlert} />
        {/* --------------------------------------------------- */}

        <div className="back-btn py-2 px-3">
          <Button onClick={() => window.history.go(-1)}>
            <KeyboardArrowLeft /> Back
          </Button>
        </div>
        <div className="container px-0 py-3 profile">
          <div className="w-75 m-auto text-orange section">
            {data.profileImage ? (
              <img
                className="img-fluid mx-3"
                src={`http://localhost:5000/profileImage/${data.profileImage}`}
                alt="ProfileImage"
                width="80"
                height="80"
              />
            ) : (
              <img
                className="img-fluid mx-3"
                src={"http://localhost:5000/profileImage/defaultImage.png"}
                width="80"
                height="80"
                alt="profileImage"
              />
            )}
            <h2 className="d-inline-block">{data.name}</h2>
            {data.linkedIn !== "" && (
              <div className="float-end">
                <a href={data.linkedIn} target="_blank" rel="noreferrer">
                  <LinkedIn fontSize="large" />
                </a>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-7 mx-3">
              {/*--------------------- Candidate Details ---------------------*/}
              <div className="section">
                <h5 className="header">Candidate Details</h5>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="body-section1">
                    {data.DOB && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <CalendarMonth />
                        </span>{" "}
                        <strong>Date of Birth: </strong>
                        <span className="text-secondary">
                          {getDate(data.DOB)}
                        </span>
                      </p>
                    )}
                    {data.createdAt && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <CardMembership />
                        </span>{" "}
                        <strong>Memeber Since: </strong>
                        <span className="text-secondary">
                          {getDate(data.createdAt)}
                        </span>
                      </p>
                    )}
                    {data.experience && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <School />
                        </span>
                        <strong>Experience: </strong>
                        <span className="text-secondary">
                          {data.experience}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="body-section2">
                    {data.email && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <Email />
                        </span>
                        <strong>Email: </strong>
                        <span className="text-secondary">{data.email}</span>
                      </p>
                    )}
                    {data.gender === "Male" && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <Male />
                        </span>
                        <strong>Gender: </strong>
                        <span className="text-secondary">Male</span>
                      </p>
                    )}
                    {data.gender === "Female" && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <Female />
                        </span>{" "}
                        <strong>Gender: </strong>
                        <span className="text-secondary">Female</span>
                      </p>
                    )}
                    {data.gender === "Other" && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <Transgender />
                        </span>{" "}
                        <strong>Gender: </strong>
                        <span className="text-secondary">Other</span>
                      </p>
                    )}
                    {data.qualification && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <School />
                        </span>{" "}
                        <strong>Qualification: </strong>
                        <span className="text-secondary">
                          {data.qualification}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* ---------------------------------------------------- */}

              {/*--------------------- About me ---------------------*/}
              {data.about && (
                <div className="section bg-light">
                  <h5 className="header mb-3">About me</h5>
                  <span
                    dangerouslySetInnerHTML={{ __html: data.about }}
                    className="about text-secondary"
                  ></span>
                </div>
              )}
              {/* ---------------------------------------------------- */}

              {/*--------------------- Important Information ---------------------*/}
              <div className="section bg-light">
                <h5 className="header mb-3">Important Information</h5>

                {data.contactNumber && (
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      Contact Number
                    </div>
                    {data.contactNumber}
                  </div>
                )}
                {data.isOpenToWork && (
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      Are you open to work?
                    </div>
                    {data.isOpenToWork}
                  </div>
                )}
                {data.noticePeriod && (
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      What is your notice period
                    </div>
                    {data.noticePeriod}
                  </div>
                )}
                {data.currentJobLocation && (
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      What is your current job location ?
                    </div>
                    {data.currentJobLocation}
                  </div>
                )}
                {data.desiredCitiesToWork && (
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      Desired cities to work in ?
                    </div>
                    {data.desiredCitiesToWork}
                  </div>
                )}
              </div>
              {/* ---------------------------------------------------- */}

              {/* ---------------------- Education ---------------------- */}
              {data.education && (
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
                            <p
                              style={{ fontSize: "13px" }}
                              className="text-secondary"
                            >
                              {startDate.toLocaleString("default", {
                                month: "long",
                              }) +
                                " " +
                                startDate.getFullYear()}
                              &nbsp;-&nbsp;
                              {endDate.toLocaleString("default", {
                                month: "long",
                              }) +
                                " " +
                                endDate.getFullYear()}
                            </p>
                            <h5 className="text-black mb-1">{data.title}</h5>
                            <h6
                              style={{ color: "var(--main-orange)" }}
                              className="mb-3"
                            >
                              {data.instituteName}
                            </h6>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                              className="about text-secondary"
                            ></span>
                          </TimelineContent>
                        </TimelineItem>
                      );
                    })}
                  </Timeline>
                </div>
              )}
              {/* ---------------------------------------------------- */}

              {/* ---------------------- Work Experience ---------------------- */}
              {data.workingExperience && (
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
                            <p
                              style={{ fontSize: "13px" }}
                              className="text-secondary"
                            >
                              {startDate.toLocaleString("default", {
                                month: "long",
                              }) +
                                " " +
                                startDate.getFullYear()}
                              &nbsp;-&nbsp;
                              {!data.isCurrentlyWorking
                                ? endDate.toLocaleString("default", {
                                    month: "long",
                                  }) +
                                  " " +
                                  endDate.getFullYear()
                                : "Currently Working"}
                            </p>
                            <h5 className="text-black mb-1">
                              {data.designation}
                            </h5>
                            <h6
                              style={{ color: "var(--main-orange)" }}
                              className="mb-3"
                            >
                              {data.organizationName}
                            </h6>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                              className="about text-secondary"
                            ></span>
                          </TimelineContent>
                        </TimelineItem>
                      );
                    })}
                  </Timeline>
                </div>
              )}
              {/* ---------------------------------------------------- */}

              {/* ---------------------- Resume ---------------------- */}
              {defaultResume.url && (
                <div className="section bg-light">
                  {tokenData.type === "recruiter" &&
                    (isSaved ? (
                      <Button
                        variant="contained"
                        className="w-100 text-white my-1 disabled"
                        color="success"
                      >
                        <Favorite />
                        Saved
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={saveResume}
                        className="bg-orange w-100 text-white my-1"
                      >
                        <Favorite />
                        Save Profile
                      </Button>
                    ))}
                  <Button
                    variant="contained"
                    onClick={() => downloadResume(defaultResume.url, data.name)}
                    className="bg-orange w-100 text-white my-1"
                  >
                    <Download /> Download Resume
                  </Button>
                  <a
                    href={defaultResume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                  >
                    <Button
                      variant="contained"
                      className="bg-orange w-100 text-white my-1"
                    >
                      <Visibility />
                      View Resume
                    </Button>
                  </a>
                </div>
              )}
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
                    id="name"
                    type="text"
                    value={contactUsData.name}
                    onChange={(e) => {
                      setContactUsData({
                        ...contactUsData,
                        name: e.target.value,
                      });
                    }}
                    placeholder="Full name"
                    required
                  />
                </FormControl>
                <FormControl
                  sx={{ my: 1, width: "100%", background: "white" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="email"
                    type="email"
                    value={contactUsData.email}
                    onChange={(e) => {
                      setContactUsData({
                        ...contactUsData,
                        email: e.target.value,
                      });
                    }}
                    placeholder="Email address"
                    required
                  />
                </FormControl>
                <FormControl
                  sx={{ my: 1, width: "100%", background: "white" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="subject"
                    type="text"
                    value={contactUsData.subject}
                    onChange={(e) => {
                      setContactUsData({
                        ...contactUsData,
                        subject: e.target.value,
                      });
                    }}
                    placeholder="Subject"
                    required
                  />
                </FormControl>
                <div>
                  <CKEditor
                    placeholder="Message"
                    className="form-control my-1"
                    data={contactUsData.message}
                    editor={ClassicEditor}
                    onChange={(_, editor) => {
                      const data = editor.getData();
                      setContactUsData({ ...contactUsData, message: data });
                    }}
                  />
                </div>
                <LoadingButton
                  loadingPosition="Sending..."
                  loading={btnLoading}
                  variant="contained"
                  sx={{ my: 1, width: "100%" }}
                  onClick={sendMessage}
                >
                  Send Message
                </LoadingButton>
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
