import React from 'react';
import './Footer.css';
import { image4 } from '../../images/images';
import { Link } from 'react-router-dom';

const Footer = () => {

    let year = new Date().getFullYear();

    return (
        <>
            <div className="footer">
                <div className="footer-head">
                    <div className="f-col f-col-1">
                        <img className="mb-3" src={image4} alt="site logo" height={70} width={220} />
                    </div>
                    <div className="f-col">
                        <h5 className="my-3">Candidates</h5>
                        <div className="list-unstyled mt-3">
                            <ul className="list-unstyled mt-3">
                                <li><Link to="/search" className="footer-link">Search Jobs</Link></li>
                                <li><Link to="/recruiters" className="footer-link">All Employers</Link></li>
                                <li><Link to="/blog" className="footer-link">Blogs</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="f-col">
                        <h5 className="my-3">Recruiters</h5>
                        <div className="list-unstyled mt-3">
                            <ul className="list-unstyled mt-3">
                                <li><Link to="/postjob" className="footer-link">Post a Job</Link></li>
                                <li><Link to="/candidates" className="footer-link">Search Candidates</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="f-col">
                        <h5 className="my-3">Company</h5>
                        <div className="list-unstyled mt-3">
                            <ul className="list-unstyled mt-3">
                                <li><Link to="/postjob" className="footer-link">Privacy Policy</Link></li>
                                <li><Link to="/candidates" className="footer-link">Terms of Use</Link></li>
                                <li><Link to="/candidates" className="footer-link">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="footer-bottom px-4">
                    <div className="div-1">
                        <p>&copy; {year} Semicon Referrals. All Right Reserved.</p>
                    </div>
                    <div className="div-2 my-1">
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