import React from "react";
// import { TextField } from "@mui/material";

const Profile = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div
              style={{
                backgroundColor: "var(--bg-gray)",
                width: "100%",
                padding: "20px",
                margin:"0 0 30px 0"
              }}
            >
              About Me
              <hr />
              <p>
                A result-oriented and dynamic professional with exposure in ASIC
                verification, recruitment, team building and a strong interest
                in sales, strategy and business development. <br /> Currently
                working with a highly competent team to develop a node
                controller. This node controller is used by OEM to build 8S,
                16S, 32S… scale-up data servers. End users (Oil & Gas,
                Financials, Scientific Research, etc.) are using these high-end
                Scale-Up data servers to achieve much reduced TCO with
                high-performance computing throughput.{" "}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "var(--bg-gray)",
                width: "100%",
                padding: "20px",
                margin: "30px 0"
              }}
            >
              Important Information
              <hr />
              <div style={{ margin: "25px 0" }}>
                <div style={{ color: "var(--text)", fontSize: "12px" }}>
                  Contact Number
                </div>
                <div>7894561230</div>
              </div>
              <div style={{ margin: "25px 0" }}>
                <div style={{ color: "var(--text)", fontSize: "12px" }}>
                  Are you open to work?
                </div>
                <div>Yes</div>
              </div>
              <div style={{ margin: "25px 0" }}>
                <div style={{ color: "var(--text)", fontSize: "12px" }}>
                  What is your notice period
                </div>
                <div>3 months</div>
              </div>
              <div style={{ margin: "25px 0" }}>
                <div style={{ color: "var(--text)", fontSize: "12px" }}>
                  What is your current job location ?
                </div>
                <div>Ahmedabad</div>
              </div>
              <div style={{ margin: "25px 0" }}>
                <div style={{ color: "var(--text)", fontSize: "12px" }}>
                  Desired cities to work in?
                </div>
                <div>Ahmedabad, Pune</div>
              </div>
            </div>
          </div>
          <div
            className="col-md-3"
            style={{
              backgroundColor: "var(--bg-gray)",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            Contact Shubham Candidate Sample
            <hr />
            <form className="row ">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Full Name"
                />
              </div>
              <div className="col-md-12">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                />
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Your Message"
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="start-hiring-btn"
                  style={{ width: "100%", margin: "10px 0" }}
                >
                  Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
