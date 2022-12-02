const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Candidate = require('../models/candidate');
const Company = require('../models/company');
const Recruiter = require('../models/recruiter');
const JobApplication = require('../models/jobApplication');
const JobPost = require('../models/jobPost');
const { isEmail } = require('validator');

// Generate the token
const generateToken = (user) => {
    return jwt.sign({ _id: user._id, type: "admin" }, process.env.SECRETKEY);
}

// TODO : To be removed afterwards
// Register admin
const registerAdmin = asyncHandler(async(req, res) => {
    // const { name, email, password } = req.body;

    // if (!name && !email && !password) {
    //     res.json({ message: "Please fill all details", success: false });
    // } else {
    //     const user = await Admin.findOne({ email });
    //     if (user) {
    //         res.json({ message: "Admin is already exist!!", success: false });
    //     } else {
    //         let hashedPassword = await bcrypt.hash(password, 10);
    //         const newAdmin = new Admin({
    //             name,
    //             email,
    //             password: hashedPassword
    //         });
    //         await newAdmin.save();
    //         res.json({ message: "successfully registered admin!!", success: true });
    //     }
    // }
});

// login admin
const loginAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email && !password) {
        res.json({ message: "Please fill all the details", success: false });
    } else {
        const user = await Admin.findOne({ email });

        if (!user) {
            res.json({ message: "Invalid credentials!", success: false });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                let token = await generateToken(user);
                res.json({ message: "Admin loggedin", success: true, token: token });
            } else {
                res.json({ message: "Invalid credentials!", success: false });
            }

        }
    }
});

// update password
const updatePassword = asyncHandler(async(req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        res.json({ message: "All field are required!", success: false });
    } else if (!isEmail(email)) {
        res.json({ message: "Invalid mail Id!", success: false });
    } else if (password !== confirmPassword) {
        res.json({ message: "Password and Confirm password does not match!", success: false });
    } else {
        const newPassword = await bcrypt.hash(password, 10);
        const updatePassword = await Admin.findOneAndUpdate({ email: email }, { password: password }, { new: true });
        if (updatePassword) {
            res.json({ message: "Your password has been saved!", success: true });
        } else {
            res.json({ message: "Something went wrong during update password!", success: false });
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

const approveRecruiter = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const isExistRecruiter = await Recruiter.findOne({ _id });
    if (isExistRecruiter) {
        const _recruiter = await Recruiter.findOneAndUpdate(_id, { status: "Approved" }, { new: true });
        if (_recruiter) {
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
    const { postId } = req.body;

    const isExistJobPost = await JobPost.findOne({ _id: postId });
    if (isExistJobPost) {
        const updatedData = await JobPost.findOneAndUpdate({ _id: postId }, { status: "Approved" }, { new: true });
        if (updatedData) {
            res.json({ message: "Job Post has been approved !", data: updatedData, success: true });
        } else {
            res.json({ message: "Something went wrong during approval!!", success: false });
        }
    } else {
        res.json({ message: "Incorrect job post id", success: false });
    }
});

const rejectPost = asyncHandler(async(req, res) => {
    const { postId } = req.body;

    const isExistJobPost = await JobPost.findOne({ _id: postId });
    if (isExistJobPost) {
        const deleted = await JobPost.findOneAndDelete({ _id: postId });
        if (deleted) {
            JobPost.aggregate([{
                        $match: {
                            status: "Pending"
                        }
                    },
                    {
                        $lookup: {
                            from: "recruiterinfos",
                            localField: "recruiterId",
                            foreignField: "recruiterId",
                            as: "recruiterinfos"
                        },
                    }
                ]).then((data) => res.json({ message: "Rejected the post!", data: data, success: true }))
                .catch(() => res.json({ message: "Unable to reject the post!", success: false }));
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
    // const numberOfPendingCompany = await Company.find({ status: "Pending" }).count();

    // const numberOfApprovedCompany = await Company.find({ status: "Approved" }).count();

    // const numberOfRejectedCompany = await Company.find({ status: "Rejected" }).count();

    // const numberOfBlockedCompany = await Company.find({ status: "Block" }).count();

    // TODO : thinking
    // Statistics of job application
    const numberOfJobApplication = await JobApplication.find().count()

    const numberOfPendingJobApplication = await JobApplication.find({ isApprovedByAdmin: false }).count();

    // Statistics of job post
    const numberOfApprovedJobPost = await JobPost.find({ status: "Approved" }).count();

    const numberOfPendingJobPost = await JobPost.find({ status: "Pending" }).count();

    const numberOfRejectedJobPost = await JobPost.find({ status: "Rejected" }).count();

    // Statistics of Recruiter
    const numberOfRecruiter = await Recruiter.find().count();

    const data = {
        numberOfCandidate: numberOfCandidate,
        jobApplication: {
            total: numberOfJobApplication,
            pending: numberOfPendingJobApplication,
        },
        jobPost: {
            total: numberOfPendingJobPost + numberOfApprovedJobPost + numberOfRejectedJobPost,
            pending: numberOfPendingJobPost,
            approve: numberOfApprovedJobPost,
            reject: numberOfRejectedJobPost
        },
        numberOfRecruiter: numberOfRecruiter
    };

    res.json({ message: "Statistics", statistics: data });
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
    updatePassword,
    approveCompany,
    approveRecruiter,
    rejectCompany,
    approvePost,
    rejectPost,
    blockCompany,
    unblockCompany,
    approveJobApplication,
    rejectJobApplication,
    getStatistics,
};