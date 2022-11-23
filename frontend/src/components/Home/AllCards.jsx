import React from "react";
import Logo from "../../images/logo-icon-semiconreferrals.png";

const AllCards = () => {
  return (
    <>
      <section style={{ backgroundColor: "var(--bg-gray)", padding: "40px 0" }}>
        <div className="container">
          <div className="flex-div d-flex justify-content-between">
            {/* Register account div */}
            <div className="card-box" style={{ width: "49%" }}>
              <div
                className="card-box-img"
                //   style={{ backgroundColor: "var(--main-blue)" }}
              >
                <img src={Logo} width="100" height="100" alt="" />
              </div>
              <div className="card-box-text">
                <h4 style={{ color: "var(--main-orange)" }}>
                  Register Account
                </h4>
                <p>
                  Create your Semicon Referrals account and take a step closer
                  to get your dream job.
                </p>
              </div>
            </div>

            {/* Update profile div */}
            <div className="card-box" style={{ width: "49%" }}>
              <div
                className="card-box-img"
                //   style={{ backgroundColor: "var(--main-blue)" }}
              >
                <img src={Logo} width="100" height="100" alt="" />
              </div>
              <div className="card-box-text">
                <h4 style={{ color: "var(--main-orange)" }}>Update Profile</h4>
                <p>
                  Complete your profile with all your details so that the team
                  can analyze your profile and connect with you on a priority
                  basis.
                </p>
              </div>
            </div>
          </div>

          {/* Get Referred div */}
          <div className="card-box">
            <div
              className="card-box-img"
              // style={{ backgroundColor: "var(--main-orange)" }}
            >
              <img src={Logo} width="100" height="100" alt="" />
            </div>
            <div className="card-box-text">
              <h4 style={{ color: "var(--main-blue)" }}>Get Referred</h4>
              <p>
                Connect to share your skills and expertise with Semicon Team of
                industry experts in a round of technical discussion. Ask
                questions, get suggestions and basically get a sense of a mock
                interview with a panel having high experience in the field of
                ASIC Verification. With the discussion of your technical skills
                and expertise, the Semicon Team can now start referring you to
                companies hiring in ASIC Verification.
              </p>
            </div>
          </div>

          <div className="flex-div d-flex justify-content-between">
            {/* Search Dream Jobs  div */}
            <div className="card-box" style={{ width: "49%" }}>
              <div
                className="card-box-img"
                //   style={{ backgroundColor: "var(--main-blue)" }}
              >
                <img src={Logo} width="100" height="100" alt="" />
              </div>
              <div className="card-box-text">
                <h4 style={{ color: "var(--main-orange)" }}>
                  Search Dream Jobs
                </h4>
                <p>
                  After being referred, search for the right opportunity from
                  the pool of jobs posted by the top companies in ASIC
                  Verification either on the portal or different platform like
                  LinkedIn.
                </p>
              </div>
            </div>

            {/* Apply with a Referral */}
            <div className="card-box" style={{ width: "49%" }}>
              <div
                className="card-box-img"
                //   style={{ backgroundColor: "var(--main-blue)" }}
              >
                <img src={Logo} width="100" height="100" alt="" />
              </div>
              <div className="card-box-text">
                <h4 style={{ color: "var(--main-orange)" }}>
                  Apply with a Referral
                </h4>
                <p>
                  After the round of technical discussion you can now apply to
                  jobs mentioning you have a referral from the Semicon Referrals
                  Team. We can confirm your referral once the company connects
                  to our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllCards;
