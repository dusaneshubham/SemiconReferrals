import React, { useEffect, useState } from "react";
import "./job-description.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobOverview from "../../components/JobDescription/JobOverview";

const JobDescription = () => {
  const param = useParams();
  const postId = param.id;
  const navigate = useNavigate();

  const [jobDetail, setJobDetail] = useState({
    recruiterId: "",
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

  const [tokenData, setTokenData] = useState({ _id: "", type: "" });

  // --------------------------- get Job Detail ------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getJobDetail = () => {
      // getting token data
      if (token) {
        axios
          .post("http://localhost:5000/verify-token", { token })
          .then((res) => res.data)
          .then((tokenResponse) => {
            if (tokenResponse.success) {
              axios
                .post("http://localhost:5000/jobs/getJobDetails", { postId })
                .then((res) => res.data)
                .then((jobResponse) => {
                  if (jobResponse.success) {
                    if (
                      jobResponse.data.status === "Pending" &&
                      tokenResponse.tokenData._id !==
                      jobResponse.data.recruiterId &&
                      tokenResponse.tokenData.type !== "admin"
                    ) {
                      navigate("/");
                    } else {
                      setJobDetail(jobResponse.data);
                    }
                  } else {
                    navigate("/");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              setTokenData(tokenResponse.tokenData);
            } else {
              console.log(tokenResponse.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("http://localhost:5000/jobs/getJobDetails", { postId })
          .then((res) => res.data)
          .then((jobResponse) => {
            if (jobResponse.success) {
              if (jobResponse.data.status === "Pending") {
                navigate("/");
              } else {
                console.log(jobResponse.data);
                setJobDetail(jobResponse.data);
              }
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    getJobDetail();
  }, [navigate, postId]);

  const applyToJob = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // axios.post("http://localhost:5000/candidate/applyForJob")
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="container" id="job-description-container">
        {/* -------- Title -------- */}
        <h2 style={{ color: "var(--main-blue)" }}>{jobDetail.jobTitle}</h2>

        {/* --------- Company Name --------- */}
        <h5 style={{ color: "var(--main-orange)" }}>
          {/* {jobDetail.recruiterinfos[0].companyName} */}
          Google Software Ltd.
        </h5>

        <div className="row my-5">
          <div id="left" className="col-md-9">
            {/* ---------------- Job Description ------------------- */}
            {jobDetail.jobDescription && (
              <div>
                <h5>Job Description</h5>
                <p
                  className="mb-5"
                  dangerouslySetInnerHTML={{ __html: jobDetail.jobDescription }}
                ></p>
              </div>
            )}

            {/* ----------------- Key Responsibilities ------------------- */}
            {jobDetail.keyResponsibilities && (
              <div>
                <h5>Key Responsibilities</h5>
                <p
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                    __html: jobDetail.keyResponsibilities,
                  }}
                ></p>
              </div>
            )}

            {/* ----------------- Skills Required ------------------ */}
            {jobDetail.skillsRequired && (
              <div>
                <h5>Skills Required</h5>
                <div className="d-flex flex-wrap">
                  {jobDetail.skillsRequired.map((skill, index) => (
                    <div className="skills-section">{skill}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ------------------ Job Overview ------------------ */}
          <div id="job-overview-section" className="col-md-3">
            <JobOverview
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
        {tokenData.type === "candidate" && (
          <div>
            <div
              style={{ margin: "20px 0", width: "100%" }}
              className="d-flex justify-content-center"
            >
              <button
                style={{ width: "300px" }}
                className="main-btn"
                onclick={applyToJob}
              >
                Apply Now
              </button>
            </div>

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
        )}
      </div>

      <Footer />
    </>
  );
};

export default JobDescription;
