import React from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";

const AppliedJobs = () => {
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
    title,
    viewJobPost,
    employerProfile,
    appliedDate,
    status
  ) {
    return {
      companyName,
      title,
      viewJobPost,
      employerProfile,
      appliedDate,
      status,
    };
  }

  const rows = [
    createData(
      "Google",
      "Senior Software Developer",
      "View",
      "View",
      "Nov 23, 2022",
      "Pending"
    ),
  ];

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
            {rows.map((row) => (
              <StyledTableRow key={row.employerName}>
                <StyledTableCell>{row.companyName}</StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>
                  <Link>{row.viewJobPost}</Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link>{row.employerProfile}</Link>
                </StyledTableCell>
                <StyledTableCell>{row.appliedDate}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppliedJobs;
