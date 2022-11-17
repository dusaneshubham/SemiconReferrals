const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const candidateInfoSchema = new mongoose.Schema({

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },

    gender: {
        type: String,
        required: false
    },

    DOB: {
        type: Date,
        required: false
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
    }],
    savePost: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "jobPost"
    }]

}, { timestamps: true });

// Hashing the password before saving into the database
candidateSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

candidateSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    }
};

module.exports = mongoose.model('CandidateInfo', candidateInfoSchema);