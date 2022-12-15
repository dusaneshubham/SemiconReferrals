import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { image4 } from '../images/images';
import './css/email-verification.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { isEmail } from 'validator';
import AlertPopUp from '../components/AlertPopUp/AlertPopUp';
import { Button } from "@mui/material";

function UpdateBusinessEmail() {

    const [alert, setAlert] = useState({
        error: "",
        success: ""
    });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const param = useParams();
    const token = param.token;

    useEffect(() => {

        const callback = async () => {
            if (!token) {
                setAlert({ error: "Error!! Invalid token!" });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                await axios.post('http://localhost:5000/verify-token', { token })
                    .then((res) => res.data)
                    .then(async (res) => {
                        if (!res.success) {
                            setAlert({ error: res.message });
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ error: "Something went wrong with server!!" });
                        setTimeout(() => {
                            navigate('/');
                        }, 2000);
                    })
            }
        }
        callback();
    }, [navigate, token]);

    const submit = async () => {
        setLoading(true);

        axios.post("http://localhost:5000/candidate/updateEmailId", { token, email: email })
            .then((res) => res.data)
            .then((res) => {
                if (res.success) {
                    setAlert({ success: res.message });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setAlert({ error: res.message });
                }
            })
            .catch((err) => {
                console.log(err);
                setAlert({ error: "Something went wrong with server!" });
            });

        setLoading(false);
    }

    return (
        <>
            {/* ---------------------- alert ---------------------- */}
            <AlertPopUp
                alert={alert}
                setAlert={setAlert}
            />
            {/* --------------------------------------------------- */}
            <div className="w-100 h-100 d-flex justify-content-center align-content-around">
                <div className="container-fluid bg-light w-50 mt-5 p-3">
                    <img src={image4} alt="company logo" className="img-fluid" height="300" width="300" /><hr />
                    <h6 className="responsive-text text-center">Update Business Mail Id</h6>
                    {/*--------------------- BackUp Email ---------------------*/}
                    <div className="col-md-12">
                        <label htmlFor="linkedin-link" className="form-label">
                            Backup Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="form-control"
                            id="linkedin-link"
                        />
                    </div>

                    <div className="text-center">
                        {isEmail(email) ?
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                loadingIndicator="Loading…"
                                onClick={() => submit()}
                                className="responsive-text"
                                color="success"
                            >
                                Update Email
                            </LoadingButton>
                            :
                            <Button disabled>
                                Update Email
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateBusinessEmail