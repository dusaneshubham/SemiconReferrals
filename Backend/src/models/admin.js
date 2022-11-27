const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },

    email: {
        type: String,
        required: true,
        min: 8
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

module.exports = mongoose.model('Admin', adminSchema);