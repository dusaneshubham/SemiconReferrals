import React from 'react'
import $ from 'jquery';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const JobExperience = (prop) => {

    const [jobExperience, setJobExperience] = useState([{
        organizationName: "",
        designation: "",
        jobStartDate: "",
        jobEndDate: "",
        description: "",
        isCurrentlyWorking: false
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
            isCurrentlyWorking: false
        }]);
    }

    const removeExperience = async (index) => {
        await setJobExperience((jobExperienceData) => jobExperienceData.filter((_, dataIndex) => dataIndex !== index));
    }

    const updateJobExperience = async () => {
        let token = localStorage.getItem("token");
        let flag = true;
        jobExperience.forEach((element) => {
            if (element.organizationName === "") {
                flag = false;
                return;
            }
        });

        if (flag) {
            await axios.post("http://localhost:5000/candidate/updateWorkingExperience", { token: token, currentWorkingExperience: jobExperience })
                .then((data) => data.data)
                .then((data) => {
                    if (data.success) {
                        prop.alert({ success: data.message });
                    } else {
                        prop.alert({ error: data.message });
                    }
                }).catch((err) => {
                    console.log(err);
                    prop.alert({ error: "Something went wrong with server!" });
                });
        } else {
            prop.alert({ error: "Organization field are required in job experience!" });
        }
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
                                <label htmlFor={"organization-name" + index} className="form-label">
                                    Organization Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.organizationName}
                                    onChange={(e) => {
                                        data.organizationName = e.target.value;
                                        setJobExperience([...jobExperience]);
                                    }}
                                    className="form-control"
                                    id={"organization-name" + index}
                                />
                            </div>

                            {/*--------------------- Your role ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor={"role" + index} className="form-label">
                                    Your role
                                </label>
                                <input
                                    type="text"
                                    value={data.designation}
                                    onChange={(e) => {
                                        data.designation = e.target.value;
                                        setJobExperience([...jobExperience]);
                                    }}
                                    className="form-control"
                                    id={"role" + index}
                                />
                            </div>

                            {/*--------------------- Job start date ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor={"job-start-date" + index} className="form-label">
                                    Job start date
                                </label>
                                <input
                                    type="date"
                                    value={data.jobStartDate ? data.jobStartDate.split('T')[0] : ''}
                                    onChange={(e) => {
                                        data.jobStartDate = e.target.value;
                                        setJobExperience([...jobExperience]);
                                    }}
                                    className="form-control"
                                    id={"job-start-date" + index}
                                />
                            </div>

                            {/*--------------------- Job end date ---------------------*/}
                            <div className="col-md-6">
                                <label htmlFor={"job-end-date" + index} className="form-label">
                                    Job end date
                                </label>
                                <input
                                    type={data.isCurrentlyWorking ? 'text' : 'date'}
                                    disabled={data.isCurrentlyWorking ? 'disabled' : false}
                                    value={data.jobEndDate ? data.jobEndDate.split('T')[0] : ''}
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            data.jobEndDate = e.target.value;
                                        } else {
                                            data.jobEndDate = "";
                                        }
                                        setJobExperience([...jobExperience]);
                                    }}
                                    className="form-control"
                                    id={"job-end-date" + index}
                                />
                                <input type="checkbox"
                                    className="m-1"
                                    checked={data.isCurrentlyWorking}
                                    id="check-box" onChange={(e) => {
                                        data.isCurrentlyWorking = e.target.checked;
                                        setJobExperience([...jobExperience]);
                                        if (e.target.checked) {
                                            data.jobEndDate = "";
                                            setJobExperience([...jobExperience]);
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
                                <label htmlFor={"contact-number" + index} className="form-label">
                                    Description
                                </label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={data.description}
                                    onChange={(_, editor) => {
                                        const descData = editor.getData();
                                        data.description = descData;
                                        setJobExperience([...jobExperience]);
                                    }}
                                />
                            </div>

                            {/*--------------------- Remove button ---------------------*/}
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