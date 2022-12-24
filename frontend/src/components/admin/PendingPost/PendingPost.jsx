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
} from "@mui/material";
import Draggable from "react-draggable";
import axios from "axios";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setAlert({ error: "Something went wrong with server!" });
        });
    };
    fetchPendingJobs();
  }, []);

  // ------------------------- Approve Post ---------------------------
  const approvePost = () => {
    axios
      .post("http://localhost:5000/admin/approvePost", { postId })
      .then((res) => res.data)
      .then((response) => {
        setAlert({ success: response.message });
        setPendingJobs(response.data);
      })
      .catch((err) => {
        setAlert({ error: "Something went wrong with server!" });
      });
  };

  // ------------------------- Reject Post ---------------------------
  const rejectPost = () => {
    axios
      .post("http://localhost:5000/admin/rejectPost", { postId })
      .then((res) => res.data)
      .then((response) => {
        setAlert({ success: response.message });
        setPendingJobs(response.data);
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell>Employer Profile</StyledTableCell>
                <StyledTableCell>View Job Post</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            {/* ---------------------- Table Body -------------------- */}
            <TableBody>
              {pendingJobs.length > 0 &&
                pendingJobs.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{data.companyName}</StyledTableCell>

                    {/* ------------------- View Employer Profile Btn ------------------ */}
                    <StyledTableCell>
                      <Link className="text-decoration-none" to={`/employer/viewprofile/${data.recruiterId}`}>
                        <Button variant="contained">
                          View
                        </Button>
                      </Link>
                    </StyledTableCell>

                    {/* --------------- View Job Details Button ----------------- */}
                    <StyledTableCell>
                      <Link className="text-decoration-none" to={`/jobdescription/${data._id}`}>
                        <Button variant="contained">
                          View
                        </Button>
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell>
                      {/* ----------------- Approve Button ------------------ */}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          // passing post id to dialog box
                          handleClickOpenApproval(data._id);
                        }}
                      >
                        Approve
                      </Button>

                      {/* ----------------- Reject Button ------------------ */}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleClickOpenRejection(data._id)}
                        style={{ margin: "10px" }}
                      >
                        Reject
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              {pendingJobs.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan="6" className="text-center text-secondary">
                    No Post found!
                  </StyledTableCell>
                </StyledTableRow>
              )}
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
  }
};

export default PendingPost;
