import React from "react";
import "./job-overview.css";
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

      <div className="job-overview-data-div">
        <div>
          <LocationOnOutlinedIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Location</h6>
          <span>{props.location}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <LocalAtmIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Salary</h6>
          <span>{props.salary}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <HourglassTopIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Application Deadline</h6>
          <span>{props.deadline}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <PersonOutlineOutlinedIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Experience</h6>
          <span>{props.experience}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <WorkspacePremiumOutlinedIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Qualification</h6>
          <span>{props.qualification}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <WorkspacePremiumOutlinedIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Job Type</h6>
          <span>{props.jobType}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <WorkspacePremiumOutlinedIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Job Level</h6>
          <span>{props.jobLevel}</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <WorkspacePremiumOutlinedIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Number of vacancies</h6>
          <span>{props.vacancies} openings</span>
        </div>
      </div>

      <div className="job-overview-data-div">
        <div>
          <CalendarTodayIcon className="icon" />
        </div>
        <div className="job-overview-data-right-div">
          <h6>Job posted</h6>
          <span>{props.jobPostedDate}</span>
        </div>
      </div>
      
    </div>
  );
}
