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

const SavedCandidates = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [candidates, setCandidates] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteId("");
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

  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const getData = async () => {
        await axios.post("http://localhost:5000/recruiter/getSavedCandidate", { token: token })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              setCandidates(res.data.saveProfile);
            } else {
              // setAlert({ error: res.message });
            }
          }).catch((err) => {
            console.log(err);
            // setAlert({ error: "Something went wrong with server!" });
          })
      }

      getData();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const removeProfile = () => {
    axios.post("http://localhost:5000/recruiter/removeSavedCandidate", { token: token, id: deleteId })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          setCandidates(res.data.saveProfile);
        } else {
          console.log(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    setOpen(false);
  }

  return (
    <>
      <h4>Your Saved Candidates</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Candidate</StyledTableCell>
              <StyledTableCell>Followed On</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((element, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <div className="d-flex align-items-center">
                    <div style={{ marginRight: "15px" }}>
                      <img src={image2} width="50" height="50" alt="" />
                    </div>
                    <div>
                      <div className="text-orange">{element.name}</div>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <Link to={"/candidate/viewprofile/" + element._id} className="nav-link">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                      View Profile
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClickOpen(element._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {candidates.length === 0 && <StyledTableRow>
              <StyledTableCell colSpan="3" className="text-center text-secondary">
                No data found!
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
          <Button autoFocus onClick={removeProfile}>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SavedCandidates;
