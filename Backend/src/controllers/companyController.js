const asyncHandler = require("express-async-handler");
const Company = require("../models/company");

const getAllCompanyDetails = asyncHandler(async(req, res) => {
    const data = await Company.find();

    if (data) {
        res.json({ message: "All company data", data: data, success: true });
    } else {
        res.json({ message: "Companies not found!", success: false });
    }
});

const getParticularCompanyDetails = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    const details = await Company.findOne({ _id });

    if (details) {
        res.json({ message: "Company details", data: details, success: true })
    } else {
        res.json({ message: "Company not found!", success: false });
    }
});

module.exports = {
    getAllCompanyDetails,
    getParticularCompanyDetails
}