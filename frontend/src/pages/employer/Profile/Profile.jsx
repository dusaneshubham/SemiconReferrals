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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LoadingButton from "@mui/lab/LoadingButton";
import { isEmail } from "validator";

const Profile = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [candidateId, setCandidateId] = useState("");
  const [isFollow, setIsFollow] = useState(false);
  const [contactUsData, setContactUsData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [data, setData] = useState({
    name: "NaN",
    email: "NaN",
    contactNumber: "NaN",
    companyName: "NaN",
    companyWebsite: "NaN",
    totalExperience: "NaN",
    linkedin: "NaN",
    teamName: "NaN",
    teamSize: "NaN",
    location: "NaN",
    designation: "NaN",
    experienceInCurrentOrganization: "NaN",
    teamWorkDescription: "NaN",
    createDate: "NaN",
  });
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const id = param.id;
    const getData = async () => {
      if (token) {
        axios
          .post("http://localhost:5000/candidate/getCandidateDetails", {
            token,
          })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              setCandidateId(res.candidateId);
              if (res.followings) {
                res.followings.forEach((element) => {
                  if (element.recruiter === id) setIsFollow(true);
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
            window.history.go(-1);
          });
      }

      await axios
        .post("http://localhost:5000/recruiter/getRecruiterDetailsById", { id })
        .then((res) => res.data)
        .then((res) => {
          if (res.success && res.data.companyName) {
            setData(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            setData((data) => {
              res = res.data;
              return { ...data, ...res };
            });
          }
        })
        .catch((err) => {
          console.log(err);
          window.history.go(-1);
        });
    };

    getData();
  }, [navigate, param, token]);

  // alert
  const [alert, setAlert] = useState({});

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

  const followRecruiter = () => {
    axios
      .post("http://localhost:5000/candidate/followRecruiter", {
        token,
        recruiterId: param.id,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setIsFollow(true);
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ message: "Something went wrong with server!!" });
      });
  };

  const unFollowRecruiter = () => {
    axios
      .post("http://localhost:5000/candidate/unFollowRecruiter", {
        token,
        recruiterId: param.id,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setIsFollow(false);
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ message: "Something went wrong with server!!" });
      });
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
            setBtnLoading(false);
          } else {
            setAlert({ error: res.message });
            setBtnLoading(false);
          }
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
          <div className="m-auto section">
            {data.profileImage ? (
              <img
                className="img-fluid mx-3"
                src={`http://localhost:5000/images/companyLogo/${data.profileImage}`}
                width="80"
                height="80"
                alt="Logo"
              />
            ) : (
              <img
                className="img-fluid mx-3"
                src={"http://localhost:5000/profileImage/defaultImage.png"}
                width="80"
                height="80"
                alt="Logo"
              />
            )}
            <div className="d-inline-block">
              <h3 className="text-orange">{data.name}</h3>
              <p className="text-smaller">{data.companyName}</p>
            </div>
            {data.linkedin !== "" && data.linkedin !== "NaN" && (
              <div className="float-end">
                <a href={data.linkedin} target="_blank" rel="noreferrer">
                  <LinkedIn fontSize="large" />
                </a>
              </div>
            )}
            {candidateId !== "" && (
              <>
                <hr />
                <div className="d-flex justify-content-center">
                  {/* --------------------- Save Candidate --------------------- */}
                  {isFollow ? (
                    <Button
                      className="w-25"
                      variant="contained"
                      color="error"
                      onClick={unFollowRecruiter}
                    >
                      UnFollow
                    </Button>
                  ) : (
                    <Button
                      className="w-25"
                      variant="contained"
                      color="success"
                      onClick={followRecruiter}
                    >
                      Follow
                    </Button>
                  )}
                  {/* ---------------------------------------------------------- */}
                </div>
              </>
            )}
          </div>
          <div className="row">
            <div className="col-md-7 mx-3 employer-profile">
              {/*--------------------- About me ---------------------*/}
              <div className="section bg-light">
                <h5 className="header mb-3">About me</h5>
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.teamWorkDescription,
                  }}
                  className="about text-secondary"
                ></span>
              </div>
              {/* ---------------------------------------------------- */}

              {/*--------------------- Employer Details ---------------------*/}
              <div className="section">
                <h5 className="header">Employer Details</h5>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="body-section1">
                    {data.createDate && (
                      <p className="text-black mb-3">
                        <span className="text-orange mx-1">
                          <CardMembership />
                        </span>
                        <strong>Member Since: </strong>
                        <span className="text-secondary">
                          {getDate(data.createDate)}
                        </span>
                      </p>
                    )}
                    {data.email && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <Email />
                        </span>
                        <strong>Email: </strong>
                        <span className="text-secondary">{data.email}</span>
                      </p>
                    )}
                  </div>
                  <div className="body-section2">
                    {data.teamSize && (
                      <p className="text-black mb-3">
                        <span className="text-orange mx-1">
                          <PeopleOutline />
                        </span>
                        <strong>Employees: </strong>
                        <span className="text-secondary">{data.teamSize}</span>
                      </p>
                    )}
                    {data.companyWebsite && (
                      <p className="text-black my-3">
                        <span className="text-orange mx-1">
                          <Public />
                        </span>
                        <strong>Company website: </strong>
                        <span className="text-secondary">
                          {data.companyWebsite}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
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
                {data.designation && (
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      Role
                    </div>
                    {data.designation}
                  </div>
                )}
                {
                  <div style={{ margin: "25px 0" }}>
                    <div style={{ color: "var(--text)", fontSize: "12px" }}>
                      About your organization
                    </div>
                    {/* TODO */}
                    None
                  </div>
                }
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
                  <label htmlFor="team-work-description" className="form-label">
                    Message
                  </label>
                  <CKEditor
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
