import React from 'react';
import "./job-list.css";
import { image2 } from "../../../images/images";
import { Link } from 'react-router-dom';

import { LocalAtm as LocalAtmIcon, HourglassTop as HourglassTopIcon, BusinessCenterOutlined as BusinessCenterOutlinedIcon, LocationOnOutlined as LocationOnOutlinedIcon } from "@mui/icons-material";


function JobList() {
  return (
    <>
      <div className="job-info">

        <div style={{ display: "flex" }}>
          <div className="company-logo img-fluid">
            <img src={image2} alt="logo" width="60" height="60" />
          </div>

          <div style={{ marginLeft: "20px" }}>
            <Link to="" style={{textDecoration:"none"}}><h5 className="title">Junior Web Developer</h5></Link>
            <h6 className="company-name">Google</h6>

            <div className="details-div">
              <div>
                <BusinessCenterOutlinedIcon />
                <span className="detail">
                  ASIC Verification
                </span>
              </div>
              <div>
                <LocationOnOutlinedIcon />
                <span className="detail">California</span>
              </div>
              <div>
                <HourglassTopIcon />
                <span className="detail">Dec. 13, 2000</span>
              </div>
              <div>
                <LocalAtmIcon />
                <span className="detail">Rs. 12 LPA</span>
              </div>
            </div>

            <ul className="skills d-flex flex-wrap">
              <li>Frontend</li>
              <li>Backend</li>
              <li>Frontend</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
              <li>SQL</li>
            </ul>

          </div>
        </div>

      </div>
    </>
  );
}

export default JobList;