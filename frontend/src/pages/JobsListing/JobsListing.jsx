import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./jobs-listing.css";

// import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobList from "../../components/JobListing/JobList/JobList";
import { Button, Menu as MenuIcon, SwipeableDrawer } from "@mui/material";
import Filters from "../../components/JobListing/Filters/Filters";

function JobsListing() {

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

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
        <Filters />
      </SwipeableDrawer>


      <div style={{ backgroundColor: "var(--bg-gray" }}>
        <div className="container" style={{ padding: "70px 0" }}>

          <div className="row">

            <div id="filter-outer-div" className="col-md-3">
              <Filters />
            </div>

            <div id="joblists-div" className="col-md-9">
              <div style={{ float:"right", position: "relative", bottom:"30px" }}>
                <Button className="menu-btn float-end mx-0 m-sm-2 mt-2" onClick={toggleDrawer(true)}><FilterAltIcon />Filters</Button>
              </div>

              <div className="job-list">
                <JobList />
                <JobList />
                <JobList />
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default JobsListing;
