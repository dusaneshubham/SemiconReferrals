import React from "react";
import { Link } from "react-router-dom";
import {image2} from "../../../images/images";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex dashboard-cards-div">
        <div
          className="dashboard-card d-flex justify-content-between"
          style={{ backgroundColor: "#32ac79" }}
        >
          <div>
            <h5>Published Jobs</h5>
            <h2>0</h2>
            <Link className="dashboard-card-link">View All Published Jobs</Link>
          </div>
          <div>
            <img src={image2} alt="" width="80" height="80" />
          </div>
        </div>
        <div
          className="dashboard-card d-flex justify-content-between"
          style={{ backgroundColor: "#8675ff" }}
        >
          <div>
            <h5>Pending Job Applications</h5>
            <h2>10</h2>
            <Link className="dashboard-card-link">
              View All Pending Job Applications
            </Link>
          </div>
          <div>
            <img src={image2} alt="" width="80" height="80" />
          </div>
        </div>
        <div
          className="dashboard-card d-flex justify-content-between"
          style={{ backgroundColor: "#6C5A78" }}
        >
          <div>
            <h5>Number of Employers</h5>
            <h2>1000</h2>
            <Link className="dashboard-card-link">View All Employers</Link>
          </div>
          <div>
            <img src={image2} alt="" width="80" height="80" />
          </div>
        </div>
        <div
          className="dashboard-card d-flex justify-content-between"
          style={{ backgroundColor: "#28CFD7" }}
        >
          <div>
            <h5>Number of Candidates</h5>
            <h2>11000</h2>
            <Link className="dashboard-card-link">View All Candidates</Link>
          </div>
          <div>
            <img src={image2} alt="" width="80" height="80" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
