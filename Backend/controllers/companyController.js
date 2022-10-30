const expressAsyncHandler = require("express-async-handler");
const company = require("../models/company");

const getAllCompanyDetails = expressAsyncHandler(async (req, res) => {
    const data = await company.find();

    res.json({ message: "All company data", data: data, status: "success" });
});

const getPerticularCompanyDetails = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const details = await company.findOne({ id: _id });

    if (details) {
        res.json({ message: "Company details", data: details, status: "success" })
    } else {
        res.json({ message: "Company not found!", status: "error" });
    }
});

module.exports = {
    getAllCompanyDetails,
    getPerticularCompanyDetails
}