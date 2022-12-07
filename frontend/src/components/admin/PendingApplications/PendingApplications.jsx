import React, { useEffect } from "react";
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
import { Link } from 'react-router-dom';
import Draggable from "react-draggable";
import axios from "axios";
import { useState } from "react";

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

const PendingApplications = () => {

  const [PendingApplications, setPendingApplications] = useState([]);

  useEffect(() => {
    // ------------------- fetch pending jobs -----------------------
    const fetchPendingApplications = () => {
      axios
        .get("http://localhost:5000/jobs/getPendingApplications")
        .then((res) => res.data)
        .then((response) => {
          if (response.success) {
            console.log(response.data);
            setPendingApplications(response.data);
          } else {
            console.log(response.message);
          }
        })
        .catch((err) => {
          // setAlert({ error: "Something went wrong with server!" });
          console.log(err);
        });
    };
    fetchPendingApplications();
  }, []);

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

  // For confirmation dialog box
  const [openApproval, setOpenApproval] = React.useState(false);
  const [openRejection, setOpenRejection] = React.useState(false);

  const handleClickOpenApproval = () => {
    setOpenApproval(true);
  };
  const handleClickOpenRejection = () => {
    setOpenRejection(true);
  };

  const handleCloseApproval = () => {
    setOpenApproval(false);
  };
  const handleCloseRejection = () => {
    setOpenRejection(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Candidate Profile</StyledTableCell>
              <StyledTableCell>View Resume</StyledTableCell>
              <StyledTableCell>View Job Post</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PendingApplications.length > 0 &&
              PendingApplications.map((data, index) => (
                <StyledTableRow key={index}>
                  
                  <StyledTableCell>{data.jobPostId.companyName}</StyledTableCell>

                  {/* --------------- View Candidate Profile Btn ----------------- */}
                  <StyledTableCell>
                    <Button variant="contained" href={`/candidate/viewprofile/${data.candidateId}`}>
                      View
                    </Button>
                  </StyledTableCell>
                  
                  {/* ------------------ View Resume Btn ---------------------- */}
                  <StyledTableCell>
                    <Button variant="contained">
                      <a href={data.resume.url} rel="noreferrer" target="_blank" style={{ color: "#FFF", textDecoration: "none" }}>View</a>
                    </Button>
                  </StyledTableCell>

                  {/* --------------- View Job Details Button ----------------- */}
                  <StyledTableCell>
                    <Button variant="contained" href={`/jobdescription/${data.jobPostId._id}`}>
                      View
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleClickOpenApproval}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClickOpenRejection}
                      style={{ margin: "10px" }}
                    >
                      Reject
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )
              )}
            {PendingApplications.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan="5" className="text-center text-secondary">
                  No Applications found!
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
            Are you sure you want to <b>Approve</b> this job application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseApproval}>
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
            Are you sure you want to <b>Reject</b> this job application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseRejection}>
            Yes
          </Button>
          <Button onClick={handleCloseRejection}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PendingApplications;
