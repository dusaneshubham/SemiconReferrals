import React, { useState } from "react";
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
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const MyResumes = () => {
  const [open, setOpen] = useState(false);
  const [resume, setResume] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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

  function createData(resumeName, download, deleteResume) {
    return {
      resumeName,
      download,
      deleteResume,
    };
  }

  let rows = [];

  axios
    .get("http://localhost:5000/candidate/getAllMyResumes")
    .then((response) => {
      let images = response.data.images;
      rows.push(images.map((image) => {
        return createData(image);
      }))
    })
    .catch(() => { });
  // const rows = [
  //   createData("Shubham_Dusane.pdf"),
  //   createData("Shubham_Dusane_Resume.pdf"),
  // ];

  // Resume sending to backend to upload
  const uploadResume = (e) => {
    let token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("token", token);
    axios
      .post("http://localhost:5000/candidate/uploadMyResume", formData)
      .then(() => { })
      .catch(() => { });
  };

  return (
    <>
      <h4>Your Uploaded Resumes</h4>
      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
        name="resume"
        id=""
      />
      <button onClick={uploadResume}>Upload</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Download</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <StyledTableRow key={row.employerName}>
                  <StyledTableCell>{row.resumeName}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="success"
                      style={{ margin: "10px" }}
                    >
                      <DownloadIcon style={{ marginRight: "5px" }} /> Download
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClickOpen}
                      style={{ margin: "10px" }}
                    >
                      <DeleteIcon style={{ marginRight: "5px" }} /> Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
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
            Are you sure you want to Delete this Resume?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
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

export default MyResumes;
