import React from "react";
import "./candidate-list.css";
import { image2 } from "../../../images/images";
import { Link } from "react-router-dom";

const CandidateList = (props) => {
  return (
    <>
      <div className="card text-center m-2 shadow-lg" style={{ width: "18rem" }}>
        <div className="card-title p-2 fs-5 bg-light rounded-top" style={{ color: "var(--main-blue)" }}>
          {props.data.name}
        </div>
        <div className="img-part py-3">
          {props.data.candidateinfo[0] && props.data.candidateinfo[0].profileImage ? (
            <img
              src={`http://localhost:5000/profileImage/${props.data.candidateinfo[0].profileImage}`}
              alt="Candidate Profile"
              style={{ borderRadius: "50%" }}
              width="100"
              height="100"
            />
          ) : (
            <img
              src={image2}
              alt="Candidate Profile"
              style={{ borderRadius: "50%" }}
              width="100"
              height="100"
            />
          )}
        </div>
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body w-100 p-2 bg-light rounded-bottom">
          <Link to={`/candidate/viewprofile/${props.data._id}`} className="text-dark">
            View Profile
          </Link >
        </div>
      </div>
    </>
  );
};

export default CandidateList;
