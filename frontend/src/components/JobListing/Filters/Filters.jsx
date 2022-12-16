import React, { useEffect, useState } from 'react';
import "./filters.css";

const Filters = (props) => {

    const [filters, setFilters] = useState({
        keywords: "",
        location: "",
        qualification: "",
        experience: "",
        jobType: ""
    });

    useEffect(() => {
        const handleChange = () => {
            var filterKeys = Object.keys(filters);
            let temp = props.jobDetails.filter(function (eachObj) {
                return filterKeys.every(function (eachKey) {
                    if (!filters[eachKey].length) {
                        return true;
                    }
                    return eachObj[eachKey]
                        .toLowerCase()
                        .includes(filters[eachKey].toLowerCase());
                });
            });
            props.setFilterData(temp);
        };

        handleChange();
    }, [filters, props.jobDetails]);

    const getFilteredData = () => {
        if (!filters.location && !filters.qualification) {
            props.setFilterData(props.jobDetails);
        }
        if (filters.location) {
            props.setFilterData(props.filterData.filter((job) => {
                return job.location.toLowerCase().includes(filters.location.toLowerCase());
            }))
        }
        if (filters.qualification) {
            props.setFilterData(props.filterData.filter((job) => {
                return job.qualification === filters.qualification;
            }))
        }
        if (filters.experience) {
            props.setFilterData(props.filterData.filter((job) => {
                return job.experience === filters.experience;
            }))
        }
        if (filters.jobType) {
            props.setFilterJobDetails(props.filterJobDetails.filter((job) => {
                return job.jobType === filters.jobType;
            }))
        }
    }

    return (
        <>
            <div id="filters-div">
                <h4>Filters</h4>
                {/* ------------------ Keywords --------------------- */}
                <div className="my-4">
                    <label htmlFor="keywords" className="form-label">Search by Keywords</label>
                    <input type="text" value={filters.keywords} className="form-control" id="keywords" placeholder="Search" onChange={(e) => setFilters({ ...filters, keywords: e.target.value })} />
                </div>

                {/* ------------------ Location --------------------- */}
                <div className="my-4">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" value={filters.location} className="form-control" id="location" onChange={(e) => {
                        setFilters({ ...filters, location: e.target.value });
                        getFilteredData();
                    }} />
                </div>

                {/* ------------------ Qualification --------------------- */}
                <div className="my-4">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <select value={filters.qualification} className="form-select" onChange={(e) => {
                        setFilters({ ...filters, qualification: e.target.value });
                        getFilteredData();
                    }}>
                        <option selected value="">-- Select --</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PHD">PHD</option>
                    </select>
                </div>

                {/* ------------------ Experience --------------------- */}
                <div className="my-4">
                    <label htmlFor="experience" className="form-label">Experience</label>
                    <select className="form-select" value={filters.experience} onChange={(e) => {
                        setFilters({ ...filters, experience: e.target.value });
                        getFilteredData();
                    }}>
                        <option selected value="">-- Select --</option>
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
                    <select className="form-select" value={filters.jobType} onChange={(e) => {
                        setFilters({ ...filters, jobType: e.target.value });
                        getFilteredData();
                    }}>
                        <option selected value="">-- Select --</option>
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