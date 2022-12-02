const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({

    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },

    jobTitle: {
        type: String,
        required: true
    },

    jobCategory: {
        type: String,
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

    applicationDeadline: {
        type: Date,
        required: true
    },


    jobType: {
        type: String,
        // enum: ["Full Time", "Part Time", "Internship"],
        required: true,
    },

    experience: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    numberOfVacancies: {
        type: Number,
        required: true
    },

    jobLevel: {
        type: String,
        required: true
    },

    salary: {
        type: String,
    },


    modeOfWork: {
        type: String,
        enum: ["Remote", "Work from Office"]
    },

    skillsRequired: {
        type: Array,
        // required: true
    },

    keywords: {
        type: Array,
    },


    numberOfApplications: {
        type: Number,
        required: true,
        default: 0
    },

    status: {
        type: String,
        // enum: ["Approved", "Rejected", "Pending", "Blocked"],
        enum: ["Approved", "Pending", "Blocked"],
        required: true,
        default: "Pending",
    },

    remarks: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);