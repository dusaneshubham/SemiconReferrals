const asyncHandler = require("express-async-handler");
const JobPost = require("../models/jobPost");

const getAllJobDetails = asyncHandler(async(req, res) => {
    const data = await JobPost.find();
    res.json({ message: "All job post data", data: data, status: true });
});

const getJobDetails = asyncHandler(async(req, res) => {
    const user = req.user;

    const jobDetails = await JobPost.find({ recruiterId: user._id });

    if (jobDetails) {
        res.json({ message: "Job details found", data: jobDetails, status: true })
    } else {
        res.json({ message: "Jobs not found!", status: false });
    }
});

module.exports = {
    getAllJobDetails,
    getJobDetails,
}