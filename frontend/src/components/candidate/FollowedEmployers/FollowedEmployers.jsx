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
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import { Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

const FollowedEmployers = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [recruiter, setRecruiter] = useState([]);
  const [unFollowId, setUnFollowId] = useState("");
  const [loading, setLoading] = useState(true);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (id) => {
    setUnFollowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setUnFollowId("");
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      await axios.post("http://localhost:5000/candidate/getFollowings", { token })
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setRecruiter(res.data);
            setLoading(false);
          } else {
            setAlert({ error: res.message });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Somthing went wrong with server!!" });
          navigate("/");
        });
    }

    getData();
  }, [navigate, token]);

  const unFollow = async () => {

    await axios.post("http://localhost:5000/candidate/unFollowRecruiter", { token, recruiterId: unFollowId })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setRecruiter((data) => data.filter((data) => data.recruiter._id !== unFollowId));
        } else {
          setAlert({ error: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ error: "Somthing went wrong with server!!" });
      });
    setOpen(false);
  }

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

  if (loading) {
    return (
      <>
        <Loading />
      </>);
  } else {
    return (
      <>
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />

        <h4>Your Followed Employers</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell>View Profile</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiter.map((element, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <div className="d-flex align-items-center">
                      <div style={{ marginRight: "15px" }}>
                        <img src={element.companyLogo} width="50" height="50" alt="" />
                      </div>
                      <div>
                        <div>{element.recruiter.name}</div>
                        <div style={{ color: "var(--text)" }}>
                          {element.companyName}
                        </div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={"/employer/viewprofile/" + element.recruiter._id} className="nav-link">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<Visibility />}
                      >
                        View
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickOpen(element.recruiter._id)}
                      style={{ margin: "10px" }}
                      startIcon={<DeleteIcon />}
                    >
                      Unfollow
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {recruiter.length === 0 && <StyledTableRow>
                <StyledTableCell colSpan="3" className="text-center text-secondary">
                  No Profile Found!
                </StyledTableCell>
              </StyledTableRow>}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Remove this Employer from your followings?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => unFollow()}>
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

export default FollowedEmployers;
