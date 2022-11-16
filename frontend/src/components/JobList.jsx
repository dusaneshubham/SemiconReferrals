import React from 'react';
import "./css/job-list.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

function JobList() {
    return (
      <>
        <div className="job-info">
          
          <div style={{ display: "flex" }}>
            <div className="company-logo">
              <img src="../../images/google-logo.png" alt="logo" />
            </div>

            <div style={{ marginLeft: "20px" }}>
              <h5>Junior Web Developer</h5>
              <div style={{ display: "flex", marginTop: "15px" }}>
                <div style={{ fontSize: "13px" }}>
                  <BusinessCenterOutlinedIcon
                    style={{ color: "rgba(0,0,0,0.4)" }}
                  />
                  <span style={{ margin: "0 30px 0 8px" }}>
                    Design, Development
                  </span>
                </div>
                <div style={{ fontSize: "13px" }}>
                  <LocationOnOutlinedIcon
                    style={{ color: "rgba(0,0,0,0.4)" }}
                  />
                  <span style={{ margin: "0 30px 0 8px" }}>California</span>
                </div>
                <div style={{ fontSize: "13px" }}>
                  <LocalAtmOutlinedIcon style={{ color: "rgba(0,0,0,0.4)" }} />
                  <span style={{ margin: "0 30px 0 8px" }}>
                    $150 - $200 / week
                  </span>
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

          <div>
            <BookmarkBorderOutlinedIcon style={{ color: "rgba(0,0,0,0.4)" }} />
          </div>
          
        </div>
      </>
    );
}

export default JobList