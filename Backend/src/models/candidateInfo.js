const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const candidateInfoSchema = new mongoose.Schema({

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },

    gender: {
        type: String,
        required: false
    },

    DOB: {
        type: Date,
        required: false
    },

    profileImage: {
        type: String,
        required: false
            // TODO : put default image
    },

    about: {
        type: String,
        required: false
    },

    skills: {
        type: Array,
        required: false
    },

    linkedIn: {
        type: String,
        required: false
    },

    experience: {
        type: String,
        required: false
    },

    qualification: {
        type: String,
        enum: ["Bachelor", "Master", "PHD"],
        required: false
    },

    education: [{
        degree: {
            type: String,
            required: false
        },
        passingYear: {
            type: String,
            required: false
        },
        CGPA: {
            type: String,
            required: false,
            default: 0
        },
        institute: {
            type: String,
            required: false
        },
        university: {
            type: String,
            required: false
        },
        branch: {
            type: String,
            required: false
        }
    }],

    workingExperience: [{
        organizationName: {
            type: String,
            default: "None"
        },
        designation: {
            type: String
        },
        jobStartDate: {
            type: Date
        },
        jobEndDate: {
            type: Date
        },
        description: {
            type: String,
        },
        isCurrentlyWorking: {
            type: Boolean,
            default: false
        }
    }],
    savePost: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "jobPost"
    }]

}, { timestamps: true });

module.exports = mongoose.model('CandidateInfo', candidateInfoSchema);