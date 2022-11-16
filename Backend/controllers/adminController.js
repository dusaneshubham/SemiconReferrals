const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Candidate = require('../models/candidate');
const Company = require('../models/company');
const HR = require('../models/hr');
const JobApplication = require('../models/jobApplication');
const JobPost = require('../models/jobPost');

// TODO : To be removed afterwards
// Register admin
const registerAdmin = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        res.json({ message: "Please fill all details", success: false });
    } else {
        const user = await Admin.findOne({ email });
        if (user) {
            res.json({ message: "Admin is already exist!!", success: false });
        } else {
            let hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({
                name,
                email,
                password: hashedPassword
            });
            await newAdmin.save();
            res.json({ message: "successfully registered admin!!", success: true });
        }
    }
});

// login admin
const loginAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email && !password) {
        res.json({ message: "Please fill all the details", success: false });
    } else {
        const _user = await Admin.findOne({ email });

        if (!_user) {
            res.json({ message: "Invalid credentials!", success: false });
        } else {

            const isPasswordCorrect = await Admin.authenticate(password);
            if (isPasswordCorrect) {
                res.json({ message: "Admin loggedin", success: true, data: { email } });
            } else {
                res.json({ message: "Invalid credentials!", success: false });
            }

        }
    }
});

const approveCompany = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistCompany = await Company.findOne({ _id });
    if (isExistCompany) {
        const _company = await Company.findOneAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", success: true });
        } else {
            res.json({ message: "Something went wrong during approval!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect company id", success: false });
    }
});

const rejectCompany = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistCompany = await Company.findOne({ _id });
    if (isExistCompany) {
        const _company = await Company.findOneAndUpdate(_id, { status: "Rejected" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", success: true });
        } else {
            res.json({ message: "Something went wrong during rejection!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect company id", success: false });
    }
});

const approvePost = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistJobPost = await JobPost.findOne({ _id });
    if (isExistJobPost) {
        const _company = await JobPost.findOneAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", success: true });
        } else {
            res.json({ message: "Something went wrong during approval!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect job post id", success: false });
    }
});

const rejectPost = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistJobPost = await JobPost.findOne({ _id });
    if (isExistJobPost) {
        const _company = await JobPost.findOneAndUpdate(_id, { status: "Rejected" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", success: true });
        } else {
            res.json({ message: "Something went wrong during rejection!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect job post id", success: false });
    }
});

const blockCompany = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistCompany = await Company.findOne({ _id });
    if (isExistCompany) {
        const _company = await Company.findOneAndUpdate(_id, { status: "Blocked" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", success: true });
        } else {
            res.json({ message: "Something went wrong during blocking!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect company id", success: false });
    }
});

const unblockCompany = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistCompany = await Company.findOne({ id: _id });
    if (isExistCompany) {
        const _company = await Company.findOneAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", success: true });
        } else {
            res.json({ message: "Something went wrong during unblocking!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect company id", success: false });
    }
});

const getStatistics = asyncHandler(async(req, res) => {
    const numberOfCandidate = await Candidate.find().count();

    // Statistics of company
    const numberOfPendingCompany = await Company.find({ status: "Pending" }).count();

    const numberOfApprovedCompany = await Company.find({ status: "Approved" }).count();

    const numberOfRejectedCompany = await Company.find({ status: "Rejected" }).count();

    const numberOfBlockedCompany = await Company.find({ status: "Block" }).count();

    // TODO : thinking
    // Statistics of job application
    const numberOfPendingJobApplication = await JobApplication.find({ status: "Pending" }).count();

    const numberOfRejectedJobApplication = await JobApplication.find({ status: "Rejected" }).count();

    const numberOfHiredJobApplication = await JobApplication.find({ status: "Hired" }).count();

    // Statistics of job post
    const numberOfApprovedJobPost = await JobPost.find({ status: "Approved" }).count();

    const numberOfPendingJobPost = await JobPost.find({ status: "Pending" }).count();

    const numberOfRejectedJobPost = await JobPost.find({ status: "Rejected" }).count();

    // Statistics of Hr
    const numberOfActiveHr = await HR.find({ isActive: true }).count();

    const numberOfBlockHr = await HR.find({ isActive: false }).count();

    const data = {
        numberOfCandidate: numberOfCandidate,
        company: {
            total: numberOfPendingCompany + numberOfApprovedCompany + numberOfRejectedCompany + numberOfBlockedCompany,
            pending: numberOfPendingCompany,
            approved: numberOfApprovedCompany,
            reject: numberOfRejectedCompany,
            blocked: numberOfBlockedCompany
        },
        jobApplication: {
            total: numberOfPendingJobApplication + numberOfRejectedJobApplication + numberOfHiredJobApplication,
            pending: numberOfPendingJobApplication,
            rejected: numberOfRejectedJobApplication,
            hired: numberOfHiredJobApplication
        },
        jobPost: {
            total: numberOfPendingJobPost + numberOfApprovedJobPost + numberOfRejectedJobPost,
            pending: numberOfPendingJobPost,
            approve: numberOfApprovedJobPost,
            reject: numberOfRejectedJobPost
        },
        hr: {
            total: numberOfActiveHr + numberOfBlockHr,
            active: numberOfActiveHr,
            block: numberOfBlockHr
        }
    };

    res.json({ message: "Statistics", data });
});

const approveJobApplication = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const newPost = await JobPost.findOneAndUpdate(_id, { isApprovedByAdmin: true }, { new: true });
    if (newPost) {
        res.json({ message: "successfully updated status", success: true });
    } else {
        res.json({ message: "Incorrect post id!!", success: false });
    }
});

const rejectJobApplication = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const newPost = await post.findOneAndUpdate(_id, { isApprovedByAdmin: false }, { new: true });
    if (newPost) {
        res.json({ message: "successfully updated status", success: true });
    } else {
        res.json({ message: "Incorrect post id!!", success: false });
    }
});

module.exports = {
    registerAdmin,
    loginAdmin,
    approveCompany,
    rejectCompany,
    approvePost,
    rejectPost,
    blockCompany,
    unblockCompany,
    approveJobApplication,
    rejectJobApplication,
    getStatistics
};