import React from "react";
import { image2 } from "../../../images/images";
import StatisticsCard from "../../StatisticsCard/StatisticsCard";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex dashboard-cards-div">
        <StatisticsCard
          title="Published Jobs"
          image={image2}
          value="0"
          bgColor="#32ac79"
          link=""
        />
        <StatisticsCard
          title="Pending Job Applications"
          image={image2}
          value="10"
          bgColor="#8675ff"
          link=""
        />
        <StatisticsCard
          title="Number of Employers"
          image={image2}
          value="1000"
          bgColor="#6C5A78"
          link=""
        />
        <StatisticsCard
          title="Number of Candidates"
          image={image2}
          value="11000"
          bgColor="#28CFD7"
          link=""
        />
      </div>
    </>
  );
};

export default Dashboard;
