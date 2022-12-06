import React from 'react';
import "./job-list.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import GoogleLogo from "../../images/google-logo.png";
import { Button } from '@mui/material';

function JobList() {
  return (
    <>
      <div className="job-info">
        <div className="row">

          <div className="col-md-10 col-sm-12" style={{ display: "flex" }}>
            <div className="company-logo">
              <img src={GoogleLogo} alt="logo" />
            </div>

            <div style={{ marginLeft: "20px" }}>
              <h5 className="title">Junior Web Developer</h5>
              <h6>Google</h6>
              <div style={{ display: "flex", marginTop: "15px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "13px" }}>
                  <BusinessCenterOutlinedIcon />
                  <span style={{ margin: "0 30px 0 8px" }}>
                    Design, Development
                  </span>
                </div>
                <div style={{ fontSize: "13px" }}>
                  <LocationOnOutlinedIcon />
                  <span style={{ margin: "0 30px 0 8px" }}>California</span>
                </div>
              </div>

              <span
                style={{
                  padding: "3px 15px",
                  backgroundColor: "#b4c4ed",
                  fontSize: "13px",
                  position: "relative",
                  top: "10px",
                  borderRadius: "8px",
                }}
              >
                Full Time
              </span>
            </div>
          </div>

          <div className="col-md-2 col-sm-12">
            <Button className="apply-btn">Apply</Button>
          </div>

        </div>
      </div>
    </>
  );
}

export default JobList;