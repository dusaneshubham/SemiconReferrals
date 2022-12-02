import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./job-description.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobOverview from "../../components/JobDescription/JobOverview";

const JobDescription = () => {
  let skillsRequired = [
    "HTML",
    "CSS",
    "JavaScript",
    "Node",
    "PHP",
    "C++",
    "Java",
    "Ruby",
    "Python",
    "Machine Learning",
    "Artificial Intelligence",
  ];

  return (
    <>
      <Navbar />

      <div className="container" id="job-description-container">
        {/* -------- Title -------- */}
        <h4>Software Developer</h4>

        <div className="row my-5">
          <div id="left" className="col-md-9">
            {/* ---------------- Job Description ------------------- */}
            <h5>Job Description</h5>
            <p className="mb-5">
              As a Product Designer, you will work within a Product Delivery
              Team fused with UX, engineering, product and data talent. You will
              help the team design beautiful interfaces that solve business
              challenges for our clients. We work with a number of Tier 1 banks
              on building web-based applications for AML, KYC and Sanctions List
              management workflows. This role is ideal if you are looking to
              segue your career into the FinTech or Big Data arenas.
            </p>
            {/* ----------------- Key Responsibilities ------------------- */}
            <h5>Key Responsibilities</h5>
            <p className="mb-5">
              <ul>
                <li>
                  Be involved in every step of the product design cycle from
                  discovery to developer handoff and user acceptance testing.
                </li>
                <li>
                  Work with BAs, product managers and tech teams to lead the
                  Product Design
                </li>
                <li>
                  Maintain quality of the design process and ensure that when
                  designs are translated into code they accurately reflect the
                  design specifications.
                </li>
                <li>
                  Accurately estimate design tickets during planning sessions.
                </li>
              </ul>
            </p>
            {/* ----------------- Skills Required ------------------ */}
            <h5>Skills Required</h5>
            <div className="d-flex flex-wrap">
              {skillsRequired.map((skill) => (
                <div className="skills-section">{skill}</div>
              ))}
            </div>
          </div>

          <div id="right" className="col-md-3">
            <JobOverview
              key=""
              jobPostedDate="10/12/2023"
              location="Ahmedabad"
              salary="$10000 - $200000 per month"
              deadline="10/12/2024"
              experience="Trained Professional (0-1 year)"
              qualification="Bachelor"
              jobType="Full Time"
              jobLevel="Senior"
              vacancies="10"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobDescription;
