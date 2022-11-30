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
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import axios from "axios";

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

  useEffect(() => {
    // fetch pending jobs
    axios
      .get("http://localhost:5000/jobs/getPendingJobs")
      .then((res) => res.data)
      .then((response) => {
        console.log(response.data);
        if (response.success) {
          setPendingJobs(response.data);
        } else {
          console.log(response.message);
          // setAlert({ error: response.message });
          // TODO: redirect path
        }
      })
      .catch((err) => {
        console.log(err);
        // setAlert({ error: "Something went wrong with server!" });
      });
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

  // function createData(companyName, employerProfile, viewJobPost) {
  //   return { companyName, employerProfile, viewJobPost };
  // }

  // const rows = [createData("Google", "View", "View")];

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
              <StyledTableCell>Employer Profile</StyledTableCell>
              <StyledTableCell>View Job Post</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingJobs.map((data, index) => (
              <StyledTableRow key={data._id}>
                <StyledTableCell>{data.companyName}</StyledTableCell>
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
                </StyledTableCell>
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
            Are you sure you want to <b>Approve</b> this job post?
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
            Are you sure you want to <b>Reject</b> this job post?
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

export default PendingPost;
