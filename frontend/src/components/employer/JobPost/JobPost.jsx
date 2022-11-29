// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import { Button, Snackbar, Slide } from "@mui/material";
// import ReactLoading from "react-loading";
// import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const UpdateProfile = () => {
  // alert
  // const [alert, setAlert] = useState({});

  // // loading
  // const [loading, setLoading] = useState(true);

  // // user details
  // const [userDetails, setUserDetails] = useState({
  //   name: "",
  //   companyName: "",
  //   email: "",
  //   contactNumber: "",
  //   companyWebsite: "",
  //   linkedin: "",
  //   totalExperience: "",
  //   teamName: "",
  //   teamSize: "",
  //   location: "",
  //   designation: "",
  //   currentExperience: "",
  //   teamWorkDescription: "",
  // });

  // useEffect(() => {
  //   // Getting user details from backend
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .post("http://localhost:5000/recruiter/getRecruiterDetails", { token })
  //       .then((res) => res.data)
  //       .then(async (res) => {
  //         await setUserDetails({ ...userDetails, ...res });
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

  // // update data
  // const updateEmployerProfile = () => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .post("http://localhost:5000/recruiter/updateProfile", {
  //         ...userDetails,
  //         token: token,
  //       })
  //       .then((response) => response.data)
  //       .then((res) => {
  //         if (res.success) {
  //           setAlert({ success: res.message });
  //         } else {
  //           setAlert({ error: res.message });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setAlert({ error: "Something went wrong with server!" });
  //       });
  //   } else {
  //     setAlert({ error: "Unauthorized user!!" });
  //   }
  // };

  // const Transition = (props) => {
  //   return <Slide {...props} direction="down" />;
  // };

  // const handleClose = (_, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setAlert({});
  // };

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
  //   return (
  //     <>
  //       <div className="row">
  //         <Snackbar
  //           autoHideDuration={2000}
  //           open={alert.error ? true : false}
  //           TransitionComponent={Transition}
  //           onClose={handleClose}
  //           anchorOrigin={{ vertical: "top", horizontal: "center" }}
  //         >
  //           <Alert severity="error" onClose={handleClose}>
  //             <span className="my-alert">{alert.error}</span>
  //           </Alert>
  //         </Snackbar>
  //         <Snackbar
  //           autoHideDuration={2000}
  //           open={alert.success ? true : false}
  //           TransitionComponent={Transition}
  //           onClose={handleClose}
  //           anchorOrigin={{ vertical: "top", horizontal: "center" }}
  //         >
  //           <Alert severity="success" onClose={handleClose}>
  //             <span className="my-alert">{alert.success}</span>
  //           </Alert>
  //         </Snackbar>

  //         {/*--------------------- Job Post ---------------------*/}
  //         <div className="col-md-8 p-4 bg-white">
  //           <div style={{ margin: "10px 0" }}>
  //             <div className="row g-3 p-4 bg-light">
  //               {/*------------------- Job Title ------------------*/}
  //               <div className="col-md-12">
  //                 <label htmlFor="job-title" className="form-label">
  //                   Job Title
  //                 </label>
  //                 <input
  //                   type="text"
  //                   defaultValue={userDetails.jobTitle}
  //                   onChange={(e) =>
  //                     setUserDetails({
  //                       ...userDetails,
  //                       jobTitle: e.target.value,
  //                     })
  //                   }
  //                   className="form-control"
  //                   id="job-title"
  //                 />
  //               </div>

  //               {/*------------------- Job Category -----------------*/}
  //               <div className="col-md-12">
  //                 <label htmlFor="job-category" className="form-label">
  //                   Job Category
  //                 </label>
  //                 <select
  //                   id="job-category"
  //                   className="form-select"
  //                   value={userDetails.jobCategory}
  //                   onChange={(e) =>
  //                     setUserDetails({
  //                       ...userDetails,
  //                       jobCategory: e.target.value,
  //                     })
  //                   }
  //                 >
  //                   <option value="">Choose...</option>
  //                   <option value="ASIC Verification">ASIC Verification</option>
  //                   <option value="Semiconductor">Semiconductor</option>
  //                   <option value="Full Stack Developer">
  //                     Full Stack Developer
  //                   </option>
  //                   <option value="Database Administrator">
  //                     Database Administrator
  //                   </option>
  //                 </select>
  //               </div>

  //               {/*--------------------- Job Description ---------------------*/}
  //               <div>
  //                 <label htmlFor="job-description" className="form-label">
  //                   Job Description
  //                 </label>
  //                 <CKEditor
  //                   editor={ClassicEditor}
  //                   data=""
  //                   onChange={(e, editor) => {
  //                     const data = editor.getData();
  //                     // console.log({ e, editor, data });
  //                     setUserDetails({
  //                       ...userDetails,
  //                       jobDescription: data,
  //                     });
  //                   }}
  //                 />
  //               </div>

  //               {/*--------------------- Key Responsibilities ---------------------*/}
  //               <div>
  //                 <label htmlFor="key-responsibilities" className="form-label">
  //                   Key Responsibilities
  //                 </label>
  //                 <CKEditor
  //                   editor={ClassicEditor}
  //                   data=""
  //                   onChange={(e, editor) => {
  //                     const data = editor.getData();
  //                     // console.log({ e, editor, data });
  //                     setUserDetails({
  //                       ...userDetails,
  //                       keyResponsibilities: data,
  //                     });
  //                   }}
  //                 />
  //               </div>

  //               {/*--------------------- Submit Button ---------------------*/}
  //               <div className="col-12">
  //                 <Button
  //                   variant="contained"
  //                   type="submit"
  //                   style={{ float: "right", margin: "15px 0" }}
  //                   onClick={updateEmployerProfile}
  //                 >
  //                   Post
  //                 </Button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
};

export default UpdateProfile;
