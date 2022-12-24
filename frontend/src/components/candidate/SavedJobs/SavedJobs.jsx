import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Paper,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Loading/Loading";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import axios from 'axios';

const SavedJobs = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [job, setJob] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getJob = () => {
      axios.post("http://localhost:5000/candidate/getSaveTheJobPost", { token })
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            setJob(res.data);
            setLoading(false);
          } else {
            setAlert({ error: res.message });
            window.history.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ error: "Something went wrong with server!" });
          window.history.go(-1);
        })
    }

    getJob();
  }, [token])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const getDate = (date) => {
    if (date === "NaN")
      return "NaN";
    const newDate = new Date(date);
    return newDate.getDate() + " " + newDate.toLocaleString('default', { month: 'long' }) + " " + newDate.getFullYear();
  }

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
      </>
    )
  } else {
    return (
      <>
        <AlertPopUp
          alert={alert}
          setAlert={setAlert}
        />
        <h4>Saved Jobs</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>View Job Post</StyledTableCell>
                <StyledTableCell>View Employer Profile</StyledTableCell>
                <StyledTableCell>Last Date to Apply</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {job.length > 0 && (
                job.map((element, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{element.companyName}</StyledTableCell>
                    <StyledTableCell>{element.jobTitle}</StyledTableCell>
                    <StyledTableCell>
                      <Link to={"/jobDescription/" + element._id}>
                        <Button variant="contained">View Job</Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link to={"/employer/viewprofile/" + element.recruiterId}>
                        <Button variant="contained">View Employer Profile</Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{getDate(element.applicationDeadline)}</StyledTableCell>
                  </StyledTableRow>
                ))
              )}
              {job.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan="5" className="text-center text-secondary">You have not saved any Jobs</StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default SavedJobs;
