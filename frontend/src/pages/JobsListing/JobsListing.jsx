import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./jobs-listing.css";
import axios from "axios";

// import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobList from "../../components/JobListing/JobList/JobList";
import { Button, SwipeableDrawer } from "@mui/material";
import Filters from "../../components/JobListing/Filters/Filters";
import Loading from "../../components/Loading/Loading";

function JobsListing() {

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);

  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jobs/getAllJobDetails")
      .then((response) => response.data)
      .then((res) => {
        if (res.success) {
          setJobDetails(res.data);
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
        {/* <Navbar /> */}

        {/* For swipeable at small side for filters  */}
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className='box'
        >
          <Filters setJobDetails={setJobDetails} />
        </SwipeableDrawer>


        <div style={{ backgroundColor: "var(--bg-gray" }}>
          <div className="container" style={{ padding: "70px 0" }}>

            <div className="row">

              <div id="filter-outer-div" className="col-md-3">
                <Filters setJobDetails={setJobDetails} />
              </div>

              <div id="joblists-div" className="col-md-9">
                <div style={{ float: "right", position: "relative", bottom: "30px" }}>
                  <Button className="menu-btn float-end mx-0 m-sm-2 mt-2" onClick={toggleDrawer(true)}><FilterAltIcon />Filters</Button>
                </div>

                <div className="job-list">
                  {jobDetails.length > 0 && (
                    jobDetails.map((data, index) => {
                      return <JobList data={data} key={index} />
                    })
                  )}
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

export default JobsListing;
