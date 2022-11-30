import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
// import { useEffect } from "react";
import { Button, Snackbar, Slide } from "@mui/material";
// import ReactLoading from "react-loading";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JobPost = () => {
  // alert
  const [alert, setAlert] = useState({});

  // loading
  // const [loading, setLoading] = useState(true);

  // job post details
  const [jobPostDetails, setJobPostDetails] = useState({
    jobTitle: "",
    jobCategory: "",
    jobDescription: "",
    keyResponsibilities: "",
    applicationDeadline: "",
    qualification: "",
    experience: "",
    jobType: "",
    jobLevel: "",
    numberOfVacancies: "",
    location: "",
  });

  // useEffect(() => {
  //   // Getting job details from backend
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .post("http://localhost:5000/recruiter/getRecruiterDetails", { token })
  //       .then((res) => res.data)
  //       .then(async (res) => {
  //         await setJobPostDetails({ ...jobPostDetails, ...res });
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //         // TODO: logout
  //       });
  //   } else {
  //     setAlert({ error: "Unauthorized user!" });
  //   }
  // }, []);

  // upload Job Post
  const uploadJobPost = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/recruiter/jobPost", {
          ...jobPostDetails,
          token: token,
        })
        .then((response) => response.data)
        .then((res) => {
          if (res.success) {
            setAlert({ success: res.message });
            setJobPostDetails({
              jobTitle: "",
              jobCategory: "",
              jobDescription: "",
              keyResponsibilities: "",
              applicationDeadline: "",
              qualification: "",
              experience: "",
              jobType: "",
              jobLevel: "",
              numberOfVacancies: "",
              location: "",
            });
          } else {
            setAlert({ error: res.message });
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!" });
        });
    } else {
      setAlert({ error: "Unauthorized user!!" });
    }
  };

  const Transition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({});
  };

  // if (loading) {
  //   return (
  //     <>
  //       <div
  //         className="d-flex justify-content-center align-items-center"
  //         style={{ height: "70vh" }}
  //       >
  //         <ReactLoading
  //           type="bubbles"
  //           color="#1976d2"
  //           height={100}
  //           width={100}
  //         />
  //       </div>
  //     </>
  //   );
  // } else {
    return (
      <>
        <div className="row">
          <Snackbar
            autoHideDuration={2000}
            open={alert.error ? true : false}
            TransitionComponent={Transition}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={handleClose}>
              <span className="my-alert">{alert.error}</span>
            </Alert>
          </Snackbar>
          <Snackbar
            autoHideDuration={2000}
            open={alert.success ? true : false}
            TransitionComponent={Transition}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={handleClose}>
              <span className="my-alert">{alert.success}</span>
            </Alert>
          </Snackbar>

          {/*--------------------- Job Post ---------------------*/}
          <div className="col-md-8 p-4 bg-white">
            <div style={{ margin: "10px 0" }}>
              <div className="row g-3 p-4 bg-light">
                {/*------------------- Job Title ------------------*/}
                <div className="col-md-12">
                  <label htmlFor="job-title" className="form-label">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={jobPostDetails.jobTitle}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        jobTitle: e.target.value,
                      })
                    }
                    className="form-control"
                    id="job-title"
                  />
                </div>

                {/*------------------- Job Category -----------------*/}
                <div className="col-md-12">
                  <label htmlFor="job-category" className="form-label">
                    Job Category
                  </label>
                  <select
                    id="job-category"
                    className="form-select"
                    value={jobPostDetails.jobCategory}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        jobCategory: e.target.value,
                      })
                    }
                  >
                    <option value="">Choose...</option>
                    <option value="ASIC Verification">ASIC Verification</option>
                    <option value="Semiconductor">Semiconductor</option>
                    <option value="Full Stack Developer">
                      Full Stack Developer
                    </option>
                    <option value="Database Administrator">
                      Database Administrator
                    </option>
                  </select>
                </div>

                {/*--------------------- Job Description ---------------------*/}
                <div>
                  <label htmlFor="job-description" className="form-label">
                    Job Description
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={jobPostDetails.jobDescription}
                    onChange={(e, editor) => {
                      const data = editor.getData();
                      // console.log({ e, editor, data });
                      setJobPostDetails({
                        ...jobPostDetails,
                        jobDescription: data,
                      });
                    }}
                  />
                </div>

                {/*--------------------- Key Responsibilities ---------------------*/}
                <div>
                  <label htmlFor="key-responsibilities" className="form-label">
                    Key Responsibilities
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={jobPostDetails.keyResponsibilities}
                    onChange={(e, editor) => {
                      const data = editor.getData();
                      // console.log({ e, editor, data });
                      setJobPostDetails({
                        ...jobPostDetails,
                        keyResponsibilities: data,
                      });
                    }}
                  />
                </div>

                {/*------------------- Application Deadline ------------------*/}
                <div className="col-md-6">
                  <label htmlFor="application-deadline" className="form-label">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={jobPostDetails.applicationDeadline}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        applicationDeadline: e.target.value,
                      })
                    }
                    className="form-control"
                    id="application-deadline"
                  />
                </div>

                {/*------------------- Job Qualifications -----------------*/}
                <div className="col-md-6">
                  <label htmlFor="qualification" className="form-label">
                    Job Qualification
                  </label>
                  <select
                    id="qualification"
                    className="form-select"
                    value={jobPostDetails.qualification}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        qualification: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PHD">PHD</option>
                  </select>
                </div>

                {/*------------------- Job Type -----------------*/}
                <div className="col-md-6">
                  <label htmlFor="job-type" className="form-label">
                    Job Type
                  </label>
                  <select
                    id="job-type"
                    className="form-select"
                    value={jobPostDetails.jobType}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        jobType: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>

                {/*--------------------- Job Experience ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="experience" className="form-label">
                    Job Experience
                  </label>
                  <select
                    id="experience"
                    value={jobPostDetails.experience}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        experience: e.target.value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="">-- Select --</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Trained Professional">
                      Trained Professional (0-1 year)
                    </option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                {/*--------------------- Job Level ---------------------*/}
                <div className="col-md-6">
                  <label htmlFor="job-level" className="form-label">
                    Job Level
                  </label>
                  <select
                    id="job-level"
                    className="form-select"
                    value={jobPostDetails.jobLevel}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        jobLevel: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Manager">Manager</option>
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>

                {/*------------------- Number of Vacancies ------------------*/}
                <div className="col-md-6">
                  <label htmlFor="vacancies" className="form-label">
                    Number of Vacancies
                  </label>
                  <input
                    type="number"
                    value={jobPostDetails.numberOfVacancies}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        numberOfVacancies: e.target.value,
                      })
                    }
                    className="form-control"
                    id="vacancies"
                  />
                </div>

                {/*------------------- Job Location ------------------*/}
                <div className="col-md-6">
                  <label htmlFor="location" className="form-label">
                    Job Location
                  </label>
                  <input
                    type="text"
                    value={jobPostDetails.location}
                    onChange={(e) =>
                      setJobPostDetails({
                        ...jobPostDetails,
                        location: e.target.value,
                      })
                    }
                    className="form-control"
                    id="location"
                  />
                </div>

                {/*--------------------- Submit Button ---------------------*/}
                <div className="col-12">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ float: "right", margin: "15px 0" }}
                    onClick={uploadJobPost}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  // }
};

export default JobPost;
