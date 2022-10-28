const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    candidateID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
    },

    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost',
    },

    resume: {
        type: String,
        required: true
    },

    isApprovedByAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    remarks: {
        type: String,
        required: false,
    },

    status: {
        type: String,
        enum: ["Hired", "Rejected", "Pending"],
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);