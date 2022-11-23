import React from "react";
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <div className="d-flex homepage-main">
        <div className="homepage-main-left">
          <h4>LOOKING FOR TOP RESOURCES</h4>
          <p style={{ margin: "20px auto" }}>
            Get referred candidates merited with their skills in ASIC
            Verification.
          </p>
          <button className="post-apply-btn">
            <Link className="post-apply-btn-link">Post Job</Link>
          </button>
        </div>
        <div className="homepage-main-right">
          <h4>LOOKING FOR A JOB OPPORTUNITY?</h4>
          <p style={{ margin: "20px auto" }}>
            Apply to the best jobs with a referral in ASIC Verification.
          </p>
          <button className="post-apply-btn">
            <Link className="post-apply-btn-link">Apply Now</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
