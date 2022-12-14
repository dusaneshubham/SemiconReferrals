import React from 'react';
import { Link } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import $ from 'jquery';
import './LoginSignUp.css';
import ForgetPass from './ForgetPass';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';

const LoginSignUp = () => {

    const toggleClass = () => {
        $('#login-modal').toggleClass('d-none');
        $('#signup-modal').toggleClass('d-none');
    }

    const toggleForget = () => {
        $('#login-modal').toggleClass('d-none');
        $('#forget-pass-modal').toggleClass('d-none');
    }

    return (
        <>
            <div className="modal fade" id="loginSignUpModal" tabIndex="-1" aria-labelledby="loginSignUpModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">

                    {/*------------------------ Login ---------------------------------*/}
                    <div className="modal-content" id="login-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginSignUpModalLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Login method={toggleForget} />
                        </div>
                        <div className="modal-footer justify-content-center">
                            Don't you have an account?
                            <Link className="text-decoration-none mx-1" style={{ cursor: "pointer" }} onClick={() => toggleClass()}> Register</Link>
                        </div>
                    </div>

                    {/*------------------------ Sign up ---------------------------------*/}
                    <div className="modal-content d-none" id="signup-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginSignUpModalLabel">Create an account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <SignUp />
                        </div>
                        <div className="modal-footer justify-content-center">
                            Already have an account?
                            <Link className="text-decoration-none mx-1" style={{ cursor: "pointer" }} onClick={() => toggleClass()}> Login </Link>
                        </div>
                    </div>

                    {/* ------------------------- Forget Password ------------------------------ */}
                    <div className="modal-content d-none" id="forget-pass-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginSignUpModalLabel">Forget password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Button variety="outlined" onClick={() => toggleForget()}><ChevronLeftIcon /> Back</Button>
                            <ForgetPass />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginSignUp