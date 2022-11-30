const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },

    jobCategory: {
        type: String,
        required: true
    },

    recruiterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
    },

    jobType: {
        type: String,
        // enum: ["Full Time", "Part Time", "Internship"],
        required: true,
    },

    modeOfWork: {
        type: String,
        enum: ["Remote", "Work from Office"]
    },

    location: {
        type: String,
        required: true
    },

    applicationDeadline: {
        type: Date,
        required: true
    },

    skillsRequired: {
        type: Array,
        // required: true
    },

    jobDescription: {
        type: String,
        required: true
    },

    keyResponsibilities: {
        type: String,
        required: true
    },

    minSalary: {
        type: Number,
        // required: true,
        default: 0
    },

    maxSalary: {
        type: Number,
        default: 0
    },

    salaryType: {
        type: String,
        enum: ["Hour", "Day", "Week", "Month", "Year"],
        // required: true
    },

    designation: {
        type: String,
        // required: true
    },

    numberOfVacancies: {
        type: Number,
        required: true
    },

    numberOfApplicants: {
        type: Number,
        required: true,
        default: 0
    },

    experience: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    jobLevel: {
        type: String,
        required: true
    },

    keywords: {
        type: Array,
    },

    status: {
        type: String,
        enum: ["Approved", "Rejected", "Pending", "Blocked"],
        required: true,
        default: "Pending",
    },

    remarks: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);