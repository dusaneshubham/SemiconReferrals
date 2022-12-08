const asyncHandler = require("express-async-handler");
const JobPost = require("../models/jobPost");
const JobApplication = require('../models/jobApplication');

// not used yet
const getAllJobDetails = asyncHandler(async(req, res) => {
    const data = await JobPost.find({ status: "Approved", isActive: true }).sort({ createdAt: -1 });
    if (data) {
        res.json({ message: "All job post data", data: data, success: true });
    } else {
        res.json({ message: "Jobs details not found", success: false });
    }
});

const getAllJobDetailsFilters = asyncHandler(async(req, res) => {
    const { filtersData } = req.body;
    console.log(filtersData);
    // filtersData.location = "/" + filtersData.location + "/";
    const data = await JobPost.find({ location: filtersData.location }).sort({ createdAt: -1 });
    console.log(data);
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
        res.json({ message: "Job details found", data: jobDetails, success: true })
    } else {
        res.json({ message: "Jobs not found!", success: false });
    }
});

const getPendingJobs = asyncHandler(async(req, res) => {
    const pendingJobs = await JobPost.find({ status: "Pending" }).sort({ createdAt: 1 });
    if (pendingJobs) {
        res.json({ data: pendingJobs, success: true });
    } else {
        res.json({ success: false, message: "Unable to fetch data" })
    }
});

const getPendingApplications = asyncHandler(async(req, res) => {
    const pendingApplications = await JobApplication.find({ status: "Pending" }).populate("jobPostId").sort({ createdAt: 1 });
    if (pendingApplications) {
        res.json({ data: pendingApplications, success: true });
    } else {
        res.json({ success: false, message: "Unable to fetch data" })
    }
});

module.exports = {
    getAllJobDetails,
    getAllJobDetailsFilters,
    getJobDetails,
    getPendingJobs,
    getPendingApplications
}