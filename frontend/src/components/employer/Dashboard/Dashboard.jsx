import React, { useState, useEffect } from "react";
import { image2 } from "../../../images/images";
import StatisticsCard from "../../StatisticsCard/StatisticsCard";
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
} from "@mui/material";
import Loading from "../../Loading/Loading";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import axios from 'axios';

const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [statistic, setStatistics] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");
    const getStatistics = () => {
      axios.post(`http://localhost:5000/recruiter/statistics`, { token })
        .then((res) => res.data)
        .then((res) => {
          if(res.success) {
            setStatistics(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getStatistics();
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

  function createData(jobTitle, status, viewJobPost) {
    return { jobTitle, status, viewJobPost };
  }

  const rows = [createData("Software Developer", "Active", "23 Jan, 2023")];

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
        <div className="d-flex dashboard-cards-div">
          <StatisticsCard
            title="Active Jobs"
            image={image2}
            value={statistic.jobs.active}
            bgColor="#32ac79"
            link="/employer/activejobs"
          />
          <StatisticsCard
            title="Inactive Jobs"
            image={image2}
            value={statistic.jobs.inactive}
            bgColor="#8675ff"
            link="/employer/inactivejobs"
          />
          <StatisticsCard
            title="Pending Job Post"
            image={image2}
            value={statistic.jobs.pending}
            bgColor="#28CFD7"
            link="/employer/pendingjobs"
          />
        </div>

        <h4>Recent Jobs Overview</h4>

        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Job Title</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Deadline</StyledTableCell>
                <StyledTableCell>All Applications</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.jobTitle}>
                  <StyledTableCell>{row.jobTitle}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell>{row.viewJobPost}</StyledTableCell>
                  <StyledTableCell>
                    <Button variant="contained" color="primary">
                      View Applications
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </>
    );
  }
};

export default Dashboard;
