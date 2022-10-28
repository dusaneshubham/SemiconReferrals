const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },

    email: {
        type: String,
        required: true,
        minLength: 8
            // TODO : validation
    },

    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },

    contactNumber: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: false
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

    currentWorkingExperience: [{
        companyName: {
            type: String,
            required: false,
            default: "None"
        },
        duration: {
            type: String,
            required: false,
            default: 0
        },
        designation: {
            type: String,
            required: false
        },
        responsibilities: {
            type: String,
            required: false
        },
        typeofJob: {
            type: String,
            enum: ["Full Time", "Part Time", "Internship"],
            required: false
        },
        modeOfWorking: {
            type: String,
            enum: ["Remote", "Work from Office"],
            required: false
        }
    }]

}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);