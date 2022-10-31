const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const candidate = require('../models/candidate');
const company = require('../models/company');
const hr = require('../models/hr');
const jobApplication = require('../models/jobApplication');
const jobPost = require('../models/jobPost');

// Register admin
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        res.json({ message: "Please fill all details", status: "error" });
    } else {
        const user = await admin.findOne({ email: email });
        if (user) {
            res.json({ message: "Admin is already exist!!", status: "error" });
        } else {
            let hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new admin({
                name: name,
                email: email,
                password: hashedPassword
            });
            await newAdmin.save();
            res.json({ message: "successfully registered admin!!", status: "success" });
        }
    }
});

// login admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email && !password) {
        res.json({ message: "Please fill all the details", status: "error" });
    } else {
        const user = await admin.findOne({ email: email });

        if (!user) {
            res.json({ message: "Incorrect username or password", status: "error" });
        } else {

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                res.json({ message: "Admin loggedin", status: "success", user: user });
            } else {
                res.json({ message: "Incorrect username or password", status: "error" });
            }

        }
    }
});

const approveCompany = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const isExistCompany = await company.findOne({ id: _id });
    if (isExistCompany) {
        const _company = await company.findByIdAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during approval!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect company id", status: "error" });
    }
});

const rejectCompany = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const isExistCompany = await company.findOne({ id: _id });
    if (isExistCompany) {
        const _company = await company.findByIdAndUpdate(_id, { status: "Rejected" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during rejection!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect company id", status: "error" });
    }
});

const approvePost = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const isExistJobPost = await jobPost.findOne({ id: _id });
    if (isExistJobPost) {
        const _company = await jobPost.findByIdAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during approval!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect job post id", status: "error" });
    }
});

const rejectPost = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const isExistJobPost = await jobPost.findOne({ id: _id });
    if (isExistJobPost) {
        const _company = await jobPost.findByIdAndUpdate(_id, { status: "Rejected" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during rejection!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect job post id", status: "error" });
    }
});

const blockCompany = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const isExistCompany = await company.findOne({ id: _id });
    if (isExistCompany) {
        const _company = await company.findByIdAndUpdate(_id, { status: "Blocked" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during blocking!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect company id", status: "error" });
    }
});

const unblockCompany = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const isExistCompany = await company.findOne({ id: _id });
    if (isExistCompany) {
        const _company = await company.findByIdAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during unblocking!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect company id", status: "error" });
    }
});

const getStatistics = asyncHandler(async (req, res) => {
    const numberOfCandidate = await candidate.find().count();

    // Statistics of company
    const numberOfPendingCompany = await company.find({ status: "Pending" }).count();

    const numberOfApprovedCompany = await company.find({ status: "Approved" }).count();

    const numberOfRejectedCompany = await company.find({ status: "Rejected" }).count();

    const numberOfBlockedCompany = await company.find({ status: "Block" }).count();

    // Statistics of job application
    const numberOfPendingJobApplication = await jobApplication.find({ status: "Pending" }).count();

    const numberOfRejectedJobApplication = await jobApplication.find({ status: "Rejected" }).count();

    const numberOfHiredJobApplication = await jobApplication.find({ status: "Hired" }).count();

    // Statistics of job post
    const numberOfApprovedJobPost = await jobPost.find({ status: "Approved" }).count();

    const numberOfPendingJobPost = await jobPost.find({ status: "Pending" }).count();

    const numberOfRejectedJobPost = await jobPost.find({ status: "Rejected" }).count();

    // Statistics of Hr
    const numberOfActiveHr = await hr.find({ isActive: true }).count();

    const numberOfBlockHr = await hr.find({ isActive: false }).count();

    const data = {
        message: "Statistics",
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

    res.json(data);
});

const approvedJobApplication = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const newPost = await post.findByIdAndUpdate(_id, { isApprovedByAdmin: true }, { new: true });
    if (newPost) {
        res.json({ message: "successfully updated status", status: "success" });
    } else {
        res.json({ message: "Incorrect post id!!", status: "error" });
    }
});

const rejectJobApplication = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const newPost = await post.findByIdAndUpdate(_id, { isApprovedByAdmin: false }, { new: true });
    if (newPost) {
        res.json({ message: "successfully updated status", status: "success" });
    } else {
        res.json({ message: "Incorrect post id!!", status: "error" });
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
    approvedJobApplication,
    rejectJobApplication,
    getStatistics
};