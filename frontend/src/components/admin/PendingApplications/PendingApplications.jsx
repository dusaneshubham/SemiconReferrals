import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import {Link} from 'react-router-dom';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";

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

  function createData(
    companyName,
    employerName,
    candidateName,
    resume,
    jobPost
  ) {
    return { companyName, employerName, candidateName, resume, jobPost };
  }

  const rows = [
    createData(
      "Google",
      "Shubham Dusane",
      "Denis Shingala",
      "View",
      "View"
    ),
  ];

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
              <StyledTableCell>Employer Name</StyledTableCell>
              <StyledTableCell>Candidate Name</StyledTableCell>
              <StyledTableCell>View Resume</StyledTableCell>
              <StyledTableCell>View Job Post</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.employerName}>
                <StyledTableCell>{row.companyName}</StyledTableCell>
                <StyledTableCell>{row.employerName}</StyledTableCell>
                <StyledTableCell>{row.candidateName}</StyledTableCell>
                <StyledTableCell>
                  <Link> {row.resume} </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link> {row.jobPost} </Link>
                </StyledTableCell>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickOpenApproval}
                  style={{ margin: "10px" }}
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
              </StyledTableRow>
            ))}
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
