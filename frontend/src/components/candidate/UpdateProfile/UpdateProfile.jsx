import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./UpdateProfile.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UpdateProfile = () => {
  let [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    DOB: "",
    gender: "",
    experience: "",
    qualification: "",
    about: "",
  });
  let [impInfo, setImpInfo] = useState({
    desiredCitiesToWork: "",
    isOpenToWork: "",
    noticePeriod: "",
    currentJobLocation: "",
  });

  // Getting user details from backend
  let token = localStorage.getItem("token");
  const getCandidateDetails = () => {
    axios
      .post("http://localhost:5000/candidate/getCandidateDetails", { token })
      .then((response) => {
        let {
          name,
          email,
          contactNumber,
          DOB,
          gender,
          experience,
          qualification,
          about,
          desiredCitiesToWork,
          isOpenToWork,
          noticePeriod,
          currentJobLocation,
        } = response.data;
        setUserDetails({
          name,
          email,
          contactNumber,
          DOB,
          gender,
          experience,
          qualification,
          about,
        });
        setImpInfo({
          desiredCitiesToWork,
          isOpenToWork,
          noticePeriod,
          currentJobLocation,
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    getCandidateDetails();
  }, []);

  const updateCandidateProfile = (e) => {
    e.preventDefault();
    const {
      name,
      contactNumber,
      DOB,
      experience,
      qualification,
      about,
      gender,
    } = userDetails;
    const {
      desiredCitiesToWork,
      isOpenToWork,
      noticePeriod,
      currentJobLocation,
    } = impInfo;
    axios
      .post("http://localhost:5000/candidate/updateProfile", {
        name,
        contactNumber,
        DOB,
        experience,
        qualification,
        about,
        gender,
        desiredCitiesToWork,
        isOpenToWork,
        noticePeriod,
        currentJobLocation,
        token,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(() => {});
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div style={{ margin: "10px" }}>
            <h4>Personal Information</h4>
            <form className="row g-3" onSubmit={updateCandidateProfile}>
              {/* Name */}
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
              {/* Email */}
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

              {/* Gender */}
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
                  <option selected>Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* DOB */}
              <div className="col-md-6">
                <label htmlFor="DOB" className="form-label">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  defaultValue={userDetails.DOB}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, DOB: e.target.value })
                  }
                  className="form-control"
                  id="DOB"
                />
              </div>

              {/* Profile image */}
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
              {/* Experience */}
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
                  <option selected disabled value="">
                    Choose...
                  </option>
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

              {/* Qualification */}
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
                  <option selected disabled>
                    Choose...
                  </option>
                  <option>Bachelor</option>
                  <option>Master</option>
                  <option>PHD</option>
                </select>
              </div>
              {/* Contact Number */}
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

              <div className="col-12">
                <button
                  type="submit"
                  className="start-hiring-btn"
                  style={{ float: "right", margin: "15px 0" }}
                >
                  Save Information
                </button>
              </div>
            </form>
          </div>

          <hr />

          <div style={{ margin: "50px 0 10px 0" }}>
            <h4>Important Information</h4>
            <form className="row g-3" onSubmit={updateCandidateProfile}>
              <div className="col-md-12">
                <label htmlFor="desired-cities" className="form-label">
                  What are your desired cities to work in? (You can enter
                  multiple cities separated with a comma)
                </label>
                <input
                  type="text"
                  defaultValue={impInfo.desiredCitiesToWork}
                  onChange={(e) =>
                    setImpInfo({
                      ...impInfo,
                      desiredCitiesToWork: e.target.value,
                    })
                  }
                  className="form-control"
                  id="desired-cities"
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="open-to-work" className="form-label">
                  Are you open to work? *
                </label>
                <select
                  id="open-to-work"
                  value={impInfo.isOpenToWork}
                  onChange={(e) =>
                    setImpInfo({
                      ...impInfo,
                      isOpenToWork: e.target.value,
                    })
                  }
                  className="form-select"
                >
                  <option disabled>Choose</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-md-12">
                <label htmlFor="notice-period" className="form-label">
                  What is your notice period? *
                </label>
                <select
                  id="notice-period"
                  value={impInfo.noticePeriod}
                  onChange={(e) =>
                    setImpInfo({
                      ...impInfo,
                      noticePeriod: e.target.value,
                    })
                  }
                  className="form-select"
                >
                  <option disabled>Choose</option>
                  <option>Immediate Joining</option>
                  <option>1 month</option>
                  <option>2 months</option>
                  <option>3 months</option>
                </select>
              </div>

              <div className="col-md-12">
                <label htmlFor="current-job-location" className="form-label">
                  What is your current job location ? *
                </label>
                <input
                  type="text"
                  defaultValue={impInfo.currentJobLocation}
                  onChange={(e) =>
                    setImpInfo({
                      ...impInfo,
                      currentJobLocation: e.target.value,
                    })
                  }
                  className="form-control"
                  id="current-job-location"
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="start-hiring-btn"
                  style={{ float: "right", margin: "15px 0" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default UpdateProfile;
