import React from "react";
import Logo from "../../images/logo-icon-semiconreferrals.png";

const TopHiringEmployers = () => {
  return (
    <>
      <div className="background">
        <section style={{ backgroundColor: "transparent", padding: "50px 0" }}>
          <div className="container top-hiring-resources-section d-flex justify-content-between">
            <div>
              <h5 style={{ color: "#FFF" }}>Semicon Referrals</h5>
              <h4 style={{ color: "#FFF" }}>Top Hiring Employers</h4>
            </div>
            {/* Employers divs */}
            <div className="d-flex top-hiring-employers">
              {/* Single employer div */}
              <div className="top-hiring-employer-div">
                <img src={Logo} alt="" width="100" height="100" />
              </div>
              <div className="top-hiring-employer-div">
                <img src={Logo} alt="" width="100" height="100" />
              </div>
              <div className="top-hiring-employer-div">
                <img src={Logo} alt="" width="100" height="100" />
              </div>
              <div className="top-hiring-employer-div">
                <img src={Logo} alt="" width="100" height="100" />
              </div>
              <div className="top-hiring-employer-div">
                <img src={Logo} alt="" width="100" height="100" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TopHiringEmployers;
