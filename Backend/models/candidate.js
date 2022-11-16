const mongoose = require("mongoose");
const { isEmail } = require('validator');

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
        minLength: 8,
        validate: [isEmail, "Invalid email"]
    },

    contactNumber: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, { timestamps: true })

module.exports = mongoose.model('Candidate', candidateSchema);