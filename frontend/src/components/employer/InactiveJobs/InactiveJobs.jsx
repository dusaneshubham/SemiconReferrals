import React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableContainer,
} from "@mui/material";
import { image2 } from "../../../images/images";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";

const InactiveJobs = () => {

  const navigate = useNavigate();
  const [inactiveJobs, setInactiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const getInactiveJobs = async () => {
        await axios.post("http://localhost:5000/jobs/getInactiveJobs", { token: token })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              setInactiveJobs(res.data);
            }
            setLoading(false);
          }).catch((err) => {
            console.log(err);
            setLoading(false);
            setAlert({ error: "Something went wrong with server!" });
          })
      }
      getInactiveJobs();
    } else {
      navigate('/');
    }
  }, [navigate]);


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
        <h4>Inactive Jobs</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="text-center">
                <StyledTableCell>Job Title</StyledTableCell>
                <StyledTableCell>Applications</StyledTableCell>
                <StyledTableCell>Deadline</StyledTableCell>
                <StyledTableCell>View Job Post</StyledTableCell>
                <StyledTableCell>View Applications</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inactiveJobs.map((data, index) => (
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
                    {data.numberOfApplications}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDate(data.applicationDeadline)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={"/jobdescription/" + data._id}>
                      <Button variant="contained">
                        View Job Post
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={`/employer/jobapplications/` + data._id}>
                      <Button variant="contained">
                        View Applications
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {inactiveJobs.length === 0 && <StyledTableRow>
                <StyledTableCell colSpan="6" className="text-center text-secondary">
                  There are no Inactive Jobs
                </StyledTableCell>
              </StyledTableRow>}
            </TableBody>
          </Table>
        </TableContainer>

      </>
    );
  }
};

export default InactiveJobs;
