const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: String,
        enum: ["Approved", "Rejected", "Pending", "Blocked"],
        required: true,
        default: "Pending",
    },

}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);