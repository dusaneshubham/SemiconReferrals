import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./candidates-listing.css";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CandidateList from "../../components/CandidateListing/CandidateList/CandidateList";
import { Button, SwipeableDrawer } from "@mui/material";
import Filters from "../../components/CandidateListing/Filters/Filters";
import Loading from "../../components/Loading/Loading";
// import NoDataFoundCard from "../../components/JobListing/JobList/NoDataFoundCard";

function CandidatesListing() {

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);

  const [candidatesDetails, setCandidatesDetails] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/candidate/getAllCandidateDetails")
      .then((response) => response.data)
      .then((res) => {
        if (res.success) {
          setCandidatesDetails(res.data);
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
            setCandidatesDetails={setCandidatesDetails}
            candidatesDetails={candidatesDetails}
            setFilterData={setFilterData}
            filterData={filterData}
          />
        </SwipeableDrawer>

        <div style={{ backgroundColor: "var(--bg-gray" }}>
          <div className="container" style={{ padding: "40px 0" }}>
            <div className="row">
              <div id="filter-outer-div" className="col-md-3">
                <Filters
                  setCandidatesDetails={setCandidatesDetails}
                  candidatesDetails={candidatesDetails}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
              </div>

              <div id="candidatelists-div" className="col-md-9">
                <div className="filter-btn-div">
                  <Button
                    variant="contained"
                    startIcon={<FilterAltIcon />}
                    onClick={toggleDrawer(true)}
                  >
                    Filters
                  </Button>
                </div>

                <div className="candidate-list d-flex flex-wrap">
                  {filterData.length > 0 &&
                    filterData.map((data, index) => {
                      return <CandidateList data={data} key={index} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default CandidatesListing;
