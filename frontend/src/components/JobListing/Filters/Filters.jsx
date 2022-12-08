import React, { useState } from 'react';
import "./filters.css";
import axios from "axios";
import { useEffect } from 'react';

const Filters = ({ setJobDetails }) => {

    const [filtersData, setFiltersData] = useState({
        keywords: "",
        location: "",
        qualification: "",
        experience: "",
        jobType: ""
    });

    useEffect(() => {
        axios.post("http://localhost:5000/jobs/getAllJobDetailsFilters", { filtersData })
            .then((response) => response.data)
            .then((res) => {
                if (res.success) {
                    // setJobDetails(res.data);
                }
                else {
                    console.log("Not found");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <div id="filters-div">
                <h4>Filters</h4>
                {/* ------------------ Keywords --------------------- */}
                <div className="my-4">
                    <label htmlFor="keywords" className="form-label">Search by Keywords</label>
                    <input type="text" value={filtersData.keywords} className="form-control" id="keywords" placeholder="Search" onChange={(e) => setFiltersData({ ...filtersData, keywords: e.target.value })} />
                </div>

                {/* ------------------ Location --------------------- */}
                <div className="my-4">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" value={filtersData.location} className="form-control" id="location" onChange={(e) => { setFiltersData({ ...filtersData, location: e.target.value }); }} />
                </div>

                {/* ------------------ Qualification --------------------- */}
                <div className="my-4">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <select value={filtersData.qualification} className="form-select" onChange={(e) => setFiltersData({ ...filtersData, qualification: e.target.value })}>
                        <option selected disabled>-- Select --</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PHD">PHD</option>
                    </select>
                </div>

                {/* ------------------ Experience --------------------- */}
                <div className="my-4">
                    <label htmlFor="experience" className="form-label">Experience</label>
                    <select className="form-select" value={filtersData.experience} onChange={(e) => setFiltersData({ ...filtersData, experience: e.target.value })}>
                        <option selected disabled>-- Select --</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Trained Professional (0-1 year)">Trained Professional (0-1 year)</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="6-10 years">6-10 years</option>
                        <option value="10+ years">10+ years</option>
                    </select>
                </div>

                {/* ------------------ Job Type --------------------- */}
                <div className="my-4">
                    <label htmlFor="job-type" className="form-label">Job Type</label>
                    <select className="form-select" value={filtersData.jobType} onChange={(e) => setFiltersData({ ...filtersData, jobType: e.target.value })}>
                        <option selected disabled>-- Select --</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Filters