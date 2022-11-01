const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },

    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },

    typeOfJob: {
        type: String,
        enum: ["Full Time", "Part Time", "Internship"],
        required: true,
    },

    modeOfWork: {
        type: String,
        enum: ["Remote", "Work from Office"],
        required: true
    },

    location: {
        type: String,
        required: true
    },

    deadlineToApply: {
        type: String, // date + time = String
        required: true
    },

    DOB: {
        type: Date,
        required: false
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    },

    profileImage: {
        type: String,
        required: true
            // TODO : put default image
    },

    skillsRequired: {
        type: Array,
        required: true
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
        required: true,
        default: 0
    },

    maxSalary: {
        type: Number,
        required: false
    },

    salaryType: {
        type: String,
        enum: ["Hour", "Day", "Week", "Month", "Year"],
        required: true
    },

    designation: {
        type: String,
        required: true
    },

    numberOfOpenings: {
        type: Number,
        required: true
    },

    numberOfApplicants: {
        type: Number,
        required: true,
        default: 0
    },

    minExperienceOfCandidate: {
        type: Number,
        required: true,
        default: 0
    },

    maxExperienceOfCandidate: {
        type: Number,
        required: true,
        default: 0
    },

    qualificationOfCandidate: {
        type: String,
        required: true,
    },

    keywords: {
        type: Array,
        required: false,
    },

    status: {
        type: String,
        enum: ["Approved", "Rejected", "Pending", "Blocked"],
        required: true,
        default: "Pending",
    },

    remarks: {
        type: String,
        required: false,
    }

}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);