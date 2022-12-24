import React, { useEffect, useState } from "react";

const Filters = (props) => {
  const candidatesDetails = props.candidatesDetails;
  const [filters, setFilters] = useState({
    name: "",
    qualification: "",
    experience: "",
  });

  useEffect(() => {
    let filterKeys = Object.keys(filters);
    let temp = candidatesDetails.filter(function (candidatesDetails) {
      return filterKeys.every(function (eachKey) {
        if (!filters[eachKey].length) {
          return true;
        }
        if (eachKey === "name") {
          return candidatesDetails[eachKey]
            .toString()
            .toLowerCase()
            .includes(filters[eachKey].toLowerCase());
        } else {
          if (candidatesDetails.candidateinfo[0][eachKey]) {
            return candidatesDetails.candidateinfo[0][eachKey]
              .toString()
              .toLowerCase()
              .includes(filters[eachKey].toLowerCase());
          } else {
            return false;
          }
        }
      });
    });
    props.setFilterData(temp);
  }, [filters, candidatesDetails]);

  return (
    <>
      <div id="filters-div" className="p-4">
        <h4>Filters</h4>
        {/* ------------------ Name --------------------- */}
        <div className="my-4">
          <label htmlFor="name" className="form-label">
            Candidate Name
          </label>
          <input
            type="text"
            value={filters.name}
            className="form-control"
            onChange={(e) => {
              setFilters({ ...filters, name: e.target.value });
            }}
          />
        </div>

        {/* ------------------ Qualification --------------------- */}
        <div className="my-4">
          <label htmlFor="qualification" className="form-label">
            Candidate Qualification
          </label>
          <select
            value={filters.qualification}
            className="form-select"
            onChange={(e) => {
              setFilters({ ...filters, qualification: e.target.value });
            }}
          >
            <option value="">-- None --</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PHD">PHD</option>
          </select>
        </div>

        {/* ------------------ Experience --------------------- */}
        <div className="my-4">
          <label htmlFor="experience" className="form-label">
            Experience
          </label>
          <select
            className="form-select"
            value={filters.experience}
            onChange={(e) => {
              setFilters({ ...filters, experience: e.target.value });
            }}
          >
            <option value="">-- None --</option>
            <option value="Fresher">Fresher</option>
            <option value="Trained Professional (0-1 year)">
              Trained Professional (0-1 year)
            </option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="6-10 years">6-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Filters;
