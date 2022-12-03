import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./job-description.css";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobOverview from "../../components/JobDescription/JobOverview";

const JobDescription = () => {
  const [jobDetail, setJobDetail] = useState({
    jobTitle: "",
    JobDescription: "",
    keyResponsibilities: "",
    numberOfVacancies: 0,
    applicationDeadline: "",
    jobType: "",
    experience: "",
    qualification: "",
    location: "",
    jobLevel: "",
    salary: "",
    skillsRequired: [],
  });

  // let skillsRequired = [
  //   "HTML",
  //   "CSS",
  //   "JavaScript",
  //   "Node",
  //   "PHP",
  //   "C++",
  //   "Java",
  //   "Ruby",
  //   "Python",
  //   "Machine Learning",
  //   "Artificial Intelligence",
  // ];

  // console.log(document.URL);
  const postId = "638796710ec0dccdff086548";

  useEffect(() => {
    const getJobDetail = () => {
      axios
        .post("http://localhost:5000/jobs/getJobDetails", { postId })
        .then((res) => res.data)
        .then((response) => {
          setJobDetail(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getJobDetail();
  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <div className="container" id="job-description-container">
        {/* -------- Title -------- */}
        <h4>{jobDetail.jobTitle}</h4>

        <div className="row my-5">
          <div id="left" className="col-md-9">
            {/* ---------------- Job Description ------------------- */}
            <h5>Job Description</h5>
            <p
              className="mb-5"
              dangerouslySetInnerHTML={{ __html: jobDetail.jobDescription }}
            ></p>
            {/* ----------------- Key Responsibilities ------------------- */}
            <h5>Key Responsibilities</h5>
            <p className="mb-5"
              dangerouslySetInnerHTML=
              {{ __html: jobDetail.keyResponsibilities }}>
            </p>
            {/* ----------------- Skills Required ------------------ */}
            <h5>Skills Required</h5>
            <div className="d-flex flex-wrap">
              {jobDetail.skillsRequired.map((skill, index) => (
                <div className="skills-section">{skill}</div>
              ))}
            </div>
          </div>

          <div id="right" className="col-md-3">
            <JobOverview
              // jobPostedDate={jobDetail.createdAt.toLocaleString("default", {month:"long"})}
              jobPostedDate={jobDetail.createdAt}
              location={jobDetail.location}
              salary={jobDetail.salary}
              deadline={jobDetail.applicationDeadline}
              experience={jobDetail.experience}
              qualification={jobDetail.qualification}
              jobType={jobDetail.jobType}
              jobLevel={jobDetail.jobLevel}
              vacancies={jobDetail.numberOfVacancies}
            />
          </div>
        </div>

        {/* ------------------- Apply Now Button ------------------ */}
        <div
          style={{ margin: "20px 0", width: "100%" }}
          className="d-flex justify-content-center"
        >
          <button style={{ width: "300px" }} className="main-btn">
            Apply Now
          </button>
        </div>

        {/* -------------------- Save Job Button -------------------- */}
        <div
          style={{ margin: "20px 0", width: "100%" }}
          className="d-flex justify-content-center"
        >
          <button
            style={{
              width: "300px",
              backgroundColor: "var(--main-orange)",
            }}
            className="main-btn"
          >
            Save This Job
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};


export default JobDescription;
