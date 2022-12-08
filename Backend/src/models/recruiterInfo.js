const mongoose = require("mongoose");

const recruiterInfoSchema = new mongoose.Schema({

    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },

    companyName: {
        type: String,
    },

    companyLogo: {
        type: String,
        default: "defaultImage.png"
    },

    companyWebsite: {
        type: String
    },

    totalExperience: {
        type: Number
    },

    linkedin: {
        type: String
    },

    teamName: {
        type: String
    },

    teamSize: {
        type: Number
    },

    location: {
        type: String
    },

    designation: {
        type: String
    },

    experienceInCurrentOrganization: {
        type: Number
    },

    teamWorkDescription: {
        type: String
    },

    saveCandidateProfile: [{
        candidate: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Candidate'
        }
    }],

    followers: [{
        candidate: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Candidate'
        },
        candidateInfo: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'CandidateInfo'
        },
        followedOn: {
            type: Date,
            require: true
        }
    }]

}, { timestamps: true });

module.exports = mongoose.model('RecruiterInfo', recruiterInfoSchema);