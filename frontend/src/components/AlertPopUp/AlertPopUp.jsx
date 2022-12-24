import React from 'react';
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

const AlertPopUp = (prop) => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // const Transition = (props) => {
    //     return <Slide {...props} direction="down" />;
    // };

    function GrowTransition(props) {
        return <Grow {...props} />;
    }

    const handleClose = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }
        prop.setAlert({});
    };

    return (
        <>
            <Snackbar
                autoHideDuration={2000}
                open={prop.alert.error ? true : false}
                TransitionComponent={GrowTransition}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="error" onClose={handleClose}>
                    <span className="my-alert">{prop.alert.error}</span>
                </Alert>
            </Snackbar>
            <Snackbar
                autoHideDuration={2000}
                open={prop.alert.success ? true : false}
                TransitionComponent={GrowTransition}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" onClose={handleClose}>
                    <span className="my-alert">{prop.alert.success}</span>
                </Alert>
            </Snackbar>
        </>
    )
}

export default AlertPopUp