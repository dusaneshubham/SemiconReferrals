import React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Paper,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableContainer
} from "@mui/material";
import { Link } from "react-router-dom";

const SavedJobs = () => {
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
    deadline
  ) {
    return { companyName, title, viewJobPost, employerProfile, deadline };
  }

  const rows = [
    createData("Adobe Inc.", "Software Developer", "View", "View", "Dec 10, 2022")
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
              <StyledTableCell>Last Date to Apply</StyledTableCell>
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
                <StyledTableCell>{row.deadline}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SavedJobs;
