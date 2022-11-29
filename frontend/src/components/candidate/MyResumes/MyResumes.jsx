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
  Snackbar,
  Slide
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import saveAs from 'file-saver';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyResumes = () => {

  const [alert, setAlert] = useState({});
  const [open, setOpen] = useState(false);
  const [resume, setResume] = useState();
  const [resumeData, setResumeData] = useState([]);
  const [deleteResumeIndex, setDeleteResumeIndex] = useState();

  useEffect(() => {
    //token
    const token = localStorage.getItem("token");
    // fetch resumes of current user
    axios.post("http://localhost:5000/candidate/getAllMyResumes", { token })
      .then((res) => res.data)
      .then((response) => {
        if (response.success) {
          setResumeData(response.resumes);
        } else {
          setAlert({ error: response.message });
          // TODO: redirect path
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      });

  }, []);

  // token
  let token = localStorage.getItem("token");

  // Resume sending to backend to upload
  const uploadResume = (e) => {
    //form data
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("token", token);

    // upload resumes for current user
    axios.post("http://localhost:5000/candidate/uploadMyResume", formData)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setAlert({ success: res.message });
          document.getElementById('resume').value = "";
          setResumeData(res.resumes)
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      });
  };

  const downloadResume = (url) => {
    saveAs.saveAs(url, "MyResume");
  }

  const handleClickOpen = (index) => {
    setDeleteResumeIndex(index);
    setOpen(true);
  };

  const handleClickClose = () => {
    setDeleteResumeIndex();
    setOpen(false);
  };

  const deleteResume = async () => {
    const data = resumeData.filter((_, index) => index !== deleteResumeIndex);
    axios.post("http://localhost:5000/candidate/deleteResume", { resumeData: data, token: token })
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

  // ------------------- alert functions ------------------- //
  const Transition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  // close alert
  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({});
  };
  // ------------------------------------------------------- //

  return (
    <>
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
      <h4>Your Uploaded Resumes</h4>
      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
        name="resume"
        id="resume"
      />
      <button onClick={uploadResume}>Upload</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Resume Name</StyledTableCell>
              <StyledTableCell>Download</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumeData.map((data, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{data.fileName}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="success"
                      style={{ margin: "10px" }}
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
                      onClick={() => handleClickOpen(index)}
                      style={{ margin: "10px" }}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
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
          <Button autoFocus onClick={deleteResume}>
            Yes
          </Button>
          <Button onClick={handleClickClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyResumes;
