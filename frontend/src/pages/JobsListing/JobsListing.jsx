import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./jobs-listing.css";

// import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import JobList from "../../components/JobList/JobList";

function JobsListing() {

  const qualificationOptions = ["Bachelor", "Master", "PHD"];

  return (
    <>
      {/* <Navbar /> */}

      <div style={{ backgroundColor: "var(--bg-gray" }}>
        <div className="container" style={{ padding: "70px 0" }}>

          <div className="row">

            <div id="filters-div" className="col-md-3">
              <h4>Filters</h4>
              {/* ------------------ Keywords --------------------- */}
              <div className="my-4">
                <label htmlFor="keywords" className="form-label">Search by Keywords</label>
                <input type="text" className="form-control" id="keywords" placeholder="Search" />
              </div>

              {/* ------------------ Location --------------------- */}
              <div className="my-4">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" />
              </div>

              {/* ------------------ Qualification --------------------- */}
              <div className="my-4">
                <label htmlFor="qualification" className="form-label">Qualification</label>
                <select className="form-select">
                  <option selected disabled>-- Select --</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PHD">PHD</option>
                </select>
              </div>

              {/* ------------------ Experience --------------------- */}
              <div className="my-4">
                <label htmlFor="experience" className="form-label">Experience</label>
                <select className="form-select">
                  <option selected disabled>-- Select --</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Trained Professional (0-1 year)">Trained Professional (0-1 year)</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              {/* ------------------ Job Type --------------------- */}
              <div className="my-4">
                <label htmlFor="job-type" className="form-label">Job Type</label>
                <select className="form-select">
                  <option selected disabled>-- Select --</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

            </div>

            <div id="joblists-div" className="col-md-9">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Showing 1-10 of 100 results</span>
              </div>

              <div className="job-list">
                <JobList />
                <JobList />
                <JobList />
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default JobsListing;
