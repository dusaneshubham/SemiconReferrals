import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Button
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import axios from "axios";

const AppliedJobs = () => {

  const [jobApplications, setJobApplications] = useState([]);

  // getting all the job applications
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://localhost:5000/candidate/getAllJobApplications", { token })
        .then((response) => response.data)
        .then((res) => {
          if (res.success) {
            setJobApplications(res.data);
          }
          else {
            console.log(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);

  const formatDate = (anyDate) => {
    let fullDate = new Date(anyDate);
    const month = fullDate.toLocaleString("en-US", { month: "short" });
    const date = fullDate.getDate();
    const year = fullDate.getFullYear();
    return `${month}. ${date}, ${year}`;
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


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>View Job Post</StyledTableCell>
              <StyledTableCell>View Employer Profile</StyledTableCell>
              <StyledTableCell>Applied On</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ---------------------- Table Data Rows --------------------- */}
            {jobApplications.length > 0 &&
              jobApplications.map((data, index) => (
                <StyledTableRow key={index}>

                  <StyledTableCell>{data.jobPostId.companyName}</StyledTableCell>
                  <StyledTableCell>{data.jobPostId.jobTitle}</StyledTableCell>
                  
                  {/* ------------------- View Job Post Btn ------------------ */}
                  <StyledTableCell>
                    <Button variant="contained" href={`/jobdescription/${data.jobPostId._id}`}>
                      View
                    </Button>
                  </StyledTableCell>

                  {/* ------------------- View Employer Profile Btn ------------------ */}
                  <StyledTableCell>
                    <Button variant="contained" href={`/employer/viewprofile/${data.jobPostId.recruiterId}`}>
                      View
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell>{formatDate(data.createdAt)}</StyledTableCell>
                  <StyledTableCell>{(data.status === "Pending" || "Approved") ? "In Progress" : data.status}</StyledTableCell>
                  
                </StyledTableRow>
              ))}
            {jobApplications.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan="6" className="text-center text-secondary">
                  No Applications found!
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppliedJobs;