import React from "react";
import "./employer-list.css";
import { Link } from "react-router-dom";

const EmployerList = (props) => {
  return (
    <>
      <div
        className="card text-center m-2 shadow-lg"
        style={{ width: "18rem" }}
      >
        <div
          className="card-title p-2 fs-5 bg-light rounded-top"
          style={{ color: "var(--main-blue)" }}
        >
          {props.data.name}
        </div>
        <div className="img-part py-3">
          {props.data.recruiterinfo[0] &&
          props.data.recruiterinfo[0].profileImage ? (
            <img
              src={`http://localhost:5000/profileImage/${props.data.recruiterinfo[0].profileImage}`}
              alt="Recruiter Profile"
              style={{ borderRadius: "50%" }}
              width="100"
              height="100"
            />
          ) : (
            <img
              src="http://localhost:5000/profileImage/defaultImage.png"
              alt="Recruiter Profile"
              style={{ borderRadius: "50%" }}
              width="100"
              height="100"
            />
          )}
        </div>
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body w-100 p-2 bg-light rounded-bottom">
          <Link
            to={`/employer/viewprofile/${props.data._id}`}
            className="text-dark"
          >
            View Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmployerList;
