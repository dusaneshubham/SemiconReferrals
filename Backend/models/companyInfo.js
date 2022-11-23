const mongoose = require("mongoose");
const { isEmail } = require('validator');

const companyInfoSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },

    logo: {
        type: String,
        required: true,
        // TODO : default logo
    },

    taxRegistrationNumber: {
        type: String,
        required: true,
        // TODO : default logo
    },

    CEO: {
        type: String,
        required: false,
    },

    email: {
        type: String,
        required: true,
        minLength: 8,
        validate: [isEmail, "Invalid email"]
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    },

    contactNumber: {
        type: Array, // can be multiple contact number
        required: true
    },

    address: [{
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        isHeadOffice: {
            type: Boolean,
            required: true,
            default: false
        }
    }],

    status: {
        type: String,
        enum: ["Approved", "Rejected", "Pending", "Blocked"],
        required: true,
        default: "Pending",
    },

    yearOfFoundation: {
        type: Number,
        required: true
    },

    about: {
        type: String,
        required: true
    },

    socialMedia: [{
        linkedIn: {
            type: String,
            required: true
        },
        instagram: {
            type: String,
            required: false
        },
        facebook: {
            type: String,
            required: false
        },
        twitter: {
            type: String,
            required: false
        }
    }],

    website: {
        type: String,
        required: true
    },

    numberOfStaff: {
        type: Number,
        required: true
    },

    companyImages: [{
        image: {
            type: Number,
            required: true
        }
    }]

}, { timestamps: true });

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);