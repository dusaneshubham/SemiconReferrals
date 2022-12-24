import React from "react";
import "./candidate-list.css";
import { image2 } from "../../../images/images";
import { Link } from "react-router-dom";

const CandidateList = (props) => {
  return (
    <>
      <div
        id="candidate-list"
        className="d-flex flex-column justify-content-center align-items-center px-5 py-4 m-2"
      >
        <Link to={`/candidate/viewprofile/${props.data._id}`}>
          {props.data.candidateinfo[0].profileImage ? (
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

          {/* ----------- Name ---------- */}
          {props.data.name && (
            <p className="my-2" style={{ color: "var(--main-blue)" }}>
              {props.data.name}
            </p>
          )}
        </Link>
      </div>
    </>
  );
};

export default CandidateList;
