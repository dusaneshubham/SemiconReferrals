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
        type: String
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

    saveProfile: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Candidate',
        unique: true
    }]

}, { timestamps: true });

module.exports = mongoose.model('RecruiterInfo', recruiterInfoSchema);