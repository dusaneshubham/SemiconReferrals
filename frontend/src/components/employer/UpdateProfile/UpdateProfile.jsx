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
    companyName: "",
    email: "",
    contactNumber: "",
    companyWebsite: "",
    linkedin: "",
    totalExperience: "",
    teamName: "",
    teamSize: "",
    location: "",
    designation: "",
    currentExperience: "",
    teamWorkDescription: ""
  });

  useEffect(() => {
    // Getting user details from backend
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/recruiter/getRecruiterDetails", { token })
        .then((res) => res.data)
        .then(async (res) => {
          await setUserDetails((data) => {
            return { ...data, ...res }
          });
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
  const updateEmployerProfile = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/recruiter/updateProfile", {
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
              <h4>Basic Information</h4>
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

                {/*--------------------- Company Name ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="company-name" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    defaultValue={userDetails.companyName}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        companyName: e.target.value,
                      })
                    }
                    className="form-control"
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

                {/*--------------------- Company Website ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="company-website" className="form-label">
                    Company Website
                  </label>
                  <input
                    type="text"
                    id="company-website"
                    defaultValue={userDetails.companyWebsite}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        companyWebsite: e.target.value,
                      })
                    }
                    className="form-control"
                  />
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

                {/*--------------------- Total Experience ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="total-experience" className="form-label">
                    Total Experience (in years)
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.totalExperience}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        totalExperience: e.target.value,
                      })
                    }
                    className="form-control"
                    id="total-experience"
                  />
                </div>

                {/*--------------------- Linkedin ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="linkedin" className="form-label">
                    Linkedin Profile
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.linkedin}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        linkedin: e.target.value,
                      })
                    }
                    className="form-control"
                    id="linkedin"
                  />
                </div>
              </div>
            </div>
          </div>

          {/*--------------------- Important Important ---------------------*/}
          <div className="col-md-8 p-4 bg-white">
            <div style={{ margin: "10px 0" }}>
              <h4>Important Information</h4>
              <div className="row g-3 p-4 bg-light">
                {/*--------------------- Team Name ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="team-name" className="form-label">
                    Your Team Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.teamName}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        teamName: e.target.value,
                      })
                    }
                    className="form-control"
                    id="team-name"
                  />
                </div>

                {/*--------------------- Team Size ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="team-size" className="form-label">
                    Team Size
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.teamSize}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        teamSize: e.target.value,
                      })
                    }
                    className="form-control"
                    id="team-size"
                  />
                </div>

                {/*--------------------- Company Location ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="location" className="form-label">
                    Company Location
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.location}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        location: e.target.value,
                      })
                    }
                    className="form-control"
                    id="location"
                  />
                </div>

                {/*--------------------- Designation ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="designation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.designation}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        designation: e.target.value,
                      })
                    }
                    className="form-control"
                    id="designation"
                  />
                </div>

                {/*--------------------- Current Experience ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="current-experience" className="form-label">
                    Your experience in the current organization (in years)
                  </label>
                  <input
                    type="text"
                    defaultValue={userDetails.currentExperience}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        currentExperience: e.target.value,
                      })
                    }
                    className="form-control"
                    id="current-experience"
                  />
                </div>

                {/*--------------------- Team Work Description ---------------------*/}
                <div>
                  <label htmlFor="team-work-description" className="form-label">
                    Team Work Description
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={userDetails.teamWorkDescription}
                    onChange={(e, editor) => {
                      const data = editor.getData();
                      // console.log({ e, editor, data });
                      setUserDetails({
                        ...userDetails,
                        teamWorkDescription: data,
                      });
                    }}
                  />
                </div>

                {/*--------------------- Submit Button ---------------------*/}
                <div className="col-12">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ float: "right", margin: "15px 0" }}
                    onClick={updateEmployerProfile}
                  >
                    Save Information
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default UpdateProfile;
