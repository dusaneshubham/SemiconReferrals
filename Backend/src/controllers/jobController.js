const asyncHandler = require("express-async-handler");
const JobPost = require("../models/jobPost");
const RecruiterInfo = require("../models/recruiterInfo");

const getAllJobDetails = asyncHandler(async(req, res) => {
    const data = await JobPost.find();
    res.json({ message: "All job post data", data: data, success: true });
});

const getJobDetails = asyncHandler(async(req, res) => {
    const user = req.user;
    const jobDetails = await JobPost.find({ recruiterId: user._id });
    if (jobDetails) {
        res.json({ message: "Job details found", data: jobDetails, success: true })
    } else {
        res.json({ message: "Jobs not found!", success: false });
    }
});

const getPendingJobs = asyncHandler(async(req, res) => {
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
        ]).then((data) => res.json({ data: data, success: true }))
        .catch(() => res.json({ success: false, message: "Unable to fetch data" }));
});

module.exports = {
    getAllJobDetails,
    getJobDetails,
    getPendingJobs
}