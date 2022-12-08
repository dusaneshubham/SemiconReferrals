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
import Loading from "../../Loading/Loading";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Followers = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [removeFollowerId, setRemoveFollowerId] = useState("");
  const [alert, setAlert] = useState({});
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      await axios.post("http://localhost:5000/recruiter/getFollowers", { token })
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setFollowers(res.data);
          } else {
            setAlert({ error: res.message });
          }
          setLoading(false);
        }).catch((err) => {
          console.log(err);
          window.history.go(-1);
          setLoading(false);
        })
    }

    getData();
  }, [token]);

  const handleClickOpen = (id) => {
    setRemoveFollowerId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setRemoveFollowerId("");
    setOpen(false);
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

  const getDate = (date) => {
    const newDate = new Date(date);
    return newDate.getDate() + " " + newDate.toLocaleString('default', { month: 'long' }) + " " + newDate.getFullYear();
  }

  const unfollow = async () => {
    axios.post("http://localhost:5000/recruiter/removeFollower", { token, candidateId: removeFollowerId })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setFollowers(followers.filter((element) => element.candidate._id !== removeFollowerId));
        } else {
          setAlert({ error: res.message });
        }
      }).catch((err) => {
        console.log(err);
        setAlert({ error: "Something went wrong with server!" });
      })

    setOpen(false);
    setRemoveFollowerId("");
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
        <h4>Your Followers</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Candidate</StyledTableCell>
                <StyledTableCell>Followed On</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {followers.map((element, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <div className="d-flex align-items-center justify-content-center">
                      <div style={{ marginRight: "15px" }}>
                        {element.candidateInfo ?
                          <img src={"http://localhost:5000/profileImage/" + element.candidateInfo.profileImage} width="50" height="50" alt="profileImg" />
                          :
                          <img src={"http://localhost:5000/profileImage/defaultImage.png"} width="50" height="50" alt="profileImg" />
                        }
                      </div>
                      <div>
                        <Link to={"/candidate/viewprofile/" + element.candidate._id} className="text-decoration-none"><div>{element.candidate.name}</div></Link>
                        {element.candidateInfo && <div style={{ color: "var(--text)" }}>{element.candidateInfo.currentJobLocation}</div>}
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{getDate(element.followedOn)}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickOpen(element.candidate._id)}
                      style={{ margin: "10px" }}
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {followers.length === 0 && <StyledTableRow>
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
              Are you sure you want to Remove this candidate from your followings?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={unfollow}>
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

export default Followers;
