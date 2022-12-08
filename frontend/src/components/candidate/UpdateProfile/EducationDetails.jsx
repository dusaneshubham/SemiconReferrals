import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ReactLoading from "react-loading";
import axios from 'axios';

const EducationDetails = (prop) => {

    const [educationDetails, setEducationDetails] = useState([{
        title: "",
        instituteName: "",
        startDate: "",
        endDate: "",
        CGPA: "",
        grades: "",
        description: ""
    }]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (prop.data.length !== 0)
            setEducationDetails(prop.data);
        setLoading(false);
    }, [prop.data]);

    const addExperience = async () => {
        setEducationDetails([...educationDetails, {
            title: "",
            instituteName: "",
            startDate: "",
            endDate: "",
            CGPA: "",
            grades: "",
            description: "",
        }]);
    }

    const removeExperience = async (index) => {
        setEducationDetails((educationData) => educationData.filter((_, dataIndex) => dataIndex !== index));
    }

    const updateEducationDetails = async () => {
        let token = localStorage.getItem("token");
        let flag = true;
        educationDetails.forEach((element) => {
            if (element.title === "") {
                flag = false;
                return;
            }
        });

        if (flag) {
            await axios.post("http://localhost:5000/candidate/updateEducationDetails", { token: token, educationDetails: educationDetails })
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
            prop.alert({ error: "Qualification field are required in educational details!" });
        }
    }

    if (loading) {
        return (
            <>
                <div
                    className="d-flex justify-content-center align-items-center"
                >
                    <ReactLoading
                        type="bubbles"
                        color="#1976d2"
                        height={100}
                        width={100}
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div style={{ margin: "10px 0" }}>
                    <h4>Educational Details</h4>
                    {educationDetails.map((data, index) => {
                        return (
                            <div className="row g-3 p-4 bg-light" key={index}>
                                {index !== 0 && <h5>Qualification Title {index}</h5>}

                                {/*--------------------- Qualification title ---------------------*/}
                                <div className="col-md-6">
                                    <label htmlFor={"qualification-title" + index} className="form-label">
                                        Qualification Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => {
                                            data.title = e.target.value;
                                            setEducationDetails([...educationDetails]);
                                        }}
                                        className="form-control"
                                        id={"qualification-title" + index}
                                    />
                                </div>

                                {/*--------------------- Institute Name ---------------------*/}
                                <div className="col-md-6">
                                    <label htmlFor={"institute-name" + index} className="form-label">
                                        Institute Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.instituteName}
                                        onChange={(e) => {
                                            data.instituteName = e.target.value;
                                            setEducationDetails([...educationDetails]);
                                        }}
                                        className="form-control"
                                        id={"institute-name" + index}
                                    />
                                </div>

                                {/*--------------------- Start date ---------------------*/}
                                <div className="col-md-6">
                                    <label htmlFor={"start-date" + index} className="form-label">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.startDate ? data.startDate.split('T')[0] : ''}
                                        onChange={(e) => {
                                            data.startDate = e.target.value;
                                            setEducationDetails([...educationDetails]);
                                        }}
                                        className="form-control"
                                        id={"start-date" + index}
                                    />
                                </div>

                                {/*--------------------- End date ---------------------*/}
                                <div className="col-md-6">
                                    <label htmlFor={"end-date" + index} className="form-label">
                                        End date
                                    </label>
                                    <input
                                        type='date'
                                        value={data.endDate ? data.endDate.split('T')[0] : ''}
                                        onChange={(e) => {
                                            data.endDate = e.target.value;
                                            setEducationDetails([...educationDetails]);
                                        }}
                                        className="form-control"
                                        id={"end-date" + index}
                                    />
                                </div>

                                {/*--------------------- Percentage ---------------------*/}
                                <div className="col-md-6">
                                    <label htmlFor={"percentage" + index} className="form-label">
                                        Percentage
                                    </label>
                                    <input
                                        type='text'
                                        value={data.CGPA ? data.CGPA.split('T')[0] : ''}
                                        onChange={(e) => {
                                            data.CGPA = e.target.value;
                                            setEducationDetails([...educationDetails]);
                                        }}
                                        className="form-control"
                                        id={"percentage" + index}
                                    />
                                </div>

                                {/*--------------------- Grades ---------------------*/}
                                <div className="col-md-6">
                                    <label htmlFor={"grades" + index} className="form-label">
                                        Grades
                                    </label>
                                    <input
                                        type='text'
                                        placeholder="Only Grade Letter e.g A+,B,C"
                                        value={data.grades ? data.grades.split('T')[0] : ''}
                                        onChange={(e) => {
                                            data.grades = e.target.value;
                                            setEducationDetails([...educationDetails]);
                                        }}
                                        className="form-control"
                                        id={"grades" + index}
                                    />
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
                                            setEducationDetails([...educationDetails]);
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
                            onClick={updateEducationDetails}
                        >
                            Save education details
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
        );
    }
}

export default EducationDetails;