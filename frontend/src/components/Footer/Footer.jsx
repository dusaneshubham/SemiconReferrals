import React from 'react';
import './Footer.css';
import SiteLogo from '../../images/logo-semiconreferrals-rectangle.png';

const Footer = () => {

    let year = new Date().getFullYear();

    return (
        <>
            <div className="footer">
                <div className="footer-head">
                    <div className="f-col f-col-1">
                        <img className="mb-3" src={SiteLogo} alt="site logo" height={70} width={220} />
                        <h5>Call us <br /> 123 456 789</h5>
                        <h6>328 Queensberry Street, North Melbourne VIC 3051, Australia.</h6>
                        <h6>support@superio.com</h6>
                    </div>
                    <div className="f-col">
                        <h5 className="my-3">Find Jobs</h5>
                        <ul className="list-unstyled mt-3">
                            <li>Browse Jobs</li>
                            <li>Browse Candidates</li>
                            <li>Candidate Dashboard</li>
                            <li>Job Alerts</li>
                            <li>My Bookmarks</li>
                        </ul>
                    </div>
                    <div className="f-col">
                        <h5 className="my-3">Frequently Asked Questions</h5>
                        <div className="left-col float-start">
                            <ul className="list-unstyled">
                                <li>Site Map</li>
                                <li>Terms of Use</li>
                                <li>Privacy Center</li>
                                <li>Security Center</li>
                                <li>Accessibility Center</li>
                            </ul>
                        </div>
                        <div className="right-col float-end">
                            <ul className="list-unstyled">
                                <li>Contact Us</li>
                                <li>About Us</li>
                                <li>Terms</li>
                                <li>Packages</li>
                                <li>FAQ</li>
                            </ul>
                        </div>

                    </div>
                    <div className="f-col">
                        <h5 className="my-3">Join Us On</h5>
                        <h6>WE don't send spam so don't worry.</h6>
                        <form action="" className="my-2 form d-flex justify-content-center">
                            <input className="input w-75" type="email" name="email" id="email" placeholder="Your e-mail" required />
                            <button type="submit" className="sbm-btn">
                                <i className="bi bi-envelope"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="footer-bottom">
                    <div className="float-start div-1">
                        <p>&copy; {year} Semicon Referrals. All Right Reserved.</p>
                    </div>
                    <div className="float-end div-2">
                        <i className="bi bi-facebook mx-4"></i>
                        <i className="bi bi-twitter mx-4"></i>
                        <i className="bi bi-instagram mx-4"></i>
                        <i className="bi bi-linkedin mx-4"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;