import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Slide,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const PendingPost = () => {
  // For confirmation dialog box
  const [openApproval, setOpenApproval] = useState(false);
  const [openRejection, setOpenRejection] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [postId, setPostId] = useState("");
  const [alert, setAlert] = useState({});

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

  // ------------------- fetch pending jobs -----------------------
  const fetchPendingJobs = () => {
    axios
      .get("http://localhost:5000/jobs/getPendingJobs")
      .then((res) => res.data)
      .then((response) => {
        if (response.success) {
          setPendingJobs(response.data);
        } else {
          console.log(response.message);
        }
      })
      .catch((err) => {
        setAlert({ error: "Something went wrong with server!" });
      });
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  // ------------------------- Approve Post ---------------------------
  const approvePost = () => {
    axios
      .post("http://localhost:5000/admin/approvePost", { postId })
      .then((response) => {
        setAlert({ success: response.message });
        fetchPendingJobs();
      })
      .catch((err) => {
        setAlert({ error: "Something went wrong with server!" });
      });
  };

  // ------------------------- Reject Post ---------------------------
  const rejectPost = () => {
    axios
      .post("http://localhost:5000/admin/rejectPost", { postId })
      .then((response) => {
        setAlert({ success: response.message });
        fetchPendingJobs();
      })
      .catch((err) => {
        setAlert({ error: "Something went wrong with server!" });
      });
  };

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

  // ------------- click events functions for dialog boxes --------------
  const handleClickOpenApproval = (postId) => {
    setOpenApproval(true);
    setPostId(postId);
  };
  const handleClickOpenRejection = (postId) => {
    setOpenRejection(true);
    setPostId(postId);
  };
  
  const handleCloseApproval = () => {
    setOpenApproval(false);
    setPostId("");
  };
  const handleCloseRejection = () => {
    setOpenRejection(false);
    setPostId("");
  };

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Employer Profile</StyledTableCell>
              <StyledTableCell>View Job Post</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingJobs
              ? pendingJobs.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {data.recruiterinfos[0].companyName}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link>{data.recruiterId}</Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link>{data._id}</Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          // passing post id to dialog box
                          handleClickOpenApproval(data._id);
                        }}
                        style={{ margin: "10px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleClickOpenRejection(data._id)}
                        style={{ margin: "10px" }}
                      >
                        Reject
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openApproval}
        onClose={handleCloseApproval}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to <b>Approve</b> this job post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleCloseApproval();
              approvePost();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseApproval}>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRejection}
        onClose={handleCloseRejection}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to <b>Reject</b> this job post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleCloseRejection();
              rejectPost();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseRejection}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PendingPost;
