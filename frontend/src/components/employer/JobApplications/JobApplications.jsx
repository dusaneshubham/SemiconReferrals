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
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AlertPopUp from "../../AlertPopUp/AlertPopUp";
import Loading from "../../Loading/Loading";

const JobApplications = () => {

  const navigate = useNavigate();
  const param = useParams();
  const [applicationData, setApplicationData] = useState([]);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const formatDate = (anyDate) => {
    let fullDate = new Date(anyDate);
    const month = fullDate.toLocaleString("en-US", { month: "short" });
    const date = fullDate.getDate();
    const year = fullDate.getFullYear();
    return `${month}. ${date}, ${year}`;
  };
  
  const handleClickOpenApplication = () => {
    setOpenApplicationDialog(true);
  };

  const handleClose = () => {
    setOpenApplicationDialog(false);
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
        await axios.post("http://localhost:5000/jobs/getJobApplications/" + param.id, { token: token })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              console.log(res.data);
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
        <h4>Applications for Software Developer</h4>
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
                          <img src={image2} width="50" height="50" alt="" style={{marginRight:"10px"}} />
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
                      <Link>
                        <Button variant="contained" onclick={handleClickOpenApplication}>
                          View Application Details
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link>
                        <Button variant="contained">
                          Change Status
                        </Button>
                      </Link>
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

        <Dialog
          fullScreen={fullScreen}
          open={openApplicationDialog}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Delete this Job Post?
            </DialogContentText>
          </DialogContent>
        </Dialog>

      </>
    );
  }
};

export default JobApplications;
