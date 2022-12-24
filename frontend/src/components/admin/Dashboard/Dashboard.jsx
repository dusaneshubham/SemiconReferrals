import React from "react";
import { useEffect, useState } from "react";
import { image2 } from "../../../images/images";
import StatisticsCard from "../../StatisticsCard/StatisticsCard";
import axios from 'axios';
import Loading from "../../Loading/Loading";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statistic, setStatistics] = useState({});

  useEffect(() => {
    const getStatistics = async () => {
      await axios.get("http://localhost:5000/admin/statistics")
        .then((res) => res.data)
        .then((res) => {
          setStatistics(res.statistics);
          setLoading(false);
        }).catch((err) => {
          console.log(err);
        })
    }
    getStatistics();
  }, [])

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <div className="d-flex dashboard-cards-div">
          <StatisticsCard
            title="Published Jobs"
            image={image2}
            value={statistic.jobPost.approve}
            bgColor="#32ac79"
            link=""
          />
          <StatisticsCard
            title="Pending Job Applications"
            image={image2}
            value={statistic.jobApplication.pending}
            bgColor="#8675ff"
            link="/admin/pendingapplications"
          />
          <StatisticsCard
            title="Pending Job Post"
            image={image2}
            value={statistic.jobApplication.pending}
            bgColor="#6C5A78"
            link="/admin/pendingapplications"
          />
          <StatisticsCard
            title="Number of Employers"
            image={image2}
            value={statistic.numberOfRecruiter}
            bgColor="#6C5A78"
            link="/admin/pendingpost"
          />
          <StatisticsCard
            title="Number of Candidates"
            image={image2}
            value={statistic.numberOfCandidate}
            bgColor="#28CFD7"
            link=""
          />
        </div>
      </>
    );
  }
};

export default Dashboard;
