import React from 'react';
import "./job-list.css";
import { image2 } from "../../../images/images";
import { Link } from 'react-router-dom';

import { LocalAtm as LocalAtmIcon, HourglassTop as HourglassTopIcon, BusinessCenterOutlined as BusinessCenterOutlinedIcon, LocationOnOutlined as LocationOnOutlinedIcon } from "@mui/icons-material";


const JobList = (props) => {

  const formatDate = (anyDate) => {
    let fullDate = new Date(anyDate);
    const month = fullDate.toLocaleString("en-US", { month: "short" });
    const date = fullDate.getDate();
    const year = fullDate.getFullYear();
    return `${month}. ${date}, ${year}`;
  };

  return (
    <>
      <div className="job-info">
        <div style={{ display: "flex" }}>
          <div className="company-logo img-fluid">
            <img src={image2} alt="logo" width="50" height="50" />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <Link to={`/jobdescription/${props.data._id}`} style={{ textDecoration: "none" }}><h5 className="title">{props.data.jobTitle}</h5></Link>
            <h6 className="company-name">{props.data.companyName}</h6>

            <div className="details-div">

              {/* --------------------- Job Category -------------------- */}
              {props.data.jobCategory && (
                <div>
                  <BusinessCenterOutlinedIcon />
                  <span className="detail">{props.data.jobCategory}</span>
                </div>
              )}

              {/* --------------------- Location -------------------- */}
              {props.data.location && (
                <div>
                  <LocationOnOutlinedIcon />
                  <span className="detail">{props.data.location}</span>
                </div>
              )}

              {/* --------------------- Deadline -------------------- */}
              {props.data.applicationDeadline && (
                <div>
                  <HourglassTopIcon />
                  <span className="detail">{formatDate(props.data.applicationDeadline)}</span>
                </div>
              )}

              {/* --------------------- Deadline -------------------- */}
              {props.data.salary && (
                <div>
                  <LocalAtmIcon />
                  <span className="detail">{props.data.salary}</span>
                </div>
              )}

              {props.data.skillsRequired.length > 0 && (
                <ul className="skills d-flex flex-wrap">
                  {props.data.skillsRequired.map((skill, index) => {
                    return <li key={index}>{skill}</li>
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobList;