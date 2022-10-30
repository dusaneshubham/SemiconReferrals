const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const company = require('../models/company');
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
        const _company = await company.findByIdAndUpdate(_id, { isActive: true }, { new: true });
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
        const _company = await company.findByIdAndUpdate(_id, { isActive: false }, { new: true });
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
        const _company = await jobPost.findByIdAndUpdate(_id, { status: "Reject" }, { new: true });
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
        const _company = await company.findByIdAndUpdate(_id, { isBlock: true }, { new: true });
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
        const _company = await company.findByIdAndUpdate(_id, { isBlock: false }, { new: true });
        if (_company) {
            res.json({ message: "successfully updated status!", status: "success" });
        } else {
            res.json({ message: "Something went wrong during unblocking!!", status: "error" });
        }
    } else {
        res.json({ message: "Incorrect company id", status: "error" });
    }
});

// TODO 
/* Approve / Reject the job application by candidate
Dashboard / Statistics
View company details
View candidate details */

module.exports = { registerAdmin, loginAdmin, approveCompany, rejectCompany, approvePost, rejectPost, blockCompany, unblockCompany };