import React , { useState, useEffect } from "react";
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
import Loading from "../../Loading/Loading";
import AlertPopUp from "../../AlertPopUp/AlertPopUp";

const Followers = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
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

  function createData(location, employerName, followedOn, remove) {
    return {
      location,
      employerName,
      followedOn,
      remove,
    };
  }

  const rows = [createData("Ahmedabad", "Shubham Dusane", "23 Jan, 2021")];

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
        <h4>Your Followers</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Candidate</StyledTableCell>
                <StyledTableCell>Followed On</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.employerName}>
                  <StyledTableCell>
                    <div className="d-flex align-items-center">
                      <div style={{ marginRight: "15px" }}>
                        <img src={image2} width="50" height="50" alt="" />
                      </div>
                      <div>
                        <div>{row.employerName}</div>
                        <div style={{ color: "var(--text)" }}>{row.location}</div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{row.followedOn}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClickOpen}
                      style={{ margin: "10px" }}
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
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
  }
};

export default Followers;
