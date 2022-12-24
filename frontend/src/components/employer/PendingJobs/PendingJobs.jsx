import React from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { image2 } from "../../../images/images";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";

const PendingJobs = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const [pendingJobs, setPendingJobs] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const formatDate = (anyDate) => {
    let fullDate = new Date(anyDate);
    const month = fullDate.toLocaleString("en-US", { month: "short" });
    const date = fullDate.getDate();
    const year = fullDate.getFullYear();
    return `${month}. ${date}, ${year}`;
  };

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setDeleteId("");
    setOpenDialog(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getPendingJobs = async () => {
        await axios.post("http://localhost:5000/jobs/getRecruiterPendingJobs", { token: token })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              setPendingJobs(res.data);
            }
            setLoading(false);
          }).catch((err) => {
            console.log(err);
            setLoading(false);
            setAlert({ error: "Something went wrong with server!" });
          })
      }
      getPendingJobs();
    } else {
      navigate('/');
    }
  }, [navigate]);


  const deleteJobPost = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://localhost:5000/jobs/deleteJobPost", { token: token, jobPostId: deleteId })
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setPendingJobs(pendingJobs.filter((element) => element._id !== deleteId));
            handleClose();
            setAlert({ success: res.message });
          }
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
          setAlert({ error: "Something went wrong with server!" });
        })
    }
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
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />
        <h4>Pending Jobs</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="text-center">
                <StyledTableCell>Job Title</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Deadline</StyledTableCell>
                <StyledTableCell>View Job Post</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingJobs.map((data, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <div className="d-flex align-items-center">
                      <div style={{ marginRight: "15px" }}>
                        <img src={image2} width="50" height="50" alt="" />
                      </div>
                      <div>
                        <div className="text-orange">{data.jobTitle}</div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDate(data.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDate(data.applicationDeadline)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={"/jobdescription/" + data._id}>
                      <Button variant="contained" style={{ marginRight: "20px" }}>
                        View Job Post
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickOpen(data._id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {pendingJobs.length === 0 && <StyledTableRow>
                <StyledTableCell colSpan="6" className="text-center text-secondary">
                  There are no Pending Jobs
                </StyledTableCell>
              </StyledTableRow>}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Delete this Job Post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={deleteJobPost}>
              Yes
            </Button>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

      </>
    );
  }
};

export default PendingJobs;