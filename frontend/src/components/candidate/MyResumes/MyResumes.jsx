import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import saveAs from "file-saver";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";

const MyResumes = () => {
  const [alert, setAlert] = useState({});
  const [open, setOpen] = useState(false);
  const [resume, setResume] = useState();
  const [resumeData, setResumeData] = useState([]);
  const [defaultResumeId, setDefaultResumeId] = useState("");
  const [deleteResume, setDeleteResume] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //token
    const token = localStorage.getItem("token");
    // fetch resumes of current user
    axios
      .post("http://localhost:5000/candidate/getAllMyResumes", { token })
      .then((res) => res.data)
      .then((response) => {
        if (response.success) {
          setResumeData(response.resumes);
          setDefaultResumeId(response.defaultResumeId);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlert({ error: "Something went wrong with server!" });
      });
  }, []);

  // token
  let token = localStorage.getItem("token");

  // ----------------------- Upload Resume -------------------------
  const uploadResume = (e) => {
    //form data
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("token", token);

    if (!resume) {
      // if there is no resume selected
      setAlert({ error: "No resume has been selected" });
    } else {
      // upload resumes for current user
      axios
        .post("http://localhost:5000/candidate/uploadMyResume", formData)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setAlert({ success: res.message });
            setResumeData(res.resumes);
            if (res.defaultResumeId) setDefaultResumeId(res.defaultResumeId);
            document.getElementById("resume").value = "";
          } else {
            setAlert({ error: res.message });
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!" });
        });
    }
  };

  const downloadResume = (url) => {
    saveAs.saveAs(url, "MyResume");
  };

  const handleClickOpen = (id, fileName) => {
    setDeleteResume({ id: id, fileName: fileName });
    setOpen(true);
  };

  const handleClickClose = () => {
    setDeleteResume();
    setOpen(false);
  };

  const handleDeleteResume = async () => {
    axios
      .post("http://localhost:5000/candidate/deleteResume", {
        id: deleteResume.id,
        fileName: deleteResume.fileName,
        token: token,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setAlert({ success: res.message });
          setResumeData(res.resumes);
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      });
    setOpen(false);
  };

  const makeDefault = async (id) => {
    await axios
      .post("http://localhost:5000/candidate/makeDefaultResume", {
        token: token,
        id: id,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setDefaultResumeId(res.defaultResumeId);
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ message: "Something went wrong with server!" });
      });
  };

  const makeUndefault = async () => {
    await axios
      .post("http://localhost:5000/candidate/makeUndefaultResume", { token })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setDefaultResumeId("");
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong during undefault resume!!" });
      })
  }

  //------------------- Ignore this part bcz it's meaningless but mandatory ------------------- //
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // ------------------------------------------------------------------------------------------ //

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <>
        {/* ---------------------- alert ---------------------- */}
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />
        {/* --------------------------------------------------- */}

        <h4>Your Uploaded Resumes</h4>

        {/* ------------------- Upload Resume -------------------- */}
        <div style={{ margin: "40px 0" }}>
          <h5 style={{ color: "var(--main-blue)" }}>Add Resume</h5>
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            name="resume"
            id="resume"
          />
          <button onClick={uploadResume} className="main-btn">
            Add
          </button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Resume Name</StyledTableCell>
                <StyledTableCell>Download</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
                <StyledTableCell>Set Default</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {resumeData.length > 0 && (
                resumeData.map((data, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{data.fileName}</StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<DownloadIcon />}
                          onClick={() => downloadResume(data.url)}
                        >
                          Download
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpen(data._id, data.fileName)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                      {data._id === defaultResumeId ? (
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={makeUndefault}
                          >
                            Set Undefault
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell>
                          <Button
                            variant="outlined"
                            onClick={() => makeDefault(data._id)}
                          >
                            Set Default
                          </Button>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  );
                })
              )}
              {resumeData.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan="4" className="text-center text-secondary">No Resume Uploaded</StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Delete this Resume?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDeleteResume}>
              Yes
            </Button>
            <Button onClick={handleClickClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};

export default MyResumes;
