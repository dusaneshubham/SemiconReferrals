const mongoose = require("mongoose");
const { isEmail } = require('validator');

const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },

    email: {
        type: String,
        required: true,
        min: 8,
        validate: [isEmail, "Invalid email"]
    },

    contactNumber: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }

}, { timestamps: true });

module.exports = mongoose.model('Recruiter', recruiterSchema);