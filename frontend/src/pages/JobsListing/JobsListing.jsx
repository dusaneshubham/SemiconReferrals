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
  return (
    <>
      {/* <Navbar /> */}

      <div style={{ backgroundColor: "var(--bg-gray" }}>
        <div className="container">
          <div id="filters-div">
            <div>
              <h6>Search by Keywords</h6>
              <div className="filter-input-div">
                <SearchIcon />
                <input type="text" placeholder="Job title, keywords..." />
              </div>
            </div>

            <div>
              <h6>Location</h6>
              <div className="filter-input-div">
                <LocationOnOutlinedIcon />
                <input type="text" placeholder="City" />
              </div>
            </div>

            <div>
              <h6>Category</h6>
              <div className="filter-input-div">
                <BusinessCenterOutlinedIcon />
                <select name="" id="">
                  <option value="" selected disabled>
                    Select category
                  </option>
                  <option value="">Frontend</option>
                  <option value="">Backend</option>
                  <option value="">Semiconductor</option>
                </select>
              </div>
            </div>

            <div>
              <h6>Job Type</h6>
              <div className="filter-input-div">
                <WorkOutlineOutlinedIcon />
                <select name="" id="">
                  <option value="" selected disabled>
                    Select Job Type
                  </option>
                  <option value="">Full Time</option>
                  <option value="">Part Time</option>
                  <option value="">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <h6>Date Posted</h6>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>Last Hour</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>Last 24 hours</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>Last 7 days</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>Last 14 days</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>Last 30 days</span>
              </div>
            </div>

            <div>
              <h6>Experience level</h6>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>Fresher</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>1-3 years</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>4-7 years</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>8-10 years</span>
              </div>
              <div className="filter-radio-div">
                <input type="radio" name="" id="" /> <span>10+ years</span>
              </div>
            </div>
          </div>

          <div id="joblists-div">
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

      <Footer />
    </>
  );
}

export default JobsListing;
