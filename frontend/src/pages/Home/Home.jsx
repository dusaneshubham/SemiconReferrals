import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

import TopResources from '../../components/Home/TopResources';
import About from '../../components/Home/About';
import TopHiringEmployers from "../../components/Home/TopHiringEmployers";
import AllCards from "../../components/Home/AllCards";
import Landing from "../../components/Home/Landing";

import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <AllCards />
      <TopResources />
      <TopHiringEmployers />
      <About />
    </>
  );
};

export default Home;
