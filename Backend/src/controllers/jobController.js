const asyncHandler = require("express-async-handler");
const JobPost = require("../models/jobPost");
const JobApplication = require("../models/jobApplication");
const mongoose = require("mongoose");
const Candidate = require("../models/candidate");

// not used yet
const getAllJobDetails = asyncHandler(async(req, res) => {
    const data = await JobPost.find({ status: "Approved", isActive: true }).sort({
        createdAt: -1,
    });
    if (data) {
        res.json({ message: "All job post data", data: data, success: true });
    } else {
        res.json({ message: "Jobs details not found", success: false });
    }
});

const getJobDetails = asyncHandler(async(req, res) => {
    const { postId } = req.body;
    let jobDetails = await JobPost.findOne({ _id: postId });
    if (jobDetails) {
        res.json({ message: "Job details found", data: jobDetails, success: true });
    } else {
        res.json({ message: "Jobs not found!", success: false });
    }
});

const getPendingJobs = asyncHandler(async(req, res) => {
    const pendingJobs = await JobPost.find({ status: "Pending" }).sort({
        createdAt: 1,
    });
    if (pendingJobs) {
        res.json({ data: pendingJobs, success: true });
    } else {
        res.json({ success: false, message: "Unable to fetch data" });
    }
});

const getPendingApplications = asyncHandler(async(req, res) => {
    const pendingApplications = await JobApplication.find({
            isApprovedByAdmin: false,
            status: "Pending",
        })
        .populate("jobPostId")
        .sort({ createdAt: 1 });
    if (pendingApplications) {
        res.json({ data: pendingApplications, success: true });
    } else {
        res.json({ success: false, message: "Unable to fetch data" });
    }
});

const getActiveJobs = asyncHandler(async(req, res) => {
    const user = req.user;
    const activeJobs = await JobPost.find({
        recruiterId: user._id,
        status: "Approved",
        isActive: true,
    }).sort({ createdAt: -1 });
    if (activeJobs.length > 0) {
        res.json({ message: "Active jobs found", data: activeJobs, success: true });
    } else {
        res.json({ message: "Active jobs not found", success: false });
    }
});

const getInactiveJobs = asyncHandler(async(req, res) => {
    const user = req.user;
    const inactiveJobs = await JobPost.find({
        recruiterId: user._id,
        status: "Approved",
        isActive: false,
    }).sort({ createdAt: -1 });
    if (inactiveJobs.length > 0) {
        res.json({
            message: "Inactive jobs found",
            data: inactiveJobs,
            success: true,
        });
    } else {
        res.json({ message: "Inactive jobs not found", success: false });
    }
});

const getRecruiterPendingJobs = asyncHandler(async(req, res) => {
    const user = req.user;
    const inactiveJobs = await JobPost.find({
        recruiterId: user._id,
        status: "Pending",
    }).sort({ createdAt: -1 });
    if (inactiveJobs.length > 0) {
        res.json({
            message: "Pending jobs found",
            data: inactiveJobs,
            success: true,
        });
    } else {
        res.json({ message: "Pending jobs not found", success: false });
    }
});

const deleteJobPost = asyncHandler(async(req, res) => {
    const user = req.user;
    const { jobPostId } = req.body;
    const deleted = await JobPost.deleteOne({
        _id: jobPostId,
        recruiterId: user._id,
    });
    if (deleted) {
        res.json({
            message: "Job post has been deleted successfully!",
            success: true,
        });
    } else {
        res.json({ message: "Unable to delete the job post", success: false });
    }
});

const getJobApplications = asyncHandler(async(req, res) => {
    const postId = req.params.postId;
    JobApplication.aggregate([{
                $match: {
                    jobPostId: mongoose.Types.ObjectId(postId),
                    isApprovedByAdmin: true,
                },
            },
            {
                $lookup: {
                    from: "candidates",
                    localField: "candidateId",
                    foreignField: "_id",
                    as: "candidate",
                },
            },
        ])
        .then((data) => {
            res.json({ message: "Approved the post!", data: data, success: true });
        })
        .catch(() =>
            res.json({ message: "Unable to approve the post!", success: false })
        );
});

const changeApplicationStatus = asyncHandler(async(req, res) => {
    const applicationId = req.params.applicationId;
    const { changedStatus } = req.body;
    const updated = await JobApplication.updateOne({ _id: applicationId }, { status: changedStatus }, { new: true });
    if (updated) {
        res.json({ message: "Status has been changed!", success: true });
    } else {
        res.json({
            message: "Status has not been changed due to technical issue",
            success: false,
        });
    }
});

module.exports = {
    getAllJobDetails,
    getJobDetails,
    getPendingJobs,
    getPendingApplications,
    getActiveJobs,
    getInactiveJobs,
    getRecruiterPendingJobs,
    deleteJobPost,
    getJobApplications,
    changeApplicationStatus,
};