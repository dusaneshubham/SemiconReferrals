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
  DialogContent,
  DialogContentText,
  Dialog,
  useMediaQuery,
} from "@mui/material";
import { image2 } from "../../../images/images";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";
// import DownloadIcon from "@mui/icons-material/Download";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const JobApplications = () => {

  const navigate = useNavigate();
  const param = useParams();
  const [applicationData, setApplicationData] = useState([]);
  const [particularData, setParticularData] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpenApplication = (id) => {
    setParticularData(applicationData.filter((element) => {
      return element._id === id;
    })[0]);
    setOpenApplicationDialog(true);
  };

  const handleCloseApplication = () => {
    setParticularData({});
    setOpenApplicationDialog(false);
  };

  const handleClickOpenStatus = (id) => {
    setParticularData(applicationData.filter((element) => {
      return element._id === id;
    })[0]);
    setOpenStatusDialog(true);
  };

  const handleCloseStatus = () => {
    setParticularData({});
    setOpenStatusDialog(false);
  };

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
      const getJobApplications = async () => {
        await axios.post("http://localhost:5000/jobs/getJobApplications/" + param.id)
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              setApplicationData(res.data);
            }
            setLoading(false);
          }).catch((err) => {
            setLoading(false);
            setAlert({ error: "Something went wrong with server!" });
          })
      }
      getJobApplications();
    } else {
      navigate('/');
    }
  }, [navigate, param]);

  const changeStatus = () => {
    axios.post("http://localhost:5000/jobs/changeApplicationStatus/" + particularData._id, { changedStatus: particularData.status })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          handleCloseStatus();
          setAlert({ success: res.message });
        }
        else {
          setAlert({ error: res.message });
        }
      })
      .catch(() => {
        setAlert({ error: "Something went wrong in server!" });
      })
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="text-center">
                <StyledTableCell>Candidate</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Applied On</StyledTableCell>
                <StyledTableCell>View Application Details</StyledTableCell>
                <StyledTableCell>Change Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationData.length > 0 && (
                applicationData.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <div className="d-flex align-items-center">
                        <div style={{ marginRight: "15px" }}>
                          <img src={image2} width="50" height="50" alt="" style={{ marginRight: "10px" }} />
                          {data.candidate[0].name}
                        </div>
                        <div>
                          <div className="text-orange">{data.jobTitle}</div>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{data.status}</StyledTableCell>
                    <StyledTableCell>{formatDate(data.createdAt)}</StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" onClick={() => handleClickOpenApplication(data._id)}>
                        View Application Details
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" onClick={() => handleClickOpenStatus(data._id)} >
                        Change Status
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
              {applicationData.length === 0 && <StyledTableRow>
                <StyledTableCell colSpan="5" className="text-center text-secondary">
                  No applications for this job yet
                </StyledTableCell>
              </StyledTableRow>}
            </TableBody>
          </Table>
        </TableContainer>


        {/* ----------------- Application Details Dialog ------------------- */}
        <Dialog
          fullScreen={fullScreen}
          open={openApplicationDialog}
          onClose={handleCloseApplication}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              <div className="d-flex align-items-center" style={{ minWidth: "500px" }}>
                <div>
                  <img src={image2} alt="" width="100" height="100" />
                </div>
                {particularData.candidate && (
                  <div className="d-flex flex-column px-4">
                    <span>{particularData.candidate[0].name}</span>
                    <span className="mt-2 mb-3" style={{ color: "var(--text)" }}><MailOutlineIcon />{particularData.candidate[0].email}</span>
                    <Link to={`/candidate/viewprofile/${particularData.candidate[0]._id}`}>
                      <Button variant="contained">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="text-center mt-5">
                {particularData.resume && (
                  <a href={particularData.resume.url} rel="noreferrer" target="_blank">
                    <button className="main-btn main-btn-link w-100">
                      View Resume
                    </button>
                  </a>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        {/* --------------------- Status change Dialog ----------------------- */}
        <Dialog
          fullScreen={fullScreen}
          open={openStatusDialog}
          onClose={handleCloseStatus}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              {particularData.status && (
                <div style={{ minWidth: "500px" }}>
                  <label htmlFor="status">Status</label>
                  <select class="form-select" value={particularData.status} aria-label="Default select" onChange={(e) => setParticularData({ ...particularData, status: e.target.value })}>
                    <option value="Pending">Pending</option>
                    <option value="Shortlist">Shortlist</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              )}
              <div className="text-center mt-5">
                <button className="main-btn main-btn-link w-100" onClick={changeStatus}>
                  Change Status
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>

      </>
    );
  }
};

export default JobApplications;