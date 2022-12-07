const mongoose = require("mongoose");

const candidateInfoSchema = new mongoose.Schema({

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
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

    savedJobPost: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "JobPost"
    }],

    followings: [{
        recruiter: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Recruiter"
        },
        companyName: {
            type: String,
            default: ""
        },
        companyLogo: {
            type: String,
            default: 'http://localhost:5000/images/logo-icon-semiconreferrals.png'
        }
    }],

    defaultResumeId: {
        type: mongoose.Schema.Types.ObjectId,
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