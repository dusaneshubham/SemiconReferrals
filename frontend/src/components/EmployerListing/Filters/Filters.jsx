import React, { useEffect, useState } from "react";

const Filters = (props) => {
  console.log()
  const recruitersDetails = props.recruitersDetails;
  const [filters, setFilters] = useState({
    name: ""
  });

  useEffect(() => {
    let filterKeys = Object.keys(filters);
    let temp = recruitersDetails.filter(function (recruiterDetails) {
      return filterKeys.every(function (eachKey) {
        if (!filters[eachKey].length) {
          return true;
        }
        return recruiterDetails[eachKey]
          .toString()
          .toLowerCase()
          .includes(filters[eachKey].toLowerCase());
      });
    });
    props.setFilterData(temp);
  }, [filters, recruitersDetails]);

  return (
    <>
      <div id="filters-div" className="p-4">
        <h4>Filters</h4>
        {/* ------------------ Name --------------------- */}
        <div className="my-4">
          <label htmlFor="name" className="form-label">
            Employer Name
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
      </div>
    </>
  );
};

export default Filters;
