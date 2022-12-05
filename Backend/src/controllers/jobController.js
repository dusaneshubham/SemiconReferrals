const asyncHandler = require("express-async-handler");
const JobPost = require("../models/jobPost");
const RecruiterInfo = require("../models/recruiterInfo");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// not used yet
const getAllJobDetails = asyncHandler(async(req, res) => {
    const data = await JobPost.find();
    res.json({ message: "All job post data", data: data, success: true });
});

const getJobDetails = asyncHandler(async(req, res) => {
    const { postId } = req.body;
    // let jobpost = await JobPost.findOne({ _id: postId });
    // getting data of recruiterinfo also
    // const recruiterInfo = await RecruiterInfo.findOne({ recruiterId: jobpost.recruiterId.toString() });
    // console.log(jobpost);
    // jobDetails = {...jobpost, ...recruiterInfo };
    // if (jobDetails) {
    //     res.json({ message: "Job details found", data: jobDetails, success: true })
    // } else {
    //     res.json({ message: "Jobs not found!", success: false });
    // }
    JobPost.aggregate([{
            $match: {
                _id: ObjectId(postId)
            }
        }, {
            $lookup: {
                from: "recruiterinfos",
                localField: "recruiterId",
                foreignField: "recruiterId",
                as: "recruiterinfo"
            },
        }]).then((jobDetails) => {
            res.json({ data: jobDetails[0], message: "Job details found", success: true })
        })
        .catch(() => res.json({ success: false, message: "Unable to fetch job data" }));
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