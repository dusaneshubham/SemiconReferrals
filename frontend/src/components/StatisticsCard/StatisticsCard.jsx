import React from "react";
import { Link } from "react-router-dom";
import "./StatisticsCard.css";

const StatisticsCard = (props) => {
  return (
      <div
        className="dashboard-card d-flex justify-content-between"
        style={{ backgroundColor: props.bgColor }}
      >
        <div>
          <h5>{props.title}</h5>
          <h2>{props.value}</h2>
          <Link to={props.link} className="dashboard-card-link">
            View All
          </Link>
        </div>
        <div>
          <img src={props.image} alt="" width="80" height="80" />
        </div>
      </div>
  );
};

export default StatisticsCard;
