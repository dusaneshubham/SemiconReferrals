import React from 'react'
import $ from 'jquery';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const JobExperience = (prop) => {

    const [jobExperience, setJobExperience] = useState([{
        organizationName: "",
        designation: "",
        jobStartDate: "",
        jobEndDate: "",
        description: "",
        isCurrentlyWorking: ""
    }]);

    useEffect(() => {
        if (prop.data.length !== 0)
            setJobExperience(prop.data);
    }, [prop.data]);

    const addExperience = async () => {
        await setJobExperience([...jobExperience, {
            organizationName: "",
            designation: "",
            jobStartDate: "",
            jobEndDate: "",
            description: "",
            isCurrentlyWorking: ""
        }]);
        console.log(jobExperience);
    }

    const removeExperience = async (index) => {
        console.log(index);
        await setJobExperience((jobExperienceData) => jobExperienceData.filter((_, dataIndex) => dataIndex !== index));
        console.log(jobExperience);
    }

    const updateJobExperience = () => {

    }

    return (
        <>
            <div style={{ margin: "10px 0" }}>
                <h4>Job experience</h4>
                {jobExperience.map((data, index) => {
                    return (
                        <div className="row g-3 p-4 bg-light" key={index}>
                            {index !== 0 && <h5>Professional Additional Field {index}</h5>}
                            {/*--------------------- Organization name ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor="organization-name" className="form-label">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={data.organizationName}
                                    onChange={(e) =>
                                        setJobExperience({ ...jobExperience[index], organizationName: e.target.value })
                                    }
                                    className="form-control"
                                    id="organization-name"
                                />
                            </div>

                            {/*--------------------- Your role ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor="role" className="form-label">
                                    Your role
                                </label>
                                <input
                                    type="text"
                                    defaultValue={data.designation}
                                    onChange={(e) =>
                                        setJobExperience({ ...jobExperience[index], designation: e.target.value })
                                    }
                                    className="form-control"
                                    id="role"
                                />
                            </div>

                            {/*--------------------- Job start date ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor="job-start-date" className="form-label">
                                    Job start date
                                </label>
                                <input
                                    type="date"
                                    defaultValue={data.jobStartDate && data.jobStartDate.split('T')[index]}
                                    onChange={(e) =>
                                        setJobExperience({ ...jobExperience[index], jobStartDate: e.target.value })
                                    }
                                    className="form-control"
                                    id="job-start-date"
                                />
                            </div>

                            {/*--------------------- Job end date ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor={"job-end-date" + index} className="form-label">
                                    Job end date
                                </label>
                                <input
                                    type="date"
                                    defaultValue={data.jobEndDate && data.jobEndDate.split('T')[0]}
                                    onChange={(e) =>
                                        setJobExperience({ ...jobExperience[index], jobEndDate: e.target.value })
                                    }
                                    className="form-control"
                                    id={"job-end-date" + index}
                                />
                                <input type="checkbox" className="m-1" defaultValue={jobExperience[index].isCurrentlyWorking} id="check-box" onChange={(e) => {
                                    if (e.target.checked) {
                                        $('#job-end-date' + index).attr("type", "text");
                                        $('#job-end-date' + index).prop("disabled", true);
                                    } else {
                                        $('#job-end-date' + index).attr("type", "date");
                                        $('#job-end-date' + index).prop("disabled", false);
                                    }
                                }} />
                                Are You Currently Working There?
                            </div>

                            {/*--------------------- Description ---------------------*/}
                            <div>
                                <label htmlFor="contact-number" className="form-label">
                                    Description
                                </label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={data.description}
                                    onChange={(_, editor) => {
                                        const data = editor.getData();
                                        setJobExperience({ ...jobExperience[0], description: data })
                                    }}
                                />
                            </div>
                            {index !== 0 &&
                                <div className="remove-btn">
                                    <Button
                                        variant='contained'
                                        color='error'
                                        onClick={() => removeExperience(index)}>
                                        Remove
                                    </Button>
                                </div>
                            }
                        </div>
                    )
                })}

                {/*--------------------- Submit Button ---------------------*/}
                <div className="col-12">
                    <Button
                        variant="contained"
                        type="submit"
                        className="start-hiring-btn"
                        style={{ float: "right", margin: "15px 5px" }}
                        onClick={updateJobExperience}
                    >
                        Save experience
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ float: "right", margin: "15px 5px" }}
                        onClick={addExperience}>
                        Add More
                    </Button>
                </div>
            </div>
        </>
    )
}

export default JobExperience