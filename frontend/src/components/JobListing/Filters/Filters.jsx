import React, { useEffect, useState } from 'react';

const Filters = (props) => {

    const jobDetails = props.jobDetails;
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
            let temp = jobDetails.filter(function (jobDetails) {
                return filterKeys.every(function (eachKey) {
                    if (!filters[eachKey].length) {
                        return true;
                    }
                    if (eachKey === "keywords") {
                        return jobDetails[eachKey].toString().toLowerCase().includes(filters[eachKey].toLowerCase()) || jobDetails["skillsRequired"].toString().toLowerCase().includes(filters[eachKey].toLowerCase());
                    } else {
                        return jobDetails[eachKey].toString().toLowerCase().includes(filters[eachKey].toLowerCase());
                    }
                });
            });
            props.setFilterData(temp);
        };

        handleChange();
    }, [filters, jobDetails]);

    return (
        <>
            <div id="filters-div" className="p-4">
                <h4>Filters</h4>
                {/* ------------------ Keywords --------------------- */}
                <div className="my-4">
                    <label htmlFor="keywords" className="form-label">Search by Keywords</label>
                    <input type="text" value={filters.keywords} className="form-control" placeholder="Search" onChange={(e) => {
                        setFilters({ ...filters, keywords: e.target.value });
                    }} />
                </div>

                {/* ------------------ Location --------------------- */}
                <div className="my-4">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" value={filters.location} className="form-control" onChange={(e) => {
                        setFilters({ ...filters, location: e.target.value });
                    }} />
                </div>

                {/* ------------------ Qualification --------------------- */}
                <div className="my-4">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <select value={filters.qualification} className="form-select" onChange={(e) => {
                        setFilters({ ...filters, qualification: e.target.value });
                    }}>
                        <option value="">-- Select --</option>
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
                    }}>
                        <option value="">-- Select --</option>
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
                    }}>
                        <option value="">-- Select --</option>
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