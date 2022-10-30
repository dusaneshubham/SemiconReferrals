const expressAsyncHandler = require("express-async-handler");
const job = require("../models/jobPost");

const getAllJobDetails = expressAsyncHandler(async (req, res) => {
    const data = await job.find();

    res.json({ message: "All job post data", data: data, status: "success" });
});

const getPerticularJobDetails = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const details = await job.findOne({ id: _id });

    if (details) {
        res.json({ message: "Job details", data: details, status: "success" })
    } else {
        res.json({ message: "Job not found!", status: "error" });
    }
});

module.exports = {
    getAllJobDetails,
    getPerticularJobDetails
}