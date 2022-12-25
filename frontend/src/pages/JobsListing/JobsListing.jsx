import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./jobs-listing.css";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobList from "../../components/JobListing/JobList/JobList";
import { Button, SwipeableDrawer } from "@mui/material";
import Filters from "../../components/JobListing/Filters/Filters";
import Loading from "../../components/Loading/Loading";
import NoDataFoundCard from "../../components/JobListing/JobList/NoDataFoundCard";
// import NoDataFoundCard from "../../components/JobListing/JobList/NoDataFoundCard";

function JobsListing() {

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);

  const [jobDetails, setJobDetails] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jobs/getAllJobDetails")
      .then((response) => response.data)
      .then((res) => {
        if (res.success) {
          setJobDetails(res.data);
          setFilterData(res.data);
          setLoading(false);
        }
        else {
          console.log("Not found");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <>
        <Navbar />

        {/* For swipeable at small side for filters  */}
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className="box pt-2"
        >
          <Filters
            setJobDetails={setJobDetails}
            jobDetails={jobDetails}
            setFilterData={setFilterData}
            filterData={filterData}
          />
        </SwipeableDrawer>

        <div style={{ backgroundColor: "var(--bg-gray" }}>
          <div className="listing-div">
              <div className="filter-left-div">
                <Filters
                  setJobDetails={setJobDetails}
                  jobDetails={jobDetails}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
              </div>

              <div className="filter-right-div">
                <div className="filter-btn-div my-2">
                  <Button
                    variant="contained"
                    startIcon={<FilterAltIcon />}
                    onClick={toggleDrawer(true)}
                  >
                    Filters
                  </Button>
                </div>

                <div className="job-list">
                  {filterData.length > 0 ?
                    filterData.map((data, index) => {
                      return <JobList data={data} key={index} />;
                    })
                    :
                    <NoDataFoundCard />
                  }
                </div>
              </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default JobsListing;
