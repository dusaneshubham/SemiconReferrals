import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./UpdateProfile.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateProfile = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div style={{ margin: "10px" }}>
            <h4>Personal Information</h4>
            <form className="row g-3">
              <div className="col-md-6">
                <label for="name" className="form-label">
                  Full Name
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="col-md-6">
                <label for="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  disabled
                />
              </div>

              <div class="col-md-6">
                <label for="gender" class="form-label">
                  Gender
                </label>
                <select id="gender" class="form-select">
                  <option selected>Choose...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label for="DOB" className="form-label">
                  Date Of Birth
                </label>
                <input type="date" className="form-control" id="DOB" />
              </div>

              <div className="col-md-6">
                <label for="profile-image" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profile-image"
                />
              </div>
              <div class="col-md-6">
                <label for="experience" class="form-label">
                  Experience
                </label>
                <select id="experience" class="form-select">
                  <option selected>Choose...</option>
                  <option>Fresher</option>
                  <option>Trained Professional</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>6-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="qualification" class="form-label">
                  Qualification
                </label>
                <select id="qualification" class="form-select">
                  <option selected>Choose...</option>
                  <option>Bachelor</option>
                  <option>Master</option>
                  <option>PHD</option>
                </select>
              </div>
              <div className="col-md-6">
                <label for="contact-number" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact-number"
                />
              </div>

              <div>
                <label for="contact-number" className="form-label">
                  About Yourself
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data="About"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                  }}
                />
              </div>

              <div class="col-12">
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
            <form className="row g-3">
              <div className="col-md-12">
                <label for="desired-cities" className="form-label">
                  What are your desired cities to work in? (You can enter
                  multiple cities separated with a comma)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="desired-cities"
                />
              </div>

              <div class="col-md-12">
                <label for="open-to-work" class="form-label">
                  Are you open to work? *
                </label>
                <select id="open-to-work" class="form-select">
                  <option disabled>Choose</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div class="col-md-12">
                <label for="notice-period" class="form-label">
                  What is your notice period? *
                </label>
                <select id="notice-period" class="form-select">
                  <option disabled>Choose</option>
                  <option>Immediate Joining</option>
                  <option>1 month</option>
                  <option>2 months</option>
                  <option>3 months</option>
                </select>
              </div>

              <div className="col-md-12">
                <label for="current-job-location" className="form-label">
                  What is your current job location ? *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="current-job-location"
                />
              </div>

              <div class="col-12">
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
