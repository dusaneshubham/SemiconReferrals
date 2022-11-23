import React from "react";
import './job-overview.css';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

export default function JobOverview(props) {
  return (
    <div id="job-overview">
      <h5>Job Overview</h5>

      <div className="data-div">
        <div>
          <CalendarTodayIcon className="icon" />
        </div>
        <div className="data-right-div">
          <h6>Job posted</h6>
          <span>{props.jobPostedDate}</span>
        </div>
      </div>

      <div className="data-div">
        <div>
          <LocationOnOutlinedIcon className="icon" />
        </div>
        <div className="data-right-div">
          <h6>Location</h6>
          <span>{props.location}</span>
        </div>
      </div>

      <div className="data-div">
        <div>
          <LocalAtmIcon className="icon" />
        </div>
        <div className="data-right-div">
          <h6>Salary</h6>
          <span>{props.salary}</span>
        </div>
      </div>

      <div className="data-div">
        <div>
          <HourglassTopIcon className="icon" />
        </div>
        <div className="data-right-div">
          <h6>Expiration date</h6>
          <span>{props.expirationDate}</span>
        </div>
      </div>

      <div className="data-div">
        <div>
          <PersonOutlineOutlinedIcon className="icon" />
        </div>
        <div className="data-right-div">
          <h6>Experience Level</h6>
          <span>{props.experienceLevel}</span>
        </div>
      </div>

      <div className="data-div">
        <div>
          <WorkspacePremiumOutlinedIcon className="icon" />
        </div>
        <div className="data-right-div">
          <h6>Qualification</h6>
          <span>{props.qualification}</span>
        </div>
      </div>
    </div>
  );
}
