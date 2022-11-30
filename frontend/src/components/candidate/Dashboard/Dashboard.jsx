import React from 'react';
import StatisticsCard from "../../StatisticsCard/StatisticsCard";
import { image8, image9 } from "../../../images/images";
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Timeline, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import './Dashboard.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const Transition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({});
  };

  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getData = async () => {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/candidate/getCandidateDetails", { token })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.success) {
            await axios.post("http://localhost:5000/candidate/getallapplication", { token })
              .then((res1) => res1.data)
              .then((res1) => {
                if (res1.success) {
                  setUser({
                    about: res.about,
                    noOfFollowings: res.followings.length,
                    noOfJobApplication: res1.data.length,
                    education: res.education,
                    workingExperience: res.workingExperience
                  });
                  setLoading(false);
                } else {
                  setAlert({ error: res1.message });
                  setLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
                setAlert({ error: "Something went wrong with server!" });
              });
          } else {
            setAlert({ error: res.message });
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!" });
        });
    }
    getData();

  }, []);

  if (loading) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <ReactLoading
            type="bubbles"
            color="#1976d2"
            height={100}
            width={100}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* ---------------------- alert ---------------------- */}
        <Snackbar
          autoHideDuration={2000}
          open={alert.error ? true : false}
          TransitionComponent={Transition}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" onClose={handleClose}>
            <span className="my-alert">{alert.error}</span>
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2000}
          open={alert.success ? true : false}
          TransitionComponent={Transition}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={handleClose}>
            <span className="my-alert">{alert.success}</span>
          </Alert>
        </Snackbar>
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