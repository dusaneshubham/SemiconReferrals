const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const candidateInfoSchema = new mongoose.Schema({

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },

    gender: {
        type: String
    },

    DOB: {
        type: Date
    },

    profileImage: {
        type: String
            // TODO : put default image
    },

    about: {
        type: String
    },

    skills: {
        type: Array,
        default: []
    },

    linkedIn: {
        type: String
    },

    experience: {
        type: String,
    },

    qualification: {
        type: String,
        enum: ["Bachelor", "Master", "PHD"],
    },

    education: [{
        degree: {
            type: String,
        },
        passingYear: {
            type: String,
        },
        CGPA: {
            type: String,
            default: 0
        },
        institute: {
            type: String,
        },
        university: {
            type: String,
        },
        branch: {
            type: String,
        }
    }],

    workingExperience: [{
        organizationName: {
            type: String,
            default: "None",
            required: true
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
        }
    }],

    savedPost: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "JobPost"
    }],

    followings: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Recruiter"
    }],

    resumes: {
        type: Array,
        default: []
    },

    desiredCitiesToWork: {
        type: String
    },

    isOpenToWork: {
        type: String
    },

    noticePeriod: {
        type: String
    },

    currentJobLocation: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('CandidateInfo', candidateInfoSchema);