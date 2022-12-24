const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Candidate = require("../models/candidate");
const Recruiter = require("../models/recruiter");
const JobApplication = require("../models/jobApplication");
const JobPost = require("../models/jobPost");
const { isEmail } = require("validator");

// Generate the token
const generateToken = (user) => {
    return jwt.sign({ _id: user._id, type: "admin" }, process.env.SECRETKEY);
};

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
        res.json({
            message: "Password and Confirm password does not match!",
            success: false,
        });
    } else {
        const newPassword = await bcrypt.hash(password, 10);
        const updatePassword = await Admin.findOneAndUpdate({ email: email }, { password: password }, { new: true });
        if (updatePassword) {
            res.json({ message: "Your password has been saved!", success: true });
        } else {
            res.json({
                message: "Something went wrong during update password!",
                success: false,
            });
        }
    }
});

const approvePost = asyncHandler(async(req, res) => {
    const { postId } = req.body;

    const isExistJobPost = await JobPost.findOne({ _id: postId });
    if (isExistJobPost) {
        const updatedData = await JobPost.findOneAndUpdate({ _id: postId }, { status: "Approved", isActive: true }, { new: true });
        if (updatedData) {
            JobPost.aggregate([{
                        $match: {
                            status: "Pending",
                        },
                    },
                    {
                        $lookup: {
                            from: "recruiterinfos",
                            localField: "recruiterId",
                            foreignField: "recruiterId",
                            as: "recruiterinfos",
                        },
                    },
                ])
                .then((data) =>
                    res.json({ message: "Approved the post!", data: data, success: true })
                )
                .catch(() =>
                    res.json({ message: "Unable to approve the post!", success: false })
                );
        } else {
            res.json({
                message: "Something went wrong during approval!!",
                success: false,
            });
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
                            status: "Pending",
                        },
                    },
                    {
                        $lookup: {
                            from: "recruiterinfos",
                            localField: "recruiterId",
                            foreignField: "recruiterId",
                            as: "recruiterinfos",
                        },
                    },
                ])
                .then((data) =>
                    res.json({ message: "Rejected the post!", data: data, success: true })
                )
                .catch(() =>
                    res.json({ message: "Unable to reject the post!", success: false })
                );
        } else {
            res.json({
                message: "Something went wrong during rejection!!",
                success: false,
            });
        }
    } else {
        res.json({ message: "Incorrect job post id", success: false });
    }
});

const getStatistics = asyncHandler(async(req, res) => {
    const numberOfCandidate = await Candidate.find().count();

    // TODO : thinking
    // Statistics of job application
    const numberOfJobApplication = await JobApplication.find().count();

    const numberOfPendingJobApplication = await JobApplication.find({
        isApprovedByAdmin: false,
    }).count();

    // Statistics of job post
    const numberOfApprovedJobPost = await JobPost.find({
        status: "Approved",
    }).count();

    const numberOfPendingJobPost = await JobPost.find({
        status: "Pending",
    }).count();

    const numberOfRejectedJobPost = await JobPost.find({
        status: "Rejected",
    }).count();

    // Statistics of Recruiter
    const numberOfRecruiter = await Recruiter.find().count();

    const data = {
        numberOfCandidate: numberOfCandidate,
        jobApplication: {
            total: numberOfJobApplication,
            pending: numberOfPendingJobApplication,
        },
        jobPost: {
            total: numberOfPendingJobPost +
                numberOfApprovedJobPost +
                numberOfRejectedJobPost,
            pending: numberOfPendingJobPost,
            approve: numberOfApprovedJobPost,
            reject: numberOfRejectedJobPost,
        },
        numberOfRecruiter: numberOfRecruiter,
    };

    res.json({ message: "Statistics", statistics: data });
});

const approveJobApplication = asyncHandler(async(req, res) => {
    const applicationId = req.params.applicationId;
    const approved = await JobApplication.updateOne({ _id: applicationId }, { isApprovedByAdmin: true }, { new: true });

    if (approved) {
        // number of applicants in jobpost to be increased
        const applicationData = await JobApplication.findOne({
            _id: applicationId,
        });
        const post = await JobPost.findOne({ _id: applicationData.jobPostId });
        const applicants = post.numberOfApplications + 1;
        const updated = await JobPost.updateOne({ _id: applicationData.jobPostId }, { numberOfApplications: applicants }, { new: true });
        if (updated) {
            res.json({
                message: "Candidate's job application has been approved",
                success: true,
            });
        } else {
            // rollback condition
            await JobApplication.updateOne({ _id: applicationId }, { isApprovedByAdmin: true }, { new: true });
        }
    } else {
        res.json({
            message: "Job application has not been approved due to technical error",
            success: false,
        });
    }
});

const rejectJobApplication = asyncHandler(async(req, res) => {
    const applicationId = req.params.applicationId;
    const newPost = await JobApplication.findOneAndUpdate({ _id: applicationId }, { status: "Rejected" }, { new: true });
    if (newPost) {
        res.json({ message: "You have Rejected the job application", success: true });
    } else {
        res.json({ message: "Unable to reject the application", success: false });
    }
});

module.exports = {
    registerAdmin,
    loginAdmin,
    updatePassword,
    approvePost,
    rejectPost,
    approveJobApplication,
    rejectJobApplication,
    getStatistics,
};