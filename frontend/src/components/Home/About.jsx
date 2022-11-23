import React from "react";
import Logo from '../../images/logo-icon-semiconreferrals.png';
import Illustration1 from "../../images/illustration_1.jpg";

const About = () => {
  return (
    <>
      <section style={{ padding: "50px 0" }}>
        <div className="container about-section">
          <div className="d-flex">
            <div className="about-section-details" style={{ width: "60%" }}>
              <h4 style={{ color: "var(--main-blue)" }}>
                About Semicon Referrals
              </h4>
              <ul>
                <li>
                  Semicon Referrals is a platform that refers passionate
                  candidates to highly experienced industry professionals.
                </li>
                <li>
                  We analyze skills of the candidate and aim to provide the best
                  candidate available to the hiring managers, which in turn
                  reduces the time taken to fill a position and allows to choose
                  from the best available talent.
                </li>
                <li>
                  While a manager is assured he is hiring the best talent,
                  candidate is assured he is grabbing the best opportunity by
                  choosing and applying from a pool of jobs posted by the best
                  companies in the industry.
                </li>
                <li>
                  Along with getting a referral, a candidate also gets an
                  opportunity for guidance from industry experts.
                </li>
                <li>
                  As a whole, we aim in creating a center space for learning,
                  growing and hiring for the people in the semiconductor
                  industry.
                </li>
              </ul>
            </div>
            {/* Illustration div */}
            <div className="illustration-div" style={{ width: "40%" }}>
              <img src={Illustration1} alt="" style={{ width: "100%" }} />
            </div>
          </div>

          <div
            className="card-box"
            style={{ backgroundColor: "var(--bg-gray)" }}
          >
            <div className="card-box-img">
              <img src={Logo} width="100" height="100" alt="" />
            </div>
            <div className="card-box-text">
              <p>
                “Being on both ends of the rope and experiencing the challenges,
                both as candidate and as recruiter, has been my biggest
                inspiration for launching Semicon Referrals. I hope this
                platform helps you in achieving your dreams by opening up an
                ocean of opportunities and makes your journey look seamless and
                smooth.” <br /> Keep Growing, Stay Connected!
              </p>
              <h6 style={{ color: "var(--main-blue)", fontWeight: "700" }}>
                Srujan Patel
              </h6>
              <h6 style={{ color: "var(--main-orange)", fontWeight: "700" }}>
                Thought Leader, Semicon Referrals
              </h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
