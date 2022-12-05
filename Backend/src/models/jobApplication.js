const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
    },

    jobPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost',
    },

    resume: {
        filename: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    isApprovedByAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    remarks: {
        type: String,
    },

    status: {
        type: String,
        enum: ["Hired", "Rejected", "Pending"],
        required: true,
        default: "Pending"
    },

    coverLetter: {
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);