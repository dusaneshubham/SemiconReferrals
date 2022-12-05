import React from "react";
import "./job-overview.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

export default function JobOverview(props) {
  
  const formatDate = (anyDate) => {
      let fullDate = new Date(anyDate);
      const month = fullDate.toLocaleString("en-US", { month: "short" });
      const date = fullDate.getDate();
      const year = fullDate.getFullYear();
      return `${month}. ${date}, ${year}`;
  };

  return (
    <div id="job-overview">
      <h5>Job Overview</h5>

      {/* ---------------- Experience ---------------- */}
      {props.location && (
        <div className="job-overview-data-div">
          <div>
            <LocationOnOutlinedIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Location</span>
            <h6>{props.location}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Salary ---------------- */}
      {props.salary && (
        <div className="job-overview-data-div">
          <div>
            <LocalAtmIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Salary</span>
            <h6>{props.salary}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Deadline ---------------- */}
      {props.deadline && (
        <div className="job-overview-data-div">
          <div>
            <HourglassTopIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Application Deadline</span>
            <h6>{formatDate(props.deadline)}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Experience ---------------- */}
      {props.experience && (
        <div className="job-overview-data-div">
          <div>
            <PersonOutlineOutlinedIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Experience</span>
            <h6>{props.experience}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Qualification ---------------- */}
      {props.qualification && (
        <div className="job-overview-data-div">
          <div>
            <WorkspacePremiumOutlinedIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Qualification</span>
            <h6>{props.qualification}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Job Type ---------------- */}
      {props.jobType && (
        <div className="job-overview-data-div">
          <div>
            <WorkspacePremiumOutlinedIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Job Type</span>
            <h6>{props.jobType}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Job Level ---------------- */}
      {props.jobLevel && (
        <div className="job-overview-data-div">
          <div>
            <WorkspacePremiumOutlinedIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Job Level</span>
            <h6>{props.jobLevel}</h6>
          </div>
        </div>
      )}

      {/* ---------------- Number of vacancies ---------------- */}
      {props.vacancies && (
        <div className="job-overview-data-div">
          <div>
            <WorkspacePremiumOutlinedIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Number of vacancies</span>
            <h6>{props.vacancies} openings</h6>
          </div>
        </div>
      )}

      {/* ---------------- Job Posted Date ---------------- */}
      {props.jobPostedDate && (
        <div className="job-overview-data-div">
          <div>
            <CalendarTodayIcon className="icon" />
          </div>
          <div className="job-overview-data-right-div">
            <span>Job posted</span>
            <h6>{formatDate(props.jobPostedDate)}</h6>
          </div>
        </div>
      )}
    </div>
  );
}
