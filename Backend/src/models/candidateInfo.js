const mongoose = require("mongoose");

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
        title: {
            type: String,
            required: true
        },
        instituteName: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        CGPA: {
            type: String,
        },
        grades: {
            type: String
        },
        description: {
            type: String,
        }
    }],

    workingExperience: [{
        organizationName: {
            type: String,
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

    defaultResumeId: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'resumes',
        default: null,
    },

    resumes: [{
        fileName: String,
        url: String,
    }],

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