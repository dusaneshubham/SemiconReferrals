import React from "react";
import { Link } from "react-router-dom";
import Illustration1 from '../../images/illustration_1.jpg';

const TopResources = () => {
  return (
    <>
      <section style={{ padding: "50px 0" }}>
        <div className="container top-resources d-flex">
          <div className="top-resources-details" style={{ width: "60%" }}>
            <h4 style={{ color: "var(--main-blue)" }}>
              Looking for top Resources?
            </h4>
            <h5 style={{ color: "var(--main-blue)", marginBottom: "30px" }}>
              Hire the best talent in ASIC verification
            </h5>
            <p>
              Are you spending endless time and efforts in searching the right
              addition to your team?
            </p>
            <p>
              Struggling across hundreds and thousands of resumes to select the
              best 10 candidates?
            </p>
            <p>
              We are here to help you! Get a pool of high-quality talent,
              specially referred and rated by the Semicon Team only after a
              rigorous candidate authentication process and in turn reduce the
              rejection ratio while hiring.{" "}
            </p>
            <ul>
              <li>Create Your Company Profile</li>
              <li>
                Update Requirements and Jobs Vacancies available at the point
              </li>
              <li>
                Filter out the Top Referred Candidates and Match their skill set
                with your requirements
              </li>
              <li>
                Reach Out to the Selected Candidates easily in just 2 clicks
              </li>
              <li>Get a New Member added to Your Team</li>
            </ul>
            <button className="start-hiring-btn">
              <Link className="start-hiring-btn-link">Start Hiring</Link>
            </button>
          </div>
          {/* Illustration div */}
          <div className="illustration-div" style={{ width: "40%" }}>
            <img src={Illustration1} alt="" style={{ width: "100%" }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default TopResources;
