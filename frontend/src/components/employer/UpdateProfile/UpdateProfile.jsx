import React from "react";
import "./UpdateProfile.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";

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
    companyLogo: "",
    linkedin: "",
    totalExperience: "",
    teamName: "",
    teamSize: "",
    location: "",
    designation: "",
    currentExperience: "",
    teamWorkDescription: ""
  });

  // companyLogo
  const [companyLogo, setCompanyLogo] = useState();
  
  // token
  let token = localStorage.getItem("token");
  
  useEffect(() => {
    // Getting user details from backend
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
        });
    } else {
      setAlert({ error: "Unauthorized user!" });
    }
  }, [token]);

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

  // update company logo
  const updateCompanyLogo = async () => {
    if (companyLogo) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("companyLogo", companyLogo);
      axios.post("http://localhost:5000/recruiter/updateProfileImage", formData)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setUserDetails({ ...userDetails, companyLogo: res.companyLogo });
            setAlert({ success: res.message });
            document.getElementById('company-logo').value = "";
          } else {
            setAlert({ error: res.message });
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!!" });
        })
    } else {
      setAlert({ error: "Please! select profile image!!" });
    }
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
        <div className="row">
          {/* ---------------------- alert ---------------------- */}
          <AlertPopUp
            alert={alert}
            setAlert={setAlert}
          />
          {/* --------------------------------------------------- */}

          {/*--------------------- Profile image ---------------------*/}
          <div className="col-md-8 p-4 bg-white">
            <div style={{ margin: "10px 0" }}>
              <h4>Company Logo</h4>
              <div className="row g-3 p-4 bg-light">
                <div className="col-md-12">
                  {userDetails.companyLogo && userDetails.companyLogo !== "" &&
                    <div className="d-flex justify-content-center w-100">
                      <img src={"http://localhost:5000/companyImage/" + userDetails.companyLogo} alt="companyLogo" className="img-fluid" height="100" width="100" />
                    </div>
                  }
                  <label htmlFor="company-logo" className="form-label">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="company-logo"
                    onChange={(e) => setCompanyLogo(e.target.files[0])}
                  />
                  {/*--------------------- Submit Button ---------------------*/}
                  <div className="col-12">
                    <Button
                      variant="contained"
                      type="submit"
                      className="start-hiring-btn"
                      style={{ float: "right", margin: "15px 0" }}
                      onClick={updateCompanyLogo}
                    >
                      Save Company Logo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    type="number"
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

          {/*--------------------- Important Information ---------------------*/}
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
                    type="number"
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
