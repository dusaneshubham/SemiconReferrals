import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./job-description.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobOverview from "../../components/JobDescription/JobOverview";

const JobDescription = () => {
  let skillsRequired = ["HTML", "CSS"];

  return (
    <>
      <Navbar />

      <div id="main-container" className="d-flex justify-content-between">
        <div id="left" style={{ width: "65%" }}>
          <h5 style={{ margin: "20px 0" }}>Job Description</h5>
          <p style={{ color: "rgba(0,0,0,0.5)" }} className="mb-5">
            As a Product Designer, you will work within a Product Delivery Team
            fused with UX, engineering, product and data talent. You will help
            the team design beautiful interfaces that solve business challenges
            for our clients. We work with a number of Tier 1 banks on building
            web-based applications for AML, KYC and Sanctions List management
            workflows. This role is ideal if you are looking to segue your
            career into the FinTech or Big Data arenas.
          </p>

          <h5 style={{ margin: "20px 0" }}>Key Responsibilities</h5>
          <p style={{ color: "rgba(0,0,0,0.5)" }} className="mb-5">
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

          <h5 style={{ margin: "20px 0" }}>Skills and Experience</h5>
          <p style={{ color: "rgba(0,0,0,0.5)" }} className="mb-5">
            <ul>
              <li>
                You have at least 3 years’ experience working as a Product
                Designer.
              </li>
              <li>You have experience using Sketch and InVision or Framer X</li>
              <li>
                You have some previous experience working in an agile
                environment – Think two-week sprints.
              </li>
              <li>
                You are familiar using Jira and Confluence in your workflow
              </li>
            </ul>
          </p>

          <h5 style={{ margin: "20px 0" }}>Skills Required</h5>
          {skillsRequired.map((skill) => (
            <span
              className="user"
              style={{
                color: "#00000080",
                border: "1px solid #00000080",
                padding:"3px 10px",
                marginRight:"20px",
                borderRadius:"40%"
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <div id="right" style={{ width: "30%" }}>
          <JobOverview
            jobPostedDate="Jan 24, 2023"
            location="Ahmedabad, India"
            salary="$10000 - $20000 / month"
            expirationDate="Feb 20, 2023"
            experienceLevel="Fresher"
            qualification="Bachelor Degree"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobDescription;