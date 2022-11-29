import React from "react";
import "./UpdateProfile.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Snackbar, Slide } from "@mui/material";
import ReactLoading from "react-loading";
import MuiAlert from "@mui/material/Alert";
import JobExperience from "./JobExperience";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateProfile = () => {
  // alert
  const [alert, setAlert] = useState({});

  // loading
  const [loading, setLoading] = useState(true);

  // user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    DOB: "",
    gender: "",
    experience: "",
    qualification: "",
    about: "",
    desiredCitiesToWork: "",
    isOpenToWork: "",
    noticePeriod: "",
    currentJobLocation: "",
    education: [],
    workingExperience: [],
    resumes: [],
    linkedin: "",
  });

  useEffect(() => {
    // Getting user details from backend
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/candidate/getCandidateDetails", { token })
        .then((res) => res.data)
        .then(async (res) => {
          await setUserDetails({ ...userDetails, ...res });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          // TODO: logout
        });
    } else {
      setAlert({ error: "Unauthorized user!" });
    }
  }, []);

  // update data
  const updateCandidateProfile = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/candidate/updateProfile", {
          ...userDetails,
          token: token,
        })
        .then((response) => response.data)
        .then((res) => {
          if (res.success) {
            setAlert({ success: res.message });
          } else {
            setAlert({ error: res.message });
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!" });
        });
    } else {
      setAlert({ error: "Unauthorized user!!" });
    }
  };

  const Transition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({});
  };

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
        <div className="row">
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
          {/*--------------------- Personal Details *---------------------*/}
          <div className="col-md-8 p-4 bg-white">
            <div style={{ margin: "10px 0" }}>
              <h4>Personal Information</h4>
              <div className="row g-3 p-4 bg-light">
                {/*--------------------- Name ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                    className="form-control"
                    id="name"
                  />
                </div>

                {/*--------------------- Email ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    className="form-control"
                    id="email"
                    disabled
                  />
                </div>

                {/*--------------------- Gender ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={userDetails.gender}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, gender: e.target.value })
                    }
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/*--------------------- DOB ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="DOB" className="form-label">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue={userDetails.DOB.split("T")[0]}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, DOB: e.target.value })
                    }
                    className="form-control"
                    id="DOB"
                  />
                </div>

                {/*--------------------- Profile image ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="profile-image" className="form-label">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profile-image"
                  />
                </div>

                {/*--------------------- Experience ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="experience" className="form-label">
                    Experience
                  </label>
                  <select
                    id="experience"
                    value={userDetails.experience}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        experience: e.target.value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Trained Professional">
                      Trained Professional
                    </option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                {/*--------------------- Qualification ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <select
                    id="qualification"
                    value={userDetails.qualification}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        qualification: e.target.value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PHD">PHD</option>
                  </select>
                </div>

                {/*--------------------- Contact Number ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="contact-number" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.contactNumber}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        contactNumber: e.target.value,
                      })
                    }
                    className="form-control"
                    id="contact-number"
                  />
                </div>

                {/*--------------------- About ---------------------*/}
                <div>
                  <label htmlFor="contact-number" className="form-label">
                    About Yourself
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={userDetails.about}
                    onChange={(e, editor) => {
                      const data = editor.getData();
                      // console.log({ e, editor, data });
                      setUserDetails({
                        ...userDetails,
                        about: data,
                      });
                    }}
                  />
                </div>

                {/*--------------------- Submit Button ---------------------*/}
                <div className="col-12">
                  <Button
                    variant="contained"
                    type="submit"
                    className="start-hiring-btn"
                    style={{ float: "right", margin: "15px 0" }}
                    onClick={updateCandidateProfile}
                  >
                    Save Information
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/*--------------------- Important Important ---------------------*/}
          <div className="col-md-8 p-4 bg-white">
            <div style={{ margin: "10px 0" }}>
              <h4>Important Information</h4>
              <div className="row g-3 p-4 bg-light">
                {/*--------------------- Qu-1 ---------------------*/}
                <div className="col-md-12">
                  <label htmlFor="desired-cities" className="form-label">
                    What are your desired cities to work in? (You can enter
                    multiple cities separated with a comma)
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.desiredCitiesToWork}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        desiredCitiesToWork: e.target.value,
                      })
                    }
                    className="form-control"
                    id="desired-cities"
                  />
                </div>

                {/*--------------------- Qu-2 ---------------------*/}
                <div className="col-md-12">
                  <label htmlFor="open-to-work" className="form-label">
                    Are you open to work? *
                  </label>
                  <select
                    id="open-to-work"
                    value={userDetails.isOpenToWork}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        isOpenToWork: e.target.value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/*--------------------- Qu-3 ---------------------*/}
                <div className="col-md-12">
                  <label htmlFor="notice-period" className="form-label">
                    What is your notice period? *
                  </label>
                  <select
                    id="notice-period"
                    value={userDetails.noticePeriod}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        noticePeriod: e.target.value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="">Choose...</option>
                    <option value="Immediate Joining">Immediate Joining</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                  </select>
                </div>

                {/*--------------------- Qu-4 ---------------------*/}
                <div className="col-md-12">
                  <label htmlFor="current-job-location" className="form-label">
                    What is your current job location ? *
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.currentJobLocation}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        currentJobLocation: e.target.value,
                      })
                    }
                    className="form-control"
                    id="current-job-location"
                  />
                </div>

                {/*--------------------- Submit Button ---------------------*/}
                <div className="col-12">
                  <Button
                    variant="contained"
                    type="submit"
                    className="start-hiring-btn"
                    style={{ float: "right", margin: "15px 0" }}
                    onClick={updateCandidateProfile}
                  >
                    Save Information
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/*--------------------- Job Experience ---------------------*/}
          <div className="col-md-8 p-4 bg-white">
            <JobExperience data={userDetails.workingExperience} />
          </div>
        </div>
      </>
    );
  }
};

export default UpdateProfile;
