import React from 'react';
import StatisticsCard from "../../StatisticsCard/StatisticsCard";
import { image8, image9 } from "../../../images/images";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Timeline, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import './Dashboard.css';
import AlertPopUp from '../../AlertPopUp/AlertPopUp';
import Loading from '../../Loading/Loading';

const Dashboard = () => {

  // user details
  const [user, setUser] = useState({
    about: "",
    noOfFollowings: 0,
    noOfJobApplication: 0,
    education: [],
    workingExperience: []
  });

  // alert
  const [alert, setAlert] = useState({});

  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getData = async () => {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/candidate/getCandidateDetails", { token })
        .then((res) => res.data)
        .then((res) => {
          if (res.success && res.infoId) {
            setUser((data) => {
              return {
                ...data, about: res.about,
                noOfFollowings: res.followings.length,
                education: res.education,
                workingExperience: res.workingExperience
              }
            });
          }
        }).then(async () => {
          await axios.post("http://localhost:5000/candidate/getAllJobApplications", { token })
            .then((res) => res.data)
            .then((res) => {
              if (res.success) {
                setUser((data) => { return { ...data, noOfJobApplication: res.data.length } });
                setLoading(false);
              } else {
                setAlert({ error: res.message });
                setLoading(false);
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
              setAlert({ error: "Something went wrong with server!" });
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setAlert({ error: "Something went wrong with server!" });
        });
    }
    getData();

  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        {/* ---------------------- alert ---------------------- */}
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />
        {/* --------------------------------------------------- */}
        <div className="bg-white py-3 px-4 dashboard">
          <div className="d-flex dashboard-cards-div">
            <StatisticsCard
              title="Applied Jobs"
              image={image8}
              value={user.noOfJobApplication}
              bgColor="#32ac79"
              link="/candidate/appliedjobs"
            />
            <StatisticsCard
              title="Followed companies"
              image={image9}
              value={user.noOfFollowings}
              bgColor="#8675ff"
              link="/candidate/followedemployers"
            />
          </div>

          {/* ---------------------- Profile ---------------------- */}
          <h4 className="mt-4 mb-3">My Profile</h4>
          <span dangerouslySetInnerHTML={{ __html: user.about }} className="about text-secondary"></span>

          <hr />

          {/* ---------------------- Education ---------------------- */}
          <h4 className="mt-4 mb-0">Education</h4>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
            className="mt-3"
          >
            {user.education.map((data, index) => {
              let startDate = new Date(data.startDate);
              let endDate = new Date(data.endDate);
              return (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <p style={{ fontSize: "13px" }} className="text-secondary">
                      {startDate.toLocaleString('default', { month: 'long' }) + " " + startDate.getFullYear()}
                      &nbsp;-&nbsp;
                      {endDate.toLocaleString('default', { month: 'long' }) + " " + endDate.getFullYear()}</p>
                    <h5 className="text-black mb-1">{data.title}</h5>
                    <h6 style={{ color: "var(--main-orange)" }} className="mb-3">{data.instituteName}</h6>
                    <span dangerouslySetInnerHTML={{ __html: data.description }} className="about text-secondary"></span>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>

          <hr />

          {/* ---------------------- Work Experience ---------------------- */}
          <h4 className="mt-4 mb-0">Work Experience</h4>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
            className="mt-3"
          >
            {user.workingExperience.map((data, index) => {
              let startDate = new Date(data.jobStartDate);
              let endDate = new Date(data.jobEndDate);
              return (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <p style={{ fontSize: "13px" }} className="text-secondary">
                      {startDate.toLocaleString('default', { month: 'long' }) + " " + startDate.getFullYear()}
                      &nbsp;-&nbsp;
                      {!data.isCurrentlyWorking ? endDate.toLocaleString('default', { month: 'long' }) + " " + endDate.getFullYear() : 'Currently Working'}</p>
                    <h5 className="text-black mb-1">{data.designation}</h5>
                    <h6 style={{ color: "var(--main-orange)" }} className="mb-3">{data.organizationName}</h6>
                    <span dangerouslySetInnerHTML={{ __html: data.description }} className="about text-secondary"></span>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </div>
      </>
    );
  }
}

export default Dashboard;