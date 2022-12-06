import React from "react";
import "./JobPost.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";

const JobPost = () => {
  const [alert, setAlert] = useState({});
  const [skills, setSkills] = useState([]);
  const [keywords, setKeywords] = useState([]);

  // job post details
  const [jobPostDetails, setJobPostDetails] = useState({
    jobTitle: "",
    jobCategory: "",
    jobDescription: "",
    keyResponsibilities: "",
    applicationDeadline: "",
    qualification: "",
    experience: "",
    jobType: "",
    jobLevel: "",
    numberOfVacancies: "",
    location: "",
    salary: "",
  });

  // upload Job Post
  const uploadJobPost = () => {
    let token = localStorage.getItem("token");

    const {
      jobTitle,
      jobCategory,
      jobDescription,
      keyResponsibilities,
      applicationDeadline,
      qualification,
      experience,
      jobType,
      jobLevel,
      numberOfVacancies,
      location,
    } = jobPostDetails;

    let todayDate = new Date().toJSON().slice(0, 10);

    if (
      !jobTitle ||
      !jobCategory ||
      !jobDescription ||
      !keyResponsibilities ||
      !applicationDeadline ||
      !qualification ||
      !experience ||
      !jobType ||
      !jobLevel ||
      !numberOfVacancies ||
      !location ||
      !skills
    ) {
      setAlert({ error: "All mandatory fields are required to fill !" });
    } else if (numberOfVacancies <= 0) {
      setAlert({ error: "Number of vacancies should be more than 0" });
    } else if (todayDate >= applicationDeadline) {
      setAlert({ error: "Application deadline should be of future only" });
    } else if (!token) {
      setAlert({ error: "Unauthorized user!!" });
    }
    else {
      axios
        .post("http://localhost:5000/recruiter/jobPost", {
          ...jobPostDetails,
          skills: skills,
          keywords: keywords,
          token: token,
        })
        .then((response) => response.data)
        .then((res) => {
          if (res.success) {
            setAlert({ success: res.message });
            setJobPostDetails({
              jobTitle: "",
              jobCategory: "",
              jobDescription: "",
              keyResponsibilities: "",
              applicationDeadline: "",
              qualification: "",
              experience: "",
              jobType: "",
              jobLevel: "",
              numberOfVacancies: "",
              location: "",
              salary: "",
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
  };

  return (
    <>
      <div className="row">
        {/* ---------------------- alert ---------------------- */}
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />
        {/* --------------------------------------------------- */}

        {/*--------------------- Job Post ---------------------*/}
        <div className="col-md-8 p-4 bg-white">
          <div style={{ margin: "10px 0" }}>
            {/* <form action=""> */}
            <div className="row g-3 p-4 bg-light">
              {/*------------------- Job Title ------------------*/}
              <div className="col-md-12">
                <label htmlFor="job-title" className="form-label">
                  Job Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={jobPostDetails.jobTitle}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      jobTitle: e.target.value,
                    })
                  }
                  className="form-control"
                  id="job-title"
                />
              </div>

              {/*------------------- Job Category -----------------*/}
              <div className="col-md-12">
                <label htmlFor="job-category" className="form-label">
                  Job Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="job-category"
                  className="form-select"
                  value={jobPostDetails.jobCategory}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      jobCategory: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="ASIC Verification">ASIC Verification</option>
                  <option value="Semiconductor">Semiconductor</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="Database Administrator">
                    Database Administrator
                  </option>
                </select>
              </div>

              {/*--------------------- Job Description ---------------------*/}
              <div>
                <label htmlFor="job-description" className="form-label">
                  Job Description <span style={{ color: "red" }}>*</span>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={jobPostDetails.jobDescription}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    // console.log({ e, editor, data });
                    setJobPostDetails({
                      ...jobPostDetails,
                      jobDescription: data,
                    });
                  }}
                />
              </div>

              {/*--------------------- Key Responsibilities ---------------------*/}
              <div>
                <label htmlFor="key-responsibilities" className="form-label">
                  Key Responsibilities <span style={{ color: "red" }}>*</span>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={jobPostDetails.keyResponsibilities}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    // console.log({ e, editor, data });
                    setJobPostDetails({
                      ...jobPostDetails,
                      keyResponsibilities: data,
                    });
                  }}
                />
              </div>

              {/*------------------- Application Deadline ------------------*/}
              <div className="col-md-6">
                <label htmlFor="application-deadline" className="form-label">
                  Application Deadline <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  value={jobPostDetails.applicationDeadline}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      applicationDeadline: e.target.value,
                    })
                  }
                  className="form-control"
                  id="application-deadline"
                />
              </div>

              {/*------------------- Job Qualifications -----------------*/}
              <div className="col-md-6">
                <label htmlFor="qualification" className="form-label">
                  Job Qualification <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="qualification"
                  className="form-select"
                  value={jobPostDetails.qualification}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      qualification: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PHD">PHD</option>
                </select>
              </div>

              {/*------------------- Job Type -----------------*/}
              <div className="col-md-6">
                <label htmlFor="job-type" className="form-label">
                  Job Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="job-type"
                  className="form-select"
                  value={jobPostDetails.jobType}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      jobType: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>

              {/*--------------------- Job Experience ---------------------*/}
              <div className="col-md-6">
                <label htmlFor="experience" className="form-label">
                  Job Experience <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="experience"
                  value={jobPostDetails.experience}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      experience: e.target.value,
                    })
                  }
                  className="form-select"
                >
                  <option value="">-- Select --</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Trained Professional">
                    Trained Professional (0-1 year)
                  </option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              {/*--------------------- Job Level ---------------------*/}
              <div className="col-md-6">
                <label htmlFor="job-level" className="form-label">
                  Job Level <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="job-level"
                  className="form-select"
                  value={jobPostDetails.jobLevel}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      jobLevel: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="Manager">Manager</option>
                  <option value="Senior">Senior</option>
                  <option value="Junior">Junior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>

              {/*------------------- Number of Vacancies ------------------*/}
              <div className="col-md-6">
                <label htmlFor="vacancies" className="form-label">
                  Number of Vacancies <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  value={jobPostDetails.numberOfVacancies}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      numberOfVacancies: e.target.value,
                    })
                  }
                  className="form-control"
                  id="vacancies"
                />
              </div>

              {/*------------------- Job Location ------------------*/}
              <div className="col-md-6">
                <label htmlFor="location" className="form-label">
                  Job Location <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={jobPostDetails.location}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      location: e.target.value,
                    })
                  }
                  className="form-control"
                  id="location"
                />
              </div>

              {/*------------------- Salary ------------------*/}
              <div className="col-md-6">
                <label htmlFor="salary" className="form-label">
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  placeholder="Ex :- $10000 - $15000 LPA"
                  value={jobPostDetails.salary}
                  onChange={(e) =>
                    setJobPostDetails({
                      ...jobPostDetails,
                      salary: e.target.value,
                    })
                  }
                />
              </div>

              {/*----------------- Job Skills ------------------*/}
              <div>
                <label htmlFor="skills" className="form-label">
                  Job Skills <span style={{ color: "red" }}>*</span>
                </label>
                <TagsInput
                  id="skills"
                  value={skills}
                  onChange={setSkills}
                  placeHolder="Enter Skill"
                />
              </div>

              {/*----------------- Job Tags / Keywords ------------------*/}
              <div>
                <label htmlFor="keywords" className="form-label">
                  Job Tags / Keywords
                </label>
                <TagsInput
                  id="keywords"
                  value={keywords}
                  onChange={setKeywords}
                  placeHolder="Enter Keyword"
                />
              </div>

              {/*--------------------- Submit Button ---------------------*/}
              <div className="col-12">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ float: "right", margin: "15px 0" }}
                  onClick={uploadJobPost}
                >
                  Post
                </Button>
              </div>
            </div>
            {/* </form>. */}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
