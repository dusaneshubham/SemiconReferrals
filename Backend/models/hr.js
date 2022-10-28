const mongoose = require("mongoose");

const HRSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },

    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },

    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },

    email: {
        type: String,
        required: true,
        min: 8
            // TODO : validation
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    },

    contactNumber: {
        type: String,
        required: true,
    },

    isActive: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('HR', HRSchema);