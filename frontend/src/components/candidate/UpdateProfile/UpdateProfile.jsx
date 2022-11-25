import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div>
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
                <input type="email" className="form-control" id="email" disabled />
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

              <div class="col-12">
                <button type="submit" class="btn btn-primary">
                  Sign in
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
