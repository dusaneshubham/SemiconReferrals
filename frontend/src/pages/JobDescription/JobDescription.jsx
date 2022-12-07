import React, { useEffect, useState } from "react";
import "./job-description.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobOverview from "../../components/JobDescription/JobOverview";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AlertPopUp from "../../components/AlertPopUp/AlertPopUp";
import Loading from "../../components/Loading/Loading";

const JobDescription = () => {

  const param = useParams();
  const postId = param.id;
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);

  const [jobDetail, setJobDetail] = useState({
    recruiterId: "",
    jobTitle: "",
    JobDescription: "",
    keyResponsibilities: "",
    numberOfVacancies: 0,
    applicationDeadline: "",
    jobType: "",
    experience: "",
    qualification: "",
    location: "",
    jobLevel: "",
    salary: "",
    skillsRequired: [],
  });

  const [tokenData, setTokenData] = useState({ _id: "", type: "" });

  const [isAppliedForTheJob, setIsAppliedForTheJob] = useState(false);
  const [isSavedJob, setIsSavedJob] = useState(false);

  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    const token = localStorage.getItem("token");
    // fetch resumes of current user
    axios
      .post("http://localhost:5000/candidate/getAllMyResumes", { token })
      .then((res) => res.data)
      .then((response) => {
        if (response.success) {
          setResumeData(response.resumes);
          console.log(response.resumes);
        } else {
          console.log("No resumes");
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  // Dialog over


  // --------------------------- get Job Detail ------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getJobDetail = () => {
      // getting token data
      if (token) {
        axios
          .post("http://localhost:5000/verify-token", { token })
          .then((res) => res.data)
          .then((tokenResponse) => {
            if (tokenResponse.success) {
              axios
                .post("http://localhost:5000/jobs/getJobDetails", { postId })
                .then((res) => res.data)
                .then((jobResponse) => {
                  if (jobResponse.success) {
                    if (
                      jobResponse.data.status === "Pending" &&
                      tokenResponse.tokenData._id !==
                      jobResponse.data.recruiterId &&
                      tokenResponse.tokenData.type !== "admin"
                    ) {
                      navigate("/");
                    } else {
                      setJobDetail(jobResponse.data);
                    }
                  } else {
                    navigate("/");
                  }
                })
                .catch((err) => {
                  navigate("/");
                  console.log(err);
                  setAlert({ error: "Something went wrong with server!" });
                });
              setTokenData(tokenResponse.tokenData);
            } else {
              console.log(tokenResponse.message);
            }
          })
          .catch((err) => {
            console.log(err);
            setAlert({ error: "Something went wrong with server!" });
          });
      } else {
        axios
          .post("http://localhost:5000/jobs/getJobDetails", { postId })
          .then((res) => res.data)
          .then((jobResponse) => {
            if (jobResponse.success) {
              if (jobResponse.data.status === "Pending") {
                navigate("/");
              } else {
                setJobDetail(jobResponse.data);
              }
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
            setAlert({ error: "Something went wrong with server!" });
          });
      }
    };

    getJobDetail();

    // Check whether applied to the job or not
    isAppliedToJob();
    isSavedTheJob();
  }, [navigate, postId]);

  // check whether already applied to this job or not
  const isAppliedToJob = () => {
    axios.post("http://localhost:5000/candidate/isAppliedToJob", { token, postId })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setIsAppliedForTheJob(true);
        } else {
          setAlert({ error: res.message });
        }
      }).catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      })
  }

  // check whether saved this job or not
  const isSavedTheJob = () => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5000/candidate/isSavedJob", { token, postId })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setIsSavedJob(true);
        }
        else {
          setIsSavedJob(false);
        }
      }).catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      })
  }

  const applyToJob = () => {
    const token = localStorage.getItem("token");
    if (token && selectedResume) {
      axios.post("http://localhost:5000/candidate/applyForJob", {
        token,
        data: { resume: selectedResume, jobPostId: postId, coverLetter: coverLetter }
      })
        .then((response) => response.data)
        .then((res) => {
          if (res.success) {
            isAppliedToJob();
          } else {
            setAlert({ error: res.message })
          }
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!" });
        });
    }
  };

  const saveThisJob = () => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5000/candidate/saveTheJobPost", { token, postId })
      .then((response) => response.data)
      .then((res) => {
        console.log(res.success);
        isSavedTheJob();
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      })
  }

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
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />
        <div className="back-btn py-2 px-3">
          <Button onClick={() => window.history.go(-1)}><KeyboardArrowLeft /> Back</Button>
        </div>
        <div className="container" id="job-description-container">
          {/* -------- Title -------- */}
          <h3 style={{ color: "var(--main-blue)" }}>{jobDetail.jobTitle}</h3>

          {/* --------- Company Name --------- */}
          <h6 style={{ color: "var(--main-orange)" }}>{jobDetail.companyName}</h6>

          <div className="row my-5 flex-wrap-reverse">
            <div id="left" className="col-md-9">
              {/* ---------------- Job Description ------------------- */}
              {jobDetail.jobDescription && (
                <div>
                  <h5>Job Description</h5>
                  <p
                    className="mb-5"
                    dangerouslySetInnerHTML={{ __html: jobDetail.jobDescription }}
                  ></p>
                </div>
              )}

              {/* ----------------- Key Responsibilities ------------------- */}
              {jobDetail.keyResponsibilities && (
                <div>
                  <h5>Key Responsibilities</h5>
                  <p
                    className="mb-5"
                    dangerouslySetInnerHTML={{
                      __html: jobDetail.keyResponsibilities,
                    }}
                  ></p>
                </div>
              )}

              {/* ----------------- Skills Required ------------------ */}
              {jobDetail.skillsRequired.length > 0 && (
                <div>
                  <h5>Skills Required</h5>
                  <div className="d-flex flex-wrap">
                    {jobDetail.skillsRequired.map((skill, index) => (
                      <div className="skills-section">{skill}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ------------------ Job Overview ------------------ */}
            <div id="job-overview-section" className="col-md-3">
              <JobOverview
                jobPostedDate={jobDetail.createdAt}
                location={jobDetail.location}
                salary={jobDetail.salary}
                deadline={jobDetail.applicationDeadline}
                experience={jobDetail.experience}
                qualification={jobDetail.qualification}
                jobType={jobDetail.jobType}
                jobLevel={jobDetail.jobLevel}
                vacancies={jobDetail.numberOfVacancies}
              />
            </div>
          </div>

          {/* {jobDetail.applicationDeadline < today ? "gone" : "not"} */}

          {/* ------------------- Apply Now Button ------------------ */}
          {tokenData.type === "candidate" && (
            <div>
              {!isAppliedForTheJob && (
                <div
                  style={{ margin: "20px 0", width: "100%" }}
                  className="d-flex justify-content-center"
                >
                  <button
                    style={{ width: "300px" }}
                    className="main-btn main-btn-link"
                    onClick={handleClickOpen}
                  >
                    Apply Now
                  </button>
                </div>
              )}

              {/* ------------------ Already Applied -------------------- */}
              {isAppliedForTheJob && (
                <div
                  style={{ margin: "20px 0", width: "100%" }}
                  className="d-flex justify-content-center"
                >
                  <Button style={{ width: "300px" }} variant="contained" disabled>
                    Already Applied
                  </Button>
                </div>
              )}

              {/* --------------------- Save This Job btn -------------------- */}
              {!isSavedJob && (
                <div
                  style={{ margin: "20px 0", width: "100%" }}
                  className="d-flex justify-content-center"
                >
                  <button
                    style={{
                      width: "300px",
                      backgroundColor: "var(--main-orange)",
                    }}
                    onClick={saveThisJob}
                    className="main-btn main-btn-link"
                  >
                    Save This Job
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        {/* ------------------------- Dialog box --------------------------- */}
        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Select Resume to apply for this job"}
          </DialogTitle>
          <hr />
          <DialogContent>
            {
              resumeData.map((data, index) => {
                return (
                  <div className="form-check d-flex justify-content-between w-100 my-4">
                    <div>
                      <input
                        className="form-check-input"
                        type="radio"
                        value={data.fileName}
                        name="selectResume"
                        onChange={(e) => setSelectedResume(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        {data.fileName.split("_")[1]}
                      </label>
                    </div>
                    <button style={{ border: "1px solid var(--main-orange)", borderRadius: "30px", padding: "2px 12px" }}>
                      <a href={data.url} rel="noreferrer" style={{ textDecoration: "none", color: "var(--main-orange)" }} target="_blank">
                        Preview
                      </a>
                    </button>
                  </div>
                )
              })
            }

            {/*--------------------- Cover Letter ---------------------*/}
            <div className="mt-5">
              <label htmlFor="job-description" className="form-label">
                Cover Letter
              </label>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(e, editor) => {
                  const data = editor.getData();
                  // console.log({ e, editor, data });
                  setCoverLetter(data);
                }}
              />
            </div>
          </DialogContent>
          <hr />
          <DialogActions className="d-flex justify-content-center">
            <button className="main-btn main-btn-link" onClick={applyToJob} autoFocus>
              Apply
            </button>
          </DialogActions>
        </Dialog>

        <Footer />
      </>
    );
  }
};

export default JobDescription;